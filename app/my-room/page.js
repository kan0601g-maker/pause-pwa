"use client";

import Link from "next/link";

export default function MyRoomPage() {
  const BUILD_TAG = "BUILD_20260123_MYROOM_FIX_01";

  const wrap = {
    minHeight: "100dvh",
    padding: 18,
    boxSizing: "border-box",
    fontFamily: "sans-serif",
    background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
    color: "#0f172a",
  };

  const panel = {
    maxWidth: 560,
    margin: "0 auto",
    borderRadius: 18,
    padding: 16,
    boxSizing: "border-box",
    border: "1px solid rgba(0,0,0,0.1)",
    background: "rgba(255,255,255,0.9)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
  };

  const btn = (variant = "solid") => {
    const common = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      width: "100%",
      padding: "14px",
      borderRadius: 14,
      fontWeight: 800,
      textDecoration: "none",
      cursor: "pointer",
      border: "2px solid",
    };

    if (variant === "ghost") {
      return {
        ...common,
        background: "transparent",
        borderColor: "rgba(15,23,42,0.25)",
        color: "#0f172a",
      };
    }

    return {
      ...common,
      background: "#0f172a",
      borderColor: "#0f172a",
      color: "#fff",
    };
  };

  return (
    <main style={wrap}>
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 40 }}>👑</div>
        <div style={{ fontSize: 20, fontWeight: 900 }}>nuru market</div>
        <div style={{ fontSize: 10, opacity: 0.5 }}>{BUILD_TAG}</div>
      </div>

      <section style={panel}>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ fontWeight: 900, fontSize: 18, textAlign: "left" }}>🏠 MY ROOM</div>
          <div style={{ fontSize: 12, opacity: 0.8, textAlign: "left", lineHeight: 1.6 }}>
            ここは “あなた専用” の部屋（端末内）。
            <br />
            まだメニューだけ置いておくよ。
          </div>

          <Link href="/board" style={btn("ghost")}>
            🧾 BOARD
          </Link>

          <Link href="/rooms/echo" style={btn("ghost")}>
            💬 /rooms/echo（雑談）
          </Link>

          <Link href="/rooms/starleaf" style={btn("ghost")}>
            🌿 /rooms/starleaf（世界観）
          </Link>

          <Link href="/" style={btn()}>
            ← nuru market（HOUSE）へ戻る
          </Link>
        </div>
      </section>
    </main>
  );
}

