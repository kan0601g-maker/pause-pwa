"use client";
import Link from "next/link";

export default function StarleafPage() {
  const BUILD_TAG = "STARLEAF_MIN_FIX_20260123";
  const NOTE = "ここは演出・世界観（STAR LEAF）です。HOMEではありません。";

  return (
    <main style={{ minHeight: "100vh", background: "#050805", color: "#bff7c5", padding: "56px 16px 64px" }}>
      <div style={{ position: "fixed", top: 12, left: 12, zIndex: 9999 }}>
        <Link href="/" style={{ display: "inline-block", textDecoration: "none", color: "#bff7c5", background: "rgba(0,0,0,0.55)", border: "1px solid rgba(191,247,197,0.35)", borderRadius: 999, padding: "8px 12px", fontSize: 12, lineHeight: 1 }}>
          ← HOME（入口）へ戻る
        </Link>
      </div>

      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ display: "inline-block", fontSize: 12, color: "#9be7a6", background: "rgba(0,0,0,0.45)", border: "1px solid rgba(155,231,166,0.25)", borderRadius: 10, padding: "8px 10px" }}>
          {NOTE} <span style={{ opacity: 0.8 }}>({BUILD_TAG})</span>
        </div>

        <h1 style={{ marginTop: 18, fontSize: 22, fontWeight: 900 }}>🍃 STAR LEAF</h1>
        <p style={{ marginTop: 8, fontSize: 13, opacity: 0.85 }}>いまはビルド復旧優先の最小版。演出は次で戻す。</p>
      </div>
    </main>
  );
}
