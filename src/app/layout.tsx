import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const GTM_ID = "GTM-KPB2C8K";

export const metadata: Metadata = {
  title: "PAPAMAMA CAR'S × FIELDSTYLE 2026 出店決定！｜11/14(土)〜15(日) 愛知国際展示場",
  description:
    "PAPAMAMA CAR'SがFIELDSTYLE 2026に出店決定！2026年11月14日(土)〜15日(日)、愛知国際展示場（AICHI SKY EXPO）。愛車の相談・下取り査定OK。家族で楽しめる塗装体験イベントも開催。",
  openGraph: {
    title: "PAPAMAMA CAR'S × FIELDSTYLE 2026 出店決定！",
    description: "2026年11月14日(土)〜15日(日) 愛知国際展示場。愛車の相談・下取り査定OK。塗装体験イベントも開催。",
    type: "website",
    locale: "ja_JP",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Google Tag Manager */}
        {/* 指定スニペットを <head> 内上部にそのまま設置するため next/script 等は使わない */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
