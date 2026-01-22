"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function StylishBoard() {
  const [messages, setMessages] = useState([]);
  const [handle, setHandle] = useState("匿名");
  const [text, setText] = useState("");

  // ブラウザ保存（localStorage）から読み込み
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nuru_board_msgs");
      if (saved) setMessages(JSON.parse(saved));
    } catch (e) {
      console.error("読み込みエラー:", e);
    }
  }, []);

  const handlePost = () => {
    if (!text.trim()) return;
    const newMsg = {
      id: Date.now(),
      handle: handle || "匿名",
      text: text,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [newMsg, ...messages].slice(0, 15); // 最新15件
    setMessages(updated);
    localStorage.setItem("nuru_board_msgs", JSON.stringify(updated));
    setText("");
  };

  const clearAll = () => {
    if (confirm("すべての書き込みを消去しますか？")) {
      setMessages([]);
      localStorage.removeItem("nuru_board_msgs");
    }
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)", // 明るく清潔感のある背景
      color: "#2d3748",
      fontFamily: 'sans-serif',
      padding: "40px 20px"
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* ナビゲーション */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
          <Link href="/" style={{ textDecoration: "none", color: "#a0aec0", fontSize: 13, fontWeight: 700 }}>← HOUSEに戻る</Link>
          <button onClick={clearAll} style={{ background: "none", border: "none", color: "#e2e8f0", cursor: "pointer", fontSize: 12 }}>全削除</button>
        </header>

        <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 8, color: "#1a202c" }}>/board</h1>
        <p style={{ fontSize: 14, color: "#718096", marginBottom: 32, lineHeight: 1.6 }}>ここは、ただの「ひとこと」を置いていく場所。<br/>今の気持ちを、そっと残してみて。</p>

        {/* 投稿エリア */}
        <section style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)", // 柔らかい浮遊感
          marginBottom: "40px",
          border: "1px solid rgba(0,0,0,0.02)"
        }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 800, color: "#cbd5e0", display: "block", marginBottom: 6, letterSpacing: "1px" }}>HANDLE</label>
            <input 
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #f1f5f9", background: "#f8fafc", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 800, color: "#cbd5e0", display: "block", marginBottom: 6, letterSpacing: "1px" }}>MESSAGE</label>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="何かつぶやいてみますか？"
              rows={3}
              style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #f1f5f9", background: "#f8fafc", outline: "none", resize: "none", boxSizing: "border-box" }}
            />
          </div>
          <button 
            onClick={handlePost}
            style={{ 
              width: "100%", padding: "16px", borderRadius: "14px", border: "none", background: "#1a202c", color: "#fff", fontWeight: 800, cursor: "pointer", transition: "transform 0.2s", boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            匿名として投稿する
          </button>
        </section>

        {/* メッセージリスト */}
        <section style={{ display: "grid", gap: "16px" }}>
          {messages.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: "#cbd5e0", fontSize: 14 }}>まだ静かなようです。</div>
          )}
          {messages.map(msg => (
            <div key={msg.id} style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.01)",
              border: "1px solid #f8fafc"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                <span style={{ fontWeight: 800, fontSize: 13, color: "#4a5568" }}>{msg.handle}</span>
                <span style={{ fontSize: 11, color: "#cbd5e0" }}>{msg.date}</span>
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "#2d3748", whiteSpace: "pre-wrap" }}>{msg.text}</div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

