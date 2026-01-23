// app/page.js
import Link from "next/link";

const HUB_ITEMS = [
  {
    href: "/pause",
    title: "pause",
    subtitle: "休憩・呼吸を整える",
    icon: "💤",
  },
  {
    href: "/rooms/starleaf",
    title: "STAR LEAF",
    subtitle: "演出・世界観（別ページ）",
    icon: "🍃",
  },
  {
    href: "/my-room",
    title: "my-room",
    subtitle: "個室（作業・整理）",
    icon: "🏠",
  },
  {
    href: "/rooms/echo",
    title: "echo",
    subtitle: "雑談・ログ",
    icon: "💬",
  },
  {
    href: "/board",
    title: "board",
    subtitle: "掲示・共有",
    icon: "📌",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-zinc-50 text-zinc-900">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        {/* Header */}
        <header className="mb-6">
          <div className="text-sm text-zinc-500">nuru market</div>
          <h1 className="mt-1 text-2xl font-semibold">HOME（入口・ハブ）</h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            ここは入口です。下の部屋を選んで移動してください。
            <span className="ml-2 text-zinc-500">
              ※STAR LEAF は演出専用で、HOMEではありません。
            </span>
          </p>
        </header>

        {/* Hub cards */}
        <section className="grid gap-3 sm:grid-cols-2">
          {HUB_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-lg">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="truncate text-base font-medium">
                      {item.title}
                    </div>
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                      {item.href}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-600">{item.subtitle}</p>
                  <div className="mt-3 text-sm text-zinc-500 transition group-hover:text-zinc-800">
                    開く →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Footer note */}
        <footer className="mt-8 rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
          <div className="font-medium text-zinc-800">運用ルール</div>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>HOME（/）はリンク集だけ（演出・stateは持たせない）</li>
            <li>演出は rooms 配下（/rooms/starleaf など）で自己完結</li>
            <li>迷ったら必ず HOME に戻る</li>
          </ul>
        </footer>
      </div>
    </main>
  );
}
