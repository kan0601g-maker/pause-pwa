"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

export default function Page() {
  const BUILD_TAG = "BUILD_20260123_STARLEAF_WORKING_01";

  // 画面キー：HOUSE / PAUSE / STARLEAF
  const [screen, setScreen] = useState("HOUSE");
  const [houseTheme, setHouseTheme] = useState("Nordic");

  // STAR LEAF 演出：idle -> opening -> scanning -> ready
  const [starleafPhase, setStarleafPhase] = useState("idle");
  const [crawlKey, setCrawlKey] = useState(0);

  const tOpenRef = useRef(null);
  const tReadyRef = useRef(null);

  // 音（WebAudio）
  const audioCtxRef = useRef(null);
  const playingRef = useRef(false);

  const OPENING_MS = 9500;
  const SCANNING_MS = 2000;

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
    clearStarleafTimers();
    setStarleafPhase("opening");
    setCrawlKey((v) => v + 1);
    playTheme();

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

  const goScreen = (next) => {
    if (next !== "STARLEAF") {
      clearStarleafTimers();
      stopTheme();
      setStarleafPhase("idle");
    }
    setScreen(next);
  };

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
    border: screen === "STARLEAF" ? "1px solid rgba(154,245,154,0.22)" : "1px solid rgba(0,0,0,0.10)",
    background:
      screen === "STARLEAF"
        ? "rgba(10, 20, 16, 0.55)"
        : theme === "Nordic"
        ? "rgba(255,255,255,0.90)"
        : "rgba(12, 18, 36, 0.75)",
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
      boxSizing: "border-box",
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
        background: variant === "ghost" ? "transparent" : "rgba(154, 245, 154, 0.20)",
        borderColor: "rgba(154, 245, 154, 0.50)",
        color: "#9AF59A",
      };
    }

    return {
      ...common,
      background: variant === "ghost" ? "transparent" : theme === "Nordic" ? "#0f172a" : "rgba(230, 238, 252, 0.20)",
      borderColor: theme === "Nordic" ? "#0f172a" : "rgba(230, 238, 252, 0.40)",
      color: variant === "ghost" ? (theme === "Nordic" ? "#0f172a" : "#e6eefc") : theme === "Nordic" ? "#fff" : "#e6eefc",
    };
  };

  const topTabStyle = (active) => ({
    padding: "10px 16px",
    borderRadius: 999,
    fontWeight: 900,
    cursor: "pointer",
    border: "2px solid",
    borderColor: active
      ? screen === "STARLEAF"
        ? "rgba(154,245,154,0.75)"
        : theme === "Nordic"
        ? "#0f172a"
        : "rgba(230,238,252,0.65)"
      : "rgba(128,128,128,0.30)",
    background: active
      ? screen === "STARLEAF"
        ? "rgba(154,245,154,0.14)"
        : theme === "Nordic"
        ? "#0f172a"
        : "rgba(255,255,255,0.12)"
      : "transparent",
    color: active ? (theme === "Nordic" && screen !== "STARLEAF" ? "#fff" : "inherit") : "inherit",
  });

  return (
    <main style={{ minHeight: "100dvh", padding: 18, boxSizing: "border-box", fontFamily: "sans-serif", ...bg }}>
      <style>{`
        @keyframes crawlUp {
          0% { transform: translateY(80%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-120%); opacity: 0; }
        }
      `}</style>

      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 40 }}>👑</div>
          <div style={{ fontSize: 20, fontWeight: 900 }}>nuru market</div>

          {/* 反映確認 */}
          <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>
            {BUILD_TAG} / screen={screen}
          </div>

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
                      border: "1px solid rgba(0,0,0,0.25)",
                      background: houseTheme === "Nordic" ? "#0f172a" : "transparent",
                      color: houseTheme === "Nordic" ? "#fff" : "inherit",
                      cursor: "pointer",
                      fontWeight: 800,
                    }}
                  >
                    Nordic
                  </button>
                  <button
                    onClick={() => setHouseTheme("Spaceship")}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 10,
                      border: "1px solid rgba(0,0,0,0.25)",
                      background: houseTheme === "Spaceship" ? "rgba(255,255,255,0.9)" : "transparent",
                      color: houseTheme === "Spaceship" ? "#0b1020" : "inherit",
                      cursor: "pointer",
                      fontWeight: 800,
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
              <button onClick={() => goScreen("HOUSE")} style={btn()}>
                🏠 HOUSEに戻る
              </button>
            </div>
          )}

          {screen === "STARLEAF" && (
            <div style={{ display: "grid", gap: 15 }}>
              <div style={{ fontWeight: 900, color: "#9AF59A" }}>🌿 STAR LEAF DECK</div>

              <button onClick={startOpening} style={btn()}>
                ▶ テロップ（音楽付き）
              </button>
              <Link href="/rooms/starleaf" style={btn("ghost")}>
                🎮 ゲーム開始
              </Link>

              {starleafPhase === "opening" && (
                <div
                  style={{
                    height: 260,
                    background: "#000",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 15,
                    border: "2px solid rgba(154,245,154,0.55)",
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
                      padding: 20,
                      boxSizing: "border-box",
                      fontWeight: 900,
                      letterSpacing: "0.4px",
                      lineHeight: 1.6,
                    }}
                  >
                    <div style={{ fontSize: 18 }}>EPISODE</div>
                    <div style={{ fontSize: 22, marginTop: 4 }}>— NEW BREATH —</div>

                    <div style={{ marginTop: 18, fontSize: 14, fontWeight: 800 }}>
                      {openingLines.map((l, i) => (
                        <div key={i}>{l === "" ? <span>&nbsp;</span> : l}</div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={skipToScanning}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      background: "rgba(154,245,154,0.18)",
                      color: "#9AF59A",
                      border: "1px solid rgba(154,245,154,0.55)",
                      borderRadius: 10,
                      padding: "7px 10px",
                      cursor: "pointer",
                      fontWeight: 900,
                    }}
                  >
                    SKIP
                  </button>
                </div>
              )}

              {starleafPhase === "scanning" && <div style={{ textAlign: "center", padding: 18 }}>📡 SCANNING...</div>}

              {starleafPhase === "ready" && (
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ textAlign: "center", fontWeight: 900 }}>✅ READY</div>
                  <Link href="/rooms/starleaf" style={btn()}>
                    🗣️ STAR LEAFを語る部屋
                  </Link>
                  <button onClick={() => goScreen("HOUSE")} style={btn("ghost")}>
                    🏠 HOUSEに戻る
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
