// app/my-room/page.js
"use client";

import Link from "next/link";

export default function Page() {
  return (
    <main style={{ minHeight: "100dvh", padding: 18, fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>MY ROOM</h1>

        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: 14,
            borderRadius: 14,
            fontWeight: 800,
            textDecoration: "none",
            border: "2px solid #0f172a",
            boxSizing: "border-box",
            background: "#0f172a",
            color: "#fff",
          }}
        >
          🏠 nuru market（HOUSE）へ戻る
        </Link>
      </div>
    </main>
  );
}
