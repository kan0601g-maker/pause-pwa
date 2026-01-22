"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

function getSlugFromParams(p) {
  // p.slug が string の場合
  if (typeof p?.slug === "string") return p.slug;
  // p.slug が配列の場合（まれにこう来る）
  if (Array.isArray(p?.slug) && typeof p.slug[0] === "string") return p.slug[0];
  // それでもダメなら空
  return "";
}

export default function RoomSlugPage() {
  const p = useParams();
  const slug = getSlugFromParams(p);

  const isPoem = slug === "poem";
  const isYotte = slug === "yottemita";

  // ========== 共通（宇宙船テーマ：他room用） ==========
  const bg = "#05070f";
  const card = "#0b1020";
  const border = "rgba(125,211,252,0.35)";
  const text = "#e5e7eb";
  const sub = "#9ca3af";

  const shell = {
    minHeight: "100vh",
    background: bg,
    color: text,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
    padding: 24,
  };

  const frame = {
    maxWidth: 920,
    margin: "0 auto",
    borderRadius: 28,
    border: `2px solid ${border}`,
    background: card,
    padding: 32,
    textAlign: "center",
  };

  const btn = {
    padding: "14px 18px",
    borderRadius: 18,
    fontSize: 14,
    cursor: "pointer",
    border: `1px solid ${border}`,
    background: "rgba(255,255,255,0.04)",
    color: text,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  };

  // ========== 白テーマ（poem / yottemita 用） ==========
  const whiteShell = {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#111111",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
    padding: 24,
  };

  const whiteWrap = {
    maxWidth: 860,
    margin: "0 auto",
    padding: "24px 18px",
  };

  const whiteCard = {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 18,
    background: "#ffffff",
    textAlign: "left",
  };

  const whiteBtn = {
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

  const ghostBtn = {
    ...whiteBtn,
    background: "#f9fafb",
  };

  // 画面確認用（あとで消せる）
  const debugPill = (
    <div
      style={{
        position: "fixed",
        right: 12,
        bottom: 12,
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        background: "rgba(0,0,0,0.55)",
        color: "#fff",
        zIndex: 9999,
      }}
    >
      slug={slug || "(empty)"}
    </div>
  );

  // ========== poem ==========
  const poemLead = useMemo(
    () => [
      "意味にならなくても、言っていい。",
      "正しさじゃなくて、ことばのかけらを。",
      "ここは、静かな言葉の部屋です。",
    ],
    []
  );

  if (isPoem) {
    return (
      <div style={whiteShell}>
        {debugPill}
        <div style={whiteWrap}>
          <div style={{ textAlign: "left", marginTop: 12 }}>
            <div style={{ fontSize: 32, fontWeight: 700 }}>
              ぽえむ（言ってもいいのよ）
            </div>

            <div style={{ marginTop: 14, lineHeight: 1.9, color: "#374151" }}>
              {poemLead.map((t, i) => (
                <div key={i}>{t}</div>
              ))}
            </div>

            <div style={{ marginTop: 22, ...whiteCard }}>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>準備中</div>
              <div style={{ color: "#374151" }}>
                いまは、部屋の空気を整えています。
              </div>
              <div style={{ marginTop: 8, color: "#374151" }}>
                言葉が出ない日でも、大丈夫です。
              </div>
            </div>

            <div style={{ marginTop: 18, ...whiteCard }}>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>
                そっと置いていい場所
              </div>
              <div style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.7 }}>
                ここに書いたものは、保存も送信もしません。<br />
                ただ置いて、閉じていい。
              </div>

              <textarea
                placeholder="（ここに、ことばのかけらを）"
                rows={6}
                style={{
                  marginTop: 12,
                  width: "100%",
                  padding: 12,
                  borderRadius: 10,
                  border: "1px solid #e5e7eb",
                  outline: "none",
                  fontSize: 14,
                  lineHeight: 1.7,
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ marginTop: 18 }}>
              <Link href="/?view=PAUSE" style={whiteBtn}>
                入口へ戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== yottemita ==========
  const YOTTE_KEY = "PAUSE_YOTTE_POSTS_V1";

  const yotteLead = useMemo(
    () => [
      "とりあえず、よってみたで大丈夫。",
      "書いてもいいし、書かなくてもいい。",
      "ここは「ひとり言」のための部屋です。",
    ],
    []
  );

  const [yotteText, setYotteText] = useState("");
  const [yottePosts, setYottePosts] = useState([]);

  useEffect(() => {
    if (!isYotte) return;
    try {
      const raw = localStorage.getItem(YOTTE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      if (Array.isArray(arr)) setYottePosts(arr);
    } catch {
      setYottePosts([]);
    }
  }, [isYotte]);

  function saveYotte(next) {
    setYottePosts(next);
    try {
      localStorage.setItem(YOTTE_KEY, JSON.stringify(next));
    } catch {}
  }

  function addYotte() {
    const t = (yotteText || "").trim();
    if (!t) return;
    const item = {
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      text: t,
      ts: Date.now(),
    };
    const next = [item, ...yottePosts].slice(0, 200);
    saveYotte(next);
    setYotteText("");
  }

  function removeYotte(id) {
    const next = yottePosts.filter((p) => p.id !== id);
    saveYotte(next);
  }

  function clearAllYotte() {
    saveYotte([]);
  }

  function formatTs(ts) {
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

  if (isYotte) {
    return (
      <div style={whiteShell}>
        {debugPill}
        <div style={whiteWrap}>
          <div style={{ textAlign: "left", marginTop: 12 }}>
            <div style={{ fontSize: 32, fontWeight: 700 }}>よってみた</div>

            <div style={{ marginTop: 14, lineHeight: 1.9, color: "#374151" }}>
              {yotteLead.map((t, i) => (
                <div key={i}>{t}</div>
              ))}
            </div>

            <div style={{ marginTop: 22, ...whiteCard }}>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>
                ひとこと（端末内保存）
              </div>

              <textarea
                value={yotteText}
                onChange={(e) => setYotteText(e.target.value)}
                placeholder="（今の気持ちを、短く）"
                rows={3}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 10,
                  border: "1px solid #e5e7eb",
                  outline: "none",
                  fontSize: 14,
                  lineHeight: 1.7,
                  resize: "vertical",
                }}
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
                <button
                  onClick={addYotte}
                  style={{
                    ...whiteBtn,
                    borderColor: "#111827",
                    background: "#111827",
                    color: "#ffffff",
                  }}
                >
                  置く
                </button>

                <button
                  onClick={() => setYotteText("")}
                  style={ghostBtn}
                  title="入力欄をクリア"
                >
                  クリア
                </button>

                <div style={{ marginLeft: "auto", color: "#6b7280", fontSize: 12 }}>
                  {yottePosts.length} 件
                </div>
              </div>

              <div style={{ marginTop: 10, color: "#6b7280", fontSize: 12 }}>
                ※ 保存はこの端末のみ（サーバ送信なし）
              </div>
            </div>

            <div style={{ marginTop: 18, ...whiteCard }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontWeight: 700 }}>ログ</div>
                <button
                  onClick={clearAllYotte}
                  style={{ ...ghostBtn, marginLeft: "auto" }}
                  title="全部消す（端末内だけ）"
                >
                  全削除
                </button>
              </div>

              {yottePosts.length === 0 ? (
                <div style={{ marginTop: 12, color: "#6b7280", fontSize: 13 }}>
                  まだ何もありません。最初の「ひとこと」を置いてもいい。
                </div>
              ) : (
                <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                  {yottePosts.map((p) => (
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
                          {formatTs(p.ts)}
                        </div>
                        <button
                          onClick={() => removeYotte(p.id)}
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
              <Link href="/?view=PAUSE" style={whiteBtn}>
                入口へ戻る
              </Link>
              <Link href="/board" style={ghostBtn}>
                🧾 BOARDへ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== その他rooms（宇宙船テンプレ） ==========
  const allowed = new Set(["yottemita", "poem", "manager"]);
  const known = allowed.has(slug);

  const iconMap = { manager: "🧑‍✈️" };
  const titleMap = { manager: "MANAGER" };

  const lead = known
    ? "準備中（テンプレ表示）"
    : "この部屋はまだ登録されていません（テンプレ表示）";

  const cardTitle = known ? "準備中" : "未登録";
  const cardBody = known
    ? ["いまは、部屋を準備しています。"]
    : ["このslugはまだ登録されていません。"];

  return (
    <div style={shell}>
      {debugPill}
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 22, letterSpacing: 4, fontWeight: 700 }}>
          ROOM
        </div>
        <div style={{ fontSize: 12, color: sub, marginTop: 6 }}>
          THEME : SPACESHIP
        </div>
      </div>

      <div style={frame}>
        <div style={{ fontSize: 12, color: sub }}>ROOM SLUG</div>

        <div style={{ marginTop: 8, fontSize: 26, fontWeight: 700 }}>
          {known
            ? `${iconMap[slug] || "🚪"} ${titleMap[slug] || slug}`
            : `🚪 ${slug || "(empty)"}`}
        </div>

        <div style={{ marginTop: 10, color: sub, fontSize: 13 }}>{lead}</div>

        <div
          style={{
            marginTop: 18,
            border: `1px solid ${border}`,
            borderRadius: 16,
            padding: 16,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>{cardTitle}</div>
          {cardBody.map((t, i) => (
            <div
              key={i}
              style={{ marginTop: i ? 6 : 0, color: sub, fontSize: 13 }}
            >
              {t}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 22,
            display: "grid",
            gap: 12,
            justifyItems: "center",
          }}
        >
          <Link href="/?view=PAUSE" style={{ ...btn, width: "min(420px, 100%)" }}>
            ← PAUSE に戻る
          </Link>

          <Link href="/board" style={{ ...btn, width: "min(420px, 100%)" }}>
            🧾 BOARD（ひとこと）
          </Link>

          <Link href="/" style={{ ...btn, width: "min(420px, 100%)" }}>
            ← HOUSE
          </Link>
        </div>

        <div style={{ marginTop: 16, color: sub, fontSize: 12 }}>
          ※ poem / yottemita は白テーマ。他は宇宙船テーマ（段階的に育てる）
        </div>
      </div>
    </div>
  );
}
