"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

export default function Page() {
  const BUILD_TAG = "BUILD_20260123_STARLEAF_LABEL_FIX";

  const [screen, setScreen] = useState("HOUSE");
  const [houseTheme, setHouseTheme] = useState("Nordic");

  const [starleafPhase, setStarleafPhase] = useState("idle");
  const [crawlKey, setCrawlKey] = useState(0);

  const tOpenRef = useRef(null);
  const tReadyRef = useRef(null);

  const clearStarleafTimers = () => {
    if (tOpenRef.current) clearTimeout(tOpenRef.current);
    if (tReadyRef.current) clearTimeout(tReadyRef.current);
    tOpenRef.current = null;
    tReadyRef.current = null;
  };

  function goScreen(next) {
    clearStarleafTimers();
    setStarleafPhase("idle");
    setScreen(next);
  }

  const theme = useMemo(
    () => (screen !== "HOUSE" ? "plain" : houseTheme),
    [screen, houseTheme]
  );

  const bg = (() => {
    if (screen === "PAUSE") return { background: "#ffffff", color: "#111827" };
    if (screen === "STARLEAF") return { background: "#050807", color: "#9AF59A" };
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
  })();

  const panelStyle = {
    maxWidth: 560,
    margin: "0 auto",
    borderRadius: 18,
    padding: 16,
    boxSizing: "border-box",
    border: "1px solid rgba(0,0,0,0.1)",
    background: "rgba(255,255,255,0.9)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
  };

  /** 🔴 ここが修正ポイント */
  const btn = (variant = "solid") => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "14px",
    borderRadius: 14,
    fontWeight: 700,
    textDecoration: "none",
    cursor: "pointer",
    border: "2px solid #0f172a",
    boxSizing: "border-box", // ← これが無いと必ずはみ出す
    background: variant === "ghost" ? "#fff" : "#0f172a",
    color: variant === "ghost" ? "#0f172a" : "#fff",
  });

  const topTabStyle = (active) => ({
    padding: "10px 16px",
    borderRadius: 999,
    fontWeight: 700,
    cursor: "pointer",
    border: "2px solid #0f172a",
    background: active ? "#0f172a" : "transparent",
    color: active ? "#fff" : "#0f172a",
  });

  return (
    <main
      style={{
        minHeight: "100dvh",
        padding: 18,
        fontFamily: "sans-serif",
        boxSizing: "border-box",
        ...bg,
      }}
    >
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 40 }}>👑</div>
          <div style={{ fontSize: 20, fontWeight: 900 }}>nuru market</div>
          <div style={{ fontSize: 10, opacity: 0.5 }}>{BUILD_TAG}</div>

          <div
            style={{
              marginTop: 15,
              display: "flex",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <button onClick={() => goScreen("HOUSE")} style={topTabStyle(screen === "HOUSE")}>
              🏠 HOUSE
            </button>
            <button onClick={() => goScreen("PAUSE")} style={topTabStyle(screen === "PAUSE")}>
              ☕ PAUSE
            </button>
            <button onClick={() => goScreen("STARLEAF")} style={topTabStyle(screen === "STARLEAF")}>
              🌿 STAR LEAF
            </button>
          </div>
        </header>

        <section style={panelStyle}>
          {screen === "HOUSE" && (
            <div style={{ display: "grid", gap: 15 }}>
              <div style={{ fontWeight: 900 }}>THEME</div>

              <Link href="/my-room" style={btn()}>
                🏠 MY ROOM
              </Link>
              <button onClick={() => goScreen("PAUSE")} style={btn()}>
                ☕ PAUSE
              </button>
              <button onClick={() => goScreen("STARLEAF")} style={btn()}>
                🌿 STAR LEAF
              </button>
              <Link href="/board" style={btn("ghost")}>
                🧾 BOARD
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

