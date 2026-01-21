// app/page.js
"use client";
import { useState } from 'react';

export default function NurukariPause() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([
    { id: 1, content: "ヌルカリ経済圏へようこそ。まずは深呼吸して。" },
    { id: 2, content: "ここは、頑張るのを止める場所です。何でもそっと置いていって。" }
  ]);

  const handlePost = () => {
    if (!content) return;
    // 投稿を上に追加（今はまだ「保存」はされないけど、画面には出るわw）
    setPosts([{ id: Date.now(), content }, ...posts]);
    setContent("");
  };

  return (
    <main className="min-h-screen bg-[#f5f5f4] text-[#44403c] p-6 sm:p-12 font-sans">
      <div className="max-w-md mx-auto">
        {/* ヘッダー */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extralight tracking-[0.2em] text-[#57534e]">PAUSE</h1>
          <p className="text-xs text-[#a8a29e] mt-4 tracking-widest uppercase">Nurukari Economy</p>
        </header>

        {/* 投稿エリア */}
        <section className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-sm border border-white/50 mb-10">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="今、何を止めてる？"
            className="w-full h-32 p-0 bg-transparent text-lg outline-none resize-none placeholder:text-[#d6d3d1] border-none focus:ring-0"
          />
          <div className="flex justify-end mt-4">
            <button 
              onClick={handlePost}
              className="px-8 py-3 bg-[#57534e] text-white rounded-full text-sm font-medium hover:bg-[#44403c] active:scale-95 transition-all shadow-lg shadow-stone-200"
            >
              そっと置く
            </button>
          </div>
        </section>

        {/* 掲示板リスト */}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="group p-6 bg-white/40 border border-white/20 rounded-3xl transition-all hover:bg-white/60">
              <p className="text-[#78716c] leading-relaxed text-sm">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
