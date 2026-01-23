// app/my-room/page.js
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function Page() {
  const BUILD_TAG = "MYROOM_LAYOUT_FIX_20260123";

  const [theme, setTheme] = useState("Nordic"); // "Nordic" | "Spaceship"

  const bg = useMemo(() => {
    if (theme === "Nordic") {
      return {
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
        color: "#0f172a",
      };
    }
    return {
      background:
        "radial-gradient(1200px 600px at 20% 10%, rgba(140,180,255,0.25) 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, #0b1020 0%, #0a0f1a 55%, #0d1424 100%)",
      color: "#e6eefc",
    };
  }, [theme]);

  const page = {
    minHeight: "100dvh",
    padding: 18,
    boxSizing: "border-box",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    ...bg,
  };

  const panel = {
    width: "100%",
    maxWidth: 560,
    margin: "0 auto",
    borderRadius: 18,
    padding: 16,
    boxSizing: "border-box",
    overflow: "hidden",
    border: theme === "Nordic" ? "1px solid rgba(0,0,0,0.10)" : "1px solid rgba(255,255,255,0.15)",
    background: theme === "Nordic" ? "rgba(255,255,255,0.92)" : "rgba(12, 18, 36, 0.75)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
    backdropFilter: "blur(10px)",
  };

  const pillBtn = (active) => ({
    padding: "6px 12px",
    borderRadius: 10,
    border: "1px solid",
    cursor: "pointer",
    fontWeight: 800,
    background: active ? (theme === "Nordic" ? "#0f172a" : "#e6eefc") : "transparent",
    color: active ? (theme === "Nordic" ? "#fff" : "#0b1020") : "inherit",
  });

  const bigBtn = (variant = "solid") => {
    const base = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      width: "100%",
      boxSizing: "border-box", // ★はみ出し対策
      padding: "14px 14px",
      borderRadius: 14,
      fontWeight: 800,
      textDecoration: "none",
      cursor: "pointer",
      border: "2px solid",
      whiteSpace: "normal",
      lineHeight: 1.2,
    };

    if (variant === "ghost") {
      return {
        ...base,
        background: "transparent",
        borderColor: theme === "Nordic" ? "rgba(15,23,42,0.35)" : "rgba(230,238,252,0.35)",
        color: theme === "Nordic" ? "#0f172a" : "#e6eefc",
      };
    }

    // solid
    return {
      ...base,
      background: theme === "Nordic" ? "#0f172a" : "rgba(230, 238, 252, 0.18)",
      borderColor: theme === "Nordic" ? "#0f172a" : "rgba(230, 238, 252, 0.45)",
      color: theme === "Nordic" ? "#fff" : "#e6eefc",
    };
  };

  return (
    <main style={page}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 40 }}>👑</div>
          <div style={{ fontSize: 20, fontWeight: 900 }}>MY ROOM</div>
          <div style={{ fontSize: 10, opacity: 0.55, marginTop: 6 }}>{BUILD_TAG}</div>
        </header>

        <section style={panel}>
          <div style={{ display: "grid", gap: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
              <div style={{ fontWeight: 900 }}>THEME</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setTheme("Nordic")} style={pillBtn(theme === "Nordic")}>
                  Nordic
                </button>
                <button onClick={() => setTheme("Spaceship")} style={pillBtn(theme === "Spaceship")}>
                  Spaceship
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              <Link href="/" style={bigBtn()}>
                🏠 ヌルマーケット（HOUSE）へ戻る
              </Link>

              <Link href="/board" style={bigBtn("ghost")}>
                🧾 BOARD
              </Link>

              <Link href="/rooms/echo" style={bigBtn("ghost")}>
                💬 /rooms/echo
              </Link>

              <Link href="/rooms/starleaf" style={bigBtn("ghost")}>
                🌿 /rooms/starleaf
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
