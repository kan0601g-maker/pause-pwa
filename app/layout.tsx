export const metadata = {
  title: "PAUSE",
  description: "気楽にいていい場所",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
