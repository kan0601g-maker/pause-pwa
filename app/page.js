// app/page.js
export default function HomePage() {
  const BUILD_TAG = "HOME_HUB_INLINE_BUILD_20260123";

  const items = [
    { href: "/pause", title: "pause", desc: "休憩・呼吸を整える", icon: "💤" },
    { href: "/rooms/starleaf", title: "STAR LEAF", desc: "演出・世界観（別ページ）", icon: "🍃" },
    { href: "/my-room", title: "my-room", desc: "個室（作業・整理）", icon: "🏠" },
    { href: "/rooms/echo", title: "echo", desc: "雑談・ログ", icon: "💬" },
    { href: "/board", title: "board", desc: "掲示・共有", icon: "📌" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        color: "#111",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "44px 24px 64px",
        }}
      >
        {/* 開発中だけ表示したいタグ（必要ならこのブロックを丸ごと消してOK） */}
        <div
          style={{
            display: "inline-block",
            fontSize: 12,
            color: "#666",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 999,
            padding: "6px 10px",
            marginBottom: 10,
          }}
          title="deploy確認用"
        >
          {BUILD_TAG}
        </div>

        <header style={{ marginBottom: 26 }}>
          <div style={{ fontSize: 14, color: "#666" }}>nuru market</div>

          <h1
            style={{
              margin: "10px 0 0",
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: "0.2px",
            }}
          >
            HOME（入口・ハブ）
          </h1>

          <p
            style={{
              marginTop: 12,
              fontSize: 14,
              lineHeight: 1.85,
              color: "#444",
            }}
          >
            ここは入口です。下の部屋を選んで移動してください。<br />
            ※ <strong>STAR LEAF は演出専用</strong>で、HOMEではありません。
          </p>
        </header>

        <section style={{ display: "grid", gap: 14 }}>
          {items.map((it) => (
            <HubItem
              key={it.href}
              icon={it.icon}
              title={it.title}
              href={it.href}
              description={it.desc}
            />
          ))}
        </section>

        <footer
          style={{
            marginTop: 34,
            padding: 18,
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
  // クリック感を付ける（CSS無しでOK）
  const base = {
    display: "block",
    textDecoration: "none",
    color: "#111",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 16,
    padding: 16,
    transition: "transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease",
    boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
  };

  const hover = {
    transform: "translateY(-1px)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    borderColor: "#cfcfcf",
  };

  const active = {
    transform: "translateY(0px) scale(0.998)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  };

  return (
    <a
      href={href}
      style={base}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, hover)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, base)}
      onMouseDown={(e) => Object.assign(e.currentTarget.style, active)}
      onMouseUp={(e) => Object.assign(e.currentTarget.style, hover)}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ fontSize: 24, width: 34, textAlign: "center" }}>{icon}</div>

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
          <div style={{ fontSize: 14, color: "#555", marginTop: 2 }}>
            {description}
          </div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>{href}</div>
        </div>

        <div style={{ fontSize: 14, color: "#666" }}>開く →</div>
      </div>
    </a>
  );
}
