import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const notoSansJP = Noto_Sans_JP({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "シンプルなメモアプリ",
  description: "Keep your notes organized and accessible.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={`${notoSansJP.variable} font-sans`}>
        {children}
        <Toaster
          toastOptions={{ style: { textAlign: "center", fontSize: 12 } }}
        />
      </body>
    </html>
  );
}
