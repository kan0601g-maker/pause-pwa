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
    setPosts([{ id: Date.now(), content }, ...posts]);
    setContent("");
  };

  return (
    <main className="min-h-screen bg-[#f5f5f4] text-[#44403c] p-8 sm:p-12">
      <div className="max-w-md mx-auto">
        {/* シンプルで美しいヘッダー */}
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-extralight tracking-[0.3em] text-[#57534e]">PAUSE</h1>
          <p className="text-[10px] text-[#a8a29e] mt-4 tracking-[0.4em] uppercase">Nurukari Economy</p>
        </header>

        {/* 投稿エリア（ここが「石」っぽい質感よ） */}
        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-200/50 mb-12">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="今、何を止めてる？"
            className="w-full h-32 p-0 bg-transparent text-lg outline-none resize-none placeholder:text-stone-300 border-none focus:ring-0"
          />
          <div className="flex justify-end mt-4">
            <button 
              onClick={handlePost}
              className="px-10 py-3 bg-[#57534e] text-white rounded-full text-sm font-medium hover:bg-[#44403c] active:scale-95 transition-all shadow-lg shadow-stone-200"
            >
              そっと置く
            </button>
          </div>
        </section>

        {/* 投稿リスト（ふんわり浮いている感じ） */}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="p-6 bg-white/50 border border-white rounded-[1.5rem] shadow-sm backdrop-blur-sm transition-all">
              <p className="text-[#78716c] leading-relaxed text-sm">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
