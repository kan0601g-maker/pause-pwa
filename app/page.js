"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [view, setView] = useState("HOUSE"); // HOUSE | PAUSE | STAR

  const bg = "#05070f";
  const card = "#0b1020";
  const border = "rgba(125,211,252,0.35)";
  const text = "#e5e7eb";
  const sub = "#9ca3af";

  const shell = {
    minHeight: "100vh",
    background: bg,
    color: text,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
    padding: 24,
  };

  const frame = {
    maxWidth: 920,
    margin: "0 auto",
    borderRadius: 28,
    border: `2px solid ${border}`,
    background: card,
    padding: 32,
    textAlign: "center",
  };

  const btnBase = {
    padding: "16px 20px",
    borderRadius: 18,
    fontSize: 15,
    cursor: "pointer",
    border: `1px solid ${border}`,
    background: "rgba(255,255,255,0.04)",
    color: text,
  };

  const linkBtn = {
    ...btnBase,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  };

  return (
    <div style={shell}>
      {view === "HOUSE" && (
        <>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div style={{ fontSize: 22, letterSpacing: 4, fontWeight: 700 }}>
              NURU&nbsp;&nbsp;MARKET&nbsp;&nbsp;HOUSE
            </div>
            <div style={{ fontSize: 12, color: sub, marginTop: 6 }}>
              THEME : SPACESHIP
            </div>
          </div>

          <div style={frame}>
            <div style={{ fontSize: 64, marginBottom: 8 }}>👑</div>
            <div style={{ fontSize: 13, letterSpacing: 1 }}>
              Owner&nbsp;Yocchi
            </div>
          </div>

          {/* ボタンゾーン */}
          <div
            style={{
              maxWidth: 720,
              margin: "28px auto 0",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 18,
            }}
          >
            <button style={btnBase} onClick={() => setView("PAUSE")}>
              ☕ PAUSE
            </button>

            <button style={btnBase} onClick={() => setView("STAR")}>
              🌿 STAR LEAF
            </button>

            <Link href="/board" style={linkBtn}>
              🧾 BOARD
            </Link>
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: 18,
              fontSize: 12,
              color: sub,
            }}
          >
            House → Pause / Star Leaf / Board
          </div>
        </>
      )}

      {view === "PAUSE" && (
        <>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div style={{ fontSize: 22, letterSpacing: 4, fontWeight: 700 }}>
              PAUSE
            </div>
            <div style={{ fontSize: 12, color: sub, marginTop: 6 }}>
              quiet entrance
            </div>
          </div>

          <div style={frame}>
            <button
              onClick={() => setView("HOUSE")}
              style={{ ...btnBase, marginBottom: 16 }}
            >
              ← HOUSE
            </button>

            <div style={{ fontSize: 16, marginBottom: 10, color: sub }}>
              くつろいでいってください。
            </div>

            {/* ★ 追加：PAUSE内の導線 */}
            <div
              style={{
                display: "grid",
                gap: 14,
                justifyItems: "center",
                marginTop: 12,
              }}
            >
              <Link href="/board" style={{ ...linkBtn, width: "min(420px, 100%)" }}>
                🧾 BOARD（ひとこと残す）
              </Link>

              <div style={{ width: "min(520px, 100%)", color: sub, fontSize: 12 }}>
                「くつろぐ」→「ひとこと置く」への直行導線
              </div>
            </div>
          </div>
        </>
      )}

      {view === "STAR" && (
        <>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div style={{ fontSize: 22, letterSpacing: 4, fontWeight: 700 }}>
              STAR LEAF
            </div>
            <div style={{ fontSize: 12, color: sub, marginTop: 6 }}>
              scanning zone
            </div>
          </div>

          <div style={frame}>
            <button
              onClick={() => setView("HOUSE")}
              style={{ ...btnBase, marginBottom: 16 }}
            >
              ← HOUSE
            </button>

            <div style={{ fontSize: 16, color: "#22c55e" }}>
              READY.
            </div>
          </div>
        </>
      )}
    </div>
  );
}

