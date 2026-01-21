import Link from "next/link";

export default function RoomManager() {
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
          ちょっと一息（管理人さん）
        </h1>

        <p style={{ color: "#666", lineHeight: 1.9, marginTop: 0 }}>
          今のPAUSEの様子を、そっと置いています。<br />
          ここは「観測・更新」のための部屋です。
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
            いまは、方針と記録の置き場所を整えています。<br />
            更新があるときだけ、静かに追記します。
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
