import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ContextMenuContent,
  ContextMenuRoot,
  ContextMenuTrigger,
  MenuCheckboxItem,
  MenuItem,
  MenuSeparator,
} from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import {
  ContextMenuPlayground,
  ContextMenuSurface,
} from "@/components/context-menu-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/context-menu")({
  head: () => ({ meta: [{ title: "Context menu · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Context menu" />
      <p className="lead">
        A menu that opens at the pointer on right click (long press on
        touch), wrapping the Base UI Context Menu. Only the root, trigger,
        and content are new; everything inside is the regular Bones{" "}
        <Link to="/components/menu">Menu</Link> parts.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Right click (or long press) the card
        to open the menu; the Code tab always shows the markup for exactly
        what you've configured.
      </p>
      <ContextMenuPlayground />
      <h2>States</h2>
      <p>
        Open and highlighted are live (right click, then hover or arrow
        keys); checked and disabled are the ones you set on the items, and
        the trigger surface has no hover or focus styling of its own.
      </p>
      <Showcase
        code={`<ContextMenuRoot>
  <ContextMenuTrigger>
    <FileCard name="budget-2026.xlsx" />
  </ContextMenuTrigger>
  <ContextMenuContent>
    <MenuItem>Open</MenuItem>
    <MenuItem disabled>Move to trash</MenuItem>
    <MenuSeparator />
    <MenuCheckboxItem defaultChecked>Pinned</MenuCheckboxItem>
    <MenuCheckboxItem>Shared</MenuCheckboxItem>
  </ContextMenuContent>
</ContextMenuRoot>`}
        note={
          <>
            Disabled items stay in the list so the layout doesn't jump; they
            skip the highlight and ignore clicks. The trigger renders a
            plain div, so size it (or the card inside) yourself.
          </>
        }
      >
        <ContextMenuRoot>
          <ContextMenuTrigger>
            <ContextMenuSurface>Right click budget-2026.xlsx</ContextMenuSurface>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <MenuItem>Open</MenuItem>
            <MenuItem disabled>Move to trash</MenuItem>
            <MenuSeparator />
            <MenuCheckboxItem defaultChecked>Pinned</MenuCheckboxItem>
            <MenuCheckboxItem>Shared</MenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenuRoot>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The popup and items are the Menu's (<code>.ub-menu-popup</code>,{" "}
        <code>.ub-menu-item</code> with <code>data-highlighted</code>,{" "}
        <code>data-checked</code>, <code>data-disabled</code>), and the
        trigger surface carries <code>data-popup-open</code> while its menu
        is up, so the right-clicked card can show it:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-context-menu-trigger[data-popup-open] {
  outline: 2px solid var(--ub-ring);
  outline-offset: 2px;
}`}
      />
      <h2>Props</h2>
      <p>
        Items, groups, separators, checkbox and radio items, and submenus
        all come from Menu and accept the same props. The context-specific
        parts:
      </p>
      <PropsTable
        rows={[
          {
            name: "ContextMenuRoot.size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Sizes every item in the menu, submenus included.",
          },
          {
            name: "ContextMenuRoot.open",
            type: "boolean",
            description: "Controlled state. Pair with onOpenChange.",
          },
          {
            name: "ContextMenuRoot.defaultOpen",
            type: "boolean",
            defaultValue: "false",
            description: "Starts open, for uncontrolled usage.",
          },
        ]}
      />
      <p>
        One quirk: there is no <code>render</code> on the trigger to attach
        it to a Button; it is a wrapper div around whatever surface you
        give it, and the browser's own context menu is suppressed only
        inside that div.
      </p>
      <AgentInstructions
        instructions={`ContextMenuRoot, ContextMenuTrigger, ContextMenuContent, from @usebones/react.
- Structure: ContextMenuRoot wraps ContextMenuTrigger (a div around the right-clickable surface) + ContextMenuContent. The menu opens at the pointer; long press works on touch.
- Fill the content with the regular Menu parts: MenuItem (disabled skips it), MenuCheckboxItem, MenuRadioGroup + MenuRadioItem, MenuGroup + MenuGroupLabel, MenuSeparator, MenuSubmenuRoot + MenuSubmenuTrigger. Same props, same behavior as in Menu.
- size on ContextMenuRoot: "default" | "compact".
- Right click has no keyboard equivalent unless the surface is focusable; keep a visible route to the same actions.
- Restyle in CSS via the Menu classes the popup shares (.ub-menu-popup, .ub-menu-item, [data-highlighted], [data-checked], [data-disabled]), so restyling one restyles both; the trigger is .ub-context-menu-trigger with [data-popup-open]. Tokens only.`}
      />
    </>
  );
}
