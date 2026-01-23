// app/rooms/starleaf/page.js
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function StarleafPage() {
  const BUILD_TAG = "STARLEAF_ROUTE_BUILD_20260123_BTN_AND_CRAWL";

  // idle -> opening -> scanning -> ready
  const [phase, setPhase] = useState("idle");
  const [crawlKey, setCrawlKey] = useState(0);

  const tOpenRef = useRef(null);
  const tReadyRef = useRef(null);

  // WebAudio
  const audioCtxRef = useRef(null);
  const playingRef = useRef(false);

  const OPENING_MS = 9500; // 8〜12秒
  const SCANNING_MS = 2000;

  const openingLines = [
    "遠い昔、遥か彼方の山奥で…",
    "",
    "スギ帝国はクローン杉を増殖させ、",
    "花粉デス・クラウドで銀河を覆った。",
    "",
    "広葉樹同盟軍は、澄んだ空気を取り戻すため",
    "ザ・オキシゲンの力を信じ、抵抗を続けている。",
    "",
    "今、コマンダーのスマート・セーバーが唸りを上げる…",
  ];

  const clearTimers = () => {
    if (tOpenRef.current) {
      clearTimeout(tOpenRef.current);
      tOpenRef.current = null;
    }
    if (tReadyRef.current) {
      clearTimeout(tReadyRef.current);
      tReadyRef.current = null;
    }
  };

  const stopTheme = () => {
    try {
      playingRef.current = false;
      const ctx = audioCtxRef.current;
      if (ctx && ctx.state === "running") ctx.suspend();
    } catch {}
  };

  const playTheme = () => {
    try {
      if (playingRef.current) return;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioContext();
      audioCtxRef.current = ctx;

      if (ctx.state === "suspended") ctx.resume();
      playingRef.current = true;

      const master = ctx.createGain();
      master.gain.value = 0.06;
      master.connect(ctx.destination);

      const startAt = ctx.currentTime + 0.02;

      const makeTone = (freq, t, dur, type = "sine", gain = 0.9) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type;
        o.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g);
        g.connect(master);
        o.start(t);
        o.stop(t + dur + 0.02);
      };

      // それっぽい簡易パターン（完全オリジナル）
      const pattern = [
        { f: 440, dt: 0.0, d: 0.28, type: "sawtooth", g: 0.55 },
        { f: 330, dt: 0.32, d: 0.38, type: "sawtooth", g: 0.55 },
        { f: 392, dt: 0.78, d: 0.26, type: "sawtooth", g: 0.5 },
        { f: 110, dt: 0.0, d: 0.55, type: "triangle", g: 0.35 },
        { f: 98, dt: 0.62, d: 0.55, type: "triangle", g: 0.35 },
      ];

      const loopLen = 1.2;
      const loops = Math.ceil(OPENING_MS / 1000 / loopLen);
      for (let i = 0; i < loops; i++) {
        const baseT = startAt + i * loopLen;
        for (const p of pattern) makeTone(p.f, baseT + p.dt, p.d, p.type, p.g);
      }

      window.setTimeout(() => stopTheme(), OPENING_MS + 250);
    } catch {}
  };

  const startOpening = () => {
    clearTimers();
    setPhase("opening");
    setCrawlKey((v) => v + 1);
    playTheme();

    tOpenRef.current = setTimeout(() => setPhase("scanning"), OPENING_MS);
    tReadyRef.current = setTimeout(() => {
      setPhase("ready");
      stopTheme();
    }, OPENING_MS + SCANNING_MS);
  };

  const skipToScanning = () => {
    clearTimers();
    stopTheme();
    setPhase("scanning");
    tReadyRef.current = setTimeout(() => setPhase("ready"), SCANNING_MS);
  };

  const gameStart = () => {
    // いまは「ゲーム開始＝readyへ」(後で本体へ差し替え)
    clearTimers();
    stopTheme();
    setPhase("scanning");
    tReadyRef.current = setTimeout(() => setPhase("ready"), SCANNING_MS);
  };

  useEffect(() => {
    return () => {
      clearTimers();
      stopTheme();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = {
    background: "#050807",
    color: "#9AF59A",
    minHeight: "100dvh",
    padding: 18,
    boxSizing: "border-box",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  };

  const panel = {
    width: "100%",
    maxWidth: 720,
    margin: "0 auto",
    borderRadius: 18,
    padding: 18,
    boxSizing: "border-box",
    overflow: "hidden",
    border: "1px solid rgba(154, 245, 154, 0.18)",
    background: "rgba(10, 16, 14, 0.62)",
    boxShadow: "0 12px 48px rgba(0,0,0,0.45)",
    backdropFilter: "blur(10px)",
  };

  const btn = (variant = "solid") => {
    const base = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      width: "100%",
      boxSizing: "border-box", // ←はみ出し対策の本体
      padding: "14px 14px",
      borderRadius: 14,
      fontWeight: 800,
      textDecoration: "none",
      cursor: "pointer",
      border: "2px solid",
      userSelect: "none",
      whiteSpace: "normal",
      lineHeight: 1.2,
    };

    if (variant === "ghost") {
      return {
        ...base,
        background: "transparent",
        borderColor: "rgba(154, 245, 154, 0.35)",
        color: "#9AF59A",
      };
    }

    return {
      ...base,
      background: "rgba(154, 245, 154, 0.18)",
      borderColor: "rgba(154, 245, 154, 0.55)",
      color: "#9AF59A",
    };
  };

  return (
    <main style={page}>
      <style>{`
        @keyframes crawlUp {
          0%   { transform: translateY(85%); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(-140%); opacity: 0; }
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: 760, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 40 }}>👑</div>
          <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: 0.4 }}>nuru market</div>
          <div style={{ fontSize: 10, opacity: 0.55, marginTop: 6 }}>{BUILD_TAG}</div>
        </header>

        <section style={panel}>
          <div style={{ display: "grid", gap: 14 }}>
            <div style={{ display: "grid", gap: 6 }}>
              <div style={{ fontWeight: 900, fontSize: 18 }}>🌿 STAR LEAF</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>黒背景・緑文字。ここは演出画面。</div>
            </div>

            {/* ここは常に出る */}
            <div style={{ display: "grid", gap: 10 }}>
              <button onClick={startOpening} style={btn()}>
                ▶ テロップ開始（音楽つき）
              </button>

              <button onClick={gameStart} style={btn("ghost")}>
                🎮 ゲーム開始
              </button>

              {/* ★戻れない対策：hrefは "/"（HOME）固定。必要なら "?view=HOUSE" に変えてOK */}
              <Link href="/" style={btn("ghost")}>
                🏠 ヌルマーケット（HOUSE）へ戻る
              </Link>
            </div>

            {phase === "opening" && (
              <div
                style={{
                  height: 280,
                  background: "#000",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 16,
                  border: "2px solid rgba(154, 245, 154, 0.65)",
                }}
              >
                <div
                  key={crawlKey}
                  style={{
                    position: "absolute",
                    inset: 0,
                    textAlign: "center",
                    color: "#F6D34A",
                    padding: 22,
                    animation: `crawlUp ${OPENING_MS}ms linear forwards`,
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: 0.6 }}>
                    EPISODE / NEW BREATH
                  </div>
                  <div style={{ marginTop: 18, fontSize: 14, lineHeight: 1.75 }}>
                    {openingLines.map((l, i) => (
                      <div key={i}>{l ? l : <br />}</div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={skipToScanning}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "rgba(154,245,154,0.20)",
                    color: "#9AF59A",
                    border: "1px solid rgba(154,245,154,0.55)",
                    borderRadius: 10,
                    padding: "7px 12px",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  SKIP
                </button>
              </div>
            )}

            {phase === "scanning" && (
              <div style={{ textAlign: "center", padding: "18px 10px" }}>📡 SCANNING...</div>
            )}

            {phase === "ready" && (
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ textAlign: "center", fontWeight: 900 }}>✅ READY</div>

                <Link href="/rooms/echo" style={btn()}>
                  🗣️ STAR LEAF を語る部屋へ（仮：/rooms/echo）
                </Link>
              </div>
            )}

            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>
              ※ 雑談は /rooms/echo、世界観は /rooms/starleaf（このページ）
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

