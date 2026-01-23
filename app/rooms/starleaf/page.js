import Link from "next/link";

export default function StarleafPage() {
  const BUILD_TAG = "STARLEAF_WORLD_UI_20260123_GAMESTART";

  const page = {
    minHeight: "100vh",
    background:
      "radial-gradient(900px 520px at 12% 8%, rgba(80,255,160,0.12), transparent 65%), #060a08",
    color: "#d9ffe6",
    padding: "28px 18px 64px",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
  };

  const wrap = { maxWidth: 980, margin: "0 auto" };

  const topBar = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "10px 12px",
    borderRadius: 999,
    border: "1px solid rgba(120,255,180,0.22)",
    background: "rgba(0,0,0,0.25)",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.35) inset",
  };

  const tag = {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(120,255,180,0.18)",
    background: "rgba(0,0,0,0.18)",
    opacity: 0.9,
    whiteSpace: "nowrap",
  };

  const h1 = { margin: "10px 0 0", fontSize: 28, fontWeight: 900, letterSpacing: 0.2 };
  const lead = { margin: "6px 0 0", fontSize: 13, opacity: 0.86, lineHeight: 1.7 };

  const card = {
    marginTop: 16,
    borderRadius: 18,
    border: "1px solid rgba(120,255,180,0.20)",
    background: "rgba(0,0,0,0.28)",
    padding: 16,
    boxShadow: "0 0 0 1px rgba(0,0,0,0.30) inset, 0 18px 60px rgba(0,0,0,0.45)",
  };

  const sectionTitle = { fontSize: 13, fontWeight: 900, margin: "0 0 10px" };

  const grid2 = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  };

  const miniCard = {
    borderRadius: 14,
    border: "1px solid rgba(120,255,180,0.16)",
    background: "rgba(0,0,0,0.18)",
    padding: 12,
  };

  const note = { fontSize: 12, opacity: 0.72, lineHeight: 1.7 };

  const btnPrimary = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    padding: "16px 18px",
    borderRadius: 16,
    border: "1px solid rgba(120,255,180,0.30)",
    background:
      "linear-gradient(180deg, rgba(40,255,140,0.18), rgba(0,0,0,0.18))",
    color: "#dbffe9",
    textDecoration: "none",
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0.2,
    boxShadow:
      "0 0 0 1px rgba(0,0,0,0.35) inset, 0 20px 70px rgba(0,0,0,0.45)",
  };

  const btnGhost = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 12px",
    borderRadius: 999,
    border: "1px solid rgba(120,255,180,0.22)",
    background: "rgba(0,0,0,0.22)",
    color: "#b9ffd6",
    textDecoration: "none",
    fontSize: 13,
    whiteSpace: "nowrap",
  };

  const row = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: "12px 12px",
    borderRadius: 14,
    border: "1px solid rgba(120,255,180,0.16)",
    background: "rgba(0,0,0,0.18)",
  };

  const rowTitle = { fontSize: 14, fontWeight: 900, lineHeight: 1.2 };
  const rowSub = { fontSize: 12, opacity: 0.75, marginTop: 4 };

  return (
    <main style={page}>
      <div style={wrap}>
        {/* 上部バー */}
        <div style={topBar}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: "#4dff9f" }} />
            <div style={{ fontSize: 12, opacity: 0.9, overflow: "hidden", textOverflow: "ellipsis" }}>
              ここは演出・世界観（スター・リーフ）です。HOMEではありません。
            </div>
          </div>
          <div style={tag}>{BUILD_TAG}</div>
        </div>

        <div style={{ marginTop: 12, opacity: 0.85, fontSize: 13 }}>nuru market</div>

        <h1 style={h1}>🍃 銀河戦記：スター・リーフ</h1>
        <p style={lead}>
          宿命の調律師（アーボリスト）たちの物語。<br />
          いまは復旧優先の最小版。まずは戦場へ。
        </p>

        {/* ★ゲーム開始（最優先） */}
        <section style={card}>
          <div style={{ display: "grid", gap: 10 }}>
            <Link href="/rooms/starleaf/tactics" style={btnPrimary}>
              ▶ GAME START（共鳴フィールド・タクティクス）
            </Link>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div style={{ ...note, margin: 0 }}>
                14×14 / 味方3 / 敵4 / 勝利条件：戦意喪失 or 全滅 / 戦利品あり
              </div>

              <Link href="/" style={btnGhost}>
                ← HOME（入口）へ
              </Link>
            </div>
          </div>
        </section>

        {/* 世界観の軸 */}
        <section style={card}>
          <div style={sectionTitle}>世界観の軸</div>

          <div style={grid2}>
            <div style={miniCard}>
              <div style={{ fontSize: 12, opacity: 0.75 }}>広葉樹</div>
              <div style={{ fontSize: 14, fontWeight: 900, marginTop: 6 }}>共生 / 循環 / 慈育</div>
              <div style={{ ...note, marginTop: 6 }}>多様性は、森の強さ。</div>
            </div>

            <div style={miniCard}>
              <div style={{ fontSize: 12, opacity: 0.75 }}>針杉</div>
              <div style={{ fontSize: 14, fontWeight: 900, marginTop: 6 }}>規律 / 直線 / 縫い止め</div>
              <div style={{ ...note, marginTop: 6 }}>単一栽培は、冷たい秩序。</div>
            </div>
          </div>

          <div style={{ marginTop: 12, ...note }}>
            ※ このページは「世界観＋開始ボタン」だけ。生活導線（休憩/個室）は HOME 側に集約する。
          </div>
        </section>

        {/* 最低限の案内（休憩/個室は消す） */}
        <section style={card}>
          <div style={sectionTitle}>最低限の案内</div>

          <div style={{ display: "grid", gap: 10 }}>
            <div style={row}>
              <div>
                <div style={rowTitle}>雑談</div>
                <div style={rowSub}>/rooms/echo</div>
              </div>
              <Link href="/rooms/echo" style={btnGhost}>
                開く →
              </Link>
            </div>

            <div style={row}>
              <div>
                <div style={rowTitle}>掲示</div>
                <div style={rowSub}>/board</div>
              </div>
              <Link href="/board" style={btnGhost}>
                開く →
              </Link>
            </div>
          </div>

          <div style={{ marginTop: 12, ...note }}>※ 休憩・個室はここには置かない（混線防止）。</div>
        </section>
      </div>
    </main>
  );
}
