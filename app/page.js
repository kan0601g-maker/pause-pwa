"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

export default function Page() {
  const BUILD_TAG = "BUILD_20260123_LEAF_SUCCESS";

  const [screen, setScreen] = useState("HOUSE");
  const [houseTheme, setHouseTheme] = useState("Nordic");
  const [starleafPhase, setStarleafPhase] = useState("idle");
  const [crawlKey, setCrawlKey] = useState(0);

  const tOpenRef = useRef(null);
  const tReadyRef = useRef(null);
  const audioCtxRef = useRef(null);
  const playingRef = useRef(false);

  const OPENING_MS = 9500;
  const SCANNING_MS = 2000;

  const openingLines = ["遠い昔、", "遥か彼方の山奥で――", "", "スギ帝国は春の空を黄色く染め、", "花粉デス・クラウドを制圧していた。", "", "だが、呼吸を取り戻す者たちがいる。", "広葉樹同盟軍。", "", "これは健やかな呼吸を取り戻すための、", "ささやかで確かな反撃の記録である。"];

  const clearTimers = () => {
    if (tOpenRef.current) clearTimeout(tOpenRef.current);
    if (tReadyRef.current) clearTimeout(tReadyRef.current);
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
      master.gain.value = 0.05;
      master.connect(ctx.destination);
      const startAt = ctx.currentTime + 0.02;

      const makeTone = (f, t, d, type, gVal) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type; o.frequency.setValueAtTime(f, t);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(gVal, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.connect(g); g.connect(master);
        o.start(t); o.stop(t + d + 0.02);
      };

      const pattern = [
        { f: 440, dt: 0.0, d: 0.28, type: "sawtooth", g: 0.5 },
        { f: 330, dt: 0.32, d: 0.38, type: "sawtooth", g: 0.5 },
        { f: 110, dt: 0.0, d: 0.55, type: "triangle", g: 0.3 }
      ];

      const loopLen = 1.2;
      const loops = Math.ceil(OPENING_MS / 1000 / loopLen);
      for (let i = 0; i < loops; i++) {
        const baseT = startAt + i * loopLen;
        for (const p of pattern) makeTone(p.f, baseT + p.dt, p.d, p.type, p.g);
      }
    } catch {}
  };

  const startOpening = () => {
    clearTimers(); setStarleafPhase("opening"); setCrawlKey(v => v + 1); playTheme();
    tOpenRef.current = setTimeout(() => setStarleafPhase("scanning"), OPENING_MS);
    tReadyRef.current = setTimeout(() => { setStarleafPhase("ready"); stopTheme(); }, OPENING_MS + SCANNING_MS);
  };

  const goScreen = (next) => {
    clearTimers(); stopTheme(); setStarleafPhase("idle"); setScreen(next);
  };

  const themeStyle = useMemo(() => {
    if (screen === "PAUSE") return { background: "#ffffff", color: "#111827" };
    if (screen === "STARLEAF") return { background: "#050807", color: "#9AF59A" };
    return houseTheme === "Nordic" 
      ? { background: "#f8fafc", color: "#0f172a" }
      : { background: "#0b1020", color: "#e6eefc" };
  }, [screen, houseTheme]);

  const btn = (ghost = false) => ({
    display: "block", width: "100%", padding: "14px", borderRadius: 14, fontWeight: 800, textAlign: "center", textDecoration: "none", marginBottom: 10, cursor: "pointer", border: "2px solid",
    background: ghost ? "transparent" : (screen === "STARLEAF" ? "rgba(154,245,154,0.1)" : "#111827"),
    color: screen === "STARLEAF" ? "#9AF59A" : (ghost ? "inherit" : "#fff"),
    borderColor: screen === "STARLEAF" ? "#9AF59A" : "#111827"
  });

  return (
    <main style={{ minHeight: "100dvh", padding: 20, ...themeStyle, fontFamily: "sans-serif" }}>
      <style>{`@keyframes crawlUp { 0% { transform: translateY(100%); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(-120%); opacity: 0; } }`}</style>
      <header style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 40 }}>👑</div>
        <div style={{ fontSize: 20, fontWeight: 900 }}>nuru market</div>
        <div style={{ fontSize: 10, opacity: 0.5 }}>{BUILD_TAG}</div>
        <div style={{ marginTop: 15, display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => goScreen("HOUSE")} style={{ padding: "8px 12px", borderRadius: 20, border: "1px solid" }}>🏠 HOUSE</button>
          <button onClick={() => goScreen("STARLEAF")} style={{ padding: "8px 12px", borderRadius: 20, border: "1px solid" }}>🌿 STAR LEAF</button>
        </div>
      </header>

      <section style={{ maxWidth: 500, margin: "0 auto", padding: 20, borderRadius: 20, background: "rgba(128,128,128,0.05)", border: "1px solid rgba(128,128,128,0.2)" }}>
        {screen === "HOUSE" && (
          <>
            <div style={{ marginBottom: 20, textAlign: "center" }}>
               <button onClick={() => setHouseTheme(houseTheme === "Nordic" ? "Spaceship" : "Nordic")}>Theme 切り替え</button>
            </div>
            <Link href="/board" style={btn()}>🧾 BOARD</Link>
            <button onClick={() => goScreen("STARLEAF")} style={btn()}>🌿 STAR LEAF</button>
          </>
        )}

        {screen === "STARLEAF" && (
          <>
            <div style={{ fontWeight: 900, marginBottom: 15 }}>🌿 STAR LEAF DECK</div>
            <button onClick={startOpening} style={btn()}>▶ テロップ開始</button>
            {starleafPhase === "opening" && (
              <div style={{ height: 200, background: "#000", overflow: "hidden", position: "relative", borderRadius: 10 }}>
                <div key={crawlKey} style={{ position: "absolute", width: "100%", color: "#F6D34A", animation: `crawlUp ${OPENING_MS}ms linear forwards`, textAlign: "center", padding: 10 }}>
                  <div style={{ fontWeight: 900 }}>STAR LEAF: NEW BREATH</div>
                  {openingLines.map((l, i) => <div key={i} style={{ fontSize: 12, marginTop: 5 }}>{l}</div>)}
                </div>
              </div>
            )}
            {starleafPhase === "ready" && <div style={{ textAlign: "center", fontWeight: 900, marginTop: 10 }}>✅ READY.</div>}
            <button onClick={() => goScreen("HOUSE")} style={btn(true)}>←戻る</button>
          </>
        )}
      </section>
    </main>
  );
}
