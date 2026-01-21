import Link from "next/link";

export default function RoomPoem() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        color: "#333",
        fontFamily: "sans-serif",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 300, marginBottom: 12 }}>
          ぽえむ（言ってもいいのよ）
        </h1>

        <p style={{ color: "#666", lineHeight: 1.9, marginTop: 0 }}>
          意味にならなくても、言っていい。<br />
          正しさじゃなくて、ことばのかけらを。<br />
          ここは、静かな言葉の部屋です。
        </p>

        <div
          style={{
            marginTop: 20,
            padding: 16,
            border: "1px solid #ddd",
            borderRadius: 12,
            background: "#fff",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 10 }}>準備中</div>
          <p style={{ margin: 0, color: "#555", lineHeight: 1.8 }}>
            いまは、部屋の空気を整えています。<br />
            言葉が出ない日でも、大丈夫です。
          </p>
        </div>

        <div style={{ marginTop: 28 }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "10px 22px",
              backgroundColor: "#fff",
              color: "#555",
              textDecoration: "none",
              borderRadius: "30px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            入口へ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
