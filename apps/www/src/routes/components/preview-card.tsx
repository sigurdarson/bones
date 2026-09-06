import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PreviewCardPlayground } from "@/components/preview-card-playground";
import { PropsTable } from "@/components/props-table";

export const Route = createFileRoute("/components/preview-card")({
  head: () => ({ meta: [{ title: "Preview card · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Preview card" />
      <p className="lead">
        A rich preview that opens while hovering a link, wrapping the Base
        UI Preview Card. The trigger is a real anchor, so navigation works
        everywhere and the card is a bonus for pointer users. For plain
        text on any control, use the{" "}
        <Link to="/components/tooltip">Tooltip</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Hover (or focus) the link; the Code
        tab always shows the markup for exactly what you've configured.
      </p>
      <PreviewCardPlayground />
      <h2>Styling states</h2>
      <p>
        The trigger carries <code>data-popup-open</code> while the preview
        shows, and the popup carries <code>data-side</code> plus the{" "}
        <code>data-starting-style</code>/<code>data-ending-style</code>{" "}
        enter and exit hooks:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-preview-card-trigger[data-popup-open] {
  text-decoration-color: var(--ub-accent);
}`}
      />
      <h2>Props</h2>
      <p>
        The trigger is an anchor and takes every anchor prop; position
        lives on the content. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "PreviewCardTrigger.href",
            type: "string",
            description: "Where the link goes; clicking navigates like any anchor.",
          },
          {
            name: "PreviewCardTrigger.delay",
            type: "number",
            defaultValue: "600",
            description: "Milliseconds before opening on hover.",
          },
          {
            name: "PreviewCardContent.side",
            type: '"top" | "right" | "bottom" | "left"',
            defaultValue: '"bottom"',
            description: "Preferred side; flips to the opposite when out of room.",
          },
          {
            name: "PreviewCardContent.sideOffset",
            type: "number",
            defaultValue: "8",
            description: "Gap between the link and the card, in pixels.",
          },
          {
            name: "PreviewCardRoot.open",
            type: "boolean",
            description: "Controlled state. Pair with onOpenChange.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`PreviewCardRoot, PreviewCardTrigger, PreviewCardContent, from @usebones/react.
- Structure: PreviewCardRoot wraps PreviewCardTrigger (a real anchor; pass href) + PreviewCardContent (the floating preview; put an Avatar, headings, text inside).
- The preview is an enhancement: everything essential must be reachable through the link itself, since touch users never see the card.
- PreviewCardContent: side "bottom" (default) | "top" | "right" | "left", align, sideOffset (8). The card stays open while hovered, so links inside are clickable. Timing on the trigger: delay (600ms).
- Restyle in CSS via .ub-preview-card-popup, [data-popup-open] on the trigger, [data-side], [data-starting-style]/[data-ending-style]. Tokens only.`}
      />
    </>
  );
}
