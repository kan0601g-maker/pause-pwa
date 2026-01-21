// app/page.js
"use client";
import { useState } from 'react';

export default function NurukariPause() {
  const [isOpen, setIsOpen] = useState(false); // 扉が開いているかどうかの管理
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([
    { id: 1, content: "ヌルカリ経済圏へようこそ。まずは深呼吸して。" },
    { id: 2, content: "ここは、頑張るのを止める場所です。" }
  ]);

  // 掲示板の扉をひらく
  if (!isOpen) {
    return (
      <main className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-light text-stone-700 mb-4 tracking-widest">PAUSE</h1>
        <p className="text-stone-400 mb-12 text-center leading-relaxed">
          日常のノイズを止めて、<br />静かな対話を始めましょう。
        </p>
        <button 
          onClick={() => setIsOpen(true)}
          className="px-10 py-4 bg-white border border-stone-200 text-stone-600 rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all"
        >
          掲示板の扉をひらく
        </button>
      </main>
    );
  }

  // 扉の中（掲示板）
  return (
    <main className="min-h-screen bg-stone-100 p-8 text-stone-800">
      <div className="max-w-md mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold text-stone-700">PAUSE BOARD</h1>
          <button onClick={() => setIsOpen(false)} className="text-xs text-stone-400 underline">扉を閉じる</button>
        </header>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm mb-8">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="今、何を止めてる？"
            className="w-full h-32 p-4 bg-stone-50 rounded-2xl outline-none resize-none border-none"
          />
          <button 
            onClick={() => {
              if(!content) return;
              setPosts([{ id: Date.now(), content }, ...posts]);
              setContent("");
            }}
            className="w-full mt-4 py-4 bg-stone-800 text-white rounded-full font-medium active:scale-95 transition-all"
          >
            そっと置く
          </button>
        </div>

        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="p-5 bg-white/70 border border-white rounded-2xl shadow-sm">
              <p className="text-stone-600 leading-relaxed">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

