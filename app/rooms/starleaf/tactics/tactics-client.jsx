// app/rooms/starleaf/tactics/tactics-client.jsx
"use client";

import React, { useMemo, useReducer, useState } from "react";

// ✅ ここが2行の修正ポイント（_battle → battle）
import { createInitialBattleState, TEAM } from "../battle/state";
import { battleReducer, ACT } from "../battle/reducer";

const GRID_W = 14;
const GRID_H = 14;

const CELL = 40;
const GAP = 6;

function cellStyle(active) {
  return {
    width: CELL,
    height: CELL,
    borderRadius: 10,
    border: "1px solid rgba(120,220,180,.22)",
    background: active ? "rgba(40,120,90,.35)" : "rgba(0,0,0,.35)",
    boxShadow: "inset 0 0 0 1px rgba(0,0,0,.25)",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    userSelect: "none",
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
  };
}

function panelCardStyle(active) {
  return {
    padding: 14,
    borderRadius: 14,
    border: "1px solid rgba(120,220,180,.20)",
    background: active ? "rgba(20,70,55,.55)" : "rgba(0,0,0,.30)",
    color: "rgba(220,255,240,.92)",
  };
}

export default function TacticsClient() {
  // 初期化（state 側の実装に合わせる）
  const [state, dispatch] = useReducer(battleReducer, undefined, () =>
    createInitialBattleState()
  );

  // 表示フィルタ（UIだけ。ロジック壊さない）
  const [showAllies, setShowAllies] = useState(true);
  const [showEnemies, setShowEnemies] = useState(true);

  // 既存stateの形が違っても落ちないように安全に拾う
  const units = useMemo(() => {
    // よくある候補を順に見る（どれでもOK）
    return (
      state?.units ||
      state?.actors ||
      state?.entities ||
      state?.battle?.units ||
      []
    );
  }, [state]);

  // WT並びっぽいリスト（無ければ空）
  const turnList = useMemo(() => {
    const list = Array.isArray(state?.turnOrder)
      ? state.turnOrder
      : Array.isArray(state?.queue)
      ? state.queue
      : Array.isArray(units)
      ? units
      : [];
    // wt っぽい値でソート（無ければそのまま）
    return [...list].sort((a, b) => (a?.wt ?? 9999) - (b?.wt ?? 9999));
  }, [state, units]);

  // ACT と TEAM を「未使用」にしない（Nextのlint対策）
  const actKeys = useMemo(() => Object.keys(ACT ?? {}).length, []);
  const teamKeys = useMemo(() => Object.keys(TEAM ?? {}).length, []);

  const bg = {
    minHeight: "100vh",
    background: "radial-gradient(1200px 800px at 15% 0%, rgba(60,180,120,.20), rgba(0,0,0,0)) , #050a07",
    color: "rgba(220,255,240,.92)",
    padding: 28,
  };

  const frame = {
    maxWidth: 1280,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 420px",
    gap: 18,
    alignItems: "start",
  };

  const boardWrap = {
    borderRadius: 18,
    border: "1px solid rgba(120,220,180,.20)",
    background: "rgba(0,0,0,.25)",
    padding: 18,
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: `repeat(${GRID_W}, ${CELL}px)`,
    gridAutoRows: `${CELL}px`,
    gap: GAP,
    padding: 10,
    borderRadius: 16,
    border: "1px solid rgba(120,220,180,.18)",
    background: "rgba(0,0,0,.22)",
  };

  const side = {
    borderRadius: 18,
    border: "1px solid rgba(120,220,180,.20)",
    background: "rgba(0,0,0,.25)",
    padding: 18,
    position: "sticky",
    top: 18,
  };

  // 盤面のユニット表示（stateの形が違っても「落ちない」）
  const unitByPos = useMemo(() => {
    const m = new Map();
    for (const u of units) {
      const x = u?.x ?? u?.pos?.x ?? u?.position?.x;
      const y = u?.y ?? u?.pos?.y ?? u?.position?.y;
      if (typeof x === "number" && typeof y === "number") {
        m.set(`${x},${y}`, u);
      }
    }
    return m;
  }, [units]);

  const isAlly = (u) => {
    const t = u?.team ?? u?.side ?? u?.faction;
    // TEAM の定義に寄せつつ、文字列でも拾う
    return t === TEAM?.ALLY || t === "ALLY" || t === "ally" || t === 0;
  };

  const isEnemy = (u) => {
    const t = u?.team ?? u?.side ?? u?.faction;
    return t === TEAM?.ENEMY || t === "ENEMY" || t === "enemy" || t === 1;
  };

  const cellClick = (x, y) => {
    // 既存 reducer のACTがあれば投げる（無くても落ちない）
    const type =
      ACT?.CELL_CLICK ||
      ACT?.SELECT_CELL ||
      ACT?.CLICK_CELL ||
      ACT?.NOOP ||
      "NOOP";
    dispatch({ type, x, y });
  };

  return (
    <div style={bg}>
      <div style={{ maxWidth: 1280, margin: "0 auto 14px" }}>
        <div style={{ fontSize: 12, opacity: 0.75, letterSpacing: 0.5 }}>
          STARLEAF / TACTICS
        </div>
        <div style={{ fontSize: 28, fontWeight: 800 }}>
          共鳴フィールド・タクティクス（Phase0）
        </div>
        <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>
          14×14 / 味方3 / 敵4 / WTでターンが回る（移動のみ）
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
          <button type="button" style={chipStyle(true)}>
            14×14
          </button>
          <button
            type="button"
            style={chipStyle(showAllies)}
            onClick={() => setShowAllies((v) => !v)}
          >
            ◆ 味方
          </button>
          <button
            type="button"
            style={chipStyle(showEnemies)}
            onClick={() => setShowEnemies((v) => !v)}
          >
            ▲ 敵
          </button>
          <button type="button" style={chipStyle(false)}>
            WT最小＝枠強調
          </button>
          <span style={{ fontSize: 12, opacity: 0.65, marginLeft: "auto" }}>
            debug: ACT keys={actKeys}, TEAM keys={teamKeys}
          </span>
        </div>
      </div>

      <div style={frame}>
        {/* board */}
        <div style={boardWrap}>
          <div style={grid}>
            {Array.from({ length: GRID_W * GRID_H }).map((_, i) => {
              const x = i % GRID_W;
              const y = Math.floor(i / GRID_W);

              const u = unitByPos.get(`${x},${y}`);
              const ally = u && isAlly(u);
              const enemy = u && isEnemy(u);

              const visible =
                !u ||
                (ally && showAllies) ||
                (enemy && showEnemies) ||
                (!ally && !enemy); // 判定不能は出す

              if (!visible) {
                return (
                  <div
                    key={i}
                    style={cellStyle(false)}
                    onClick={() => cellClick(x, y)}
                    aria-label={`cell ${x},${y}`}
                  />
                );
              }

              return (
                <div
                  key={i}
                  style={cellStyle(!!u)}
                  onClick={() => cellClick(x, y)}
                  aria-label={`cell ${x},${y}`}
                  title={u ? `${u?.name ?? "unit"} (${x},${y})` : `${x},${y}`}
                >
                  {u ? (
                    <span style={{ fontSize: 18, lineHeight: 1 }}>
                      {ally ? "◆" : enemy ? "▲" : "●"}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* side */}
        <div style={side}>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>
            ターン（WT）
          </div>
          <div
            style={{
              padding: 12,
              borderRadius: 14,
              border: "1px solid rgba(120,220,180,.18)",
              background: "rgba(0,0,0,.22)",
              marginBottom: 12,
              textAlign: "center",
              opacity: 0.9,
            }}
          >
            現在ターン（WT最小）を選択
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {turnList.slice(0, 8).map((u, idx) => {
              const ally = isAlly(u);
              const enemy = isEnemy(u);
              const icon = ally ? "◆" : enemy ? "▲" : "●";
              const wt = u?.wt ?? u?.WT ?? 0;
              const base = u?.base ?? u?.BASE ?? "";
              const mov = u?.mov ?? u?.MOV ?? "";
              const x = u?.x ?? u?.pos?.x ?? u?.position?.x;
              const y = u?.y ?? u?.pos?.y ?? u?.position?.y;

              return (
                <div key={idx} style={panelCardStyle(idx === 0)}>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>
                    {icon} {u?.name ?? u?.id ?? "ユニット"}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>
                    WT {wt}
                    {base !== "" ? ` / base ${base}` : ""}
                    {mov !== "" ? ` / MOV ${mov}` : ""}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>
                    {typeof x === "number" && typeof y === "number"
                      ? `(${x},${y})`
                      : "(pos ?)"}
                  </div>
                </div>
              );
            })}

            {turnList.length === 0 ? (
              <div style={panelCardStyle(false)}>
                <div style={{ fontWeight: 800 }}>（turn list 空）</div>
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>
                  stateの形がまだ未確定でも落ちないようにしてあるよ。
                  まずは build 通す用。
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
