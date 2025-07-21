import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CGP（クリエゲーム制作プロジェクト）",
  description: "和歌山大学で活動するゲーム制作団体です。私たちは、本気でゲーム制作に取り組みたい学生たちが集まり、その情熱と才能を最大限に発揮できる場所となることを目指しています。初心者から経験者まで、プログラマー、デザイナー、プランナー、サウンドクリエイターなど、あらゆる役割の仲間を歓迎します！",
  icons: {
    icon: "/icon_400x400.jpg",
    shortcut: "/icon_400x400.jpg",
    apple: "/icon_400x400.jpg",
  },
  openGraph: {
    title: "CGP（クリエゲーム制作プロジェクト）",
    description: "和歌山大学で活動するゲーム制作団体です。私たちは、本気でゲーム制作に取り組みたい学生たちが集まり、その情熱と才能を最大限に発揮できる場所となることを目指しています。",
    url: "https://your-domain.com", // 実際のドメインに変更してください
    siteName: "CGP",
    images: [
      {
        url: "/banner_1500x500.png",
        width: 1500,
        height: 500,
        alt: "CGP（クリエゲーム制作プロジェクト）",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CGP（クリエゲーム制作プロジェクト）",
    description: "和歌山大学で活動するゲーム制作団体です。",
    images: ["/banner_1500x500.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
