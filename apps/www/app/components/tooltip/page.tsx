import type { Metadata } from "next";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { TooltipPlayground } from "@/components/tooltip-playground";

export const metadata: Metadata = { title: "Tooltip" };

export default function Page() {
  return (
    <>
      <PageHeader title="Tooltip" />
      <p className="lead">
        A small floating label on hover or focus, wrapping the Base UI
        Tooltip. It shares the glass surface and fade of the Select
        dropdown, flips sides when out of room, and shows on keyboard
        focus, not just the pointer.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Hover or focus the button to open
        the tooltip; the Code tab always shows the markup for exactly what
        you've configured.
      </p>
      <TooltipPlayground />
      <h2>Styling states</h2>
      <p>
        The popup carries <code>data-side</code> for the side it actually
        rendered on (after flipping), plus <code>data-starting-style</code>{" "}
        and <code>data-ending-style</code> during the enter and exit
        transitions:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-tooltip-popup {
  background: var(--ub-text-primary);
  color: var(--ub-bg);
}`}
      />
      <h2>Props</h2>
      <p>
        Timing lives on the trigger, position on the content. A tooltip
        describes its trigger; it never replaces the trigger's own
        accessible name (keep <code>aria-label</code> on icon-only
        buttons).
      </p>
      <PropsTable
        rows={[
          {
            name: "TooltipTrigger.render",
            type: "ReactElement",
            description: "The real control the tooltip attaches to, usually a bones Button.",
          },
          {
            name: "TooltipTrigger.delay",
            type: "number",
            defaultValue: "600",
            description: "Milliseconds before opening on hover; focus opens instantly.",
          },
          {
            name: "TooltipContent.side",
            type: '"top" | "right" | "bottom" | "left"',
            defaultValue: '"top"',
            description: "Preferred side; flips to the opposite when out of room.",
          },
          {
            name: "TooltipContent.sideOffset",
            type: "number",
            defaultValue: "8",
            description: "Gap between the trigger and the tooltip, in pixels.",
          },
          {
            name: "TooltipRoot.open",
            type: "boolean",
            description: "Controlled state. Pair with onOpenChange.",
          },
          {
            name: "TooltipProvider.delay",
            type: "number",
            description: "Shared delay for a group of tooltips; moving between them opens instantly.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`TooltipRoot, TooltipTrigger, TooltipContent, TooltipProvider, from @usebones/react.
- Structure: TooltipRoot wraps TooltipTrigger + TooltipContent. Attach to a real control via TooltipTrigger render={<Button ... />}; trigger children render inside that control.
- A tooltip is a description, never a name: icon-only triggers still need their own aria-label.
- TooltipContent: side "top" (default) | "right" | "bottom" | "left", align, sideOffset (8). Timing on the trigger: delay (600ms), closeDelay.
- Wrap toolbars in TooltipProvider so tooltips share one delay.
- Restyle in CSS via .ub-tooltip-popup, [data-side], [data-starting-style]/[data-ending-style] for enter/exit. Tokens only; durations via --ub-duration-* so reduced motion works.`}
      />
    </>
  );
}
