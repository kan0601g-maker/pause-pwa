import Link from "next/link";

export default function StarleafPage() {
  const BUILD_TAG = "STARLEAF_MIN_SAFE_UI_20260123";

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

  // ---- ルート案内（行）共通 ----
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

  const goBtn = {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid rgba(120,255,180,0.28)",
    background: "rgba(0,0,0,0.22)",
    color: "#b9ffd6",
    textDecoration: "none",
    fontSize: 13,
    whiteSpace: "nowrap",
  };

  const note = { fontSize: 12, opacity: 0.7, lineHeight: 1.7 };

  return (
    <main style={page}>
      <div style={wrap}>
        {/* 上部固定メッセージ */}
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
          いまは復旧優先の最小版。演出は次で戻す。
        </p>

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
            ※ このページは「世界観の入口」。戦闘やスキャン演出は Client 化して別ファイルに戻す（安全運用）。
          </div>
        </section>

        {/* ルート案内 */}
        <section style={card}>
          <div style={sectionTitle}>ルート案内</div>

          <div style={{ display: "grid", gap: 10 }}>
            {/* 入口 */}
            <div style={row}>
              <div>
                <div style={rowTitle}>入口・ハブ</div>
                <div style={rowSub}>/</div>
              </div>
              <Link href="/" style={goBtn}>
                開く →
              </Link>
            </div>

            {/* 休憩 */}
            <div style={row}>
              <div>
                <div style={rowTitle}>休憩</div>
                <div style={rowSub}>/pause</div>
              </div>
              <Link href="/pause" style={goBtn}>
                開く →
              </Link>
            </div>

            {/* 雑談 */}
            <div style={row}>
              <div>
                <div style={rowTitle}>雑談</div>
                <div style={rowSub}>/rooms/echo</div>
              </div>
              <Link href="/rooms/echo" style={goBtn}>
                開く →
              </Link>
            </div>

            {/* 個室 */}
            <div style={row}>
              <div>
                <div style={rowTitle}>個室</div>
                <div style={rowSub}>/my-room</div>
              </div>
              <Link href="/my-room" style={goBtn}>
                開く →
              </Link>
            </div>

            {/* 掲示 */}
            <div style={row}>
              <div>
                <div style={rowTitle}>掲示</div>
                <div style={rowSub}>/board</div>
              </div>
              <Link href="/board" style={goBtn}>
                開く →
              </Link>
            </div>

            {/* ★追加：戦闘（タクティクス） */}
            <div style={row}>
              <div>
                <div style={rowTitle}>共鳴フィールド・タクティクス</div>
                <div style={rowSub}>/rooms/starleaf/tactics</div>
              </div>

              <Link href="/rooms/starleaf/tactics" style={goBtn}>
                ▶ 戦闘開始
              </Link>
            </div>
          </div>

          <div style={{ marginTop: 12, ...note }}>迷ったら HOME（入口）に戻る。</div>
        </section>

        {/* 次の復帰 */}
        <section style={card}>
          <div style={sectionTitle}>次の復帰（安全ロードマップ）</div>
          <ol style={{ margin: "0 0 0 18px", padding: 0, lineHeight: 1.8, fontSize: 13, opacity: 0.9 }}>
            <li>CSSだけで雰囲気を整える（今ここ）</li>
            <li>演出・電子文字列は Client Component に分離して追加</li>
            <li>“慈育”の庭（整枝）と、共鳴フィールド拡張</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
