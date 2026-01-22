// app/page.js
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [screen, setScreen] = useState("HOUSE"); // "HOUSE" | "PAUSE" | "STARLEAF"
  const [houseTheme, setHouseTheme] = useState("Nordic"); // "Nordic" | "Spaceship"

  // STAR LEAF 演出
  const [starleafPhase, setStarleafPhase] = useState("idle"); // "idle" | "scanning" | "ready"

  useEffect(() => {
    if (screen !== "STARLEAF") return;
    setStarleafPhase("scanning");
    const t = setTimeout(() => setStarleafPhase("ready"), 2000);
    return () => clearTimeout(t);
  }, [screen]);

  const theme = useMemo(() => {
    if (screen !== "HOUSE") return "plain";
    return houseTheme;
  }, [screen, houseTheme]);

  const base = {
    minHeight: "100dvh",
    padding: 18,
    boxSizing: "border-box",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  };

  const bg = (() => {
    if (screen === "PAUSE") return { background: "#ffffff", color: "#111827" };
    if (screen === "STARLEAF") return { background: "#050807", color: "#9AF59A" };

    // HOUSE
    if (theme === "Nordic") {
      return {
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
        color: "#0f172a",
      };
    }
    // Spaceship（暗→明るめ調整済み）
    return {
      background:
        "radial-gradient(1200px 600px at 20% 10%, rgba(140,180,255,0.25) 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, #0b1020 0%, #0a0f1a 55%, #0d1424 100%)",
      color: "#e6eefc",
    };
  })();

  const card = {
    maxWidth: 560,
    margin: "0 auto",
  };

  const panel = (() => {
    if (screen === "PAUSE") {
      return {
        border: "1px solid rgba(17, 24, 39, 0.10)",
        background: "#ffffff",
        boxShadow: "0 8px 30px rgba(2, 6, 23, 0.08)",
      };
    }
    if (screen === "STARLEAF") {
      return {
        border: "1px solid rgba(154, 245, 154, 0.18)",
        background: "rgba(10, 20, 16, 0.55)",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.35)",
      };
    }
    // HOUSE
    return {
      border: theme === "Nordic" ? "1px solid rgba(2, 6, 23, 0.10)" : "1px solid rgba(230, 238, 252, 0.12)",
      background:
        theme === "Nordic" ? "rgba(255,255,255,0.78)" : "rgba(12, 18, 36, 0.62)",
      boxShadow: theme === "Nordic" ? "0 10px 30px rgba(2, 6, 23, 0.10)" : "0 10px 40px rgba(0,0,0,0.45)",
      backdropFilter: "blur(8px)",
    };
  })();

  const btn = (variant = "solid") => {
    const isNordic = theme === "Nordic";
    const common = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      width: "100%",
      padding: "12px 14px",
      borderRadius: 14,
      fontWeight: 650,
      letterSpacing: "0.2px",
      textDecoration: "none",
      cursor: "pointer",
      userSelect: "none",
      transition: "transform 0.06s ease, opacity 0.12s ease",
    };

    if (screen === "PAUSE") {
      if (variant === "ghost") {
        return {
          ...common,
          background: "transparent",
          border: "1px solid rgba(17, 24, 39, 0.12)",
          color: "#111827",
        };
      }
      return {
        ...common,
        background: "#111827",
        border: "1px solid #111827",
        color: "#ffffff",
      };
    }

    if (screen === "STARLEAF") {
      if (variant === "ghost") {
        return {
          ...common,
          background: "transparent",
          border: "1px solid rgba(154, 245, 154, 0.22)",
          color: "#9AF59A",
        };
      }
      return {
        ...common,
        background: "rgba(154, 245, 154, 0.10)",
        border: "1px solid rgba(154, 245, 154, 0.30)",
        color: "#9AF59A",
      };
    }

    // HOUSE
    if (variant === "ghost") {
      return {
        ...common,
        background: "transparent",
        border: isNordic ? "1px solid rgba(2, 6, 23, 0.16)" : "1px solid rgba(230, 238, 252, 0.18)",
        color: isNordic ? "#0f172a" : "#e6eefc",
      };
    }
    return {
      ...common,
      background: isNordic ? "#0f172a" : "rgba(230, 238, 252, 0.10)",
      border: isNordic ? "1px solid #0f172a" : "1px solid rgba(230, 238, 252, 0.18)",
      color: isNordic ? "#ffffff" : "#e6eefc",
    };
  };

  const smallLink = {
    textDecoration: "none",
    color: "inherit",
    opacity: 0.9,
  };

  return (
    <main style={{ ...base, ...bg }}>
      <div style={card}>
        <header style={{ textAlign: "center", marginTop: 10, marginBottom: 16 }}>
          <div style={{ fontSize: 34, lineHeight: "34px", marginBottom: 6 }}>👑</div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.4px" }}>
            nuru market
          </div>

          <div style={{ marginTop: 10, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setScreen("HOUSE")}
              style={{
                padding: "8px 10px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.0)",
                background: screen === "HOUSE" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)",
                color: "inherit",
                cursor: "pointer",
                fontWeight: 650,
              }}
            >
              🏠 HOUSE
            </button>
            <button
              onClick={() => setScreen("PAUSE")}
              style={{
                padding: "8px 10px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.0)",
                background: screen === "PAUSE" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)",
                color: "inherit",
                cursor: "pointer",
                fontWeight: 650,
              }}
            >
              ☕ PAUSE
            </button>
            <button
              onClick={() => setScreen("STARLEAF")}
              style={{
                padding: "8px 10px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.0)",
                background: screen === "STARLEAF" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)",
                color: "inherit",
                cursor: "pointer",
                fontWeight: 650,
              }}
            >
              🌿 STAR REEF
            </button>
          </div>
        </header>

        <section
          style={{
            ...panel,
            borderRadius: 18,
            padding: 16,
            boxSizing: "border-box",
          }}
        >
          {screen === "HOUSE" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>🏠 HOUSE</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setHouseTheme("Nordic")}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.0)",
                      background:
                        houseTheme === "Nordic" ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
                      color: "inherit",
                      cursor: "pointer",
                      fontWeight: 650,
                    }}
                  >
                    Nordic（明）
                  </button>
                  <button
                    onClick={() => setHouseTheme("Spaceship")}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.0)",
                      background:
                        houseTheme === "Spaceship" ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
                      color: "inherit",
                      cursor: "pointer",
                      fontWeight: 650,
                    }}
                  >
                    Spaceship（暗）
                  </button>
                </div>
              </div>

              <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                <Link href="/my-room" style={btn()}>
                  🏠 MY ROOM
                </Link>

                <button onClick={() => setScreen("PAUSE")} style={btn()}>
                  ☕ PAUSE
                </button>

                <button onClick={() => setScreen("STARLEAF")} style={btn()}>
                  🌿 STAR REEF
                </button>

                <Link href="/board" style={btn("ghost")}>
                  🧾 BOARD
                </Link>
              </div>

              <div style={{ marginTop: 14, opacity: theme === "Nordic" ? 0.75 : 0.72, fontSize: 12, lineHeight: 1.6 }}>
                <div>・ここは公共の場（マーケット）</div>
                <div>・MY ROOM はあなた専用（端末内）</div>
              </div>
            </>
          )}

          {screen === "PAUSE" && (
            <>
              <div style={{ fontWeight: 850, fontSize: 16 }}>☕ PAUSE（入口）</div>
              <div style={{ marginTop: 8, fontSize: 13, opacity: 0.8, lineHeight: 1.7 }}>
                白背景・静かな入口。ここから各部屋へ。
              </div>

              <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                <Link href="/board" style={btn("ghost")}>
                  🧾 /board
                </Link>

                <Link href="/rooms/yottemita" style={btn("ghost")}>
                  /rooms/yottemita
                </Link>
                <Link href="/rooms/poem" style={btn("ghost")}>
                  /rooms/poem
                </Link>
                <Link href="/rooms/manager" style={btn("ghost")}>
                  /rooms/manager
                </Link>
                <Link href="/rooms/echo" style={btn("ghost")}>
                  /rooms/echo（会話OK）
                </Link>
                <Link href="/rooms/starleaf" style={btn("ghost")}>
                  /rooms/starleaf（世界観・会話OK）
                </Link>

                <button onClick={() => setScreen("HOUSE")} style={btn()}>
                  ← HOUSEへ戻る
                </button>
              </div>
            </>
          )}

          {screen === "STARLEAF" && (
            <>
              <div style={{ fontWeight: 900, fontSize: 16, letterSpacing: "0.6px" }}>🌿 STAR REEF</div>

              <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.7 }}>
                {starleafPhase === "scanning" ? (
                  <div style={{ opacity: 0.92 }}>
                    <div style={{ fontWeight: 850, letterSpacing: "1px" }}>SCANNING START</div>
                    <div style={{ marginTop: 8, opacity: 0.8 }}>
                      ……………
                    </div>
                  </div>
                ) : (
                  <div style={{ opacity: 0.92 }}>
                    <div style={{ fontWeight: 850, letterSpacing: "0.6px" }}>
                      READY
                    </div>
                    <div style={{ marginTop: 6, opacity: 0.8 }}>
                      黒背景・緑文字。ここは演出画面。
                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                <Link href="/rooms/starleaf" style={btn()}>
                  🗣️ STAR REEF を語る部屋へ
                </Link>

                <button onClick={() => setScreen("HOUSE")} style={btn("ghost")}>
                  ヌールマーケット（HOUSE）へ戻る
                </button>
              </div>

              <div style={{ marginTop: 14, fontSize: 12, opacity: 0.72 }}>
                <span style={{ ...smallLink }}>
                  ※ 雑談は /rooms/echo、世界観は /rooms/starleaf
                </span>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

