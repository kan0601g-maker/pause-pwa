// app/rooms/starleaf/_battle/ai.js

import { TEAM, getUnitById, manhattan } from "./state";
import { calcMoveRange, buildPath } from "./rules";
import { keyOf } from "./utils";

// Phase1 AI: 一番近い味方へ近づく（攻撃はまだしない）
export function runEnemyAutoMove(state, enemyId) {
  const enemy = getUnitById(state, enemyId);
  if (!enemy || enemy.team !== TEAM.ENEMY) return state;

  const allies = state.units.filter((u) => u.hp > 0 && u.team === TEAM.ALLY);
  if (!allies.length) return state;

  const target = [...allies].sort(
    (a, b) => manhattan(enemy.pos, a.pos) - manhattan(enemy.pos, b.pos)
  )[0];

  const { cells, prev } = calcMoveRange(state, enemyId);
  if (!cells.length) return state;

  // choose cell that minimizes distance to target
  let best = null;
  for (const c of cells) {
    const d = manhattan({ x: c.x, y: c.y }, target.pos);
    if (!best || d < best.d || (d === best.d && c.d < best.step)) {
      best = { x: c.x, y: c.y, d, step: c.d };
    }
  }

  if (!best) return state;

  const path = buildPath(prev, enemy.pos, { x: best.x, y: best.y }) || [enemy.pos];

  const nextPos = path[path.length - 1];
  const fromK = keyOf(enemy.pos);
  const toK = keyOf(nextPos);
  if (fromK === toK) return state;

  // mutate-like update: create new units/occ
  const units = state.units.map((u) => (u.id === enemyId ? { ...u, pos: nextPos } : u));
  const occ = { ...state.occ };
  delete occ[fromK];
  occ[toK] = enemyId;

  return {
    ...state,
    units,
    occ,
  };
}
