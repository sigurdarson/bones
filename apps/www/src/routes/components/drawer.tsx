import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Button,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { DrawerPlayground } from "@/components/drawer-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/drawer")({
  head: () => ({ meta: [{ title: "Drawer · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Drawer" />
      <p className="lead">
        A sheet that slides in from an edge, wrapping the Base UI Drawer.
        Everything the <Link to="/components/dialog">Dialog</Link> does
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
      <h2>Variants</h2>
      <p>
        One prop, three shapes: right and left are full-height panels capped
        at 24rem wide, bottom is a full-width sheet capped at 85dvh, and the
        grab handle and dismiss swipe follow the edge.
      </p>
      <Showcase
        code={`<DrawerRoot>
  <DrawerTrigger render={<Button variant="secondary" />}>Filters</DrawerTrigger>
  <DrawerContent>
    <DrawerTitle>Filters</DrawerTitle>
    <DrawerDescription>Narrow the list by status, owner, or date.</DrawerDescription>
    <DrawerClose render={<Button />}>Done</DrawerClose>
  </DrawerContent>
</DrawerRoot>

<DrawerRoot side="left">
  <DrawerTrigger render={<Button variant="secondary" />}>Workspaces</DrawerTrigger>
  <DrawerContent>
    <DrawerTitle>Workspaces</DrawerTitle>
    <DrawerDescription>Switch between the teams you belong to.</DrawerDescription>
    <DrawerClose render={<Button />}>Done</DrawerClose>
  </DrawerContent>
</DrawerRoot>

<DrawerRoot side="bottom">
  <DrawerTrigger render={<Button variant="secondary" />}>Share</DrawerTrigger>
  <DrawerContent>
    <DrawerTitle>Share this report</DrawerTitle>
    <DrawerDescription>Anyone with the link can view it.</DrawerDescription>
    <DrawerClose render={<Button />}>Copy link</DrawerClose>
  </DrawerContent>
</DrawerRoot>`}
        note={
          <>
            Side panels shrink on narrow screens (<code>100vw</code> minus
            3rem) rather than covering the page; the bottom sheet scrolls
            its content past 85dvh instead of growing taller.
          </>
        }
      >
        <DrawerRoot>
          <DrawerTrigger render={<Button variant="secondary" />}>Filters</DrawerTrigger>
          <DrawerContent>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription>
              Narrow the list by status, owner, or date.
            </DrawerDescription>
            <p>
              <DrawerClose render={<Button />}>Done</DrawerClose>
            </p>
          </DrawerContent>
        </DrawerRoot>
        <DrawerRoot side="left">
          <DrawerTrigger render={<Button variant="secondary" />}>Workspaces</DrawerTrigger>
          <DrawerContent>
            <DrawerTitle>Workspaces</DrawerTitle>
            <DrawerDescription>
              Switch between the teams you belong to.
            </DrawerDescription>
            <p>
              <DrawerClose render={<Button />}>Done</DrawerClose>
            </p>
          </DrawerContent>
        </DrawerRoot>
        <DrawerRoot side="bottom">
          <DrawerTrigger render={<Button variant="secondary" />}>Share</DrawerTrigger>
          <DrawerContent>
            <DrawerTitle>Share this report</DrawerTitle>
            <DrawerDescription>Anyone with the link can view it.</DrawerDescription>
            <p>
              <DrawerClose render={<Button />}>Copy link</DrawerClose>
            </p>
          </DrawerContent>
        </DrawerRoot>
      </Showcase>
      <h2>States</h2>
      <p>
        Closed, opening, open, swiping, and closing: the trigger carries{" "}
        <code>data-popup-open</code> while the sheet is up, a finger on the
        handle puts the popup into <code>data-swiping</code> and pauses its
        transition so it tracks the drag, and letting go past the threshold
        plays the exit; hover and focus are the trigger button's own.
      </p>
      <h2>Styling states</h2>
      <p>
        The popup carries <code>data-side</code> always and{" "}
        <code>data-swiping</code> while a finger drags it, plus the usual{" "}
        <code>data-starting-style</code>/<code>data-ending-style</code>{" "}
        transitions. The swipe offset arrives through{" "}
        <code>--drawer-swipe-movement-y</code> (or <code>-x</code> for side
        panels), which the shipped transform already reads, so restyling a
        side keeps the swipe intact:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-drawer-popup[data-side="right"] {
  width: min(28rem, calc(100vw - 3rem));
}

.ub-drawer-popup[data-swiping]::before {
  background: var(--ub-accent);
}`}
      />
      <h2>Props</h2>
      <p>
        The Dialog's parts and props, plus <code>side</code> and the swipe
        settings on the root. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "DrawerRoot.open",
            type: "boolean",
            description: "Controlled state. Pair with onOpenChange (also defaultOpen).",
          },
          {
            name: "DrawerRoot.modal",
            type: 'boolean | "trap-focus"',
            defaultValue: "true",
            description: "Dims and inerts the page behind, like the Dialog.",
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
            description: "The real control that opens the drawer, usually a Bones Button.",
          },
          {
            name: "DrawerClose.render",
            type: "ReactElement",
            description: "A button that closes the sheet, usually a Bones Button.",
          },
        ]}
      />
      <p>
        One quirk: the dismiss swipe follows <code>side</code> (a right panel
        swipes right). Pass <code>swipeDirection</code> to override it.
      </p>
      <AgentInstructions
        instructions={`DrawerRoot, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerClose, from @usebones/react.
- Structure: DrawerRoot wraps DrawerTrigger + DrawerContent; put DrawerTitle (names the sheet), DrawerDescription, and the body inside. DrawerClose closes it.
- Attach trigger and close buttons to real controls via render={<Button ... />}.
- side on the root: "right" (default) | "left" (full-height panels up to 24rem wide, shrinking on narrow screens) | "bottom" (full-width mobile sheet, scrolls past 85dvh). The dismiss swipe matches the side (swipeDirection overrides); modal with focus trap and Escape everywhere.
- Restyle in CSS via .ub-drawer-popup, [data-side], .ub-drawer-backdrop, [data-swiping], [data-starting-style]/[data-ending-style], [data-popup-open] on the trigger. Tokens only.`}
      />
    </>
  );
}
