export const metadata = {
  title: "pause-pwa",
  description: "pause-pwa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
