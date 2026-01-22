// app/my-room/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyRoomPage() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    try {
      const key = "nuru_points";
      const raw = localStorage.getItem(key);

      if (raw === null) {
        localStorage.setItem(key, "0");
        setPoints(0);
        return;
      }

      const n = Number(raw);
      setPoints(Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0);
    } catch {
      // localStorage が使えない環境でも落ちないように
      setPoints(0);
    }
  }, []);

  const base = {
    minHeight: "100dvh",
    padding: 18,
    boxSizing: "border-box",
    background: "linear-gradient(180deg, #0b1020 0%, #0a0f1a 55%, #0d1424 100%)",
    color: "#e6eefc",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  };

  const wrap = {
    maxWidth: 560,
    margin: "0 auto",
  };

  const panel = {
    borderRadius: 18,
    padding: 16,
    boxSizing: "border-box",
    border: "1px solid rgba(230, 238, 252, 0.14)",
    background: "rgba(12, 18, 36, 0.62)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.45)",
    backdropFilter: "blur(8px)",
  };

  const btn = (variant = "solid") => {
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
    };
    if (variant === "ghost") {
      return {
        ...common,
        background: "transparent",
        border: "1px solid rgba(230, 238, 252, 0.18)",
        color: "#e6eefc",
      };
    }
    return {
      ...common,
      background: "rgba(230, 238, 252, 0.10)",
      border: "1px solid rgba(230, 238, 252, 0.18)",
      color: "#e6eefc",
    };
  };

  return (
    <main style={base}>
      <div style={wrap}>
        <header style={{ textAlign: "center", marginTop: 10, marginBottom: 16 }}>
          <div style={{ fontSize: 28, lineHeight: "28px", marginBottom: 6 }}>🏠</div>
          <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: "0.4px" }}>MY ROOM</div>
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>
            ここは、誰にも見せなくていい場所。
          </div>
        </header>

        <section style={panel}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
            <div style={{ fontWeight: 900, fontSize: 14, opacity: 0.9 }}>NURU POINT</div>
            <div style={{ fontWeight: 950, fontSize: 20, letterSpacing: "0.3px" }}>
              {points.toLocaleString("ja-JP")} <span style={{ fontSize: 14, fontWeight: 800, opacity: 0.9 }}>pt</span>
            </div>
          </div>

          <div style={{ marginTop: 14, opacity: 0.72, fontSize: 12, lineHeight: 1.7 }}>
            ※ いまは「表示だけ」。発生条件や使い道は後で決められる器。
          </div>

          {/* テーブル（空） */}
          <div style={{ marginTop: 18 }}>
            <div style={{ fontWeight: 850, fontSize: 13, opacity: 0.92 }}>TABLE</div>
            <div
              style={{
                marginTop: 10,
                borderRadius: 16,
                border: "1px solid rgba(230, 238, 252, 0.14)",
                background:
                  "linear-gradient(180deg, rgba(245, 222, 179, 0.18) 0%, rgba(139, 69, 19, 0.18) 100%)",
                padding: 14,
              }}
            >
              <div
                style={{
                  height: 140,
                  borderRadius: 14,
                  border: "1px dashed rgba(230, 238, 252, 0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: 12,
                  boxSizing: "border-box",
                  opacity: 0.85,
                }}
              >
                <div>
                  <div style={{ fontWeight: 850 }}>まだ、何も置かれていない。</div>
                  <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>それでいい。</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
            <Link href="/" style={btn()}>
              ← nuru market（HOUSE）へ戻る
            </Link>
            <Link href="/board" style={btn("ghost")}>
              🧾 BOARD を見る
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
