"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [view, setView] = useState("HOUSE"); // HOUSE | PAUSE | STAR
  const [theme, setTheme] = useState("NORDIC"); // NORDIC | SPACESHIP
  const [scanning, setScanning] = useState(false);
  const [scanMsg, setScanMsg] = useState("");

  const T = useMemo(() => {
    if (theme === "SPACESHIP") {
      return {
        pageBg: "#0b1020",
        cardBg: "#111a33",
        text: "#e5e7eb",
        sub: "#9ca3af",
        border: "rgba(255,255,255,0.12)",
        btnBg: "#1f2a4d",
        btnText: "#e5e7eb",
        accent: "#7dd3fc",
      };
    }
    // NORDIC
    return {
      pageBg: "#f7f8fb",
      cardBg: "#ffffff",
      text: "#111111",
      sub: "#6b7280",
      border: "#e5e7eb",
      btnBg: "#111827",
      btnText: "#ffffff",
      accent: "#2563eb",
    };
  }, [theme]);

  useEffect(() => {
    if (!scanning) return;
    setScanMsg("SCANNING...");
    const t1 = setTimeout(() => setScanMsg("SCANNING... 50%"), 900);
    const t2 = setTimeout(() => setScanMsg("SCANNING COMPLETE."), 2000);
    const t3 = setTimeout(() => setScanning(false), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [scanning]);

  const shell = {
    minHeight: "100vh",
    background: T.pageBg,
    color: T.text,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    padding: 16,
  };

  const card = {
    maxWidth: 760,
    margin: "0 auto",
    border: `1px solid ${T.border}`,
    borderRadius: 18,
    padding: 18,
    background: T.cardBg,
    boxShadow:
      theme === "SPACESHIP"
        ? "0 10px 30px rgba(0,0,0,0.35)"
        : "0 10px 30px rgba(17,24,39,0.08)",
  };

  const topRow = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  };

  const pillBtn = {
    border: `1px solid ${T.border}`,
    background: "transparent",
    color: T.text,
    padding: "8px 12px",
    borderRadius: 999,
    fontSize: 13,
    cursor: "pointer",
  };

  const primaryBtn = {
    border: "none",
    background: T.btnBg,
    color: T.btnText,
    padding: "12px 14px",
    borderRadius: 14,
    fontSize: 14,
    cursor: "pointer",
    width: "100%",
  };

  const secondaryBtn = {
    border: `1px solid ${T.border}`,
    background: "transparent",
    color: T.text,
    padding: "12px 14px",
    borderRadius: 14,
    fontSize: 14,
    cursor: "pointer",
    width: "100%",
  };

  const linkBtn = {
    textDecoration: "none",
    display: "block",
    textAlign: "center",
    border: `1px solid ${T.border}`,
    background: "transparent",
    color: T.text,
    padding: "12px 14px",
    borderRadius: 14,
    fontSize: 14,
  };

  function ThemeToggle() {
    return (
      <button
        style={pillBtn}
        onClick={() => setTheme((t) => (t === "NORDIC" ? "SPACESHIP" : "NORDIC"))}
        title="Theme toggle"
      >
        Theme: {theme === "NORDIC" ? "Nordic" : "Spaceship"}
      </button>
    );
  }

  return (
    <div style={shell}>
      <div style={card}>
        {/* 共通ヘッダー */}
        <div style={topRow}>
          <div style={{ fontSize: 13, color: T.sub }}>
            PAUSE / ヌールマーケットPWA
          </div>
          <ThemeToggle />
        </div>

        {/* 画面 */}
        {view === "HOUSE" && (
          <div>
            <div style={{ fontSize: 42, lineHeight: 1, marginBottom: 8 }}>👑</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
              HOUSE
            </div>
            <div style={{ color: T.sub, fontSize: 14, marginBottom: 16 }}>
              Owner <span style={{ color: T.accent, fontWeight: 700 }}>Yocchi</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 10,
                maxWidth: 420,
              }}
            >
              <button style={primaryBtn} onClick={() => setView("PAUSE")}>
                ☕ Pause
              </button>

              <button style={secondaryBtn} onClick={() => setView("STAR")}>
                🌿 STAR LEAF
              </button>

              {/* ★ 追加：/board 直行導線 */}
              <Link href="/board" style={linkBtn}>
                🧾 BOARD（掲示板）
              </Link>
            </div>

            <div style={{ marginTop: 16, color: T.sub, fontSize: 12 }}>
              ※ /board は別ページとして動作（端末内保存）
            </div>
          </div>
        )}

        {view === "PAUSE" && (
          <div>
            <button
              style={pillBtn}
              onClick={() => setView("HOUSE")}
              title="Back to HOUSE"
            >
              ← HOUSE
            </button>

            <div style={{ marginTop: 14, fontSize: 20, fontWeight: 700 }}>
              PAUSE
            </div>
            <div style={{ marginTop: 6, color: T.sub, fontSize: 14 }}>
              くつろいでいってください。
            </div>

            <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
              <Link href="/board" style={linkBtn}>
                /board
              </Link>
              <Link href="/rooms/yottemita" style={linkBtn}>
                /rooms/yottemita
              </Link>
              <Link href="/rooms/poem" style={linkBtn}>
                /rooms/poem
              </Link>
              <Link href="/rooms/manager" style={linkBtn}>
                /rooms/manager
              </Link>
            </div>
          </div>
        )}

        {view === "STAR" && (
          <div
            style={{
              background: "#000000",
              color: "#22c55e",
              borderRadius: 16,
              padding: 16,
              border: `1px solid ${T.border}`,
            }}
          >
            <button
              style={{
                ...pillBtn,
                border: `1px solid rgba(34,197,94,0.45)`,
                color: "#22c55e",
              }}
              onClick={() => setView("HOUSE")}
            >
              ← HOUSE
            </button>

            <div style={{ marginTop: 12, fontSize: 18, fontWeight: 800 }}>
              STAR LEAF
            </div>

            <button
              onClick={() => setScanning(true)}
              disabled={scanning}
              style={{
                marginTop: 12,
                width: "100%",
                border: "1px solid rgba(34,197,94,0.45)",
                background: "transparent",
                color: "#22c55e",
                padding: "12px 14px",
                borderRadius: 14,
                cursor: scanning ? "not-allowed" : "pointer",
                fontSize: 14,
              }}
            >
              SCANNING START
            </button>

            <div style={{ marginTop: 10, fontSize: 13, opacity: 0.9 }}>
              {scanning ? scanMsg : scanMsg || "READY."}
            </div>

            <div style={{ marginTop: 14 }}>
              <Link
                href="/"
                style={{
                  display: "inline-block",
                  color: "#22c55e",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(34,197,94,0.6)",
                  paddingBottom: 2,
                }}
              >
                ヌールマーケットへ戻る
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

