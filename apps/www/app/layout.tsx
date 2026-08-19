import type { Metadata, Viewport } from "next";
import "@usebones/tokens/index.css";
import "@usebones/tokens/scrollbars.css";
import "@usebones/react/styles.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { Sidebar } from "@/components/sidebar";
import { IconSetProvider } from "@/components/icon-set-provider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://usebones.com"),
  title: {
    default: "bones · minimal components, built for AI",
    template: "%s · bones",
  },
  description:
    "A minimal, themable component library built on Base UI. Designed to be read, composed, and extended by humans and agents alike.",
};

/* Applies stored theme before paint so there is no flash of the wrong mode. */
const themeInit = `(function(){try{var t=localStorage.getItem("ub-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.setAttribute("data-theme","dark");if(localStorage.getItem("ub-radius")==="pill")document.documentElement.setAttribute("data-radius","pill");var a=localStorage.getItem("ub-accent");if(a)document.documentElement.setAttribute("data-accent",a)}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <IconSetProvider>
          <SiteHeader />
          <div className="site-layout">
            <Sidebar />
            <main className="site-content">
              <article className="prose">{children}</article>
            </main>
          </div>
        </IconSetProvider>
      </body>
    </html>
  );
}
