// app/pause/page.js
import Link from "next/link";

export default function PausePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f7f7",
        color: "#111",
        padding: "48px 24px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div
          style={{
            display: "inline-block",
            fontSize: 12,
            color: "#666",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 999,
            padding: "6px 10px",
          }}
        >
          PAUSE_ROUTE_OK
        </div>

        <h1 style={{ marginTop: 14, fontSize: 30, fontWeight: 900 }}>
          💤 pause
        </h1>

        <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.9, color: "#444" }}>
          ここは休憩ページ。<br />
          何もしなくていい場所。
        </p>

        <div style={{ marginTop: 22 }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#111",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: 999,
              padding: "10px 14px",
              fontSize: 14,
            }}
          >
            ← HOMEへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
