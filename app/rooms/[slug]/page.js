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

  // --- poem専用（この部屋だけ“育てる”） ---
  const isPoem = slug === "poem";

  const title = isPoem
    ? "ぽえむ（言ってもいいのよ）"
    : known
    ? `ROOM: ${slug}`
    : `ROOM: ${slug || "(empty)"}`;

  const leadLines = isPoem
    ? [
        "意味にならなくても、言っていい。",
        "正しさじゃなくて、ことばのかけらを。",
        "ここは、静かな言葉の部屋です。",
      ]
    : known
    ? ["準備中（テンプレ表示）"]
    : ["この部屋はまだ登録されていません（テンプレ表示）"];

  const cardTitle = isPoem ? "準備中" : known ? "準備中" : "未登録";
  const cardBody = isPoem
    ? ["いまは、部屋の空気を整えています。", "言葉が出ない日でも、大丈夫です。"]
    : known
    ? ["いまは、部屋を準備しています。"]
    : ["このslugはまだ登録されていません。"];

  // poemは白背景の静かな部屋に寄せる（スクショの雰囲気）
  const poemShell = {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#111111",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
    padding: 24,
  };

  const poemWrap = {
    maxWidth: 860,
    margin: "0 auto",
    padding: "24px 18px",
  };

  const poemCard = {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 18,
    background: "#ffffff",
    textAlign: "left",
  };

  const poemBtn = {
    border: "1px solid #e5e7eb",
    borderRadius: 999,
    padding: "10px 16px",
    background: "#ffffff",
    color: "#111111",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 14,
  };

  // --- poemページ（白テーマ） ---
  if (isPoem) {
    return (
      <div style={poemShell}>
        <div style={poemWrap}>
          <div style={{ textAlign: "left", marginTop: 12 }}>
            <div style={{ fontSize: 32, fontWeight: 700 }}>{title}</div>

            <div style={{ marginTop: 14, lineHeight: 1.9, color: "#374151" }}>
              {leadLines.map((t, i) => (
                <div key={i}>{t}</div>
              ))}
            </div>

            <div style={{ marginTop: 22, ...poemCard }}>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>{cardTitle}</div>
              {cardBody.map((t, i) => (
                <div key={i} style={{ marginTop: i ? 8 : 0, color: "#374151" }}>
                  {t}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 18 }}>
              <Link href="/?view=PAUSE" style={poemBtn}>
                入口へ戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- その他のrooms（宇宙船テーマ） ---
  const iconMap = { yottemita: "🧱", manager: "🧑‍✈️" };
  const titleMap = { yottemita: "YOTTE MITA", manager: "MANAGER" };

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
          {known ? `${iconMap[slug] || "🚪"} ${titleMap[slug] || slug}` : `🚪 ${slug || "(empty)"}`}
        </div>

        <div style={{ marginTop: 10, color: sub, fontSize: 13 }}>
          {leadLines[0]}
        </div>

        <div style={{ marginTop: 18, border: `1px solid ${border}`, borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>{cardTitle}</div>
          {cardBody.map((t, i) => (
            <div key={i} style={{ marginTop: i ? 6 : 0, color: sub, fontSize: 13 }}>
              {t}
            </div>
          ))}
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
          ※ poem は白テーマ、他は宇宙船テーマ（段階的に育てる）
        </div>
      </div>
    </div>
  );
}
