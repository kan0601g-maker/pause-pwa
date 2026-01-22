"use client";

import React, { useEffect, useMemo, useState } from "react";

export default function Page() {
  // ===== View state =====
  // "HOUSE" | "PAUSE" | "STARLEAF"
  const [view, setView] = useState("HOUSE");

  // ===== Theme state (HOUSE only) =====
  // "NORDIC" | "SPACESHIP"
  const [theme, setTheme] = useState("NORDIC");

  // ===== STAR LEAF scan simulation =====
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);

  // ===== URL query: ?view=PAUSE などを拾う（PAUSE/STARLEAF導線にも使う）=====
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const v = (params.get("view") || "").toUpperCase();
      if (v === "PAUSE") setView("PAUSE");
      if (v === "STARLEAF") setView("STARLEAF");
      if (v === "HOUSE") setView("HOUSE");
    } catch {}
  }, []);

  function go(nextView) {
    setView(nextView);
    // URLに view を残す（キャッシュ錯覚を減らす・直リンク可能）
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("view", nextView);
      window.history.replaceState({}, "", url.toString());
    } catch {}
  }

  // ===== Common styles =====
  const fontFamily =
    'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial';

  // ===== HOUSE themes =====
  // Nordic: 明るい・静か
  const nordic = useMemo(
    () => ({
      bg: "#f6f7fb",
      card: "#ffffff",
      border: "rgba(15,23,42,0.14)",
      text: "#111827",
      sub: "#4b5563",
      soft: "#f3f4f6",
      accent: "#111827",
    }),
    []
  );

  // Spaceship: “暗すぎ問題”を解消するため、黒→濃紺寄りで少し明るく
  const spaceship = useMemo(
    () => ({
      bg: "#0b1220", // ← 明るめに
      card: "#111b2e", // ← 明るめに
      border: "rgba(125,211,252,0.40)",
      text: "#e5e7eb",
      sub: "#aeb7c6", // ← 少し明るめに
      soft: "rgba(255,255,255,0.06)",
      accent: "#7dd3fc",
    }),
    []
  );

  const T = theme === "NORDIC" ? nordic : spaceship;

  const shell = {
    minHeight: "100vh",
    background: T.bg,
    color: T.text,
    fontFamily,
    padding: 24,
    transition: "background 200ms ease",
  };

  const frame = {
    maxWidth: 920,
    margin: "0 auto",
    borderRadius: 28,
    border: `2px solid ${T.border}`,
    background: T.card,
    padding: 32,
    textAlign: "center",
    boxShadow:
      theme === "NORDIC"
        ? "0 10px 30px rgba(0,0,0,0.06)"
        : "0 10px 30px rgba(0,0,0,0.35)",
    transition: "background 200ms ease",
  };

  const pillRow = {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 14,
  };

  const btn = {
    padding: "14px 18px",
    borderRadius: 18,
    fontSize: 14,
    cursor: "pointer",
    border: `1px solid ${T.border}`,
    background: T.soft,
    color: T.text,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    userSelect: "none",
  };

  const btnPrimary = {
    ...btn,
    border: theme === "NORDIC" ? "1px solid #111827" : `1px solid ${T.accent}`,
    background: theme === "NORDIC" ? "#111827" : "rgba(125,211,252,0.14)",
    color: theme === "NORDIC" ? "#ffffff" : T.text,
  };

  const tiny = { fontSize: 12, color: T.sub };

  // ===== PAUSE styles =====
  const pauseShell = {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#111111",
    fontFamily,
    padding: 24,
  };

  const pauseWrap = { maxWidth: 860, margin: "0 auto", padding: "24px 18px" };

  const pauseCard = {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 18,
    background: "#ffffff",
    textAlign: "left",
  };

  const pauseBtn = {
    border: "1px solid #e5e7eb",
    borderRadius: 999,
    padding: "10px 16px",
    background: "#ffffff",
    color: "#111111",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 14,
    cursor: "pointer",
  };

  const pauseSoftBtn = { ...pauseBtn, background: "#f9fafb" };

  // ===== STAR LEAF styles =====
  const leafShell = {
    minHeight: "100vh",
    background: "#05070f",
    color: "#22c55e",
    fontFamily,
    padding: 24,
  };

  const leafWrap = {
    maxWidth: 900,
    margin: "0 auto",
    borderRadius: 22,
    border: "1px solid rgba(34,197,94,0.35)",
    padding: 24,
    background: "rgba(0,0,0,0.35)",
  };

  const leafBtn = {
    display: "inline-block",
    padding: "12px 16px",
    borderRadius: 999,
    border: "1px solid rgba(34,197,94,0.6)",
    color: "#22c55e",
    background: "rgba(34,197,94,0.08)",
    textDecoration: "none",
    fontSize: 14,
    cursor: "pointer",
    userSelect: "none",
  };

  const leafBtnGhost = {
    ...leafBtn,
    background: "transparent",
  };

  // ===== Views =====
  if (view === "PAUSE") {
    return (
      <div style={pauseShell}>
        <div style={pauseWrap}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => go("HOUSE")} style={pauseBtn}>
              ← HOUSE
            </button>
          </div>

          <div style={{ marginTop: 18, textAlign: "left" }}>
            <div style={{ fontSize: 28, fontWeight: 800 }}>PAUSE</div>
            <div style={{ marginTop: 10, color: "#374151" }}>
              くつろいでいってください。
            </div>

            <div style={{ marginTop: 18, ...pauseCard }}>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>
                行き先（リンク）
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                <a href="/board" style={pauseBtn}>
                  🧾 /board
                </a>

                <a href="/rooms/yottemita" style={pauseBtn}>
                  🚪 /rooms/yottemita
                </a>

                <a href="/rooms/poem" style={pauseBtn}>
                  🖋️ /rooms/poem
                </a>

                <a href="/rooms/manager" style={pauseBtn}>
                  🧑‍✈️ /rooms/manager
                </a>

                {/* 会話室（C案） */}
                <a href="/rooms/echo" style={pauseSoftBtn}>
                  🗣️ /rooms/echo（雑談OK）
                </a>

                <a href="/rooms/starleaf" style={pauseSoftBtn}>
                  🌿 /rooms/starleaf（スターリーフ専用）
                </a>
              </div>
            </div>

            <div style={{ marginTop: 16, color: "#6b7280", fontSize: 12 }}>
              ※ いまは端末内保存（サーバ送信なし）
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "STARLEAF") {
    return (
      <div style={leafShell}>
        <div style={leafWrap}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => go("HOUSE")}
              style={{ ...leafBtnGhost, borderColor: "rgba(34,197,94,0.35)" }}
            >
              ← HOUSE
            </button>
            <button
              onClick={() => go("PAUSE")}
              style={{ ...leafBtnGhost, borderColor: "rgba(34,197,94,0.35)" }}
            >
              ← PAUSE
            </button>
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 22, letterSpacing: 3, fontWeight: 800 }}>
              STAR LEAF
            </div>
            <div style={{ marginTop: 8, color: "rgba(34,197,94,0.85)" }}>
              黒背景・緑文字
            </div>

            <div
              style={{
                marginTop: 18,
                border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 10 }}>
                SCANNING MODULE
              </div>

              <button
                onClick={() => {
                  if (scanning) return;
                  setScanning(true);
                  setScanDone(false);
                  setTimeout(() => {
                    setScanning(false);
                    setScanDone(true);
                  }, 2000);
                }}
                style={leafBtn}
              >
                {scanning ? "SCANNING..." : "SCANNING START"}
              </button>

              <div style={{ marginTop: 12, fontSize: 13, opacity: 0.95 }}>
                {scanning && "…解析中（2秒の疑似スキャン）"}
                {!scanning && !scanDone && "準備できたら押してOK"}
                {!scanning && scanDone && "SCAN COMPLETE ✅"}
              </div>
            </div>

            {/* ✅ ここが今回の追加：STAR LEAF会話部屋への導線 */}
            <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
              <a href="/rooms/starleaf?v=1" style={leafBtn}>
                🗣️ STAR LEAF を語る部屋へ（/rooms/starleaf）
              </a>

              <button
                onClick={() => go("HOUSE")}
                style={{ ...leafBtnGhost, borderColor: "rgba(34,197,94,0.35)" }}
              >
                ヌールマーケットへ戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== HOUSE =====
  return (
    <div style={shell}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 12, color: T.sub, letterSpacing: 3 }}>
          PAUSE / NURU MARKET PWA
        </div>
      </div>

      <div style={frame}>
        <div style={{ fontSize: 12, color: T.sub }}>HOUSE</div>

        <div style={{ marginTop: 10, fontSize: 64, lineHeight: 1 }}>👑</div>

        <div style={{ marginTop: 10, fontSize: 22, fontWeight: 800 }}>
          Owner Yocchi
        </div>

        <div style={{ marginTop: 10, ...tiny }}>
          view={view} / theme={theme}
        </div>

        <div style={pillRow}>
          <button onClick={() => go("PAUSE")} style={btnPrimary}>
            ☕ Pause
          </button>
          <button onClick={() => go("STARLEAF")} style={btnPrimary}>
            🌿 STAR LEAF
          </button>

          {/* HOUSE→BOARD導線（便利） */}
          <a href="/board" style={btn}>
            🧾 BOARD
          </a>
        </div>

        <div style={{ marginTop: 22, ...tiny }}>THEME</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          <button onClick={() => setTheme("NORDIC")} style={theme === "NORDIC" ? btnPrimary : btn}>
            Nordic
          </button>
          <button onClick={() => setTheme("SPACESHIP")} style={theme === "SPACESHIP" ? btnPrimary : btn}>
            Spaceship（明るめ調整済み）
          </button>
        </div>

        <div style={{ marginTop: 18, color: T.sub, fontSize: 12, lineHeight: 1.7 }}>
          ※ Vercelキャッシュ対策：確認URLに <b>?v=数字</b> を付けると確実
        </div>
      </div>
    </div>
  );
}


