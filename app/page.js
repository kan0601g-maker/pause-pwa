// app/page.js
export default function HomePage() {
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
      {/* 中央寄せの本体 */}
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "48px 24px",
        }}
      >
        {/* ★反映確認タグ（これが見えたら成功） */}
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
          HOME_HUB_INLINE_BUILD_20260123
        </div>

        <header style={{ marginTop: 14, marginBottom: 28 }}>
          <div style={{ fontSize: 14, color: "#666" }}>nuru market</div>

          <h1 style={{ margin: "10px 0 0", fontSize: 30, fontWeight: 800 }}>
            HOME（入口・ハブ）
          </h1>

          <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.75, color: "#444" }}>
            ここは入口です。下の部屋を選んで移動してください。<br />
            ※ STAR LEAF は演出専用で、HOMEではありません。
          </p>
        </header>

        <section style={{ display: "grid", gap: 14 }}>
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
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
                <div style={{ fontSize: 24, width: 34, textAlign: "center" }}>{it.icon}</div>
                <div>
                  <div style={{ fontWeight: 800 }}>{it.title}</div>
                  <div style={{ fontSize: 14, color: "#555", marginTop: 2 }}>{it.desc}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>{it.href}</div>
                </div>
              </div>
            </a>
          ))}
        </section>

        <footer
          style={{
            marginTop: 34,
            padding: 16,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 16,
            fontSize: 14,
            color: "#444",
          }}
        >
          <div style={{ fontWeight: 800, color: "#111" }}>運用ルール</div>
          <ul style={{ marginTop: 10, paddingLeft: 20, lineHeight: 1.7 }}>
            <li>HOME（/）はリンク集だけ（演出・stateは持たせない）</li>
            <li>演出は rooms 配下で自己完結</li>
            <li>迷ったら必ず HOME に戻る</li>
          </ul>
        </footer>
      </div>
    </main>
  );
}
