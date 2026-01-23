// app/rooms/starleaf/page.js
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Page() {
  const BUILD_TAG = "ROOM_STARLEAF_FULL_20260123";

  // 演出フェーズ
  // idle -> opening -> scanning -> ready
  const [phase, setPhase] = useState("idle");
  const [crawlKey, setCrawlKey] = useState(0);

  // timers
  const tOpenRef = useRef(null);
  const tReadyRef = useRef(null);

  // WebAudio
  const audioCtxRef = useRef(null);
  const playingRef = useRef(false);

  const OPENING_MS = 9500; // 8〜12秒帯
  const SCANNING_MS = 2000;

  const openingLines = [
    "遠い遠い、静かな海の底。",
    "光の届かない場所で、芽吹きは始まった。",
    "",
    "STAR LEAF —— それは“語り”が育つ森。",
    "言葉が、潮のように満ち引きする場所。",
    "",
    "あなたは今、入口に立っている。",
    "始めるのは、いつでもいい。",
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

      window.setTimeout(() => stopTheme(), OPENING_MS + 200);
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

  useEffect(() => {
    return () => {
      clearTimers();
      stopTheme();
    };
  }, []);

  const bg = useMemo(
    () => ({
      background: "#050807",
      color: "#9AF59A",
    }),
    []
  );

  const panelStyle = {
    maxWidth: 720,
    margin: "0 auto",
    borderRadius: 18,
    padding: 18,
    boxSizing: "border-box",
    overflow: "hidden",
    border: "1px solid rgba(154, 245, 154, 0.25)",
    background: "rgba(10, 18, 16, 0.70)",
    boxShadow: "0 12px 48px rgba(0,0,0,0.35)",
    backdropFilter: "blur(10px)",
  };

  const btn = (variant = "solid") => {
    const common = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      width: "100%",
      padding: "14px 16px",
      borderRadius: 14,
      fontWeight: 900,
      textDecoration: "none",
      cursor: "pointer",
      border: "2px solid",
      boxSizing: "border-box",
      lineHeight: 1.1,
    };

    return {
      ...common,
      background: variant === "ghost" ? "transparent" : "rgba(154, 245, 154, 0.18)",
      borderColor: "rgba(154, 245, 154, 0.55)",
      color: "#9AF59A",
    };
  };

  return (
    <main style={{ minHeight: "100dvh", padding: 18, boxSizing: "border-box", fontFamily: "sans-serif", ...bg }}>
      <style>{`
        @keyframes crawlUp {
          0%   { transform: translateY(80%);  opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-120%); opacity: 0; }
        }
      `}</style>

      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 44 }}>🌿</div>
          <div style={{ fontSize: 22, fontWeight: 1000, letterSpacing: 0.5 }}>STAR LEAF ROOM</div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>{BUILD_TAG}</div>
        </header>

        <section style={panelStyle}>
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontWeight: 1000, fontSize: 14, opacity: 0.95 }}>入口デッキ</div>

            {/* 省略ゼロ：常時表示 */}
            <button onClick={startOpening} style={btn()}>
              ▶ テロップ開始（BGM）
            </button>
            <button onClick={() => setPhase("idle")} style={btn("ghost")}>
              ⏹ リセット（IDLE）
            </button>

            {phase === "opening" && (
              <div
                style={{
                  height: 260,
                  background: "#000",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 15,
                  border: "2px solid rgba(154,245,154,0.9)",
                }}
              >
                <div
                  key={crawlKey}
                  style={{
                    position: "absolute",
                    width: "100%",
                    textAlign: "center",
                    color: "#F6D34A",
                    animation: `crawlUp ${OPENING_MS}ms linear forwards`,
                    padding: 18,
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ fontSize: 20, fontWeight: 1000 }}>EPISODE: NEW BREATH</div>
                  <div style={{ marginTop: 16, fontSize: 14, lineHeight: 1.75 }}>
                    {openingLines.map((l, i) => (
                      <div key={i}>{l || <br />}</div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={skipToScanning}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "rgba(154,245,154,0.25)",
                    color: "#9AF59A",
                    border: "1px solid rgba(154,245,154,0.8)",
                    borderRadius: 10,
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontWeight: 1000,
                  }}
                >
                  SKIP
                </button>
              </div>
            )}

            {phase === "scanning" && (
              <div style={{ textAlign: "center", padding: 20, border: "1px solid rgba(154,245,154,0.35)", borderRadius: 14 }}>
                📡 SCANNING...
              </div>
            )}

            {phase === "ready" && (
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ textAlign: "center", fontWeight: 1000 }}>✅ READY</div>
                <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.6, textAlign: "center" }}>
                  ここが「スターリーフの部屋」。
                  <br />
                  （デッキが消えてたのは “省略コードで空ページ” になってたから）
                </div>
              </div>
            )}

            {phase === "idle" && (
              <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.6 }}>
                黒背景・緑文字。ここはスターリーフの部屋。
                <br />
                下のボタンでヌルマーケットへ戻れる。
              </div>
            )}

            <Link href="/" style={btn("ghost")}>
              🏠 ヌルマーケット（/）へ戻る
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
