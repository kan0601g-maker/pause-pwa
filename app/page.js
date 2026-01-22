"use client";
import { useState } from 'react';
import Link from "next/link";

export default function NuruMarketMaster() {
  // ここで "house" を指定しているから、最初は必ず王冠が出るわ！
  const [view, setView] = useState("house"); 
  const [theme, setTheme] = useState("spaceship");
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  // ------------------------------------------
  // 【画面1】PAUSE（オーナーこだわりのエントランス）
  // ------------------------------------------
  if (view === "pause") {
    const roomLinkStyle = { color: "#666", textDecoration: "none", display: "inline-block", padding: "6px 10px", borderRadius: "10px" };
    return (
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#f8f9fa", color: "#333", fontFamily: "sans-serif", padding: "20px", textAlign: "center" }}>
        <button onClick={() => setView("house")} style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '12px', color: '#ccc', border: 'none', background: 'none', cursor: 'pointer' }}>← HOUSE</button>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", fontWeight: 300 }}>PAUSE</h1>
        <p style={{ marginBottom: "2rem", color: "#666" }}>くつろいでいってください。</p>
        <Link href="/board" style={{ display: "inline-block", padding: "12px 32px", backgroundColor: "#fff", color: "#555", textDecoration: "none", borderRadius: "30px", border: "1px solid #ddd", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: "28px" }}>掲示板の扉をひらく</Link>
        <div style={{ lineHeight: 2.2 }}>
          <div><Link href="/rooms/yottemita" style={roomLinkStyle}>よってみた</Link></div>
          <div><Link href="/rooms/poem" style={roomLinkStyle}>ぽえむ（言ってもいいのよ）</Link></div>
          <div><Link href="/rooms/manager" style={roomLinkStyle}>ちょっと一息（管理人さん）</Link></div>
        </div>
      </main>
    );
  }

  // ------------------------------------------
  // 【画面2】STAR LEAF（反乱軍スキャナー）
  // ------------------------------------------
  if (view === "star-leaf") {
    return (
      <main className="min-h-screen bg-black text-green-500 font-mono p-4 flex flex-col items-center border-[12px] border-black">
        <div className="w-full max-w-4xl border-2 border-green-500 p-8 flex flex-col items-center min-h-[90vh] relative">
          <header className="text-center mb-12"><h1 className="text-5xl font-black tracking-[0.5em] text-green-400">STAR LEAF</h1></header>
          <button onClick={startScan} className="w-64 h-24 border-2 border-green-400 text-xl shadow-[0_0_20px_rgba(74,222,128,0.5)]">
            {isScanning ? "SEARCHING..." : "SCANNING START"}
          </button>
          <button onClick={() => setView("house")} className="mt-auto text-xs text-yellow-400 underline italic">ヌールマーケットで官給品を調達する >></button>
        </div>
      </main>
    );
  }

  // ------------------------------------------
  // 【画面3】NURU MARKET HOUSE（ここが王冠画面！）
  // ------------------------------------------
  const themeStyles = theme === "nordic" ? "bg-orange-50 text-stone-800 border-orange-200" : "bg-slate-950 text-cyan-400 border-cyan-900";

  return (
    <main className={`min-h-screen ${themeStyles.split(' ')[0]} flex flex-col items-center p-8 font-mono`}>
      <header className="text-center mb-6 w-full max-w-2xl border-b pb-4 border-opacity-20">
        <h1 className="text-4xl font-black tracking-widest uppercase italic">NURU MARKET HOUSE</h1>
        <div className="flex gap-4 justify-center mt-4 text-[10px]">
           <button onClick={() => setTheme("spaceship")} className="border px-2 py-1 rounded">宇宙船</button>
           <button onClick={() => setTheme("nordic")} className="border px-2 py-1 rounded">北欧風</button>
        </div>
      </header>

      <div className={`relative w-full max-w-2xl aspect-video rounded-[3rem] border-4 flex items-center justify-center shadow-2xl ${themeStyles.split(' ')[1]} ${themeStyles.split(' ')[2]}`}>
        <div className="text-7xl cursor-pointer active:scale-110 transition-transform">👑<span className="text-[10px] block mt-2 text-center font-black italic">Owner Yocchi</span></div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6 w-full max-w-md">
        <button onClick={() => setView("pause")} className="p-6 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition-all text-center group">
          <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">☕️</div>
          <div className="text-xs font-bold tracking-widest italic uppercase text-white">Pause</div>
        </button>
        <button onClick={() => setView("star-leaf")} className="p-6 bg-emerald-900/20 border border-emerald-500/30 rounded-2xl hover:bg-emerald-900/40 transition-all text-center group">
          <div className="text-2xl mb-1 group-hover:rotate-12 transition-transform">🌿</div>
          <div className="text-xs font-bold tracking-widest text-emerald-400 italic">STAR LEAF</div>
        </button>
      </div>
    </main>
  );
}
