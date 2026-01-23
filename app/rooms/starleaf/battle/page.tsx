// app/rooms/starleaf/battle/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useReducer, useCallback } from "react";

// ---- battle core（自分の配置に合わせて import に変更） ----
// 既に作ってある場合は path を合わせてね。
// 例: "@/app/battle/..." みたいに aliases を使うのもOK
import { createInitialBattleState } from "../_battle/init"; // ←なければ後述の簡易initに置換
import { battleReducer } from "../_battle/reducer";
import { runEnemyTurn } from "../_battle/ai";
import type { BattleState, Pos } from "../_battle/types";

// ---- Canvas サイズ（まず固定でOK。後でレスポンシブにする） ----
const CANVAS_W = 560;
const CANVAS_H = 560;

export default function StarleafBattlePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [state, dispatch] = useReducer(battleReducer, undefined, () =>
    createInitialBattleState()
  );

  // --- 描画：まずは「黒背景＋グリッド」だけでもOK ---
  // 本番は render/canvas.ts に分離推奨
  const render = useCallback((ctx: CanvasRenderingContext2D, s: BattleState) => {
    // 1) 背景
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = "#050a07";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // 2) グリッド（8x8想定、後で state.grid へ）
    const gw = s.grid.width;
    const gh = s.grid.height;
    const cell = Math.floor(Math.min(CANVAS_W / gw, CANVAS_H / gh));
    const ox = Math.floor((CANVAS_W - gw * cell) / 2);
    const oy = Math.floor((CANVAS_H - gh * cell) / 2);

    ctx.strokeStyle = "rgba(120, 255, 170, 0.12)";
    ctx.lineWidth = 1;

    for (let x = 0; x <= gw; x++) {
      ctx.beginPath();
      ctx.moveTo(ox + x * cell, oy);
      ctx.lineTo(ox + x * cell, oy + gh * cell);
      ctx.stroke();
    }
    for (let y = 0; y <= gh; y++) {
      ctx.beginPath();
      ctx.moveTo(ox, oy + y * cell);
      ctx.lineTo(ox + gw * cell, oy + y * cell);
      ctx.stroke();
    }

    // 3) ユニット（簡易）
    for (const u of s.units) {
      if (!u.alive) continue;
      const cx = ox + u.pos.x * cell + cell / 2;
      const cy = oy + u.pos.y * cell + cell / 2;

      ctx.fillStyle = u.team === "ALLY" ? "rgba(120,255,170,0.9)" : "rgba(255,160,120,0.9)";
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(6, cell * 0.18), 0, Math.PI * 2);
      ctx.fill();

      // HPバー（簡易）
      const w = cell * 0.6;
      const h = 4;
      const x0 = cx - w / 2;
      const y0 = cy + cell * 0.22;
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.fillRect(x0, y0, w, h);
      ctx.fillStyle = "rgba(120,255,170,0.5)";
      const ratio = u.maxHp > 0 ? u.hp / u.maxHp : 0;
      ctx.fillRect(x0, y0, w * ratio, h);
    }

    // 4)（任意）選択情報を画面に出すならここ
  }, []);

  // requestAnimationFrame で描画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const tick = () => {
      render(ctx, state);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [render, state]);

  // 盤面タップ → グリッド座標に変換して dispatch
  const screenToGrid = useCallback(
    (clientX: number, clientY: number): Pos | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const gw = state.grid.width;
      const gh = state.grid.height;
      const cell = Math.floor(Math.min(CANVAS_W / gw, CANVAS_H / gh));
      const ox = Math.floor((CANVAS_W - gw * cell) / 2);
      const oy = Math.floor((CANVAS_H - gh * cell) / 2);

      const gx = Math.floor((x - ox) / cell);
      const gy = Math.floor((y - oy) / cell);

      if (gx < 0 || gy < 0 || gx >= gw || gy >= gh) return null;
      return { x: gx, y: gy };
    },
    [state.grid.height, state.grid.width]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const p = screenToGrid(e.clientX, e.clientY);
      if (!p) return;
      dispatch({ type: "TILE_TAP", pos: p } as any);
    },
    [screenToGrid]
  );

  // 敵ターン実行（フェーズ1は手動ボタンでOK。後で自動化）
  const runEnemy = useCallback(() => {
    // reducer内に組み込む設計でもOKだけど、
    // まずはここで回して動作確認が早い
    const next = runEnemyTurn(state);
    // ここだけ「置換」する必要があるので、専用Actionを用意するのが一番ラク
    // 例: { type:"REPLACE_STATE", state: next }
    dispatch({ type: "REPLACE_STATE", state: next } as any);
  }, [state]);

  const endTurn = useCallback(() => {
    dispatch({ type: "END_TURN" } as any);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#050a07", color: "rgba(220,255,235,0.9)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.7, letterSpacing: 0.6 }}>STARLEAF / BATTLE (Phase1)</div>
            <h1 style={{ margin: "6px 0 0", fontSize: 24, fontWeight: 700 }}>共鳴フィールド・タクティクス</h1>
            <div style={{ marginTop: 6, fontSize: 13, opacity: 0.8 }}>
              フェーズ1：最小デモ（8×8 / 味方1 / 敵3 / 攻撃・防御・待機）
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <a
              href="/rooms/starleaf"
              style={{
                padding: "10px 12px",
                borderRadius: 999,
                border: "1px solid rgba(120,255,170,0.18)",
                textDecoration: "none",
                color: "rgba(220,255,235,0.9)",
              }}
            >
              ← スター・リーフへ
            </a>
            <a
              href="/"
              style={{
                padding: "10px 12px",
                borderRadius: 999,
                border: "1px solid rgba(120,255,170,0.18)",
                textDecoration: "none",
                color: "rgba(220,255,235,0.9)",
              }}
            >
              HOME
            </a>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, marginTop: 18 }}>
          {/* Canvas */}
          <div
            style={{
              borderRadius: 16,
              border: "1px solid rgba(120,255,170,0.12)",
              overflow: "hidden",
              background: "rgba(0,0,0,0.18)",
            }}
          >
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              onPointerDown={onPointerDown}
              style={{ display: "block", width: "100%", height: "auto", touchAction: "manipulation" }}
            />
          </div>

          {/* Command panel (HTML UI) */}
          <div
            style={{
              borderRadius: 16,
              border: "1px solid rgba(120,255,170,0.12)",
              padding: 12,
              background: "rgba(0,0,0,0.18)",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8 }}>操作</div>

            <div style={{ display: "grid", gap: 8 }}>
              <button
                onClick={() => dispatch({ type: "CHOOSE_COMMAND", command: "ATTACK" } as any)}
                style={btnStyle}
              >
                攻撃
              </button>
              <button
                onClick={() => dispatch({ type: "CHOOSE_COMMAND", command: "DEFEND" } as any)}
                style={btnStyle}
              >
                防御
              </button>
              <button
                onClick={() => dispatch({ type: "CHOOSE_COMMAND", command: "WAIT" } as any)}
                style={btnStyle}
              >
                待機
              </button>

              <button onClick={() => dispatch({ type: "CANCEL" } as any)} style={btnStyleSub}>
                戻る
              </button>

              <div style={{ height: 1, background: "rgba(120,255,170,0.12)", margin: "6px 0" }} />

              <button onClick={endTurn} style={btnStyleSub}>
                ターン終了
              </button>

              <button onClick={runEnemy} style={btnStyleSub}>
                敵ターン実行（仮）
              </button>

              <button onClick={() => dispatch({ type: "RETRY" } as any)} style={btnStyleSub}>
                リトライ
              </button>
            </div>

            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.85 }}>
              <div>Turn: <b>{state.turn}</b></div>
              <div style={{ marginTop: 6, fontWeight: 700 }}>ログ</div>
              <div style={{ marginTop: 6, maxHeight: 220, overflow: "auto", paddingRight: 6 }}>
                {state.log.slice(-8).map((l, i) => (
                  <div key={i} style={{ opacity: 0.9, padding: "2px 0" }}>
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14, fontSize: 12, opacity: 0.65 }}>
          ※ このページは本編battle用。Phase0（WT詳細）は lab 側に隔離して残す。
        </div>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(120,255,170,0.18)",
  background: "rgba(0,0,0,0.15)",
  color: "rgba(220,255,235,0.92)",
  fontWeight: 700,
  cursor: "pointer",
};

const btnStyleSub: React.CSSProperties = {
  ...btnStyle,
  fontWeight: 600,
  opacity: 0.9,
};
