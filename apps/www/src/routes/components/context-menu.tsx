import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import { ContextMenuPlayground } from "@/components/context-menu-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

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
            name: "ContextMenuTrigger.children",
            type: "ReactNode",
            description: "The right-clickable surface: a card, a row, a canvas.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`ContextMenuRoot, ContextMenuTrigger, ContextMenuContent, from @usebones/react.
- Structure: ContextMenuRoot wraps ContextMenuTrigger (a div around the right-clickable surface) + ContextMenuContent. The menu opens at the pointer; long press works on touch.
- Fill the content with the regular Menu parts: MenuItem, MenuCheckboxItem, MenuRadioGroup + MenuRadioItem, MenuGroup + MenuGroupLabel, MenuSeparator, MenuSubmenuRoot + MenuSubmenuTrigger. Same props, same behavior as in Menu.
- size on ContextMenuRoot: "default" | "compact".
- The popup renders the same classes as Menu (.ub-menu-popup, .ub-menu-item), so restyling one restyles both. Tokens only.`}
      />
    </>
  );
}
