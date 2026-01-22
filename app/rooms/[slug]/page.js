"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function RoomSlugPage() {
  const params = useParams();
  const slug = (params?.slug || "").toString();

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

  const allowed = new Set(["yottemita", "poem", "manager"]);
  const known = allowed.has(slug);

  const titleMap = {
    yottemita: "YOTTE MITA",
    poem: "POEM",
    manager: "MANAGER",
  };

  const iconMap = {
    yottemita: "🧱",
    poem: "✒️",
    manager: "🧑‍✈️",
  };

  return (
    <div style={shell}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 22, letterSpacing: 4, fontWeight: 700 }}>
          ROOM
        </div>
        <div style={{ fontSize: 12, color: sub, marginTop: 6 }}>
          THEME : SPACESHIP
        </div>
      </div>

      <div style={frame}>
        <div style={{ fontSize: 12, color: sub }}>ROOM SLUG</div>
        <div style={{ marginTop: 8, fontSize: 26, fontWeight: 700 }}>
          {known ? `${iconMap[slug]} ${titleMap[slug]}` : `🚪 ${slug || "(empty)"}`}
        </div>

        <div style={{ marginTop: 10, color: sub, fontSize: 13 }}>
          {known
            ? "準備中（テンプレ表示）"
            : "この部屋はまだ登録されていません（テンプレ表示）"}
        </div>

        <div style={{ marginTop: 22, display: "grid", gap: 12, justifyItems: "center" }}>
          <Link href="/?view=PAUSE" style={{ ...btn, width: "min(420px, 100%)" }}>
            ← PAUSE に戻る
          </Link>

          <Link href="/board" style={{ ...btn, width: "min(420px, 100%)" }}>
            🧾 BOARD（ひとこと）
          </Link>

          <Link href="/" style={{ ...btn, width: "min(420px, 100%)" }}>
            ← HOUSE
          </Link>
        </div>

        <div style={{ marginTop: 16, color: sub, fontSize: 12 }}>
          ※ rooms はこの1枚で全スラッグ対応（/rooms/xxx を増やすのにファイル追加不要）
        </div>
      </div>
    </div>
  );
}
