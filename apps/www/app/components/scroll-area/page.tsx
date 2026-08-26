import type { Metadata } from "next";
import Link from "next/link";
import { ScrollArea } from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { ScrollAreaPlayground } from "@/components/scroll-area-playground";
import { Showcase } from "@/components/showcase";

export const metadata: Metadata = { title: "Scroll area" };

export default function Page() {
  return (
    <>
      <PageHeader title="Scroll area" />
      <p className="lead">
        A scroll container with the same overlay scrollbars in every
        browser, wrapping the Base UI Scroll Area. One component: the
        viewport, both bars, thumbs, and corner render automatically, and
        the bars reveal on hover or while scrolling, like the{" "}
        <Link href="/scrollbars">site scrollbars</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Scroll inside the box (or focus it and use the arrow keys). The
        Code tab always shows the markup for exactly what you've
        configured.
      </p>
      <ScrollAreaPlayground />
      <h2>Variants</h2>
      <p>
        Content that overflows both axes gets both bars, and the corner
        between them renders automatically. Deploy logs and wide tables
        are the usual suspects.
      </p>
      <Showcase
        code={`<ScrollArea
  style={{
    height: "10rem",
    width: "18rem",
    border: "1px solid var(--ub-border)",
    borderRadius: "var(--ub-radius-md)",
  }}
  aria-label="Deploy log"
>
  <pre>{deployLog}</pre>
</ScrollArea>`}
      >
        <ScrollArea
          style={{
            height: "10rem",
            width: "18rem",
            border: "1px solid var(--ub-border)",
            borderRadius: "var(--ub-radius-md)",
          }}
          aria-label="Deploy log"
        >
          <pre
            style={{
              margin: 0,
              padding: "0.75rem",
              width: "max-content",
              fontSize: "0.8125rem",
              lineHeight: 1.6,
              color: "var(--ub-text-secondary)",
            }}
          >
            {`12:01:14 build   pulling base image node:22-slim (cached)
12:01:15 build   pnpm install --frozen-lockfile completed in 8.2s
12:01:24 build   turbo build: packages/tokens, packages/react, apps/www
12:01:58 build   next build finished: 24 static routes, 0 warnings
12:02:03 deploy  uploading 214 assets to the edge network
12:02:19 deploy  promoting deployment to production
12:02:20 deploy  aliasing usebones.com and www.usebones.com
12:02:21 ready   deployment live in 67s`}
          </pre>
        </ScrollArea>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        Scrollbars carry <code>data-orientation</code>, plus{" "}
        <code>data-hovering</code> and <code>data-scrolling</code> while
        active; that pair drives the reveal, so custom styling never needs
        JavaScript:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-scroll-area-thumb {
  background: oklch(from var(--ub-accent) l c h / 0.5);
}`}
      />
      <h2>Props</h2>
      <p>
        Everything a div accepts passes through; size it like any box
        (height, max-height, width). Give a named region an{" "}
        <code>aria-label</code> so screen readers know what's scrolling.
        There are no Bones-specific props; both bars are always wired and
        each appears only when its axis actually overflows.
      </p>
      <PropsTable
        rows={[
          {
            name: "aria-label",
            type: "string",
            description: "Names the scrollable region for screen readers.",
          },
          {
            name: "style / className",
            type: "CSSProperties / string",
            description: "Sizing lives here: height or max-height for vertical, width for horizontal.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`ScrollArea, from @usebones/react.
- One component; wrap the content and size the ScrollArea like a box (height/max-height/width). Both scrollbars are wired automatically and each shows only when its axis overflows.
- Bars reveal on hover and while scrolling; the viewport is focusable so keyboard scrolling works. Add aria-label to name the region.
- Use it for panes inside the app (lists, code, chat logs), not the page itself; the page keeps native scrolling with the tokens scrollbar styles.
- Restyle in CSS via .ub-scroll-area-scrollbar, .ub-scroll-area-thumb, [data-orientation], [data-hovering], [data-scrolling]. Tokens only.`}
      />
    </>
  );
}
