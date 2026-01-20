export default function Home() {
  const rooms = [
    { title: "ちょっと一息", desc: "書いてもいいし、書かなくてもいい。" },
    { title: "距離の話", desc: "近すぎた/遠すぎた、そんな話を置く場所。" },
    { title: "今日はやり過ごす", desc: "解決しない日。今日はここまででいい。" },
  ];

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: 720 }}>
      <h1 style={{ marginBottom: 8 }}>PAUSE</h1>
      <p style={{ marginTop: 0, marginBottom: 24 }}>気楽にいていい場所</p>

      <p style={{ lineHeight: 1.7, marginBottom: 28 }}>
        書いてもいいし、書かなくてもいい。<br />
        無理に前向きにならなくても大丈夫です。
      </p>

      <div style={{ display: "grid", gap: 12 }}>
        {rooms.map((r) => (
          <a
            key={r.title}
            href="#"
            style={{
              display: "block",
              padding: 16,
              border: "1px solid #ddd",
              borderRadius: 12,
              textDecoration: "none",
              color: "inherit",
            }}
            onClick={(e) => e.preventDefault()}
          >
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
              {r.title}
            </div>
            <div style={{ lineHeight: 1.6 }}>{r.desc}</div>
          </a>
        ))}
      </div>

      <p style={{ marginTop: 28, fontSize: 12, opacity: 0.7 }}>
        ※ MVP：通知なし／いいねなし／評価なし
      </p>
    </main>
  );
}
