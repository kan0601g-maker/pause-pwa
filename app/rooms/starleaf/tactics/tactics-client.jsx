"use client";

import React, { useReducer } from "react";

// ★ ここが修正ポイント（存在するパスに合わせる）
import { createInitialBattleState, TEAM } from "../battle/state";
import { battleReducer } from "../battle/reducer";

export default function TacticsClient() {
  const [state, dispatch] = useReducer(
    battleReducer,
    undefined,
    createInitialBattleState
  );

  return (
    <div style={{ minHeight: "100vh", padding: 24 }}>
      <h1>STARLEAF / TACTICS (Phase1)</h1>

      <p>Phase1 alive ✅</p>

      <pre
        style={{
          marginTop: 16,
          padding: 12,
          background: "#111",
          color: "#9f9",
          fontSize: 12,
          overflow: "auto",
        }}
      >
        {JSON.stringify(
          {
            units: state.units?.length,
            turn: state.turn,
            team: TEAM?.ALLY,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}
