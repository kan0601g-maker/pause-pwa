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
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 900 }}>💤 pause</h1>

        <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.8 }}>
          ここは休憩ページです。<br />
          何もしなくていい場所。
        </p>

        <div style={{ marginTop: 24 }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#111",
              border: "1px solid #ccc",
              padding: "8px 12px",
              borderRadius: 999,
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
