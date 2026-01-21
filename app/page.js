import Link from "next/link";

export default function EntryPage() {
  const roomLinkStyle = {
    color: "#666",
    textDecoration: "none",
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "10px",
  };

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
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", fontWeight: 300 }}>
        PAUSE
      </h1>

      <p style={{ marginBottom: "2rem", color: "#666" }}>
        くつろいでいってください。
      </p>

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
          marginBottom: "28px",
        }}
      >
        掲示板の扉をひらく
      </Link>

      {/* 3つの部屋 */}
      <div style={{ lineHeight: 2.2 }}>
        <div>
          <Link href="/rooms/yottemita" style={roomLinkStyle}>
            よってみた
          </Link>
        </div>
        <div>
          <Link href="/rooms/poem" style={roomLinkStyle}>
            ぽえむ（言ってもいいのよ）
          </Link>
        </div>
        <div>
          <Link href="/rooms/manager" style={roomLinkStyle}>
            ちょっと一息（管理人さん）
          </Link>
        </div>
      </div>
    </main>
  );
}
