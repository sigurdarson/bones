import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Button,
  PopoverContent,
  PopoverDescription,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PopoverPlayground } from "@/components/popover-playground";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

type Side = "top" | "right" | "bottom" | "left";

const sides: Side[] = ["top", "right", "bottom", "left"];

const sideLabels: Record<Side, string> = {
  top: "Top",
  right: "Right",
  bottom: "Bottom",
  left: "Left",
};

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
        Non-modal by default, so the page behind stays interactive; for a
        plain text label, the lighter{" "}
        <Link to="/components/tooltip">Tooltip</Link> is the better fit.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <PopoverPlayground />
      <h2>Variants</h2>
      <p>
        Four sides, and each flips to the opposite when there's no room;{" "}
        <code>align</code> (start, center, end) slides the panel along the
        chosen edge. Open each one: the panel scales in from the trigger's
        side.
      </p>
      <Showcase
        code={`<PopoverRoot>
  <PopoverTrigger render={<Button variant="secondary" />}>Top</PopoverTrigger>
  <PopoverContent side="top">
    <PopoverTitle>Filters</PopoverTitle>
    <PopoverDescription>
      Only tasks assigned to you, due this week.
    </PopoverDescription>
  </PopoverContent>
</PopoverRoot>
{/* side="right", side="bottom" (the default), side="left" */}`}
      >
        {sides.map((side) => (
          <PopoverRoot key={side}>
            <PopoverTrigger render={<Button variant="secondary" />}>
              {sideLabels[side]}
            </PopoverTrigger>
            <PopoverContent side={side}>
              <PopoverTitle>Filters</PopoverTitle>
              <PopoverDescription>
                Only tasks assigned to you, due this week.
              </PopoverDescription>
            </PopoverContent>
          </PopoverRoot>
        ))}
      </Showcase>
      <h2>States</h2>
      <p>
        Closed and open are the only two, and both are live: click a
        trigger. While open, the trigger carries{" "}
        <code>data-popup-open</code> and the panel <code>data-open</code>;
        a disabled trigger (disable the button you render) never opens.
      </p>
      <Showcase
        code={`<PopoverRoot>
  <PopoverTrigger render={<Button variant="secondary" />}>Share</PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Share this board</PopoverTitle>
    <PopoverDescription>Anyone with the link can view.</PopoverDescription>
  </PopoverContent>
</PopoverRoot>

<PopoverRoot>
  <PopoverTrigger render={<Button variant="secondary" disabled />}>
    Share
  </PopoverTrigger>
  <PopoverContent>{/* never opens */}</PopoverContent>
</PopoverRoot>`}
      >
        <PopoverRoot>
          <PopoverTrigger render={<Button variant="secondary" />}>
            Share
          </PopoverTrigger>
          <PopoverContent>
            <PopoverTitle>Share this board</PopoverTitle>
            <PopoverDescription>Anyone with the link can view.</PopoverDescription>
          </PopoverContent>
        </PopoverRoot>
        <PopoverRoot>
          <PopoverTrigger render={<Button variant="secondary" disabled />}>
            Share
          </PopoverTrigger>
          <PopoverContent>
            <PopoverTitle>Share this board</PopoverTitle>
            <PopoverDescription>Anyone with the link can view.</PopoverDescription>
          </PopoverContent>
        </PopoverRoot>
      </Showcase>
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
        essentials, by part:
      </p>
      <PropsTable
        rows={[
          {
            name: "PopoverRoot.open",
            type: "boolean",
            description: "Controlled state. Pair with onOpenChange; defaultOpen for uncontrolled.",
          },
          {
            name: "PopoverRoot.onOpenChange",
            type: "(open: boolean) => void",
            description: "Called on every open and close, including Escape and outside clicks.",
          },
          {
            name: "PopoverRoot.modal",
            type: "boolean",
            defaultValue: "false",
            description: "Traps focus and blocks the page behind; prefer a dialog at that point.",
          },
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
            name: "PopoverContent.sideOffset",
            type: "number",
            defaultValue: "8",
            description: "Gap between the trigger and the panel, in pixels.",
          },
          {
            name: "PopoverContent.initialFocus",
            type: "boolean | RefObject<HTMLElement | null> | (openType) => ...",
            description: "Where focus lands on open; defaults to the first focusable part.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`PopoverRoot, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, PopoverClose, from @usebones/react.
- Structure: PopoverRoot wraps PopoverTrigger + PopoverContent; put PopoverTitle (names the panel), PopoverDescription, and any controls inside the content. PopoverClose closes it.
- Attach trigger and close to real controls via render={<Button ... />}; a disabled rendered button never opens.
- PopoverContent: side "bottom" (default) | "top" | "right" | "left", align "center" | "start" | "end", sideOffset (8). Escape and outside clicks dismiss; focus returns to the trigger.
- Non-modal by default; modal traps focus (prefer a dialog then). For a plain text label use Tooltip.
- Restyle in CSS via .ub-popover-popup, .ub-popover-title, .ub-popover-description, [data-popup-open] on the trigger, [data-open]/[data-side] on the popup, [data-starting-style]/[data-ending-style] for enter/exit. Tokens only.`}
      />
    </>
  );
}
