// app/rooms/starleaf/tactics/tactics-client.jsx
"use client";

import React, { useEffect, useMemo, useReducer, useRef } from "react";
import { createInitialBattleState, TEAM } from "../_battle/state";
import { battleReducer, ACT } from "../_battle/reducer";

const CELL = 40;
const GAP = 6;

function cellStyle() {
  return {
    width: CELL,
    height: CELL,
    borderRadius: 10,
    border: "1px solid rgba(120,220,180,.22)",
    background: "rgba(0,0,0,.35)",
    boxShadow: "inset 0 0 0 1px rgba(0,0,0,.25)",
    cursor: "pointer",
  };
}

function chipStyle(active) {
  return {
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(120,220,180,.25)",
    background: active ? "rgba(40,120,90,.35)" : "rgba(0,0,0,.25)",
    color: "rgba(220,255,240,.9)",
    fontSize: 12,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };
}

export default function TacticsClient() {
  const [state, dispatch] = useReducer(battleReducer, null, () =>
    createInitialBattleState({ W: 14, H: 14, seed: 20260123 })
  );

  const curId = state.turn.queue[0] ?? null;
  const cur = state.units.find((u) => u.id === curId) ?? null;

  // 自動：現在WT最小が敵なら、ボタン押さなくても1手ずつ進めたいならここで回す
  // まずは明示ボタンにしておく（暴走防止）
  const canRunEnemy = cur && cur.team === TEAM.ENEMY;

  const moveSet = useMemo(() => {
    const s = new Set();
    for (const c of state.ui.movePreviewCells || []) s.add(`${c.x},${c.y}`);
    return s;
  }, [state.ui.movePreviewCells]);

  const pathSet = useMemo(() => {
    const s = new Set();
    for (const p of state.ui.movePreviewPath || []) s.add(`${p.x},${p.y}`);
    return s;
  }, [state.ui.movePreviewPath]);

  function onCellEnter(x, y) {
    dispatch({ type: ACT.HOVER_CELL, pos: { x, y } });
  }

  function onCellClick(x, y) {
    if (state.meta.phase === "SELECT_MOVE") {
      dispatch({ type: ACT.CONFIRM_MOVE, pos: { x, y } });
      return;
    }
    // SELECT_TURN: click ally card in right panel (not grid)
  }

  function selectUnit(id) {
    dispatch({ type: ACT.SELECT_UNIT, id });
  }

  const W = state.meta.W;
  const H = state.meta.H;

  const occ = state.occ;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        color: "rgba(225,255,245,.92)",
        background:
          "radial-gradient(1200px 700px at 25% 20%, rgba(0,90,70,.55), rgba(0,0,0,.95) 55%)",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Noto Sans JP", sans-serif',
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <div style={{ opacity: 0.7, fontSize: 12, letterSpacing: 0.5 }}>STARLEAF / TACTICS</div>
            <h1 style={{ margin: "6px 0 6px", fontSize: 28, letterSpacing: 0.3 }}>
              共鳴フィールド・タクティクス（Phase1）
            </h1>
            <div style={{ opacity: 0.75, fontSize: 13 }}>
              {W}×{H} / 味方{state.units.filter((u) => u.team === TEAM.ALLY).length} / 敵
              {state.units.filter((u) => u.team === TEAM.ENEMY).length} / WTでターンが回る（移動のみ）
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={{
                ...chipStyle(false),
                cursor: canRunEnemy ? "pointer" : "not-allowed",
                opacity: canRunEnemy ? 1 : 0.4,
              }}
              onClick={() => canRunEnemy && dispatch({ type: ACT.RUN_ENEMY_STEP })}
            >
              ▲ 敵 自動行動
            </button>
            <button style={{ ...chipStyle(false), cursor: "pointer" }} onClick={() => dispatch({ type: ACT.END_TURN })}>
              ◇ 待機（WT進める）
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 18, marginTop: 18 }}>
          {/* GRID */}
          <div
            style={{
              borderRadius: 18,
              border: "1px solid rgba(120,220,180,.20)",
              padding: 16,
              background: "rgba(0,0,0,.25)",
              boxShadow: "0 18px 40px rgba(0,0,0,.35)",
            }}
          >
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <span style={chipStyle(true)}>{W}×{H}</span>
              <button style={chipStyle(state.ui.showAllies)} onClick={() => dispatch({ type: ACT.TOGGLE_ALLY })}>
                ◇ 味方
              </button>
              <button style={chipStyle(state.ui.showEnemies)} onClick={() => dispatch({ type: ACT.TOGGLE_ENEMY })}>
                ▲ 敵
              </button>
              <span style={{ ...chipStyle(false), opacity: 0.8 }}>
                {state.meta.message}
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${W}, ${CELL}px)`,
                gap: GAP,
                padding: 6,
                borderRadius: 16,
                border: "1px solid rgba(120,220,180,.14)",
              }}
            >
              {Array.from({ length: H }).map((_, y) =>
                Array.from({ length: W }).map((__, x) => {
                  const k = `${x},${y}`;
                  const unitId = occ[k] || null;
                  const unit = unitId ? state.units.find((u) => u.id === unitId) : null;

                  const inMove = moveSet.has(k);
                  const inPath = pathSet.has(k);

                  const show =
                    !unit ||
                    (unit.team === TEAM.ALLY ? state.ui.showAllies : state.ui.showEnemies);

                  const isCur = unit && unit.id === curId;

                  return (
                    <div
                      key={k}
                      style={{
                        ...cellStyle(),
                        outline: inMove ? "2px solid rgba(120,220,180,.35)" : "none",
                        boxShadow: inPath
                          ? "0 0 0 2px rgba(255,220,180,.25) inset"
                          : "inset 0 0 0 1px rgba(0,0,0,.25)",
                        position: "relative",
                        opacity: show ? 1 : 0.15,
                      }}
                      onMouseEnter={() => onCellEnter(x, y)}
                      onMouseLeave={() => dispatch({ type: ACT.HOVER_CELL, pos: null })}
                      onClick={() => onCellClick(x, y)}
                      title={`${x},${y}`}
                    >
                      {unit && show ? (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <div
                            style={{
                              width: 0,
                              height: 0,
                              borderLeft: "7px solid transparent",
                              borderRight: "7px solid transparent",
                              borderBottom:
                                unit.team === TEAM.ENEMY
                                  ? "12px solid rgba(255,200,170,.9)"
                                  : "12px solid rgba(180,255,230,.9)",
                              filter: isCur ? "drop-shadow(0 0 10px rgba(140,255,210,.35))" : "none",
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div
            style={{
              borderRadius: 18,
              border: "1px solid rgba(120,220,180,.20)",
              padding: 16,
              background: "rgba(0,0,0,.25)",
              boxShadow: "0 18px 40px rgba(0,0,0,.35)",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 18 }}>ターン（WT）</h2>
            <div style={{ opacity: 0.75, fontSize: 12, marginTop: 6 }}>
              現在ターン（WT最小）を選択（敵の番なら「敵 自動行動」）
            </div>

            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              {state.turn.queue.slice(0, 10).map((id) => {
                const u = state.units.find((x) => x.id === id);
                if (!u) return null;

                const isSelected = state.ui.selectedUnitId === id;
                const isCurrent = curId === id;

                const clickable = u.team === TEAM.ALLY && isCurrent;

                return (
                  <button
                    key={id}
                    onClick={() => clickable && selectUnit(id)}
                    style={{
                      textAlign: "left",
                      padding: 12,
                      borderRadius: 14,
                      border: "1px solid rgba(120,220,180,.20)",
                      background: isSelected
                        ? "rgba(40,120,90,.35)"
                        : "rgba(0,0,0,.20)",
                      color: "rgba(225,255,245,.92)",
                      cursor: clickable ? "pointer" : "default",
                      opacity: clickable || u.team === TEAM.ENEMY ? 1 : 0.85,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <div style={{ fontWeight: 700 }}>
                        {u.team === TEAM.ENEMY ? "▲ " : "◇ "}
                        {u.name}
                      </div>
                      <div style={{ fontSize: 12, opacity: 0.8 }}>
                        {isCurrent ? "NOW" : ""}
                      </div>
                    </div>
                    <div style={{ marginTop: 6, fontSize: 12, opacity: 0.85 }}>
                      WT {u.wt} / base {u.baseWT} / MOV {u.mov}
                      <span style={{ marginLeft: 10, opacity: 0.7 }}>
                        ({u.pos.x},{u.pos.y})
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 16, borderTop: "1px solid rgba(120,220,180,.12)", paddingTop: 12 }}>
              <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 8 }}>ログ</div>
              <div style={{ display: "grid", gap: 6, maxHeight: 220, overflow: "auto" }}>
                {state.log.map((l, i) => (
                  <div key={i} style={{ fontSize: 12, opacity: 0.82 }}>
                    ・{l.text}
                  </div>
                ))}
                {!state.log.length ? (
                  <div style={{ fontSize: 12, opacity: 0.6 }}>（まだログなし）</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18, opacity: 0.65, fontSize: 12 }}>
          Phase1: 移動のみ / WT順 / 敵は最寄り味方へ接近（攻撃・スキルは次フェーズ）
        </div>
      </div>
    </div>
  );
}
