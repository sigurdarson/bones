import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { ScrollAreaVariants } from "@/components/scroll-area-examples";
import { ScrollAreaPlayground } from "@/components/scroll-area-playground";

export const Route = createFileRoute("/components/scroll-area")({
  head: () => ({ meta: [{ title: "Scroll area · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Scroll area" />
      <p className="lead">
        A scroll container with the same overlay scrollbars in every
        browser, wrapping the Base UI Scroll Area. One component: the
        viewport, both bars, thumbs, and corner render automatically, and
        the bars reveal on hover or while scrolling, like the{" "}
        <Link to="/scrollbars">site scrollbars</Link>.
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
        A bar appears only on an axis that overflows: release notes that
        wrap get the vertical bar alone, while a deploy log with long lines
        gets both, and the corner between them renders automatically.
      </p>
      <ScrollAreaVariants />
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
        Everything a div accepts passes through, so size it like any box
        with height, max-height, or width; the one prop worth naming:
      </p>
      <PropsTable
        rows={[
          {
            name: "aria-label",
            type: "string",
            description: "Names the scrollable region for screen readers.",
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
