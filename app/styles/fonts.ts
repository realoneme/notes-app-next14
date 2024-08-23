import { Noto_Sans_JP, Roboto } from "next/font/google";

const notojp = Noto_Sans_JP({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-notojp",
  preload: false,
  display: "swap",
});

// カスタムローカルフォントを定義する
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
});

export { notojp, roboto };
