// app/rooms/starleaf/tactics/page.js
import Link from "next/link";
import TacticsClient from "./tactics-client";

export const metadata = {
  title: "銀河戦記：スター・リーフ / 共鳴フィールド・タクティクス",
};

export default function TacticsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#070b08",
        color: "#d9ffe6",
        padding: "44px 20px",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>STARLEAF / TACTICS</div>
            <h1 style={{ margin: "8px 0 0", fontSize: 26, fontWeight: 900 }}>
              共鳴フィールド・タクティクス（Phase0）
            </h1>
            <p style={{ marginTop: 8, fontSize: 13, opacity: 0.85, lineHeight: 1.7 }}>
              14×14 / 味方3 / 敵4 / WTでターンが回る（移動のみ）
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Link href="/rooms/starleaf" style={btn()}>
              ← スター・リーフへ
            </Link>
            <Link href="/" style={btn("ghost")}>
              HOME
            </Link>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <TacticsClient />
        </div>
      </div>
    </main>
  );
}

function btn(kind) {
  const base = {
    display: "inline-block",
    padding: "10px 12px",
    borderRadius: 999,
    textDecoration: "none",
    fontSize: 13,
    border: "1px solid rgba(120,255,180,0.28)",
    color: "#b9ffd6",
    background: "rgba(0,0,0,0.25)",
  };
  if (kind === "ghost") {
    return { ...base, border: "1px solid rgba(120,255,180,0.18)", opacity: 0.9 };
  }
  return base;
}
