"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function BoardPage() {
  const KEY = "PAUSE_BOARD_POSTS_V1";
  const NAME_KEY = "PAUSE_BOARD_NAME_V1";

  const [name, setName] = useState("匿名");
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);

  // 初期ロード
  useEffect(() => {
    try {
      const savedName = localStorage.getItem(NAME_KEY);
      if (savedName) setName(savedName);
    } catch {}

    try {
      const raw = localStorage.getItem(KEY);
      const arr = raw ? JSON.parse(raw) : [];
      if (Array.isArray(arr)) setPosts(arr);
    } catch {
      setPosts([]);
    }
  }, []);

  function savePosts(next) {
    setPosts(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }

  function saveName(nextName) {
    setName(nextName);
    try {
      localStorage.setItem(NAME_KEY, nextName);
    } catch {}
  }

  function addPost() {
    const t = (text || "").trim();
    if (!t) return;

    const item = {
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      name: (name || "匿名").trim() || "匿名",
      text: t,
      ts: Date.now(),
    };

    const next = [item, ...posts].slice(0, 300);
    savePosts(next);
    setText("");
  }

  function removePost(id) {
    const next = posts.filter((p) => p.id !== id);
    savePosts(next);
  }

  function clearAll() {
    savePosts([]);
  }

  const count = posts.length;

  const fmt = (ts) => {
    try {
      const d = new Date(ts);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const hh = String(d.getHours()).padStart(2, "0");
      const mi = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
    } catch {
      return "";
    }
  };

  const shell = {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#111111",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
    padding: 24,
  };

  const wrap = {
    maxWidth: 860,
    margin: "0 auto",
  };

  const topRow = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 18,
  };

  const btn = {
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

  const softBtn = {
    ...btn,
    background: "#f9fafb",
  };

  const card = {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 18,
    background: "#ffffff",
    marginBottom: 14,
  };

  const input = {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: 14,
  };

  const textarea = {
    ...input,
    minHeight: 120,
    resize: "vertical",
    lineHeight: 1.7,
  };

  return (
    <div style={shell}>
      <div style={wrap}>
        <div style={topRow}>
          <Link href="/?view=PAUSE" style={btn}>
            ← PAUSE
          </Link>

          <button onClick={clearAll} style={softBtn} title="全部消す（端末内だけ）">
            全削除
          </button>
        </div>

        <h1 style={{ marginTop: 0, marginBottom: 6, fontSize: 22 }}>/board</h1>
        <div style={{ marginBottom: 14, color: "#6b7280", fontSize: 13 }}>
          匿名・端末内保存（localStorage）／サーバ送信なし
        </div>

        <div style={card}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>ハンドル（端末内保存）</div>
          <input
            value={name}
            onChange={(e) => saveName(e.target.value)}
            style={input}
            placeholder="匿名"
          />
          <div style={{ marginTop: 8, color: "#6b7280", fontSize: 12 }}>
            表示名：{(name || "匿名").trim() || "匿名"}
          </div>
        </div>

        <div style={card}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={textarea}
            placeholder="ひとこと置いていってください。"
          />
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12 }}>
            <button
              onClick={addPost}
              style={{
                ...btn,
                borderColor: "#111827",
                background: "#111827",
                color: "#ffffff",
              }}
            >
              {(name || "匿名").trim() || "匿名"} として投稿
            </button>

            <button onClick={() => setText("")} style={softBtn}>
              クリア
            </button>

            <div style={{ marginLeft: "auto", color: "#6b7280", fontSize: 12 }}>
              {count} 件
            </div>
          </div>
          <div style={{ marginTop: 10, color: "#6b7280", fontSize: 12 }}>
            ※投稿とハンドルは端末ごとに保存されます（サーバ送信なし）。
          </div>
        </div>

        {posts.map((p) => (
          <div key={p.id} style={card}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontWeight: 700 }}>{p.name || "匿名"}</div>
              <div style={{ color: "#6b7280", fontSize: 12 }}>{fmt(p.ts)}</div>
              <button onClick={() => removePost(p.id)} style={{ ...softBtn, marginLeft: "auto" }}>
                削除
              </button>
            </div>
            <div style={{ marginTop: 10, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
              {p.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

