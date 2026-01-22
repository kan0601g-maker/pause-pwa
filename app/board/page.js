"use client";
import Link from "next/link";

export default function BoardPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        color: "#333",
        fontFamily: "sans-serif",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 300, marginBottom: 12 }}>
          掲示板（PAUSE）
        </h1>

        <p style={{ color: "#666", lineHeight: 1.8, marginTop: 0 }}>
          ここは、立ち止まるための場所です。<br />
          書いてもいいし、書かなくてもいい。<br />
          無理に前向きにならなくても大丈夫です。
        </p>

        <div
          style={{
            marginTop: 24,
            padding: 16,
            border: "1px solid #ddd",
            borderRadius: 12,
            background: "#fff",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 10 }}>最低ルール</div>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8, color: "#555" }}>
            <li>匿名（名前・肩書き・実績で勝負しない）</li>
            <li>いいね・評価・ランキングなし</li>
            <li>求められない助言はしない（説教しない）</li>
            <li>攻撃・晒し・詮索はしない</li>
            <li>返信しなくてもOK（沈黙もOK）</li>
          </ul>
        </div>

        <p style={{ marginTop: 20, fontSize: 13, opacity: 0.75 }}>
          ※ いまは「文章だけの掲示板」です。投稿機能はまだありません。
        </p>

        <div style={{ marginTop: 28 }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "10px 22px",
              backgroundColor: "#fff",
              color: "#555",
              textDecoration: "none",
              borderRadius: "30px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            入口へ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
