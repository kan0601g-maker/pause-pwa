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

  const btnBase = {
    padding: "16px 20px",
    borderRadius: 18,
    fontSize: 15,
    cursor: "pointer",
    border: `1px solid ${border}`,
    background: "rgba(255,255,255,0.04)",
    color: text,
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

          {/* ▼▼ ここがボタンゾーン ▼▼ */}
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

            {/* ★ ここが BOARD */}
            <Link
              href="/board"
              style={{
                ...btnBase,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
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
        <div style={frame}>
          <button
            onClick={() => setView("HOUSE")}
            style={{ ...btnBase, marginBottom: 16 }}
          >
            ← HOUSE
          </button>
          <div style={{ fontSize: 20, marginBottom: 8 }}>PAUSE</div>
          <div style={{ color: sub }}>くつろいでいってください。</div>
        </div>
      )}

      {view === "STAR" && (
        <div style={frame}>
          <button
            onClick={() => setView("HOUSE")}
            style={{ ...btnBase, marginBottom: 16 }}
          >
            ← HOUSE
          </button>
          <div style={{ fontSize: 20, color: "#22c55e" }}>STAR LEAF</div>
        </div>
      )}
    </div>
  );
}

