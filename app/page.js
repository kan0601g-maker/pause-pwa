// app/page.js
import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        color: "#111",
      }}
    >
      {/* 中央カラム（これが効いてないと全部ダメ） */}
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "48px 24px",
        }}
      >
        {/* ヘッダー */}
        <header style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "14px", color: "#666" }}>
            nuru market
          </div>

          <h1
            style={{
              marginTop: "8px",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            HOME（入口・ハブ）
          </h1>

          <p
            style={{
              marginTop: "12px",
              fontSize: "14px",
              lineHeight: "1.7",
              color: "#444",
            }}
          >
            ここは入口です。下の部屋を選んで移動してください。<br />
            ※ STAR LEAF は演出専用で、HOMEではありません。
          </p>
        </header>

        {/* リンク一覧 */}
        <section style={{ display: "grid", gap: "16px" }}>
          <HubItem
            icon="💤"
            title="pause"
            href="/pause"
            description="休憩・呼吸を整える"
          />
          <HubItem
            icon="🍃"
            title="STAR LEAF"
            href="/rooms/starleaf"
            description="演出・世界観（別ページ）"
          />
          <HubItem
            icon="🏠"
            title="my-room"
            href="/my-room"
            description="個室（作業・整理）"
          />
          <HubItem
            icon="💬"
            title="echo"
            href="/rooms/echo"
            description="雑談・ログ"
          />
          <HubItem
            icon="📌"
            title="board"
            href="/board"
            description="掲示・共有"
          />
        </section>

        {/* フッター */}
        <footer
          style={{
            marginTop: "40px",
            padding: "16px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "12px",
            fontSize: "14px",
            color: "#444",
          }}
        >
          <strong>運用ルール</strong>
          <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
            <li>HOME（/）はリンク集だけ</li>
            <li>演出は rooms 配下で自己完結</li>
            <li>迷ったら必ず HOME に戻る</li>
          </ul>
        </footer>
      </div>
    </main>
  );
}

/* ===== 部品 ===== */

function HubItem({ icon, title, href, description }) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        textDecoration: "none",
        color: "#111",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "14px",
        padding: "16px",
      }}
    >
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <div style={{ fontSize: "24px" }}>{icon}</div>
        <div>
          <div style={{ fontWeight: "bold" }}>{title}</div>
          <div style={{ fontSize: "14px", color: "#555" }}>
            {description}
          </div>
          <div style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>
            {href}
          </div>
        </div>
      </div>
    </Link>
  );
}
