// app/page.js
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const BUILD_TAG = "HOME_ONLY_BUILD_20260123";

  // HOME内テーマ切替のみ（画面遷移はしない）
  const [theme, setTheme] = useState("Nordic"); // Nordic | Spaceship

  const bg =
    theme === "Nordic"
      ? {
          background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
          color: "#0f172a",
        }
      : {
          background:
            "radial-gradient(1200px 600px at 20% 10%, rgba(140,180,255,0.25) 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, #0b1020 0%, #0a0f1a 55%, #0d1424 100%)",
          color: "#e6eefc",
        };

  const panel = {
    width: "100%",
    maxWidth: 560,
    margin: "0 auto",
    borderRadius: 18,
    padding: 16,
    boxSizing: "border-box",
    border:
      theme === "Nordic"
        ? "1px solid rgba(0,0,0,0.1)"
        : "1px solid rgba(255,255,255,0.15)",
    background:
      theme === "Nordic"
        ? "rgba(255,255,255,0.9)"
        : "rgba(12, 18, 36, 0.75)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    backdropFilter: "blur(10px)",
  };

  const btn = (variant = "solid") => {
    const base = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      padding: "14px",
      borderRadius: 14,
      fontWeight: 800,
      textDecoration: "none",
      cursor: "pointer",
      border: "2px solid",
      boxSizing: "border-box",
      userSelect: "none",
    };

    if (variant === "ghost") {
      return {
        ...base,
        background: "transparent",
        borderColor:
          theme === "Nordic" ? "#0f172a" : "rgba(230,238,252,0.4)",
        color: theme === "Nordic" ? "#0f172a" : "#e6eefc",
      };
    }

    return {
      ...base,
      background: theme === "Nordic" ? "#0f172a" : "rgba(230,238,252,0.2)",
      borderColor:
        theme === "Nordic" ? "#0f172a" : "rgba(230,238,252,0.4)",
      color: theme === "Nordic" ? "#ffffff" : "#e6eefc",
    };
  };

  return (
    <main
      style={{
        minHeight: "100dvh",
        padding: 18,
        boxSizing: "border-box",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
        ...bg,
      }}
    >
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        {/* HEADER */}
        <header style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 40 }}>👑</div>
          <div style={{ fontSize: 20, fontWeight: 900 }}>nuru market</div>
          <div style={{ fontSize: 10, opacity: 0.5 }}>{BUILD_TAG}</div>

          {/* THEME */}
          <div
            style={{
              marginTop: 14,
              display: "flex",
              gap: 8,
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setTheme("Nordic")}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid",
                fontWeight: 700,
                background: theme === "Nordic" ? "#000" : "transparent",
                color: theme === "Nordic" ? "#fff" : "inherit",
                cursor: "pointer",
              }}
            >
              Nordic
            </button>
            <button
              onClick={() => setTheme("Spaceship")}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid",
                fontWeight: 700,
                background: theme === "Spaceship" ? "#fff" : "transparent",
                color: theme === "Spaceship" ? "#000" : "inherit",
                cursor: "pointer",
              }}
            >
              Spaceship
            </button>
          </div>
        </header>

        {/* MAIN PANEL */}
        <section style={panel}>
          <div style={{ display: "grid", gap: 14 }}>
            <Link href="/my-room" style={btn()}>
              🏠 MY ROOM
            </Link>

            <Link href="/pause" style={btn()}>
              ☕ PAUSE
            </Link>

            <Link href="/rooms/starleaf" style={btn()}>
              🌿 STAR LEAF
            </Link>

            <Link href="/board" style={btn("ghost")}>
              🧾 BOARD
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
}
