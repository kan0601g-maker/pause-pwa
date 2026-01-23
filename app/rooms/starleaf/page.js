// app/rooms/starleaf/page.js
import Link from "next/link";

export default function StarleafPage() {
  const BUILD_TAG = "STARLEAF_MIN_SAFE_UI_20260123";

  return (
    <main style={s.page}>
      {/* うっすら背景（CSSのみ） */}
      <div style={s.bgGlow} aria-hidden />
      <div style={s.bgVignette} aria-hidden />

      {/* 左上：HOMEへ戻る（固定） */}
      <div style={s.topLeft}>
        <Link href="/" style={s.backBtn}>
          ← HOME（入口）へ戻る
        </Link>
      </div>

      {/* 本文 */}
      <div style={s.wrap}>
        {/* 上部バナー：ここはHOMEじゃない */}
        <div style={s.notice}>
          <span style={s.noticeDot} />
          <span>
            ここは <b>演出・世界観</b>（スター・リーフ）です。HOMEではありません。
          </span>
          <span style={s.tag}>{BUILD_TAG}</span>
        </div>

        {/* タイトル */}
        <header style={s.header}>
          <div style={s.brand}>nuru market</div>

          <div style={s.h1row}>
            <span style={s.leafIcon} aria-hidden>
              🍃
            </span>
            <h1 style={s.h1}>銀河戦記：スター・リーフ</h1>
          </div>

          <p style={s.lead}>
            宿命の調律師（アーボリスト）たちの物語。
            <br />
            いまは <b>復旧優先の最小版</b>。演出は次で戻す。
          </p>
        </header>

        {/* セクション：世界観サマリ（静的） */}
        <section style={s.card}>
          <div style={s.cardTitle}>世界観の軸</div>

          <div style={s.grid}>
            <div style={s.pill}>
              <div style={s.pillTop}>広葉樹</div>
              <div style={s.pillMain}>共生 / 循環 / 慈育</div>
              <div style={s.pillSub}>多様性は、森の強さ。</div>
            </div>

            <div style={s.pill}>
              <div style={s.pillTop}>黒杉</div>
              <div style={s.pillMain}>規律 / 直線 / 縫い止め</div>
              <div style={s.pillSub}>単一栽培は、冷たい秩序。</div>
            </div>
          </div>

          <div style={s.hr} />

          <div style={s.small}>
            ※ このページは「世界観の入口」。戦闘やスキャン演出は
            <b> Client化して別ファイルへ隔離</b>して戻す（安全運用）。
          </div>
        </section>

        {/* ルート案内（誤認防止） */}
        <section style={s.card}>
          <div style={s.cardTitle}>ルート案内</div>

          <div style={s.routes}>
            <RouteRow label="入口・ハブ" href="/" />
            <RouteRow label="休憩" href="/pause" />
            <RouteRow label="雑談" href="/rooms/echo" />
            <RouteRow label="個室" href="/my-room" />
            <RouteRow label="掲示" href="/board" />
          </div>

          <div style={s.hint}>
            迷ったら <b>HOME（入口）</b> に戻る。
          </div>
        </section>

        {/* 下部：次の復帰方針（静的） */}
        <footer style={s.footer}>
          <div style={s.footerTitle}>次の復帰（安全ロードマップ）</div>
          <ol style={s.ol}>
            <li>CSSだけで雰囲気を整える（今ここ）</li>
            <li>演出・音・スキャンは Client Component に隔離して追加</li>
            <li>“慈育”の庭（整枝）と、共鳴フィールドへ拡張</li>
          </ol>
        </footer>
      </div>
    </main>
  );
}

function RouteRow({ label, href }) {
  return (
    <div style={r.row}>
      <div style={r.left}>
        <div style={r.label}>{label}</div>
        <div style={r.path}>{href}</div>
      </div>
      <Link href={href} style={r.go}>
        開く →
      </Link>
    </div>
  );
}

/* ---------------- styles (CSS-in-JS / no events) ---------------- */

const s = {
  page: {
    minHeight: "100vh",
    background: "#070b08",
    color: "#d9ffe6",
    padding: "44px 20px",
    position: "relative",
    overflow: "hidden",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
  },
  bgGlow: {
    position: "absolute",
    inset: -200,
    background:
      "radial-gradient(circle at 30% 20%, rgba(60, 255, 150, 0.18), transparent 45%), radial-gradient(circle at 70% 60%, rgba(80, 200, 255, 0.10), transparent 55%)",
    filter: "blur(18px)",
    pointerEvents: "none",
  },
  bgVignette: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 50% 30%, transparent 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.82) 100%)",
    pointerEvents: "none",
  },
  topLeft: {
    position: "fixed",
    top: 14,
    left: 14,
    zIndex: 10,
  },
  backBtn: {
    display: "inline-block",
    padding: "10px 12px",
    borderRadius: 999,
    border: "1px solid rgba(120, 255, 180, 0.32)",
    background: "rgba(0,0,0,0.35)",
    color: "#b9ffd6",
    textDecoration: "none",
    fontSize: 13,
    letterSpacing: 0.2,
    backdropFilter: "blur(6px)",
  },
  wrap: {
    position: "relative",
    maxWidth: 920,
    margin: "0 auto",
  },
  notice: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
    border: "1px solid rgba(120, 255, 180, 0.26)",
    background: "rgba(0,0,0,0.25)",
    borderRadius: 14,
    padding: "12px 14px",
    color: "#b9ffd6",
    fontSize: 13,
    marginBottom: 22,
    backdropFilter: "blur(6px)",
  },
  noticeDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    background: "rgba(120, 255, 180, 0.95)",
    boxShadow: "0 0 18px rgba(120,255,180,0.45)",
  },
  tag: {
    marginLeft: "auto",
    fontSize: 12,
    opacity: 0.75,
    border: "1px solid rgba(120,255,180,0.20)",
    padding: "4px 8px",
    borderRadius: 999,
    whiteSpace: "nowrap",
  },
  header: {
    marginBottom: 18,
  },
  brand: {
    fontSize: 14,
    color: "rgba(210,255,230,0.70)",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  h1row: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  leafIcon: {
    fontSize: 26,
    filter: "drop-shadow(0 0 14px rgba(120,255,180,0.25))",
  },
  h1: {
    margin: 0,
    fontSize: 34,
    fontWeight: 900,
    letterSpacing: 0.4,
    color: "#d9ffe6",
    textShadow: "0 0 20px rgba(120,255,180,0.12)",
  },
  lead: {
    marginTop: 10,
    marginBottom: 0,
    lineHeight: 1.8,
    color: "rgba(210,255,230,0.78)",
    fontSize: 14,
  },
  card: {
    border: "1px solid rgba(120, 255, 180, 0.22)",
    background: "rgba(0,0,0,0.28)",
    borderRadius: 18,
    padding: "16px 16px",
    marginTop: 14,
    backdropFilter: "blur(8px)",
  },
  cardTitle: {
    fontWeight: 900,
    letterSpacing: 0.3,
    marginBottom: 12,
    color: "#d9ffe6",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 12,
  },
  pill: {
    border: "1px solid rgba(120,255,180,0.18)",
    background: "rgba(0,0,0,0.22)",
    borderRadius: 14,
    padding: 14,
  },
  pillTop: {
    fontSize: 12,
    opacity: 0.78,
    marginBottom: 6,
  },
  pillMain: {
    fontWeight: 900,
    marginBottom: 6,
  },
  pillSub: {
    fontSize: 13,
    opacity: 0.78,
    lineHeight: 1.6,
  },
  hr: {
    height: 1,
    background: "rgba(120,255,180,0.18)",
    margin: "14px 0",
  },
  small: {
    fontSize: 13,
    lineHeight: 1.75,
    opacity: 0.82,
  },
  routes: {
    display: "grid",
    gap: 10,
  },
  hint: {
    marginTop: 12,
    fontSize: 13,
    opacity: 0.85,
  },
  footer: {
    marginTop: 18,
    border: "1px solid rgba(120,255,180,0.18)",
    background: "rgba(0,0,0,0.20)",
    borderRadius: 18,
    padding: 16,
  },
  footerTitle: {
    fontWeight: 900,
    marginBottom: 10,
  },
  ol: {
    margin: 0,
    paddingLeft: 18,
    lineHeight: 1.85,
    fontSize: 13,
    opacity: 0.85,
  },
};

const r = {
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "12px 12px",
    borderRadius: 14,
    border: "1px solid rgba(120,255,180,0.18)",
    background: "rgba(0,0,0,0.18)",
  },
  left: {
    display: "grid",
    gap: 2,
  },
  label: {
    fontWeight: 900,
  },
  path: {
    fontSize: 12,
    opacity: 0.78,
  },
  go: {
    textDecoration: "none",
    color: "#b9ffd6",
    border: "1px solid rgba(120,255,180,0.26)",
    padding: "8px 10px",
    borderRadius: 999,
    fontSize: 13,
    background: "rgba(0,0,0,0.18)",
    whiteSpace: "nowrap",
  },
};
