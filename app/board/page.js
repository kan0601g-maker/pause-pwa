"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "pause_board_posts_v2";
const NAME_KEY = "pause_board_name_v1";

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function nowISO() {
  return new Date().toISOString();
}

function formatJST(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  } catch {
    return iso;
  }
}

function sanitizeName(s) {
  const t = (s ?? "").trim().replace(/\s+/g, " ");
  // 長すぎ事故防止
  return t.slice(0, 24);
}

export default function BoardPage() {
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState("匿名");
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  // 初回ロード：名前＆投稿を読む
  useEffect(() => {
    setMounted(true);

    const savedName = localStorage.getItem(NAME_KEY);
    if (savedName && typeof savedName === "string") {
      setName(sanitizeName(savedName) || "匿名");
    }

    const savedPosts = safeParse(localStorage.getItem(STORAGE_KEY) || "[]", []);
    if (Array.isArray(savedPosts)) setPosts(savedPosts);
  }, []);

  // 名前を保存
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(NAME_KEY, sanitizeName(name) || "匿名");
  }, [mounted, name]);

  // 投稿を保存
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [mounted, posts]);

  const canPost = useMemo(() => text.trim().length > 0, [text]);

  function addPost() {
    const body = text.trim();
    if (!body) return;

    const item = {
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: sanitizeName(name) || "匿名",
      body,
      createdAt: nowISO(),
    };

    setPosts((prev) => [item, ...prev]);
    setText("");
  }

  function removePost(id) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  function clearAll() {
    if (!confirm("掲示板の投稿を全削除します。よろしいですか？")) return;
    setPosts([]);
  }

  const bg = "#ffffff";
  const fg = "#111111";
  const border = "#e5e7eb";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        color: fg,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        padding: 16,
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: fg,
              border: `1px solid ${border}`,
              padding: "8px 12px",
              borderRadius: 10,
              fontSize: 14,
            }}
          >
            ← HOUSE
          </Link>

          <div style={{ flex: 1 }} />

          <button
            onClick={clearAll}
            style={{
              border: `1px solid ${border}`,
              background: "#fff",
              color: fg,
              padding: "8px 12px",
              borderRadius: 10,
              fontSize: 14,
              cursor: "pointer",
            }}
            title="全削除（端末内だけ）"
          >
            全削除
          </button>
        </div>

        <h1 style={{ marginTop: 18, marginBottom: 6, fontSize: 22 }}>/board</h1>
        <div style={{ marginBottom: 12, color: "#6b7280", fontSize: 13 }}>
          匿名・端末内保存（localStorage）／ハンドル固定（端末内）
        </div>

        {/* ハンドル欄 */}
        <div
          style={{
            border: `1px solid ${border}`,
            borderRadius: 14,
            padding: 12,
            background: "#fff",
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 6 }}>
            ハンドル（この端末に保存）
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例：Owner Yocchi / 匿名"
            style={{
              width: "100%",
              border: `1px solid ${border}`,
              borderRadius: 12,
              padding: "10px 12px",
              fontSize: 15,
              outline: "none",
            }}
          />
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
            表示名： <b>{sanitizeName(name) || "匿名"}</b>
          </div>
        </div>

        {/* 投稿欄 */}
        <div
          style={{
            border: `1px solid ${border}`,
            borderRadius: 14,
            padding: 12,
            background: "#fff",
          }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="ひとこと置いていってください。"
            rows={4}
            style={{
              width: "100%",
              resize: "vertical",
              border: `1px solid ${border}`,
              borderRadius: 12,
              padding: 12,
              fontSize: 15,
              outline: "none",
              lineHeight: 1.5,
            }}
          />
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button
              onClick={addPost}
              disabled={!canPost}
              style={{
                border: "none",
                background: canPost ? "#111827" : "#9ca3af",
                color: "#fff",
                padding: "10px 14px",
                borderRadius: 12,
                fontSize: 14,
                cursor: canPost ? "pointer" : "not-allowed",
              }}
            >
              {sanitizeName(name) || "匿名"} として投稿
            </button>

            <button
              onClick={() => setText("")}
              style={{
                border: `1px solid ${border}`,
                background: "#fff",
                color: fg,
                padding: "10px 14px",
                borderRadius: 12,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              クリア
            </button>

            <div style={{ flex: 1 }} />
            <div style={{ color: "#6b7280", fontSize: 12, alignSelf: "center" }}>
              {posts.length} 件
            </div>
          </div>
        </div>

        {/* 一覧 */}
        <div style={{ marginTop: 16 }}>
          {posts.length === 0 ? (
            <div
              style={{
                border: `1px dashed ${border}`,
                borderRadius: 14,
                padding: 16,
                color: "#6b7280",
                fontSize: 14,
              }}
            >
              まだ投稿はありません。
            </div>
          ) : (
            posts.map((p) => (
              <div
                key={p.id}
                style={{
                  border: `1px solid ${border}`,
                  borderRadius: 14,
                  padding: 14,
                  background: "#fff",
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontSize: 13, color: "#111827" }}>
                    <b>{p.name || "匿名"}</b>
                  </div>
                  <div style={{ color: "#6b7280", fontSize: 12 }}>
                    {formatJST(p.createdAt)}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 10,
                    whiteSpace: "pre-wrap",
                    fontSize: 15,
                    lineHeight: 1.6,
                  }}
                >
                  {p.body}
                </div>

                <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
                  <div style={{ flex: 1 }} />
                  <button
                    onClick={() => removePost(p.id)}
                    style={{
                      border: `1px solid ${border}`,
                      background: "#fff",
                      color: fg,
                      padding: "6px 10px",
                      borderRadius: 10,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    削除
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: 24, color: "#6b7280", fontSize: 12 }}>
          ※ハンドルと投稿は端末ごとに保存されます（サーバ送信なし）。
        </div>
      </div>
    </div>
  );
}
