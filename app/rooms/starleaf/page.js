// app/rooms/starleaf/page.js
export default function StarleafHome() {
  return (
    <main style={{ padding: 28, fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif", maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ margin: "0 0 10px" }}>STAR LEAF</h1>
      <p style={{ margin: "0 0 18px", opacity: 0.85 }}>
        銀河〜のプロローグ（ここに戻す）
      </p>

      <section style={{ padding: 16, borderRadius: 12, border: "1px solid rgba(0,0,0,.12)", background: "rgba(0,0,0,.03)", marginBottom: 18 }}>
        <h2 style={{ margin: "0 0 8px", fontSize: 18 }}>プロローグ</h2>
        <p style={{ margin: 0, lineHeight: 1.7 }}>
          （ここに以前の“銀河〜”の文章を貼る）
        </p>
      </section>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a href="/rooms/starleaf/tactics" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(0,0,0,.18)", textDecoration: "none" }}>
          Tactics（Phase0）
        </a>
        <a href="/rooms/starleaf/battle" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(0,0,0,.18)", textDecoration: "none" }}>
          Battle
        </a>
        <a href="/rooms/starleaf/tactics/phase1" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(0,0,0,.18)", textDecoration: "none" }}>
          Phase1
        </a>
      </div>
    </main>
  );
}
