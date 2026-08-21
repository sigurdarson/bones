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
        A sheet that slides up from the bottom edge, wrapping the Base UI
        Drawer. Everything the{" "}
        <Link href="/components/dialog">Dialog</Link> does (modal, focus
        trapped, Escape closes) plus swipe-down dismissal and a grab
        handle, which is what makes it the mobile-friendly pick.
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
        The popup carries <code>data-swiping</code> while a finger drags
        it (the swipe offset comes through{" "}
        <code>--drawer-swipe-movement-y</code>), plus the usual{" "}
        <code>data-starting-style</code>/<code>data-ending-style</code>{" "}
        transitions:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-drawer-popup {
  max-width: 36rem;
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
            name: "DrawerRoot.swipeDirection",
            type: "string",
            defaultValue: '"down"',
            description: "Which way a swipe dismisses the sheet.",
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
- A bottom sheet: modal with focus trap and Escape, plus swipe-down dismissal and a grab handle; content scrolls when taller than 85dvh. Prefer Dialog on wide desktop layouts.
- Restyle in CSS via .ub-drawer-popup (30rem max-width default), .ub-drawer-backdrop, [data-swiping], [data-starting-style]/[data-ending-style]. Tokens only.`}
      />
    </>
  );
}
