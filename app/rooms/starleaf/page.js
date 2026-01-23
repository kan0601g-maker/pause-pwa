"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function StarleafPage() {
  const BUILD_TAG = "STARLEAF_ROUTE_BUILD_20260123_BTN_AND_CRAWL";
  const IS_NOT_HOME_NOTE = "ここは演出・世界観（STAR LEAF）です。HOMEではありません。";

  // ▼ ここから下に、今までの state / ref / effect を “そのまま” 移植してOK
  // 例：
  // const [phase, setPhase] = useState("idle");
  // const audioRef = useRef(null);
  // useEffect(() => { ... }, []);

  return (
    <>
      {/* =========================
          固定：HOMEへ戻る（誤認防止の生命線）
         ========================= */}
      <div
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 9999,
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-block",
            textDecoration: "none",
            color: "#bff7c5",
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(191,247,197,0.35)",
            borderRadius: 999,
            padding: "8px 12px",
            fontSize: 12,
            lineHeight: 1,
            backdropFilter: "blur(6px)",
          }}
        >
          ← HOME（入口）へ戻る
        </Link>
      </div>

      {/* =========================
          注意：ここはHOMEではない（テキストで誤認を潰す）
         ========================= */}
      <div
        style={{
          maxWidth: 920,
          margin: "0 auto",
          padding: "56px 16px 0",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: 12,
            color: "#9be7a6",
            background: "rgba(0,0,0,0.45)",
            border: "1px solid rgba(155,231,166,0.25)",
            borderRadius: 10,
            padding: "8px 10px",
          }}
        >
          {IS_NOT_HOME_NOTE}
          <span style={{ marginLeft: 8, opacity: 0.85 }}>({BUILD_TAG})</span>
        </div>
      </div>

      {/* =========================
          ここから STAR LEAF 本体
         ========================= */}
      <main
        style={{
          minHeight: "100vh",
          background: "#050805",
          color: "#bff7c5",
          padding: "18px 16px 64px",
        }}
      >
        <div
          style={{
            maxWidth: 920,
            margin: "0 auto",
            paddingTop: 18,
          }}
        >
          {/* ★ここに既存UIを貼る（今のSTAR LEAFの見た目・ボタン群・演出全部） */}
          {/* 例として最低限の枠だけ置いておく */}
          <header style={{ marginBottom: 18 }}>
            <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>
              🍃 STAR LEAF
            </h1>
            <p style={{ marginTop: 6, fontSize: 13, opacity: 0.85 }}>
              黒背景・緑文字。ここは演出画面。
            </p>
          </header>

          {/* ここに、今の「テロップ開始」「ゲーム開始」などを移植 */}
          <section
            style={{
              border: "1px solid rgba(191,247,197,0.25)",
              borderRadius: 16,
              padding: 16,
              background: "rgba(0,0,0,0.25)",
            }}
          >
            <p style={{ margin: 0, fontSize: 13, opacity: 0.9 }}>
              ※ ここに既存のSTAR LEAF UI（ボタン/演出）を貼ってください。
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

