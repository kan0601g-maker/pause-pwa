"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function RoomSlugPage() {
  const params = useParams();
  const slug = (params?.slug || "").toString();

  const isPoem = slug === "poem";
  const isManager = slug === "manager";
  const isYottemita = slug === "yottemita";

  // ========== 共通（宇宙船テーマ） ==========
  const bg = "#020617";
  const card = "#0b1020";
  const border = "rgba(34,211,238,0.3)";
  const text = "#e5e7eb";
  const sub = "#9ca3af";

  const shellStyle = {
    minHeight: "100vh",
    background: isPoem ? "#ffffff" : bg,
    color: isPoem ? "#111111" : text,
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
    padding: "40px 20px",
    transition: "all 0.5s ease",
  };

  const frameStyle = {
    maxWidth: 800,
    margin: "0 auto",
    borderRadius: 32,
    border: isPoem ? "1px solid #eee" : `1px solid ${border}`,
    background: isPoem ? "#fff" : card,
    padding: "40px",
    textAlign: "center",
    boxShadow: isPoem ? "0 10px 40px rgba(0,0,0,0.02)" : "0 0 40px rgba(0,0,0,0.2)",
  };

  const btnStyle = (type) => ({
    padding: "14px 24px",
    borderRadius: 999,
    fontSize: 14,
    cursor: "pointer",
    border: isPoem ? "1px solid #e5e7eb" : `1px solid ${border}`,
    background: isPoem ? "#fff" : "rgba(34,211,238,0.05)",
    color: isPoem ? "#111" : text,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "all 0.3s ease",
    width: "100%",
    maxWidth: 300,
  });

  // ========== コンテンツ生成 ==========
  const roomData = useMemo(() => {
    if (isPoem) return {
      title: "ぽえむ（言ってもいいのよ）",
      lead: ["意味にならなくても、言っていい。", "正しさじゃなくて、ことばのかけらを。", "ここは、静かな言葉の部屋です。"],
      cardTitle: "準備中",
      cardBody: "いまは、部屋の空気を整えています。言葉が出ない日でも、大丈夫です。"
    };
    if (isManager) return {
      title: "MANAGER'S DECK",
      icon: "🧑‍✈️",
      lead: ["ヌールマーケットの深淵へようこそ。", "ここはオーナーの視点が集まる場所。", "少しだけ、肩の荷を置いていってください。"],
      cardTitle: "管理人の手記",
      cardBody: "マーケットの運営状況は良好です。宇宙船のエンジン音を聞きながら、次の作戦を練っています。"
    };
    if (isYottemita) return {
      title: "YOTTE MITA",
      icon: "🧱",
      lead: ["ふらっと立ち寄る、レンガの温もり。", "何があるわけじゃないけれど、", "ここに居るだけでいい場所です。"],
      cardTitle: "部屋の様子",
      cardBody: "壁のレンガを一つずつ積み上げています。まだ隙間風が入るけれど、それもまた一興。"
    };
    return { title: "UNKNOWN ROOM", icon: "🚪", lead: ["未知の空間です。"], cardTitle: "404", cardBody: "この部屋はまだ実体化していません。" };
  }, [isPoem, isManager, isYottemita]);

  return (
    <div style={shellStyle}>
      <div style={frameStyle}>
        {!isPoem && <div style={{ fontSize: 12, color: "#22d3ee", letterSpacing: 4, marginBottom: 16 }}>ROOM : {slug.toUpperCase()}</div>}
        
        <h1 style={{ fontSize: isPoem ? 32 : 40, fontWeight: 700, marginBottom: 20 }}>
          {isPoem ? "" : roomData.icon} {roomData.title}
        </h1>

        <div style={{ marginBottom: 32, lineHeight: 2, opacity: 0.8 }}>
          {roomData.lead.map((t, i) => <div key={i}>{t}</div>)}
        </div>

        <div style={{ marginBottom: 32, padding: 24, borderRadius: 20, background: isPoem ? "#f9fafb" : "rgba(0,0,0,0.2)", border: isPoem ? "none" : `1px solid ${border}`, textAlign: "left" }}>
          <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>{roomData.cardTitle}</div>
          <div style={{ fontSize: 14, opacity: 0.7 }}>{roomData.cardBody}</div>
        </div>

        {isPoem && (
          <div style={{ marginBottom: 32, textAlign: "left" }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>そっと置いていい場所</div>
            <textarea
              placeholder="（ここに、ことばのかけらを）"
              rows={6}
              style={{ width: "100%", padding: 20, borderRadius: 16, border: "1px solid #e5e7eb", outline: "none", fontSize: 15, lineHeight: 1.8, resize: "none" }}
            />
            <div style={{ marginTop: 12, color: "#9ca3af", fontSize: 12 }}>※ここに書いたものは、保存も送信もしません。ただ置いて、閉じていい。</div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <Link href="/?view=PAUSE" style={btnStyle()}>← PAUSE に戻る</Link>
          <Link href="/board" style={btnStyle()}>🧾 BOARD（ひとこと）</Link>
          <Link href="/" style={btnStyle()}>🏠 HOUSE（王冠）</Link>
        </div>

        {!isPoem && <div style={{ marginTop: 32, fontSize: 10, color: sub }}>STATUS : {isManager ? "OWNER AUTHORIZED" : "STABLE"}</div>}
      </div>
    </div>
  );
}
