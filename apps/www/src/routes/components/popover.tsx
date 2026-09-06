import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PopoverPlayground } from "@/components/popover-playground";
import { PropsTable } from "@/components/props-table";

export const Route = createFileRoute("/components/popover")({
  head: () => ({ meta: [{ title: "Popover · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Popover" />
      <p className="lead">
        A small panel anchored to a button, wrapping the Base UI Popover.
        Non-modal by default: the page behind stays interactive. For a
        plain text label, reach for the{" "}
        <Link to="/components/tooltip">Tooltip</Link> instead.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <PopoverPlayground />
      <h2>Styling states</h2>
      <p>
        The trigger carries <code>data-popup-open</code> while open; the
        popup carries <code>data-side</code> and the{" "}
        <code>data-starting-style</code>/<code>data-ending-style</code>{" "}
        enter and exit hooks:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-popover-trigger[data-popup-open] {
  background: var(--ub-bg-muted);
}`}
      />
      <h2>Props</h2>
      <p>
        Position lives on the content; the title and description wire the
        panel's accessible name and description automatically. The
        essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "PopoverTrigger.render",
            type: "ReactElement",
            description: "The real control that opens the panel, usually a Bones Button.",
          },
          {
            name: "PopoverContent.side",
            type: '"top" | "right" | "bottom" | "left"',
            defaultValue: '"bottom"',
            description: "Preferred side; flips to the opposite when out of room.",
          },
          {
            name: "PopoverContent.align",
            type: '"center" | "start" | "end"',
            defaultValue: '"center"',
            description: "Alignment along the chosen side.",
          },
          {
            name: "PopoverContent.initialFocus",
            type: "RefObject<HTMLElement>",
            description: "Where focus lands on open; defaults to the first focusable part.",
          },
          {
            name: "PopoverRoot.open",
            type: "boolean",
            description: "Controlled state. Pair with onOpenChange.",
          },
          {
            name: "PopoverRoot.modal",
            type: "boolean",
            defaultValue: "false",
            description: "Traps focus and blocks the page behind; prefer a dialog at that point.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`PopoverRoot, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, PopoverClose, from @usebones/react.
- Structure: PopoverRoot wraps PopoverTrigger + PopoverContent; put PopoverTitle (names the panel), PopoverDescription, and any controls inside the content. PopoverClose closes it.
- Attach trigger and close to real controls via render={<Button ... />}.
- PopoverContent: side "bottom" (default) | "top" | "right" | "left", align "center" | "start" | "end", sideOffset (8). Escape and outside clicks dismiss; focus returns to the trigger.
- Non-modal by default; modal traps focus (prefer a dialog then).
- Restyle in CSS via .ub-popover-popup, .ub-popover-title, .ub-popover-description, [data-popup-open] on the trigger, [data-starting-style]/[data-ending-style] for enter/exit. Tokens only.`}
      />
    </>
  );
}
