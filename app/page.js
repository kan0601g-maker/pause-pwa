"use client";

import { useState } from "react";
import Link from "next/link";

export default function NuruMarketMaster() {
  const [view, setView] = useState("house");
  const [theme, setTheme] = useState("spaceship");
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  const toggleTheme = () => {
    setTheme((t) => (t === "nordic" ? "spaceship" : "nordic"));
  };

  // 共通：丸いボタン（最小）
  const pillBtn = (extra = {}) => ({
    display: "inline-block",
    padding: "10px 22px",
    backgroundColor: "#fff",
    color: "#555",
    textDecoration: "none",
    borderRadius: "999px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    cursor: "pointer",
    ...extra,
  });

  // 共通：カードボタン
  const cardBtn = (extra = {}) => ({
    padding: "18px",
    borderRadius: "22px",
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.08)",
    cursor: "pointer",
    textAlign: "center",
    userSelect: "none",
    ...extra,
  });

  // =========================
  // VIEW: PAUSE
  // =========================
  if (view === "pause") {
    const roomLinkStyle = {
      color: "#666",
      textDecoration: "none",
      display: "inline-block",
      padding: "6px 10px",
      borderRadius: "10px",
    };

    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f9fa",
          color: "#333",
          fontFamily: "sans-serif",
          padding: "20px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <button
          onClick={() => setView("house")}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            fontSize: "12px",
            color: "#bbb",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          ← HOUSE
        </button>

        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", fontWeight: 300 }}>
          PAUSE
        </h1>

        <p style={{ marginBottom: "2rem", color: "#666" }}>
          くつろいでいってください。
        </p>

        <Link href="/board" style={{ ...pillBtn(), marginBottom: "28px", padding: "12px 32px" }}>
          掲示板の扉をひらく
        </Link>

        <div style={{ lineHeight: 2.2 }}>
          <div>
            <Link href="/rooms/yottemita" style={roomLinkStyle}>
              よってみた
            </Link>
          </div>
          <div>
            <Link href="/rooms/poem" style={roomLinkStyle}>
              ぽえむ（言ってもいいのよ）
            </Link>
          </div>
          <div>
            <Link href="/rooms/manager" style={roomLinkStyle}>
              ちょっと一息（管理人さん）
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // VIEW: STAR LEAF
  // =========================
  if (view === "star-leaf") {
    return (
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#000",
          color: "#22c55e",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          padding: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "980px",
            border: "2px solid #22c55e",
            padding: "32px 20px",
            minHeight: "86vh",
            position: "relative",
          }}
        >
          <header style={{ marginBottom: "48px" }}>
            <h1
              style={{
                fontSize: "44px",
                letterSpacing: "0.45em",
                fontWeight: 900,
                color: "#4ade80",
                margin: 0,
              }}
            >
              STAR LEAF
            </h1>
          </header>

          <button
            onClick={startScan}
            style={{
              width: "280px",
              height: "96px",
              border: "2px solid #4ade80",
              background: "transparent",
              color: "#22c55e",
              fontSize: "18px",
              letterSpacing: "0.2em",
              boxShadow: "0 0 20px rgba(74,222,128,0.45)",
              cursor: "pointer",
            }}
          >
            {isScanning ? "SEARCHING..." : "SCANNING START"}
          </button>

          <button
            onClick={() => setView("house")}
            style={{
              marginTop: "28px",
              fontSize: "12px",
              color: "#facc15",
              textDecoration: "underline",
              fontStyle: "italic",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ヌールマーケットへ戻る &gt;&gt;
          </button>
        </div>
      </main>
    );
  }

  // =========================
  // VIEW: HOUSE (NURU MARKET)
  // =========================
  const houseBg = theme === "nordic" ? "#fff7ed" : "#020617";
  const frameBorder =
    theme === "nordic" ? "rgba(251,146,60,0.35)" : "rgba(14,116,144,0.35)";

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: houseBg,
        color: theme === "nordic" ? "#1c1917" : "#e2e8f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 20px",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      }}
    >
      <header
        style={{
          width: "100%",
          maxWidth: "720px",
          textAlign: "center",
          marginBottom: "18px",
          paddingBottom: "14px",
          borderBottom: `1px solid ${theme === "nordic" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.16)"}`,
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            fontWeight: 900,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontStyle: "italic",
            margin: 0,
            color: theme === "nordic" ? "#1c1917" : "#fff",
          }}
        >
          NURU MARKET HOUSE
        </h1>

        <div style={{ marginTop: "10px" }}>
          <button
            onClick={toggleTheme}
            style={{
              fontSize: "12px",
              border: `1px solid ${frameBorder}`,
              background: "transparent",
              color: theme === "nordic" ? "#7c2d12" : "#7dd3fc",
              padding: "6px 10px",
              borderRadius: "999px",
              cursor: "pointer",
            }}
          >
            THEME: {theme === "nordic" ? "NORDIC" : "SPACESHIP"}
          </button>
        </div>
      </header>

      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          aspectRatio: "16 / 9",
          borderRadius: "42px",
          border: `4px solid ${frameBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 18px 60px rgba(0,0,0,0.25)",
          background: theme === "nordic" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.04)",
        }}
      >
        <div style={{ fontSize: "72px", cursor: "default", transform: "translateY(-2px)" }}>
          👑
          <span
            style={{
              display: "block",
              marginTop: "10px",
              fontSize: "10px",
              fontWeight: 900,
              fontStyle: "italic",
              letterSpacing: "0.18em",
              textAlign: "center",
              opacity: 0.9,
              color: theme === "nordic" ? "#1c1917" : "#fff",
            }}
          >
            Owner Yocchi
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: "28px",
          width: "100%",
          maxWidth: "520px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        <button
          onClick={() => setView("pause")}
          style={cardBtn({
            border: `1px solid ${theme === "nordic" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.22)"}`,
            background: theme === "nordic" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.08)",
            color: theme === "nordic" ? "#1c1917" : "#fff",
          })}
        >
          <div style={{ fontSize: "26px", marginBottom: "8px" }}>☕️</div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.18em",
              fontStyle: "italic",
              textTransform: "uppercase",
            }}
          >
            Pause
          </div>
        </button>

        <button
          onClick={() => setView("star-leaf")}
          style={cardBtn({
            border: "1px solid rgba(16,185,129,0.35)",
            background: "rgba(16,185,129,0.10)",
            color: "#22c55e",
          })}
        >
          <div style={{ fontSize: "26px", marginBottom: "8px" }}>🌿</div>
          <div style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.18em", fontStyle: "italic" }}>
            STAR LEAF
          </div>
        </button>
      </div>

      <div style={{ marginTop: "18px", opacity: 0.65, fontSize: "12px" }}>
        House → Pause / Star Leaf
      </div>
    </main>
  );
}
