"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Page() {
  const BUILD_TAG = "BUILD_20260123_STARLEAF_TICKER_BTN_ALWAYS";

  // 画面キーは固定（表示名は自由）
  const [screen, setScreen] = useState("HOUSE"); // "HOUSE" | "PAUSE" | "STARLEAF"
  const [houseTheme, setHouseTheme] = useState("Nordic"); // "Nordic" | "Spaceship"

  // STAR LEAF 演出：idle -> opening -> scanning -> ready
  const [starleafPhase, setStarleafPhase] = useState("idle");
  const [crawlKey, setCrawlKey] = useState(0);

  // timers
  const tOpenRef = useRef(null);
  const tReadyRef = useRef(null);

  // WebAudio
  const audioCtxRef = useRef(null);
  const playingRef = useRef(false);

  const OPENING_MS = 9500; // 8〜12秒帯
  const SCANNING_MS = 2000;

  const openingLines = useMemo(
    () => [
      "遠い昔、遥か彼方の山奥で…",
      "",
      "春になると、スギ帝国（The Cedar Empire）が",
      "花粉デス・クラウドを放ち、人々の鼻と目は絶望した。",
      "",
      "しかし、広葉樹同盟軍（Broadleaf Alliance）は",
      "『健やかな呼吸（The Oxygen）』を取り戻すため立ち上がる。",
      "",
      "あなたのスマホは “スマート・セーバー”。",
      "見えない敵をスキャンし、この茶番…いえ、サーガを始めよ。",
      "",
      "―― STAR WOODS：EP4『新たなる鼻炎』",
    ],
    []
  );

  const clearStarleafTimers = () => {
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
    // ユーザー操作（ボタン）から呼ばれる前提：ブラウザ制限を回避
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

      // それっぽい短いパターン（著作権メロディは避ける）
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
    clearStarleafTimers();

    // まず opening にして、テロップを必ず描画
    setStarleafPhase("opening");
    setCrawlKey((v) => v + 1);

    // BGMはここで開始（ユーザー操作中）
    playTheme();

    // opening -> scanning -> ready
    tOpenRef.current = setTimeout(() => setStarleafPhase("scanning"), OPENING_MS);
    tReadyRef.current = setTimeout(() => {
      setStarleafPhase("ready");
      stopTheme();
    }, OPENING_MS + SCANNING_MS);
  };

  const skipToScanning = () => {
    clearStarleafTimers();
    stopTheme();
    setStarleafPhase("scanning");
    tReadyRef.current = setTimeout(() => setStarleafPhase("ready"), SCANNING_MS);
  };

  const resetStarleaf = () => {
    clearStarleafTimers();
    stopTheme();
    setStarleafPhase("idle");
  };

  const goScreen = (next) => {
    resetStarleaf();
    setScreen(next);
  };

  // 画面を抜けたら演出止める
  useEffect(() => {
    if (screen !== "STARLEAF") resetStarleaf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  const theme = useMemo(() => (screen !== "HOUSE" ? "plain" : houseTheme), [screen, houseTheme]);

  const bg = (() => {
    if (screen === "PAUSE") return { background: "#ffffff", color: "#111827" };
    if (screen === "STARLEAF") return { background: "#050807", color: "#9AF59A" };
    if (theme === "Nordic") return { background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)", color: "#0f172a" };
    return {
      background:
        "radial-gradient(1200px 600px at 20% 10%, rgba(140,180,255,0.25) 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, #0b1020 0%, #0a0f1a 55%, #0d1424 100%)",
      color: "#e6eefc",
    };
  })();

  const panelStyle = {
    maxWidth: 560,
    margin: "0 auto",
    borderRadius: 18,
    padding: 16,
    boxSizing: "border-box",
    overflow: "hidden",
    border: screen === "PAUSE" || theme === "Nordic" ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.15)",
    background: screen === "PAUSE" || theme === "Nordic" ? "rgba(255,255,255,0.9)" : "rgba(12, 18, 36, 0.75)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    backdropFilter: "blur(10px)",
  };

  const btn = (variant = "solid") => {
    const common = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      width: "100%",
      padding: "14px",
      borderRadius: 14,
      fontWeight: 800,
      textDecoration: "none",
      cursor: "pointer",
      border: "2px solid",
      userSelect: "none",
    };

    if (screen === "PAUSE") {
      return {
        ...common,
        background: variant === "ghost" ? "transparent" : "#111827",
        borderColor: "#111827",
        color: variant === "ghost" ? "#111827" : "#fff",
      };
    }

    if (screen === "STARLEAF") {
      return {
        ...common,
        background: variant === "ghost" ? "transparent" : "rgba(154, 245, 154, 0.22)",
        borderColor: "rgba(154, 245, 154, 0.55)",
        color: "#9AF59A",
      };
    }

    return {
      ...common,
      background: variant === "ghost" ? "transparent" : theme === "Nordic" ? "#0f172a" : "rgba(230, 238, 252, 0.22)",
      borderColor: theme === "Nordic" ? "#0f172a" : "rgba(230, 238, 252, 0.42)",
      color: variant === "ghost" ? (theme === "Nordic" ? "#0f172a" : "#e6eefc") : theme === "Nordic" ? "#fff" : "#e6eefc",
    };
  };

  const topTabStyle = (active) => ({
    padding: "10px 16px",
    borderRadius: 999,
    fontWeight: 900,
    cursor: "pointer",
    border: "2px solid",
    borderColor: active ? (theme === "Nordic" ? "#0f172a" : "#9AF59A") : "rgba(128,128,128,0.3)",
    background: active ? (theme === "Nordic" ? "#0f172a" : "rgba(255,255,255,0.18)") : "transparent",
    color: active ? "#fff" : "inherit",
  });

  return (
    <main style={{ minHeight: "100dvh", padding: 18, boxSizing: "border-box", fontFamily: "sans-serif", ...bg }}>
      <style>{`
        @keyframes crawlUp {
          0%   { transform: translateY(85%); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(-140%); opacity: 0; }
        }
      `}</style>

      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 40 }}>👑</div>
          <div style={{ fontSize: 20, fontWeight: 900 }}>nuru market</div>
          <div style={{ fontSize: 10, opacity: 0.5 }}>{BUILD_TAG}</div>

          <div style={{ marginTop: 15, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => goScreen("HOUSE")} style={topTabStyle(screen === "HOUSE")}>
              🏠 HOUSE
            </button>
            <button onClick={() => goScreen("PAUSE")} style={topTabStyle(screen === "PAUSE")}>
              ☕ PAUSE
            </button>
            <button onClick={() => goScreen("STARLEAF")} style={topTabStyle(screen === "STARLEAF")}>
              🌿 STAR LEAF
            </button>
          </div>
        </header>

        <section style={panelStyle}>
          {screen === "HOUSE" && (
            <div style={{ display: "grid", gap: 15 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 900 }}>THEME</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() => setHouseTheme("Nordic")}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 10,
                      border: "1px solid",
                      background: houseTheme === "Nordic" ? "#000" : "transparent",
                      color: houseTheme === "Nordic" ? "#fff" : "inherit",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    Nordic
                  </button>
                  <button
                    onClick={() => setHouseTheme("Spaceship")}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 10,
                      border: "1px solid",
                      background: houseTheme === "Spaceship" ? "#fff" : "transparent",
                      color: houseTheme === "Spaceship" ? "#000" : "inherit",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    Spaceship
                  </button>
                </div>
              </div>

              <Link href="/my-room" style={btn()}>
                🏠 MY ROOM
              </Link>
              <button onClick={() => goScreen("PAUSE")} style={btn()}>
                ☕ PAUSE
              </button>
              <button onClick={() => goScreen("STARLEAF")} style={btn()}>
                🌿 STAR LEAF
              </button>
              <Link href="/board" style={btn("ghost")}>
                🧾 BOARD
              </Link>
            </div>
          )}

          {screen === "PAUSE" && (
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ fontWeight: 900 }}>☕ PAUSE ROOMS</div>
              <Link href="/board" style={btn("ghost")}>
                🧾 /board
              </Link>
              <Link href="/rooms/yottemita" style={btn("ghost")}>
                /rooms/yottemita
              </Link>
              <Link href="/rooms/poem" style={btn("ghost")}>
                /rooms/poem
              </Link>
              <Link href="/rooms/manager" style={btn("ghost")}>
                /rooms/manager
              </Link>
              <Link href="/rooms/echo" style={btn("ghost")}>
                /rooms/echo（雑談OK）
              </Link>
              <Link href="/rooms/starleaf" style={btn("ghost")}>
                /rooms/starleaf（世界観）
              </Link>

              <button onClick={() => goScreen("HOUSE")} style={btn()}>
                🏠 HOUSEに戻る
              </button>
            </div>
          )}

          {screen === "STARLEAF" && (
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ fontWeight: 900, color: "#9AF59A" }}>🌿 STAR LEAF DECK</div>

              {/* ここは常に表示：ボタンが消える事故をなくす */}
              <button onClick={startOpening} style={btn()}>
                ▶ テロップ開始（BGM）
              </button>

              <Link href="/rooms/starleaf" style={btn("ghost")}>
                🎮 ゲーム開始（/rooms/starleaf）
              </Link>

              {/* opening */}
              {starleafPhase === "opening" && (
                <div
                  style={{
                    height: 260,
                    background: "#000",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 15,
                    border: "2px solid rgba(154,245,154,0.65)",
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
                      fontWeight: 700,
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: 1 }}>STAR WOODS</div>
                    <div style={{ fontSize: 14, opacity: 0.9, marginTop: 6 }}>EPISODE 4 / 新たなる鼻炎</div>
                    <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.7 }}>
                      {openingLines.map((l, i) => (
                        <div key={i}>{l === "" ? "\u00A0" : l}</div>
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
                      border: "1px solid rgba(154,245,154,0.6)",
                      borderRadius: 10,
                      padding: "6px 10px",
                      fontWeight: 900,
                      cursor: "pointer",
                    }}
                  >
                    SKIP
                  </button>
                </div>
              )}

              {/* scanning */}
              {starleafPhase === "scanning" && (
                <div style={{ textAlign: "center", padding: 16, border: "1px solid rgba(154,245,154,0.35)", borderRadius: 14 }}>
                  📡 SCANNING...
                </div>
              )}

              {/* ready */}
              {starleafPhase === "ready" && (
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ textAlign: "center", fontWeight: 900 }}>✅ READY</div>
                  <Link href="/rooms/starleaf" style={btn()}>
                    🗣️ STAR LEAF を語る部屋へ
                  </Link>
                  <button onClick={() => goScreen("HOUSE")} style={btn("ghost")}>
                    🏠 ヌルマーケット（HOUSE）へ戻る
                  </button>
                </div>
              )}

              {/* idle */}
              {starleafPhase === "idle" && (
                <div style={{ fontSize: 12, opacity: 0.9 }}>
                  ※ 「▶ テロップ開始」を押すと opening → scanning → ready に進む（スキップ可）
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

