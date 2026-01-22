"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function BoardPage() {
  const KEY = "PAUSE_BOARD_POSTS_V1";
  const PIN_KEY = "PAUSE_BOARD_PIN_V1";
  const NAME_KEY = "PAUSE_BOARD_NAME_V1";

  const [name, setName] = useState("匿名");
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [pin, setPin] = useState(null);

  useEffect(() => {
    try {
      const n = localStorage.getItem(NAME_KEY);
      if (n) setName(n);
    } catch {}

    try {
      const p = localStorage.getItem(PIN_KEY);
      if (p) setPin(JSON.parse(p));
    } catch {}

    try {
      const raw = localStorage.getItem(KEY);
      const arr = raw ? JSON.parse(raw) : [];
      if (Array.isArray(arr)) setPosts(arr);
    } catch {}
  }, []);

  function savePosts(next) {
    setPosts(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function savePin(p) {
    setPin(p);
    if (p) {
      localStorage.setItem(PIN_KEY, JSON.stringify(p));
    } else {
      localStorage.removeItem(PIN_KEY);
    }
  }

  function addPost() {
    const t = text.trim();
    if (!t) return;

    const item = {
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      name: name.trim() || "匿名",
      text: t,
      ts: Date.now(),
    };

    savePosts([item, ...posts]);
    setText("");
  }

  function removePost(id) {
    savePosts(posts.filter((p) => p.id !== id));
    if (pin?.id === id) savePin(null);
  }

  function clearAll() {
    savePosts([]);
    savePin(null);
  }

  function pinPost(p) {
    savePin(p);
  }

  function unpin() {
    savePin(null);
  }

  const fmt = (ts) =>
    new Date(ts).toLocaleString("ja-JP", { hour12: false });

  const btn = {
    border: "1px solid #e5e7eb",
    borderRadius: 999,
    padding: "8px 14px",
    background: "#fff",
    cursor: "pointer",
    fontSize: 13,
  };

  const card = {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  };

  return (
    <div style={{ padding: 24, maxWidth: 860, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/?view=PAUSE" style={btn}>← PAUSE</Link>
        <button onClick={clearAll} style={btn}>全削除</button>
      </div>

      <h1>/board</h1>

      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          localStorage.setItem(NAME_KEY, e.target.value);
        }}
        placeholder="匿名"
        style={{ width: "100%", padding: 10, marginBottom: 8 }}
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ひとこと置いていってください。"
        style={{ width: "100%", padding: 10, minHeight: 100 }}
      />

      <button onClick={addPost} style={{ ...btn, marginTop: 8 }}>
        {name || "匿名"} として投稿
      </button>

      {/* 📌 PIN */}
      {pin && (
        <div style={{ ...card, background: "#fffbe6", borderColor: "#facc15" }}>
          <b>📌 ピン留め</b>
          <div style={{ marginTop: 6 }}>{pin.text}</div>
          <div style={{ fontSize: 12, color: "#555" }}>{fmt(pin.ts)}</div>
          <button onClick={unpin} style={{ ...btn, marginTop: 6 }}>
            解除
          </button>
        </div>
      )}

      {/* POSTS */}
      {posts.map((p) => (
        <div key={p.id} style={card}>
          <div style={{ fontWeight: "bold" }}>{p.name}</div>
          <div style={{ margin: "6px 0" }}>{p.text}</div>
          <div style={{ fontSize: 12, color: "#666" }}>{fmt(p.ts)}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
            <button onClick={() => pinPost(p)} style={btn}>📌</button>
            <button onClick={() => removePost(p.id)} style={btn}>削除</button>
          </div>
        </div>
      ))}
    </div>
  );
}


