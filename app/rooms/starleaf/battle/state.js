// app/rooms/starleaf/_battle/state.js

import { DIRS_4, clamp, keyOf, seededRand, pickEmptySpawn } from "./utils";
import { makeUnits } from "./units";

export const PHASES = {
  INIT: "INIT",
  SELECT_TURN: "SELECT_TURN",
  SELECT_MOVE: "SELECT_MOVE",
  ENEMY_TURN: "ENEMY_TURN",
  RESOLVE: "RESOLVE",
};

export const TEAM = {
  ALLY: "ALLY",
  ENEMY: "ENEMY",
};

export function createInitialBattleState(opts = {}) {
  const seed = opts.seed ?? 12345;
  const rng = seededRand(seed);

  const W = opts.W ?? 14;
  const H = opts.H ?? 14;

  // 0: floor
  const tiles = Array.from({ length: H }, () => Array.from({ length: W }, () => 0));

  const units = makeUnits({ rng });

  // place allies bottom-left-ish
  const allySpawns = [
    { x: 2, y: H - 3 },
    { x: 3, y: H - 2 },
    { x: 4, y: H - 3 },
  ];
  // place enemies mid-right-ish
  const enemySpawns = [
    { x: W - 4, y: 4 },
    { x: W - 3, y: 6 },
    { x: W - 5, y: 7 },
    { x: W - 3, y: 9 },
  ];

  const occ = new Map(); // posKey -> unitId

  function place(unit, pos) {
    unit.pos = { x: pos.x, y: pos.y };
    occ.set(keyOf(pos), unit.id);
  }

  // Place allies
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    if (u.team !== TEAM.ALLY) continue;
    const p = allySpawns.shift() ?? pickEmptySpawn({ W, H, occ, rng });
    place(u, p);
  }

  // Place enemies
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    if (u.team !== TEAM.ENEMY) continue;
    const p = enemySpawns.shift() ?? pickEmptySpawn({ W, H, occ, rng });
    place(u, p);
  }

  // WT initial: keep as given, then compute order
  const turn = computeTurnOrder(units);

  return {
    meta: {
      seed,
      W,
      H,
      phase: PHASES.SELECT_TURN,
      message: "現在ターン（WT最小）を選択",
      tick: 0,
    },
    tiles,
    units,
    occ: Object.fromEntries(occ.entries()),
    turn,
    ui: {
      selectedUnitId: turn.queue[0] ?? null,
      hoverCell: null,
      movePreviewPath: [],
      movePreviewCells: [],
      showAllies: true,
      showEnemies: true,
    },
    log: [],
  };
}

export function computeTurnOrder(units) {
  // queue is sorted by (wt asc) then by id
  const alive = units.filter((u) => u.hp > 0);
  const sorted = [...alive].sort((a, b) => (a.wt - b.wt) || a.id.localeCompare(b.id));
  return {
    queue: sorted.map((u) => u.id),
  };
}

export function rebuildOcc(units) {
  const occ = new Map();
  for (const u of units) {
    if (u.hp <= 0) continue;
    occ.set(keyOf(u.pos), u.id);
  }
  return Object.fromEntries(occ.entries());
}

export function getUnitById(state, id) {
  return state.units.find((u) => u.id === id) ?? null;
}

export function isInside(state, pos) {
  return pos.x >= 0 && pos.y >= 0 && pos.x < state.meta.W && pos.y < state.meta.H;
}

export function isBlocked(state, pos) {
  const k = keyOf(pos);
  if (state.occ[k]) return true;
  // tiles: 1 would be wall etc (future)
  return false;
}

export function neighbors4(state, pos) {
  const res = [];
  for (const d of DIRS_4) {
    const p = { x: pos.x + d.x, y: pos.y + d.y };
    if (!isInside(state, p)) continue;
    res.push(p);
  }
  return res;
}

export function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function addLog(state, text) {
  return {
    ...state,
    log: [{ t: state.meta.tick, text }, ...state.log].slice(0, 50),
  };
}

export function advanceWTAfterAct(unit) {
  // lower is faster: unit.wt += base
  return { ...unit, wt: unit.wt + unit.baseWT };
}
