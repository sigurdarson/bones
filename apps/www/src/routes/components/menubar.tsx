import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Button,
  Menubar,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { MenubarPlayground } from "@/components/menubar-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/menubar")({
  head: () => ({ meta: [{ title: "Menubar · Bones" }] }),
  component: Page,
});

const bar = [
  { label: "File", items: ["New document", "Duplicate", "Export"] },
  { label: "Edit", items: ["Undo", "Redo", "Find and replace"] },
  { label: "View", items: ["Zoom in", "Zoom out", "Full screen"] },
];

function BarMenus({ vertical = false }: { vertical?: boolean }) {
  return (
    <>
      {bar.map((menu) => (
        <MenuRoot key={menu.label}>
          <MenuTrigger render={<Button variant="ghost" />}>{menu.label}</MenuTrigger>
          <MenuContent side={vertical ? "right" : undefined}>
            {menu.items.map((item) => (
              <MenuItem key={item}>{item}</MenuItem>
            ))}
          </MenuContent>
        </MenuRoot>
      ))}
    </>
  );
}

function Page() {
  return (
    <>
      <PageHeader title="Menubar" />
      <p className="lead">
        A horizontal strip of menus (File, Edit, View), wrapping the Base
        UI Menubar. Only the bar is new; every menu inside is a regular
        Bones <Link to="/components/menu">Menu</Link>, submenus and
        checkbox items included.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Open a menu and slide along the bar;
        the Code tab always shows the markup for exactly what you've
        configured.
      </p>
      <MenubarPlayground />
      <h2>Variants</h2>
      <p>
        Horizontal is the default; vertical stacks the triggers into a
        column, swaps the arrow keys to up and down, and pairs naturally
        with <code>side="right"</code> on each menu's content.
      </p>
      <Showcase
        code={`<Menubar>
  <MenuRoot>
    <MenuTrigger render={<Button variant="ghost" />}>File</MenuTrigger>
    <MenuContent>{/* items */}</MenuContent>
  </MenuRoot>
  {/* Edit, View */}
</Menubar>

<Menubar orientation="vertical">
  <MenuRoot>
    <MenuTrigger render={<Button variant="ghost" />}>File</MenuTrigger>
    <MenuContent side="right">{/* items */}</MenuContent>
  </MenuRoot>
  {/* Edit, View */}
</Menubar>`}
      >
        <div className="showcase-stack">
          <Menubar>
            <BarMenus />
          </Menubar>
          <Menubar orientation="vertical">
            <BarMenus vertical />
          </Menubar>
        </div>
      </Showcase>
      <h2>States</h2>
      <p>
        Open is live: the open trigger carries <code>data-popup-open</code>{" "}
        and hovering a neighbour switches to it; disabled on the bar
        switches off every menu at once, and hover and focus are the ghost
        buttons' own.
      </p>
      <Showcase
        code={`<Menubar disabled>
  <MenuRoot>
    <MenuTrigger render={<Button variant="ghost" />}>File</MenuTrigger>
    <MenuContent>{/* items */}</MenuContent>
  </MenuRoot>
  {/* Edit, View */}
</Menubar>`}
      >
        <Menubar disabled>
          <BarMenus />
        </Menubar>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The bar ships as layout only (no border, background, or padding),
        so it drops into a header without a fight, and carries{" "}
        <code>data-orientation</code> so a vertical strip can size itself
        differently; for a standalone bar, add your own chrome:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-menubar {
  padding: 0.25rem;
  border: 1px solid var(--ub-border);
  border-radius: var(--ub-radius-md);
}

.ub-menubar[data-orientation="vertical"] {
  width: 12rem;
}`}
      />
      <h2>Props</h2>
      <p>
        The menus and their items accept everything Menu accepts. The
        bar-specific parts:
      </p>
      <PropsTable
        rows={[
          {
            name: "disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Switches off every menu in the bar.",
          },
          {
            name: "orientation",
            type: '"horizontal" | "vertical"',
            defaultValue: '"horizontal"',
            description: "Vertical stacks the triggers and swaps the arrow keys.",
          },
          {
            name: "loopFocus",
            type: "boolean",
            defaultValue: "true",
            description: "Arrow keys wrap around at the ends of the bar.",
          },
        ]}
      />
      <p>
        One quirk: the bar has no size of its own. Set <code>size</code> on
        each <code>MenuRoot</code> and the same size on its trigger Button,
        or the rows and the strip end up mismatched.
      </p>
      <AgentInstructions
        instructions={`Menubar, from @usebones/react.
- One container: put regular Bones Menus inside (MenuRoot + MenuTrigger render={<Button variant="ghost" />} + MenuContent with MenuItem, MenuCheckboxItem, MenuRadioGroup, MenuSeparator, submenus).
- One menu open at a time; hovering another trigger switches to it, arrow keys move along the bar (swapped by orientation "vertical"; give each MenuContent side="right" there).
- disabled on the bar switches off every menu. Size lives on each MenuRoot and its trigger Button, not on the bar.
- The bar is layout only (no border/background/padding); add chrome via .ub-menubar in the app when it stands alone. [data-orientation="vertical"] for the column form; the menus use Menu's classes and [data-popup-open] on the open trigger. Tokens only.`}
      />
    </>
  );
}
