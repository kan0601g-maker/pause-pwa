// app/rooms/starleaf/_battle/reducer.js

import {
  PHASES,
  TEAM,
  computeTurnOrder,
  getUnitById,
  rebuildOcc,
  addLog,
  advanceWTAfterAct,
} from "./state";
import { calcMoveRange, buildPath } from "./rules";
import { keyOf } from "./utils";
import { runEnemyAutoMove } from "./ai";

export const ACT = {
  SELECT_UNIT: "SELECT_UNIT",
  HOVER_CELL: "HOVER_CELL",
  CONFIRM_MOVE: "CONFIRM_MOVE",
  END_TURN: "END_TURN",
  RUN_ENEMY_STEP: "RUN_ENEMY_STEP",
  TOGGLE_ALLY: "TOGGLE_ALLY",
  TOGGLE_ENEMY: "TOGGLE_ENEMY",
  RESET: "RESET",
};

export function battleReducer(state, action) {
  switch (action.type) {
    case ACT.RESET: {
      return action.payload;
    }

    case ACT.TOGGLE_ALLY: {
      return { ...state, ui: { ...state.ui, showAllies: !state.ui.showAllies } };
    }
    case ACT.TOGGLE_ENEMY: {
      return { ...state, ui: { ...state.ui, showEnemies: !state.ui.showEnemies } };
    }

    case ACT.SELECT_UNIT: {
      const id = action.id;
      const u = getUnitById(state, id);
      if (!u) return state;

      // Phase1: ally only manual. enemy auto.
      if (u.team !== TEAM.ALLY) return state;

      const turnId = state.turn.queue[0];
      // allow selection only if it's current minimal WT ally
      // (if current is enemy, you'll run enemy step)
      if (turnId !== id) {
        return addLog(state, `まだ ${u.name} の手番ではない`);
      }

      const { cells, prev } = calcMoveRange(state, id);

      return {
        ...state,
        meta: { ...state.meta, phase: PHASES.SELECT_MOVE, message: "移動先を選択" },
        ui: {
          ...state.ui,
          selectedUnitId: id,
          movePreviewCells: cells,
          _movePrevMap: prev, // internal
          movePreviewPath: [],
        },
      };
    }

    case ACT.HOVER_CELL: {
      const pos = action.pos;
      if (!pos) {
        return { ...state, ui: { ...state.ui, hoverCell: null, movePreviewPath: [] } };
      }

      const unitId = state.ui.selectedUnitId;
      if (!unitId) return { ...state, ui: { ...state.ui, hoverCell: pos } };

      if (state.meta.phase !== PHASES.SELECT_MOVE) {
        return { ...state, ui: { ...state.ui, hoverCell: pos } };
      }

      const u = getUnitById(state, unitId);
      if (!u) return state;

      const prev = state.ui._movePrevMap || {};
      const path = buildPath(prev, u.pos, pos);
      return {
        ...state,
        ui: { ...state.ui, hoverCell: pos, movePreviewPath: path || [] },
      };
    }

    case ACT.CONFIRM_MOVE: {
      const unitId = state.ui.selectedUnitId;
      if (!unitId) return state;
      if (state.meta.phase !== PHASES.SELECT_MOVE) return state;

      const u = getUnitById(state, unitId);
      if (!u) return state;

      const dest = action.pos;
      if (!dest) return state;

      // verify dest in move range
      const ok = (state.ui.movePreviewCells || []).some((c) => c.x === dest.x && c.y === dest.y);
      if (!ok) return addLog(state, "そこには移動できない");

      const fromK = keyOf(u.pos);
      const toK = keyOf(dest);

      if (fromK === toK) {
        return addLog(state, "その場待機");
      }

      const units = state.units.map((x) => (x.id === unitId ? { ...x, pos: dest } : x));
      const occ = { ...state.occ };
      delete occ[fromK];
      occ[toK] = unitId;

      // end act: advance WT
      const advancedUnits = units.map((x) =>
        x.id === unitId ? advanceWTAfterAct(x) : x
      );

      const turn = computeTurnOrder(advancedUnits);

      const nextState = {
        ...state,
        meta: { ...state.meta, phase: PHASES.SELECT_TURN, tick: state.meta.tick + 1, message: "現在ターン（WT最小）を選択" },
        units: advancedUnits,
        occ,
        turn,
        ui: {
          ...state.ui,
          movePreviewCells: [],
          movePreviewPath: [],
          _movePrevMap: null,
          selectedUnitId: turn.queue[0] ?? null,
        },
      };

      return addLog(nextState, `${u.name} 移動 → WT+${u.baseWT}`);
    }

    case ACT.RUN_ENEMY_STEP: {
      // if current min WT is enemy, do one enemy move then advance WT & reorder
      const curId = state.turn.queue[0];
      if (!curId) return state;

      const cur = getUnitById(state, curId);
      if (!cur) return state;

      if (cur.team !== TEAM.ENEMY) return state;

      // auto move
      let s = { ...state, meta: { ...state.meta, phase: PHASES.ENEMY_TURN } };
      s = runEnemyAutoMove(s, curId);

      // advance WT after act
      const units = s.units.map((u) => (u.id === curId ? advanceWTAfterAct(u) : u));
      const occ = rebuildOcc(units);
      const turn = computeTurnOrder(units);

      s = {
        ...s,
        meta: { ...s.meta, phase: PHASES.SELECT_TURN, tick: s.meta.tick + 1, message: "現在ターン（WT最小）を選択" },
        units,
        occ,
        turn,
        ui: { ...s.ui, selectedUnitId: turn.queue[0] ?? null },
      };

      return addLog(s, `${cur.name}（敵）行動 → WT+${cur.baseWT}`);
    }

    case ACT.END_TURN: {
      // optional: same as "wait": advance WT without moving
      const curId = state.turn.queue[0];
      if (!curId) return state;
      const cur = getUnitById(state, curId);
      if (!cur) return state;
      if (cur.team !== TEAM.ALLY) return state;

      const units = state.units.map((u) => (u.id === curId ? advanceWTAfterAct(u) : u));
      const occ = rebuildOcc(units);
      const turn = computeTurnOrder(units);

      const s = {
        ...state,
        meta: { ...state.meta, phase: PHASES.SELECT_TURN, tick: state.meta.tick + 1, message: "現在ターン（WT最小）を選択" },
        units,
        occ,
        turn,
        ui: { ...state.ui, selectedUnitId: turn.queue[0] ?? null, movePreviewCells: [], movePreviewPath: [], _movePrevMap: null },
      };
      return addLog(s, `${cur.name} 待機 → WT+${cur.baseWT}`);
    }

    default:
      return state;
  }
}
