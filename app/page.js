import Link from "next/link";

export default function EntryPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
        color: "#333",
        fontFamily: "sans-serif",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* タイトル */}
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "0.5rem",
          fontWeight: "300",
        }}
      >
        PAUSE
      </h1>

      {/* 入口の一文 */}
      <p
        style={{
          marginBottom: "2rem",
          color: "#666",
        }}
      >
        くつろいでいってください。
      </p>

      {/* 掲示板へのリンク */}
      <Link
        href="/board"
        style={{
          display: "inline-block",
          padding: "12px 32px",
          backgroundColor: "#fff",
          color: "#555",
          textDecoration: "none",
          borderRadius: "30px",
          border: "1px solid #ddd",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
          marginBottom: "32px",
        }}
      >
        掲示板の扉をひらく
      </Link>

      {/* 3つの部屋（文字リンクのみ） */}
      <div style={{ lineHeight: "2" }}>
        <div>
          <span style={{ color: "#777" }}>よってみた</span>
        </div>
        <div>
          <span style={{ color: "#777" }}>
            ぽえむ（言ってもいいのよ）
          </span>
        </div>
        <div>
          <span style={{ color: "#777" }}>
            ちょっと一息（管理人さん）
          </span>
        </div>
      </div>
    </main>
  );
}
