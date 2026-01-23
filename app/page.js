// app/page.js
import Link from "next/link";

export default function HomePage() {
  const items = [
    {
      href: "/pause",
      title: "pause",
      desc: "休憩・呼吸を整える",
      icon: "💤",
    },
    {
      href: "/rooms/starleaf",
      title: "STAR LEAF",
      desc: "演出・世界観（別ページ）",
      icon: "🍃",
    },
    {
      href: "/my-room",
      title: "my-room",
      desc: "個室（作業・整理）",
      icon: "🏠",
    },
    {
      href: "/rooms/echo",
      title: "echo",
      desc: "雑談・ログ",
      icon: "💬",
    },
    {
      href: "/board",
      title: "board",
      desc: "掲示・共有",
      icon: "📌",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        color: "#111",
        padding: "48px 24px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* ビルド確認タグ（残しても消してもOK） */}
        <div
          style={{
            display: "inline-block",
            fontSize: 12,
            color: "#666",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 999,
            padding: "6px 10px",
            marginBottom: 12,
          }}
        >
          HOME_HUB_SAFE_BUILD
        </div>

        <header style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, color: "#666" }}>nuru market</div>

          <h1 style={{ marginTop: 8, fontSize: 30, fontWeight: 900 }}>
            HOME（入口・ハブ）
          </h1>

          <p
            style={{
              marginTop: 12,
              fontSize: 14,
              lineHeight: 1.8,
              color: "#444",
            }}
          >
            ここは入口です。下の部屋を選んで移動してください。
            <br />
            ※ STAR LEAF は演出専用で、HOMEではありません。
          </p>
        </header>

        <section style={{ display: "grid", gap: 14 }}>
          {items.map((item) => (
            <HubItem
              key={item.href}
              icon={item.icon}
              title={item.title}
              href={item.href}
              description={item.desc}
            />
          ))}
        </section>

        <footer
          style={{
            marginTop: 36,
            padding: 16,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 16,
            fontSize: 14,
            color: "#444",
          }}
        >
          <div style={{ fontWeight: 900, color: "#111" }}>運用ルール</div>
          <ul style={{ marginTop: 10, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>HOME（/）はリンク集だけ（演出・stateは持たせない）</li>
            <li>演出は rooms 配下で自己完結</li>
            <li>迷ったら必ず HOME に戻る</li>
          </ul>
        </footer>
      </div>
    </main>
  );
}

function HubItem({ icon, title, href, description }) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        textDecoration: "none",
        color: "#111",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ fontSize: 24, width: 34, textAlign: "center" }}>
          {icon}
        </div>

        <div>
          <div style={{ fontWeight: 900 }}>{title}</div>
          <div style={{ fontSize: 14, color: "#555" }}>{description}</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
            {href}
          </div>
        </div>
      </div>
    </Link>
  );
}
