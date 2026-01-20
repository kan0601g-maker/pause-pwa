import Link from 'next/link';

export default function EntryPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa', // 穏やかな薄いグレー
      color: '#333',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      {/* タイトル */}
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '300' }}>
        PAUSE
      </h1>

      {/* メインコンテンツ（ここが出ない問題を解消） */}
      <div style={{
        textAlign: 'center',
        opacity: 1, // 確実に見えるように
        transform: 'none',
        animation: 'fadeIn 1.5s ease-in'
      }}>
        <p style={{ marginBottom: '2rem', color: '#666', lineHeight: '1.6' }}>
          日常のノイズを止めて、<br />
          静かな対話を始めましょう。
        </p>

        {/* 掲示板へのリンクボタン */}
        <Link href="/board" style={{
          display: 'inline-block',
          padding: '12px 32px',
          backgroundColor: '#fff',
          color: '#555',
          textDecoration: 'none',
          borderRadius: '30px',
          border: '1px solid #ddd',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease'
        }}>
          掲示板の扉をひらく
        </Link>
      </div>

      {/* 簡易フェードインアニメーションの定義 */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; translateY(10px); }
          to { opacity: 1; translateY(0); }
        }
      `}} />
    </main>
  );
}
