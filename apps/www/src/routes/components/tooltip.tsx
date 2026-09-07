import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@usebones/react";
import { Icon } from "@usebones/icons";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";
import { TooltipPlayground } from "@/components/tooltip-playground";

export const Route = createFileRoute("/components/tooltip")({
  head: () => ({ meta: [{ title: "Tooltip · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Tooltip" />
      <p className="lead">
        A small floating label on hover or focus, wrapping the Base UI
        Tooltip. It sits on the same translucent surface as dropdowns and
        fades in, flips sides when out of room, and shows on keyboard
        focus, not just the pointer.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Hover or focus the button to open
        the tooltip; the Code tab always shows the markup for exactly what
        you've configured.
      </p>
      <TooltipPlayground />
      <h2>Variants</h2>
      <p>
        One look, four sides. <code>side</code> on the content picks where
        the label prefers to sit (top by default), <code>align</code>{" "}
        nudges it along that edge, and when the viewport runs out of room
        it flips to the opposite side by itself. Each arrow points where
        its tooltip opens.
      </p>
      <Showcase
        code={`<TooltipProvider>
  <TooltipRoot>
    <TooltipTrigger render={<Button variant="ghost" iconOnly aria-label="Left" />}>
      <Icon name="arrow-left" />
    </TooltipTrigger>
    <TooltipContent side="left">Left</TooltipContent>
  </TooltipRoot>
  <TooltipRoot>
    <TooltipTrigger render={<Button variant="ghost" iconOnly aria-label="Above" />}>
      <Icon name="arrow-up" />
    </TooltipTrigger>
    <TooltipContent>Above</TooltipContent>
  </TooltipRoot>
  <TooltipRoot>
    <TooltipTrigger render={<Button variant="ghost" iconOnly aria-label="Below" />}>
      <Icon name="arrow-down" />
    </TooltipTrigger>
    <TooltipContent side="bottom">Below</TooltipContent>
  </TooltipRoot>
  <TooltipRoot>
    <TooltipTrigger render={<Button variant="ghost" iconOnly aria-label="Right" />}>
      <Icon name="arrow-right" />
    </TooltipTrigger>
    <TooltipContent side="right">Right</TooltipContent>
  </TooltipRoot>
</TooltipProvider>`}
        note={
          <>
            The provider shares one delay across the row: the first
            tooltip waits 600ms, the rest open instantly while you move
            between triggers. Each label repeats its button's{" "}
            <code>aria-label</code> rather than adding a second name.
          </>
        }
      >
        <TooltipProvider>
          <TooltipRoot>
            <TooltipTrigger
              render={<Button variant="ghost" iconOnly aria-label="Left" />}
            >
              <Icon name="arrow-left" />
            </TooltipTrigger>
            <TooltipContent side="left">Left</TooltipContent>
          </TooltipRoot>
          <TooltipRoot>
            <TooltipTrigger
              render={
                <Button variant="ghost" iconOnly aria-label="Above" />
              }
            >
              <Icon name="arrow-up" />
            </TooltipTrigger>
            <TooltipContent>Above</TooltipContent>
          </TooltipRoot>
          <TooltipRoot>
            <TooltipTrigger
              render={<Button variant="ghost" iconOnly aria-label="Below" />}
            >
              <Icon name="arrow-down" />
            </TooltipTrigger>
            <TooltipContent side="bottom">Below</TooltipContent>
          </TooltipRoot>
          <TooltipRoot>
            <TooltipTrigger
              render={<Button variant="ghost" iconOnly aria-label="Right" />}
            >
              <Icon name="arrow-right" />
            </TooltipTrigger>
            <TooltipContent side="right">Right</TooltipContent>
          </TooltipRoot>
        </TooltipProvider>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The popup carries <code>data-side</code> for the side it actually
        rendered on (after flipping), plus <code>data-starting-style</code>{" "}
        and <code>data-ending-style</code> during the enter and exit
        transitions; the trigger carries <code>data-popup-open</code>{" "}
        while its tooltip shows:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-tooltip-popup {
  background: var(--ub-text-primary);
  color: var(--ub-bg);
}

.ub-tooltip-trigger[data-popup-open] {
  color: var(--ub-text-primary);
}`}
      />
      <h2>Props</h2>
      <p>
        Each part passes the full Base UI API through. A tooltip describes
        its trigger; it never replaces the trigger's own accessible name
        (keep <code>aria-label</code> on icon-only buttons).
      </p>
      <PropsTable
        rows={[
          {
            name: "TooltipContent.portalContainer",
            type: "HTMLElement | ShadowRoot | RefObject | null",
            description: "Portal parent for a local theme. Omit to use the parent portal or document body; see Theming.",
          },
          {
            name: "TooltipTrigger.render",
            type: "ReactElement",
            description: "The real control the tooltip attaches to, usually a Bones Button.",
          },
          {
            name: "TooltipTrigger.delay",
            type: "number",
            defaultValue: "600",
            description:
              "Milliseconds before opening on hover; focus opens instantly. Timing lives on the trigger, along with closeDelay.",
          },
          {
            name: "TooltipContent.side",
            type: '"top" | "right" | "bottom" | "left"',
            defaultValue: '"top"',
            description:
              "Preferred side; flips to the opposite when out of room. Position lives on the content, along with align.",
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
            name: "TooltipRoot.disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Keeps the tooltip closed; the trigger carries data-trigger-disabled.",
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
- TooltipContent accepts portalContainer (element or ref) to keep overlays inside a local theme; omit for the parent portal or document body.
- Structure: TooltipRoot wraps TooltipTrigger + TooltipContent. Attach to a real control via TooltipTrigger render={<Button ... />}; trigger children render inside that control.
- A tooltip is a description, never a name: icon-only triggers still need their own aria-label.
- TooltipContent: side "top" (default) | "right" | "bottom" | "left", align, sideOffset (8). Timing on the trigger: delay (600ms), closeDelay. TooltipRoot: open + onOpenChange, disabled.
- Wrap toolbars in TooltipProvider so tooltips share one delay.
- Enter and exit run on --ub-duration-* tokens, so reduced motion is respected with no extra code.
- Restyle in CSS via .ub-tooltip-popup, [data-side], [data-starting-style]/[data-ending-style] for enter/exit, and [data-popup-open] on the trigger. Tokens only.`}
      />
    </>
  );
}
