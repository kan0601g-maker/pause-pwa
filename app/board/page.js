"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const POSTS_KEY = "pause_board_posts_vFINAL";
const NAME_KEY = "pause_board_name_v1";

function now() {
  return new Date().toISOString();
}
function jst(iso) {
  try {
    return new Date(iso).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  } catch {
    return iso;
  }
}
function cleanName(v) {
  return (v || "匿名").trim().slice(0, 24) || "匿名";
}

export default function BoardPage() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("匿名");
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);

  // 初期ロード
  useEffect(() => {
    setMounted(true);
    const n = localStorage.getItem(NAME_KEY);
    if (n) setName(cleanName(n));
    const p = JSON.parse(localStorage.getItem(POSTS_KEY) || "[]");
    setPosts(Array.isArray(p) ? p : []);
  }, []);

  // 保存
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(NAME_KEY, cleanName(name));
  }, [mounted, name]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }, [mounted, posts]);

  function addPost() {
    if (!text.trim()) return;
    setPosts((prev) => [
      {
        id: crypto.randomUUID(),
        name: cleanName(name),
        body: text.trim(),
        createdAt: now(),
        pinned: false,
      },
      ...prev,
    ]);
    setText("");
  }

  function delPost(id) {
    setPosts((p) => p.filter((x) => x.id !== id));
  }

  function togglePin(id) {
    setPosts((p) =>
      p.map((x) =>
        x.id === id
          ? { ...x, pinned: !x.pinned }
          : x.pinned
          ? { ...x, pinned: false }
          : x
      )
    );
  }

  const pinned = posts.find((p) => p.pinned);
  const normal = posts.filter((p) => !p.pinned);

  const border = "#e5e7eb";

  return (
    <div style={{ minHeight: "100vh", background: "#fff", padding: 16 }}>
      <div style={{ maxWidth: 720, margin: "0 auto", fontFamily: "system-ui" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link href="/" style={{ border: `1px solid ${border}`, padding: 8, borderRadius: 8 }}>
            ← HOUSE
          </Link>
          <button
            onClick={() => {
              if (confirm("全削除しますか？")) setPosts([]);
            }}
            style={{ border: `1px solid ${border}`, padding: 8, borderRadius: 8 }}
          >
            全削除
          </button>
        </div>

        <h1 style={{ marginTop: 16 }}>/board</h1>
        <div style={{ color: "#6b7280", fontSize: 13 }}>
          匿名・端末内保存（localStorage）／📌固定メモは1件だけ
        </div>

        {/* ハンドル */}
        <div style={{ border: `1px solid ${border}`, padding: 12, borderRadius: 12, marginTop: 12 }}>
          <div style={{ fontSize: 12, color: "#6b7280" }}>ハンドル</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </div>

        {/* 投稿 */}
        <div style={{ border: `1px solid ${border}`, padding: 12, borderRadius: 12, marginTop: 12 }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="ひとこと置いていってください。"
            style={{ width: "100%", padding: 8 }}
          />
          <div style={{ marginTop: 8 }}>
            <button onClick={addPost} style={{ padding: "8px 12px" }}>
              {cleanName(name)} として投稿
            </button>
          </div>
        </div>

        {/* 📌固定 */}
        {pinned && (
          <Post
            post={pinned}
            pinned
            onPin={() => togglePin(pinned.id)}
            onDel={() => delPost(pinned.id)}
          />
        )}

        {/* 一覧 */}
        {normal.map((p) => (
          <Post
            key={p.id}
            post={p}
            onPin={() => togglePin(p.id)}
            onDel={() => delPost(p.id)}
          />
        ))}
      </div>
    </div>
  );
}

function Post({ post, pinned, onPin, onDel }) {
  const border = "#e5e7eb";
  return (
    <div
      style={{
        border: `1px solid ${border}`,
        padding: 12,
        borderRadius: 12,
        marginTop: 12,
        background: pinned ? "#f8fafc" : "#fff",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <b>{post.name}</b>{" "}
          <span style={{ fontSize: 12, color: "#6b7280" }}>{jst(post.createdAt)}</span>
          {post.pinned && <span style={{ marginLeft: 6 }}>📌</span>}
        </div>
        <div>
          <button onClick={onPin} style={{ marginRight: 8 }}>
            {post.pinned ? "固定解除" : "📌 固定"}
          </button>
          <button onClick={onDel}>削除</button>
        </div>
      </div>
      <div style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{post.body}</div>
    </div>
  );
}

