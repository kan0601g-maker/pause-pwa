// app/page.js
"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

export default function Page() {
  const [screen, setScreen] = useState("HOUSE"); // "HOUSE" | "PAUSE" | "STARLEAF"
  const [houseTheme, setHouseTheme] = useState("Nordic"); // "Nordic" | "Spaceship"

  // STAR REEF: idle -> opening -> scanning -> ready
  const [starreefPhase, setStarreefPhase] = useState("idle");
  const [crawlKey, setCrawlKey] = useState(0);

  // タイマー管理
  const tOpenRef = useRef(null);
  const tReadyRef = useRef(null);

  // 音（WebAudio）管理
  const audioCtxRef = useRef(null);
  const playingRef = useRef(false);

  const OPENING_MS = 9500; // テロップ時間（8〜12秒内）
  const SCANNING_MS = 2000;

  const clearStarreefTimers = () => {
    if (tOpenRef.current) {
      clearTimeout(tOpenRef.current);
      tOpenRef.current = null;
    }
    if (tReadyRef.current) {
      clearTimeout(tReadyRef.current);
      tReadyRef.current = null;
    }
  };

  // かんたんBGM（ボタン押下で再生される＝自動再生規制を回避）
  const playTheme = () => {
    try {
      if (playingRef.current) return;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioContext();
      audioCtxRef.current = ctx;

      // iOS/Safari対策：resumedが必要な場合
      if (ctx.state === "suspended") ctx.resume();

      playingRef.current = true;

      const master = ctx.createGain();
      master.gain.value = 0.06; // 音量（小さめ）
      master.connect(ctx.destination);

      // “それっぽい”二音＋ベースの短いループ（OPENING_MSくらいで止める）
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

      // ループパターン（約1.2秒）
      const pattern = [
        // lead
        { f: 440, dt: 0.0, d: 0.28, type: "sawtooth", g: 0.55 },
        { f: 330, dt: 0.32, d: 0.38, type: "sawtooth", g: 0.55 },
        { f: 392, dt: 0.78, d: 0.26, type: "sawtooth", g: 0.50 },
        // bass
        { f: 110, dt: 0.0, d: 0.55, type: "triangle", g: 0.35 },
        { f: 98, dt: 0.62, d: 0.55, type: "triangle", g: 0.35 },
      ];

      const loopLen = 1.2;
      const loops = Math.ceil((OPENING_MS / 1000) / loopLen);

      for (let i = 0; i < loops; i++) {
        const baseT = startAt + i * loopLen;
        for (const p of pattern) {
          makeTone(p.f, baseT + p.dt, p.d, p.type, p.g);
        }
      }

      // 自動停止（OPENING_MS + 少し）
      window.setTimeout(() => stopTheme(), OPENING_MS + 200);
    } catch {
      // 音が出ない環境でも動作は続ける
    }
  };

  const stopTheme = () => {
    try {
      playingRef.current = false;
      const ctx = audioCtxRef.current;
      // ここでcloseまでやると次回が重いので、suspendで十分
      if (ctx && ctx.state === "running") ctx.suspend();
    } catch {
      // ignore
    }
  };

  // ▶ テロップ開始（音楽付き）
  const startOpening = () => {
    clearStarreefTimers();

    // opening開始
    setStarreefPhase("opening");
    setCrawlKey((v) => v + 1);

    // 音スタート（ユーザー操作起点）
    playTheme();

    // opening終了→scanning→ready
    tOpenRef.current = setTimeout(() => {
      setStarreefPhase("scanning");
    }, OPENING_MS);

    tReadyRef.current = setTimeout(() => {
      setStarreefPhase("ready");
      stopTheme();
    }, OPENING_MS + SCANNING_MS);
  };

  // スキップ：scanningへ（音は止める）
  const skipToScanning = () => {
    clearStarreefTimers();
    stopTheme();
    setStarreefPhase("scanning");
    tReadyRef.current = setTimeout(() => setStarreefPhase("ready"), SCANNING_MS);
  };

  const theme = useMemo(() => {
    if (screen !== "HOUSE") return "plain";
    return houseTheme;
  }, [screen, houseTheme]);

  const base = {
    minHeight: "100dvh",
    padding: 18,
    boxSizing: "border-box",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  };

  const bg = (() => {
    if (screen === "PAUSE") return { background: "#ffffff", color: "#111827" };
    if (screen === "STARLEAF") return { background: "#050807", color: "#9AF59A" };

    if (theme === "Nordic") {
      return {
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
        color: "#0f172a",
      };
    }
    return {
      background:
        "radial-gradient(1200px 600px at 20% 10%, rgba(140,180,255,0.25) 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, #0b1020 0%, #0a0f1a 55%, #0d1424 100%)",
      color: "#e6eefc",
    };
  })();

  const card = { maxWidth: 560, margin: "0 auto" };

  const panel = (() => {
    if (screen === "PAUSE") {
      return {
        border: "1px solid rgba(17, 24, 39, 0.10)",
        background: "#ffffff",
        boxShadow: "0 8px 30px rgba(2, 6, 23, 0.08)",
      };
    }
    if (screen === "STARLEAF") {
      return {
        border: "1px solid rgba(154, 245, 154, 0.18)",
        background: "rgba(10, 20, 16, 0.55)",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.35)",
      };
    }
    return {
      border:
        theme === "Nordic"
          ? "1px solid rgba(2, 6, 23, 0.10)"
          : "1px solid rgba(230, 238, 252, 0.12)",
      background:
        theme === "Nordic"
          ? "rgba(255,255,255,0.78)"
          : "rgba(12, 18, 36, 0.62)",
      boxShadow:
        theme === "Nordic"
          ? "0 10px 30px rgba(2, 6, 23, 0.10)"
          : "0 10px 40px rgba(0,0,0,0.45)",
      backdropFilter: "blur(8px)",
    };
  })();

  const E = ({ children }) => (
    <span
      style={{
        display: "inline-flex",
        width: 18,
        justifyContent: "center",
        alignItems: "center",
        lineHeight: 1,
        transform: "translateY(0.5px)",
      }}
    >
      {children}
    </span>
  );

  const btn = (variant = "solid") => {
    const isNordic = theme === "Nordic";
    const common = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      width: "100%",
      padding: "12px 14px",
      borderRadius: 14,
      fontWeight: 650,
      letterSpacing: "0.2px",
      textDecoration: "none",
      cursor: "pointer",
      userSelect: "none",
      lineHeight: 1,
      boxSizing: "border-box",
    };

    if (screen === "PAUSE") {
      if (variant === "ghost")
        return { ...common, background: "transparent", border: "1px solid rgba(17, 24, 39, 0.12)", color: "#111827" };
      return { ...common, background: "#111827", border: "1px solid #111827", color: "#ffffff" };
    }

    if (screen === "STARLEAF") {
      if (variant === "ghost")
        return { ...common, background: "transparent", border: "1px solid rgba(154, 245, 154, 0.22)", color: "#9AF59A" };
      return { ...common, background: "rgba(154, 245, 154, 0.10)", border: "1px solid rgba(154, 245, 154, 0.30)", color: "#9AF59A" };
    }

    if (variant === "ghost")
      return { ...common, background: "transparent", border: isNordic ? "1px solid rgba(2, 6, 23, 0.16)" : "1px solid rgba(230, 238, 252, 0.18)", color: isNordic ? "#0f172a" : "#e6eefc" };

    return { ...common, background: isNordic ? "#0f172a" : "rgba(230, 238, 252, 0.10)", border: isNordic ? "1px solid #0f172a" : "1px solid rgba(230, 238, 252, 0.18)", color: isNordic ? "#ffffff" : "#e6eefc" };
  };

  const topTabStyle = (active) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.0)",
    background: active ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)",
    color: "inherit",
    cursor: "pointer",
    fontWeight: 650,
    lineHeight: 1,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
  });

  const themeBtnStyle = (active) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "8px 10px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.0)",
    background: active ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
    color: "inherit",
    cursor: "pointer",
    fontWeight: 650,
    lineHeight: 1,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
  });

  const openingLines = [
    "遠い昔、",
    "遥か彼方の山奥で――",
    "",
    "スギ帝国は春の空を黄色く染め、",
    "花粉デス・クラウドで人々の鼻と目を制圧していた。",
    "",
    "だが、呼吸を取り戻す者たちがいる。",
    "広葉樹同盟軍。",
    "",
    "これは花粉症対策ではない。",
    "健やかな呼吸を取り戻すための、",
    "ささやかで確かな反撃の記録である。",
  ];

  // STAR REEFに出入りする時にタイマー停止
  const goScreen = (next) => {
    if (next !== "STARLEAF") {
      clearStarreefTimers();
      stopTheme();
      setStarreefPhase("idle");
    }
    setScreen(next);
  };

  return (
    <main style={{ ...base, ...bg }}>
      <style>{`
        @keyframes crawlUp {
          0%   { transform: translateY(62%); opacity: 0; }
          6%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(-118%); opacity: 0; }
        }
      `}</style>

      <div style={card}>
        <header style={{ textAlign: "center", marginTop: 10, marginBottom: 16 }}>
          <div style={{ fontSize: 34, lineHeight: "34px", marginBottom: 6 }}>👑</div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.4px" }}>nuru market</div>

          <div style={{ marginTop: 10, display: "flex", gap: 8, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={() => goScreen("HOUSE")} style={topTabStyle(screen === "HOUSE")}>
              <E>🏠</E> <span>HOUSE</span>
            </button>
            <button onClick={() => goScreen("PAUSE")} style={topTabStyle(screen === "PAUSE")}>
              <E>☕</E> <span>PAUSE</span>
            </button>
            <button onClick={() => goScreen("STARLEAF")} style={topTabStyle(screen === "STARLEAF")}>
              <E>🌿</E> <span>STAR REEF</span>
            </button>
          </div>
        </header>

        <section style={{ ...panel, borderRadius: 18, padding: 16, boxSizing: "border-box", overflow: "hidden" }}>
          {screen === "HOUSE" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>
                  <E>🏠</E> <span>HOUSE</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button onClick={() => setHouseTheme("Nordic")} style={themeBtnStyle(houseTheme === "Nordic")}>
                    Nordic（明）
                  </button>
                  <button onClick={() => setHouseTheme("Spaceship")} style={themeBtnStyle(houseTheme === "Spaceship")}>
                    Spaceship（暗）
                  </button>
                </div>
              </div>

              <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                <Link href="/my-room" style={btn()}>
                  <E>🏠</E> <span>MY ROOM</span>
                </Link>

                <button onClick={() => goScreen("PAUSE")} style={btn()}>
                  <E>☕</E> <span>PAUSE</span>
                </button>

                <button onClick={() => goScreen("STARLEAF")} style={btn()}>
                  <E>🌿</E> <span>STAR REEF</span>
                </button>

                <Link href="/board" style={btn("ghost")}>
                  <E>🧾</E> <span>BOARD</span>
                </Link>
              </div>

              <div style={{ marginTop: 14, opacity: theme === "Nordic" ? 0.75 : 0.72, fontSize: 12, lineHeight: 1.6 }}>
                <div>・ここは公共の場（マーケット）</div>
                <div>・MY ROOM はあなた専用（端末内）</div>
              </div>
            </>
          )}

          {screen === "PAUSE" && (
            <>
              <div style={{ fontWeight: 850, fontSize: 16 }}>
                <E>☕</E> <span>PAUSE（入口）</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 13, opacity: 0.8, lineHeight: 1.7 }}>
                白背景・静かな入口。ここから各部屋へ。
              </div>

              <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                <Link href="/board" style={btn("ghost")}>
                  <E>🧾</E> <span>/board</span>
                </Link>

                <Link href="/rooms/yottemita" style={btn("ghost")}>/rooms/yottemita</Link>
                <Link href="/rooms/poem" style={btn("ghost")}>/rooms/poem</Link>
                <Link href="/rooms/manager" style={btn("ghost")}>/rooms/manager</Link>
                <Link href="/rooms/echo" style={btn("ghost")}>/rooms/echo（会話OK）</Link>
                <Link href="/rooms/starleaf" style={btn("ghost")}>/rooms/starleaf（世界観・会話OK）</Link>

                <button onClick={() => goScreen("HOUSE")} style={btn()}>
                  ← HOUSEへ戻る
                </button>
              </div>
            </>
          )}

          {screen === "STARLEAF" && (
            <>
              <div style={{ fontWeight: 900, fontSize: 16, letterSpacing: "0.6px" }}>
                <E>🌿</E> <span>STAR REEF</span>
              </div>

              {/* ★操作ボタン（テロップ開始 / ゲーム開始） */}
              <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                <button onClick={startOpening} style={btn()}>
                  <E>▶</E> <span>テロップ（音楽付き）</span>
                </button>

                {/* 今は仮：ゲーム開始＝/rooms/starleaf へ */}
                <Link href="/rooms/starleaf" style={btn("ghost")}>
                  <E>🎮</E> <span>ゲーム開始</span>
                </Link>
              </div>

              {/* opening：黄テロップ */}
              {starreefPhase === "opening" && (
                <div
                  style={{
                    marginTop: 12,
                    borderRadius: 16,
                    border: "1px solid rgba(154, 245, 154, 0.18)",
                    background: "rgba(0,0,0,0.45)",
                    overflow: "hidden",
                    position: "relative",
                    height: 220,
                  }}
                >
                  <div
                    key={crawlKey}
                    style={{
                      position: "absolute",
                      left: 16,
                      right: 16,
                      bottom: -40,
                      color: "#F6D34A",
                      fontWeight: 800,
                      letterSpacing: "0.6px",
                      lineHeight: 1.55,
                      textAlign: "center",
                      animation: `crawlUp ${OPENING_MS}ms linear forwards`,
                      textShadow: "0 2px 12px rgba(0,0,0,0.55)",
                      willChange: "transform",
                    }}
                  >
                    <div style={{ fontSize: 13, opacity: 0.95 }}>STAR REEF</div>
                    <div style={{ fontSize: 16, marginTop: 4 }}>EPISODE</div>
                    <div style={{ fontSize: 18, marginTop: 4 }}>— NEW BREATH —</div>

                    <div style={{ marginTop: 14, fontSize: 14, opacity: 0.98 }}>
                      {openingLines.map((line, i) => (
                        <div key={i}>{line === "" ? <span>&nbsp;</span> : line}</div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={skipToScanning}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      padding: "8px 10px",
                      borderRadius: 12,
                      border: "1px solid rgba(154, 245, 154, 0.22)",
                      background: "rgba(154, 245, 154, 0.08)",
                      color: "#9AF59A",
                      cursor: "pointer",
                      fontWeight: 700,
                      lineHeight: 1,
                      boxSizing: "border-box",
                    }}
                  >
                    SKIP
                  </button>
                </div>
              )}

              {/* scanning / ready 表示 */}
              <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.7 }}>
                {starreefPhase === "scanning" ? (
                  <div style={{ opacity: 0.92 }}>
                    <div style={{ fontWeight: 850, letterSpacing: "1px" }}>SCANNING START</div>
                    <div style={{ marginTop: 8, opacity: 0.8 }}>……………</div>
                  </div>
                ) : starreefPhase === "ready" ? (
                  <div style={{ opacity: 0.92 }}>
                    <div style={{ fontWeight: 850, letterSpacing: "0.6px" }}>READY</div>
                    <div style={{ marginTop: 6, opacity: 0.8 }}>黒背景・緑文字。ここは演出画面。</div>
                  </div>
                ) : (
                  <div style={{ opacity: 0.72 }}>
                    ※ 「テロップ（音楽付き）」はボタンを押して開始
                  </div>
                )}
              </div>

              {/* ready後の導線（語る部屋 / 戻る） */}
              {starreefPhase === "ready" && (
                <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                  <Link href="/rooms/starleaf" style={btn()}>
                    <E>🗣️</E> <span>STAR REEF を語る部屋へ</span>
                  </Link>

                  <button onClick={() => goScreen("HOUSE")} style={btn("ghost")}>
                    ヌールマーケット（HOUSE）へ戻る
                  </button>
                </div>
              )}

              <div style={{ marginTop: 14, fontSize: 12, opacity: 0.72 }}>
                ※ 雑談は /rooms/echo、世界観は /rooms/starleaf
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
