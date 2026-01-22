"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [view, setView] = useState("HOUSE");

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

  const btn = {
    padding: "14px 18px",
    borderRadius: 18,
    fontSize: 14,
    cursor: "pointer",
    border: `1px solid ${border}`,
    background: "rgba(255,255,255,0.04)",
    color: text,
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
            <div style={{ fontSize: 13 }}>Owner Yocchi</div>
          </div>

          <div
            style={{
              maxWidth: 720,
              margin: "28px auto 0",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 18,
            }}
          >
            <button style={btn} onClick={() => setView("PAUSE")}>
              ☕ PAUSE
            </button>
            <button style={btn} onClick={() => setView("STAR")}>
              🌿 STAR LEAF
            </button>
            <Link href="/board" style={btn}>
              🧾 BOARD
            </Link>
          </div>
        </>
      )}

      {view === "PAUSE" && (
        <div style={frame}>
          <button onClick={() => setView("HOUSE")} style={btn}>
            ← HOUSE
          </button>

          <div style={{ marginTop: 18, fontSize: 20 }}>PAUSE</div>
          <div style={{ marginTop: 6, color: sub }}>
            くつろいでいってください。
          </div>

          {/* ★ ここが追加ポイント */}
          <div style={{ marginTop: 22 }}>
            <Link href="/board" style={btn}>
              🧾 BOARD（ひとこと残す）
            </Link>
          </div>
        </div>
      )}

      {view === "STAR" && (
        <div style={frame}>
          <button onClick={() => setView("HOUSE")} style={btn}>
            ← HOUSE
          </button>
          <div style={{ marginTop: 18, color: "#22c55e" }}>
            STAR LEAF
          </div>
        </div>
      )}
    </div>
  );
}

