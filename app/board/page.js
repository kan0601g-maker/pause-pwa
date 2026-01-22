"use client";

import React from "react";
import Link from "next/link";

export default function BoardPage() {
  const bg = "#ffffff";
  const fg = "#111111";
  const border = "#e5e7eb";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        color: fg,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: fg,
              border: `1px solid ${border}`,
              padding: "8px 12px",
              borderRadius: 10,
              fontSize: 14,
            }}
          >
            ← HOUSE
          </Link>
        </div>

        <div
          style={{
            marginTop: 18,
            border: `2px solid ${fg}`,
            borderRadius: 16,
            padding: 18,
            background: "#fff",
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 700 }}>
            ✅ BOARD DEPLOY CHECK (APP)
          </div>
          <div style={{ marginTop: 8, fontSize: 16, color: "#374151" }}>
            PIN-V3
          </div>
          <div style={{ marginTop: 14, fontSize: 13, color: "#6b7280" }}>
            これが表示されれば、本番は <b>app/board/page.js</b> を読めています。
          </div>
        </div>

        <div style={{ marginTop: 16, color: "#6b7280", fontSize: 12 }}>
          表示確認URL：<br />
          <b>https://pause-pwa.vercel.app/board?v=APPTEST</b>
        </div>
      </div>
    </div>
  );
}

