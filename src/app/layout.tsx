import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { siteConfig, themeConfig, themeToCss } from "@/config/siteConfig";
import { getProfile } from "@/lib/portfolio";
import { RevealObserver } from "@/components/RevealObserver";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const profile = getProfile();
const title = `${profile.name} | ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${profile.name}` },
  description: profile.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteConfig.url }],
  creator: profile.name,
  keywords: profile.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.description,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: themeConfig.background,
  colorScheme: "dark",
};

/** Marks JS as available before first paint so scroll-reveal never hides content for no-JS users. */
const enableJsClass = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Theme colours from .env.local → CSS variables (values are validated in siteConfig). */}
        <style id="theme-variables" dangerouslySetInnerHTML={{ __html: themeToCss() }} />
        <script dangerouslySetInnerHTML={{ __html: enableJsClass }} />
      </head>
      <body className="min-h-svh">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <div aria-hidden="true" className="page-backdrop" />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
