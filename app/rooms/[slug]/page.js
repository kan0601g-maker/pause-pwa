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

  // mode:
  // - "log"    = ひとこと保存（今までの rooms）
  // - "thread" = 会話（投稿 + 返信1段）
  const ROOM = useMemo(() => {
    const map = {
      yottemita: {
        mode: "log",
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
        mode: "log",
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
        mode: "log",
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

      // ✅ 雑談OK（会話部屋）
      echo: {
        mode: "thread",
        title: "echo（返してもいい部屋）",
        lead: [
          "ここでは、返事を書いてもいい。",
          "無視されてもいい。続かなくてもいい。",
          "雑談OK。けど、傷つけ合いは持ち込まない。",
        ],
        placeholder: "（ひとこと / 雑談の種）",
        actionLabel: "投げる",
        emptyLabel: "まだ何もありません。軽く投げていい。",
        allowLeaf: false,
      },

      // ✅ STAR LEAF専用（会話部屋）
      starleaf: {
        mode: "thread",
        title: "STAR LEAF（語っていい部屋）",
        lead: [
          "スターリーフの話で盛り上がっていい。",
          "妄想OK。広げてOK。途中で止めてもOK。",
          "雑談は echo へ。ここは世界観専用。",
        ],
        placeholder: "（スターリーフの種：設定 / シーン / ルール / 名前）",
        actionLabel: "芽を置く",
        emptyLabel: "まだ何もありません。最初の芽を置いていい。",
        allowLeaf: true, // 🌿 リアクション
      },
    };
    return map[slug] || null;
  }, [slug]);

  // ==== UI（白テーマ統一）====
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
              登録済み：yottemita / poem / manager / echo / starleaf
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

  // =========================================================
  // mode: log（ひとこと）
  // =========================================================
  if (ROOM.mode === "log") {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

                <button onClick={() => setText("")} style={softBtn}>
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
                      }}
                    >
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div style={{ color: "#6b7280", fontSize: 12 }}>
                          {fmt(p.ts)}
                        </div>
                        <button
                          onClick={() => remove(p.id)}
                          style={{ ...softBtn, marginLeft: "auto", padding: "6px 10px", fontSize: 12 }}
                        >
                          削除
                        </button>
                      </div>

                      <div style={{ marginTop: 8, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
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

  // =========================================================
  // mode: thread（会話：投稿 + 返信1段、starleafは🌿可）
  // =========================================================
  const KEY = `PAUSE_ROOM_THREAD_V1__${slug}`;
  const [text, setText] = useState("");
  const [threads, setThreads] = useState([]);
  const [openReplyId, setOpenReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const arr = raw ? JSON.parse(raw) : [];
      if (Array.isArray(arr)) setThreads(arr);
    } catch {
      setThreads([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [KEY]);

  function save(next) {
    setThreads(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }

  function addThread() {
    const t = (text || "").trim();
    if (!t) return;
    const item = {
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      text: t,
      ts: Date.now(),
      leaf: 0, // starleaf用
      replies: [],
    };
    const next = [item, ...threads].slice(0, 300);
    save(next);
    setText("");
  }

  function removeThread(id) {
    const next = threads.filter((x) => x.id !== id);
    save(next);
    if (openReplyId === id) {
      setOpenReplyId(null);
      setReplyText("");
    }
  }

  function addReply(parentId) {
    const t = (replyText || "").trim();
    if (!t) return;

    const next = threads.map((x) => {
      if (x.id !== parentId) return x;
      const r = {
        id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
        text: t,
        ts: Date.now(),
      };
      const replies = [r, ...(Array.isArray(x.replies) ? x.replies : [])].slice(0, 50);
      return { ...x, replies };
    });

    save(next);
    setReplyText("");
    setOpenReplyId(null);
  }

  function removeReply(parentId, replyId) {
    const next = threads.map((x) => {
      if (x.id !== parentId) return x;
      const replies = (x.replies || []).filter((r) => r.id !== replyId);
      return { ...x, replies };
    });
    save(next);
  }

  function leafUp(parentId) {
    if (!ROOM.allowLeaf) return;
    const next = threads.map((x) => {
      if (x.id !== parentId) return x;
      const leaf = Number.isFinite(x.leaf) ? x.leaf + 1 : 1;
      return { ...x, leaf };
    });
    save(next);
  }

  function clearAll() {
    save([]);
    setOpenReplyId(null);
    setReplyText("");
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
              会話（端末内保存）
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
              <button onClick={addThread} style={primaryBtn}>
                {ROOM.actionLabel}
              </button>

              <button onClick={() => setText("")} style={softBtn}>
                クリア
              </button>

              <div style={{ marginLeft: "auto", color: "#6b7280", fontSize: 12 }}>
                {threads.length} 件
              </div>
            </div>

            <div style={{ marginTop: 10, color: "#6b7280", fontSize: 12 }}>
              ※ いまは端末内だけ（他人とは共有されません）
            </div>
          </div>

          <div style={{ marginTop: 18, ...card }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontWeight: 700 }}>ログ</div>
              <button onClick={clearAll} style={{ ...softBtn, marginLeft: "auto" }}>
                全削除
              </button>
            </div>

            {threads.length === 0 ? (
              <div style={{ marginTop: 12, color: "#6b7280", fontSize: 13 }}>
                {ROOM.emptyLabel}
              </div>
            ) : (
              <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
                {threads.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: 12,
                      padding: 12,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ color: "#6b7280", fontSize: 12 }}>{fmt(t.ts)}</div>

                      {ROOM.allowLeaf && (
                        <button
                          onClick={() => leafUp(t.id)}
                          style={{ ...softBtn, padding: "6px 10px", fontSize: 12 }}
                          title="🌿"
                        >
                          🌿 {Number.isFinite(t.leaf) ? t.leaf : 0}
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setOpenReplyId(openReplyId === t.id ? null : t.id);
                          setReplyText("");
                        }}
                        style={{ ...softBtn, marginLeft: "auto", padding: "6px 10px", fontSize: 12 }}
                      >
                        ↩ 返す
                      </button>

                      <button
                        onClick={() => removeThread(t.id)}
                        style={{ ...softBtn, padding: "6px 10px", fontSize: 12 }}
                      >
                        削除
                      </button>
                    </div>

                    <div style={{ marginTop: 8, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                      {t.text}
                    </div>

                    {/* replies */}
                    {(t.replies || []).length > 0 && (
                      <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                        {(t.replies || []).map((r) => (
                          <div
                            key={r.id}
                            style={{
                              border: "1px solid #f1f5f9",
                              background: "#f9fafb",
                              borderRadius: 10,
                              padding: 10,
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ color: "#6b7280", fontSize: 12 }}>{fmt(r.ts)}</div>
                              <button
                                onClick={() => removeReply(t.id, r.id)}
                                style={{ ...softBtn, marginLeft: "auto", padding: "5px 10px", fontSize: 12 }}
                              >
                                削除
                              </button>
                            </div>
                            <div style={{ marginTop: 6, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                              {r.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* reply box */}
                    {openReplyId === t.id && (
                      <div style={{ marginTop: 10 }}>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="（返事は短くでOK）"
                          rows={3}
                          style={{ ...textarea, marginTop: 0, minHeight: 0 }}
                        />
                        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                          <button onClick={() => addReply(t.id)} style={primaryBtn}>
                            返す
                          </button>
                          <button
                            onClick={() => {
                              setOpenReplyId(null);
                              setReplyText("");
                            }}
                            style={softBtn}
                          >
                            やめる
                          </button>
                        </div>
                      </div>
                    )}
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

