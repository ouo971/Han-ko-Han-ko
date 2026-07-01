import type { Metadata } from "next";
import { Outfit, Noto_Sans_KR, Gowun_Batang } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const gowunBatang = Gowun_Batang({
  variable: "--font-gowun-batang",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "한코한코 (Han-ko Han-ko) - 따뜻함을 뜨는 감성 뜨개숍",
  description: "정성을 담아 한 코씩 떠내려가는 편안하고 느린 삶의 미학, 한코한코가 엄선한 고품질 뜨개실, 콘사, DIY 패키지를 만나보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${outfit.variable} ${notoSansKr.variable} ${gowunBatang.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-brand-light text-brand-dark">
        {children}
      </body>
    </html>
  );
}
