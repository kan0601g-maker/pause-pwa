"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

function getSlugFromParams(p) {
  if (typeof p?.slug === "string") return p.slug;
  if (Array.isArray(p?.slug) && typeof p.slug[0] === "string") return p.slug[0];
  return "";
}

function fmt(ts) {
  try {
    const d = new Date(ts);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd} ${hh}:${mi}`;
  } catch {
    return "";
  }
}

export default function RoomSlugPage() {
  const p = useParams();
  const slug = getSlugFromParams(p);

  // ==== rooms 定義（文言だけ差し替え）====
  const ROOM = useMemo(() => {
    const map = {
      yottemita: {
        title: "よってみた",
        lead: [
          "とりあえず、よってみたで大丈夫。",
          "書いてもいいし、書かなくてもいい。",
          "ここは「ひとり言」のための部屋です。",
        ],
        placeholder: "（今の気持ちを、短く）",
        actionLabel: "置く",
        emptyLabel: "まだ何もありません。最初の「ひとこと」を置いてもいい。",
      },
      poem: {
        title: "ぽえむ（言ってもいいのよ）",
        lead: [
          "意味にならなくても、言っていい。",
          "正しさじゃなくて、ことばのかけらを。",
          "ここは、静かな言葉の部屋です。",
        ],
        placeholder: "（ここに、ことばのかけらを）",
        actionLabel: "そっと置く",
        emptyLabel: "まだ何もありません。ことばのかけらを置いてもいい。",
      },
      manager: {
        title: "manager（作戦室）",
        lead: [
          "ここは、考えを短く切り出す部屋。",
          "ToDoでも、気づきでも、メモでも。",
          "外には出ない。端末にだけ残る。",
        ],
        placeholder: "（メモ / 作戦 / ひとこと）",
        actionLabel: "記録する",
        emptyLabel: "まだ何もありません。最初のメモを置いてもいい。",
      },
    };
    return map[slug] || null;
  }, [slug]);

  // ==== スタイル（白テーマ統一）====
  const shell = {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#111111",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
    padding: 24,
  };

  const wrap = { maxWidth: 860, margin: "0 auto", padding: "24px 18px" };

  const card = {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 18,
    background: "#ffffff",
    textAlign: "left",
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

  const softBtn = { ...btn, background: "#f9fafb" };

  const primaryBtn = {
    ...btn,
    borderColor: "#111827",
    background: "#111827",
    color: "#ffffff",
  };

  const textarea = {
    marginTop: 12,
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: 14,
    lineHeight: 1.7,
    resize: "vertical",
  };

  // ==== 未登録slug ====
  if (!ROOM) {
    return (
      <div style={shell}>
        <div style={wrap}>
          <div style={{ fontSize: 28, fontWeight: 800 }}>ROOM</div>
          <div style={{ marginTop: 10, color: "#6b7280" }}>
            この部屋はまだ登録されていません。
          </div>

          <div style={{ marginTop: 18, ...card }}>
            <div style={{ fontWeight: 700 }}>未登録</div>
            <div style={{ marginTop: 8, color: "#374151" }}>
              slug: <b>{slug || "(empty)"}</b>
            </div>
            <div style={{ marginTop: 8, color: "#6b7280", fontSize: 13 }}>
              登録済み：yottemita / poem / manager
            </div>
          </div>

          <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/?view=PAUSE" style={btn}>
              入口へ戻る
            </Link>
            <Link href="/board" style={softBtn}>
              🧾 BOARDへ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==== 端末内ログ（部屋ごとに保存キー分離）====
  const KEY = `PAUSE_ROOM_POSTS_V1__${slug}`;

  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const arr = raw ? JSON.parse(raw) : [];
      if (Array.isArray(arr)) setPosts(arr);
    } catch {
      setPosts([]);
    }
  }, [KEY]);

  function save(next) {
    setPosts(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }

  function add() {
    const t = (text || "").trim();
    if (!t) return;
    const item = {
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      text: t,
      ts: Date.now(),
    };
    const next = [item, ...posts].slice(0, 300);
    save(next);
    setText("");
  }

  function remove(id) {
    const next = posts.filter((p) => p.id !== id);
    save(next);
  }

  function clearAll() {
    save([]);
  }

  return (
    <div style={shell}>
      <div style={wrap}>
        <div style={{ textAlign: "left", marginTop: 12 }}>
          <div style={{ fontSize: 32, fontWeight: 800 }}>{ROOM.title}</div>

          <div style={{ marginTop: 14, lineHeight: 1.9, color: "#374151" }}>
            {ROOM.lead.map((t, i) => (
              <div key={i}>{t}</div>
            ))}
          </div>

          <div style={{ marginTop: 22, ...card }}>
            <div style={{ fontWeight: 700, marginBottom: 10 }}>
              ひとこと（端末内保存）
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={ROOM.placeholder}
              rows={4}
              style={textarea}
            />

            <div
              style={{
                marginTop: 12,
                display: "flex",
                gap: 10,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <button onClick={add} style={primaryBtn}>
                {ROOM.actionLabel}
              </button>

              <button onClick={() => setText("")} style={softBtn} title="入力欄をクリア">
                クリア
              </button>

              <div style={{ marginLeft: "auto", color: "#6b7280", fontSize: 12 }}>
                {posts.length} 件
              </div>
            </div>

            <div style={{ marginTop: 10, color: "#6b7280", fontSize: 12 }}>
              ※ 保存はこの端末のみ（サーバ送信なし）
            </div>
          </div>

          <div style={{ marginTop: 18, ...card }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontWeight: 700 }}>ログ</div>
              <button onClick={clearAll} style={{ ...softBtn, marginLeft: "auto" }}>
                全削除
              </button>
            </div>

            {posts.length === 0 ? (
              <div style={{ marginTop: 12, color: "#6b7280", fontSize: 13 }}>
                {ROOM.emptyLabel}
              </div>
            ) : (
              <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                {posts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: 12,
                      padding: 12,
                      background: "#ffffff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 6,
                      }}
                    >
                      <div style={{ color: "#6b7280", fontSize: 12 }}>
                        {fmt(p.ts)}
                      </div>
                      <button
                        onClick={() => remove(p.id)}
                        style={{
                          marginLeft: "auto",
                          border: "1px solid #e5e7eb",
                          background: "#ffffff",
                          borderRadius: 999,
                          padding: "6px 10px",
                          cursor: "pointer",
                          fontSize: 12,
                          color: "#111111",
                        }}
                      >
                        削除
                      </button>
                    </div>
                    <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                      {p.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/?view=PAUSE" style={btn}>
              入口へ戻る
            </Link>
            <Link href="/board" style={softBtn}>
              🧾 BOARDへ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

