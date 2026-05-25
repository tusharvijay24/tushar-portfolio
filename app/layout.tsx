import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import AIAssistant from "./components/AIAssistant";
import CommandPalette from "./components/CommandPalette";
import CursorSpotlight from "./components/CursorSpotlight";
import CustomCursor from "./components/CustomCursor";
import IntroLoader from "./components/IntroLoader";
import LenisProvider from "./components/LenisProvider";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tushar Vijayvargiya | Senior iOS & Web Developer",
  description:
    "Senior iOS Developer with 5+ years of experience shipping Swift, SwiftUI, UIKit, and React/Next.js apps across e-commerce, enterprise, NFC, and social commerce products.",
  metadataBase: new URL("https://tusharvijayvargiya.com"),
  openGraph: {
    title: "Tushar Vijayvargiya | Senior iOS & Web Developer",
    description:
      "Professional portfolio of Tushar Vijayvargiya, Senior iOS Developer with 5+ years of production app experience.",
    url: "https://tusharvijayvargiya.com",
    siteName: "Tushar Vijayvargiya",
    images: [{ url: "/tushar.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tushar Vijayvargiya | Senior iOS & Web Developer",
    description:
      "Senior iOS Developer with 5+ years shipping Swift, SwiftUI, and React/Next.js apps.",
    images: ["/tushar.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tusharvijayvargiya.com" },
  authors: [{ name: "Tushar Vijayvargiya" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${archivo.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tushar Vijayvargiya",
              url: "https://tusharvijayvargiya.com",
              jobTitle: "Senior iOS Developer",
              sameAs: ["https://github.com/tusharvijay24"],
              knowsAbout: [
                "iOS Development",
                "Swift",
                "SwiftUI",
                "UIKit",
                "React",
                "Next.js",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans">
        <LenisProvider>
          <IntroLoader />
          <CursorSpotlight />
          <CustomCursor />
          <CommandPalette />
          {children}
          <AIAssistant />
        </LenisProvider>
      </body>
    </html>
  );
}
