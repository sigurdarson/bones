import * as React from "react";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import tokensCss from "@usebones/tokens/index.css?url";
import scrollbarsCss from "@usebones/tokens/scrollbars.css?url";
/* Inert until data-theme="matrix"; the theming page's demo switch sets it. */
import matrixCss from "@usebones/tokens/themes/matrix.css?url";
import reactCss from "@usebones/react/styles.css?url";
import globalsCss from "../globals.css?url";
import { ToastProvider, Toaster } from "@usebones/react";
import { SiteHeader } from "@/components/site-header";
import { Sidebar } from "@/components/sidebar";
import { IconSetProvider } from "@/components/icon-set-provider";

/* Applies stored theme before paint so there is no flash of the wrong mode. */
const themeInit = `(function(){try{var t=localStorage.getItem("ub-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.setAttribute("data-theme","dark");if(localStorage.getItem("ub-radius")==="pill")document.documentElement.setAttribute("data-radius","pill");var a=localStorage.getItem("ub-accent");if(a)document.documentElement.setAttribute("data-accent",a)}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1",
      },
      { title: "Bones · minimal components, built for AI" },
      {
        name: "description",
        content:
          "A minimal, themable component library built on Base UI. Designed to be read, composed, and extended by humans and agents alike.",
      },
    ],
    links: [
      /* Tokens first, then component styles, then the site's own. */
      { rel: "stylesheet", href: tokensCss },
      { rel: "stylesheet", href: scrollbarsCss },
      { rel: "stylesheet", href: matrixCss },
      { rel: "stylesheet", href: reactCss },
      { rel: "stylesheet", href: globalsCss },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
    ],
    scripts: [{ children: themeInit }],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <RootDocument>
      <IconSetProvider>
        <ToastProvider>
          <SiteHeader />
          <div className="site-layout">
            <Sidebar />
            <main className="site-content">
              <article className="prose">
                <Outlet />
              </article>
            </main>
          </div>
          <Toaster />
        </ToastProvider>
      </IconSetProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <>
      <h1>Not found</h1>
      <p>That page doesn't exist. Try the sidebar, or head home.</p>
    </>
  );
}
