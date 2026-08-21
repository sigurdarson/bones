import type { Metadata } from "next";
import Link from "next/link";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { DrawerPlayground } from "@/components/drawer-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const metadata: Metadata = { title: "Drawer" };

export default function Page() {
  return (
    <>
      <PageHeader title="Drawer" />
      <p className="lead">
        A sheet that slides in from an edge, wrapping the Base UI Drawer.
        Everything the <Link href="/components/dialog">Dialog</Link> does
        (modal, focus trapped, Escape closes) plus swipe dismissal and a
        grab handle. Right and left are side panels; bottom is the mobile
        sheet.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. On a touch screen, drag the handle
        down to dismiss; the Code tab always shows the markup for exactly
        what you've configured.
      </p>
      <DrawerPlayground />
      <h2>Styling states</h2>
      <p>
        The popup carries <code>data-side</code> and{" "}
        <code>data-swiping</code> while a finger drags it (the swipe
        offset comes through <code>--drawer-swipe-movement-y</code>, or
        -x for side panels), plus the usual{" "}
        <code>data-starting-style</code>/<code>data-ending-style</code>{" "}
        transitions:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-drawer-popup[data-side="right"] {
  width: min(28rem, calc(100vw - 3rem));
}`}
      />
      <h2>Props</h2>
      <p>
        The same shape as the Dialog. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "DrawerRoot.open",
            type: "boolean",
            description: "Controlled state. Pair with onOpenChange (also defaultOpen).",
          },
          {
            name: "DrawerRoot.side",
            type: '"right" | "left" | "bottom"',
            defaultValue: '"right"',
            description: "Which edge the sheet slides in from; the dismiss swipe matches.",
          },
          {
            name: "DrawerRoot.disablePointerDismissal",
            type: "boolean",
            defaultValue: "false",
            description: "Ignore outside clicks, for sheets that shouldn't be lost.",
          },
          {
            name: "DrawerTrigger.render",
            type: "ReactElement",
            description: "The real control that opens the drawer, usually a bones Button.",
          },
          {
            name: "DrawerClose.render",
            type: "ReactElement",
            description: "A button that closes the sheet, usually a bones Button.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`DrawerRoot, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerClose, from @usebones/react.
- Structure: DrawerRoot wraps DrawerTrigger + DrawerContent; put DrawerTitle (names the sheet), DrawerDescription, and the body inside. DrawerClose closes it.
- Attach trigger and close buttons to real controls via render={<Button ... />}.
- side on the root: "right" (default) | "left" (full-height panels, 24rem wide) | "bottom" (full-width mobile sheet, scrolls past 85dvh). The dismiss swipe matches the side; modal with focus trap and Escape everywhere.
- Restyle in CSS via .ub-drawer-popup, [data-side], .ub-drawer-backdrop, [data-swiping], [data-starting-style]/[data-ending-style]. Tokens only.`}
      />
    </>
  );
}
