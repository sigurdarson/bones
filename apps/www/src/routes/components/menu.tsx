import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
  MenuTrigger,
} from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { MenuPlayground } from "@/components/menu-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/menu")({
  head: () => ({ meta: [{ title: "Menu · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Menu" />
      <p className="lead">
        A dropdown of actions, wrapping the Base UI Menu. Full keyboard
        navigation, typeahead, checkbox and radio items, and submenus, on
        the same glass surface as the Select dropdown.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <MenuPlayground />
      <h2>Submenus</h2>
      <p>
        Wrap a <code>MenuSubmenuRoot</code> around a{" "}
        <code>MenuSubmenuTrigger</code> and another <code>MenuContent</code>;
        it opens on hover or with the right arrow key, and the chevron
        renders automatically.
      </p>
      <Showcase
        code={`<MenuRoot>
  <MenuTrigger render={<Button variant="secondary" />}>Options</MenuTrigger>
  <MenuContent>
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuSubmenuRoot>
      <MenuSubmenuTrigger>Export as</MenuSubmenuTrigger>
      <MenuContent>
        <MenuItem>Markdown</MenuItem>
        <MenuItem>PDF</MenuItem>
      </MenuContent>
    </MenuSubmenuRoot>
  </MenuContent>
</MenuRoot>`}
      >
        <MenuRoot>
          <MenuTrigger render={<Button variant="secondary" />}>Options</MenuTrigger>
          <MenuContent>
            <MenuItem>Rename</MenuItem>
            <MenuItem>Duplicate</MenuItem>
            <MenuSubmenuRoot>
              <MenuSubmenuTrigger>Export as</MenuSubmenuTrigger>
              <MenuContent>
                <MenuItem>Markdown</MenuItem>
                <MenuItem>PDF</MenuItem>
              </MenuContent>
            </MenuSubmenuRoot>
          </MenuContent>
        </MenuRoot>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        Items carry <code>data-highlighted</code> under the cursor or arrow
        keys and <code>data-checked</code> on checkbox and radio items; the
        trigger carries <code>data-popup-open</code> while the menu is
        open:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-menu-item[data-highlighted] {
  background: var(--ub-accent);
  color: var(--ub-accent-contrast);
}`}
      />
      <h2>Props</h2>
      <p>
        Everything Base UI's Menu parts accept passes through. Items close
        the menu on click unless told otherwise; checkbox and radio items
        stay open by default. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "MenuRoot.size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Sizes every item in the menu, submenus included.",
          },
          {
            name: "MenuTrigger.render",
            type: "ReactElement",
            description: "The real control that opens the menu, usually a Bones Button.",
          },
          {
            name: "MenuContent.align",
            type: '"center" | "start" | "end"',
            description: "Alignment along the trigger; menus align start by default.",
          },
          {
            name: "MenuItem.closeOnClick",
            type: "boolean",
            defaultValue: "true",
            description: "Set false to keep the menu open after the action runs.",
          },
          {
            name: "MenuCheckboxItem.checked",
            type: "boolean",
            description: "Controlled state (also defaultChecked, onCheckedChange).",
          },
          {
            name: "MenuRadioGroup.value",
            type: "string",
            description: "Selected MenuRadioItem value (also defaultValue, onValueChange).",
          },
        ]}
      />
      <AgentInstructions
        instructions={`MenuRoot, MenuTrigger, MenuContent, MenuItem, MenuCheckboxItem, MenuRadioGroup, MenuRadioItem, MenuGroup, MenuGroupLabel, MenuSeparator, MenuSubmenuRoot, MenuSubmenuTrigger, from @usebones/react.
- Structure: MenuRoot wraps MenuTrigger + MenuContent; items go inside the content. Attach the trigger to a real control via render={<Button ... />}.
- MenuItem runs onClick and closes (closeOnClick={false} keeps it open). MenuCheckboxItem (defaultChecked/checked + onCheckedChange) and MenuRadioItem inside MenuRadioGroup (value + onValueChange) stay open; indicators render automatically.
- Group related items with MenuGroup + MenuGroupLabel; divide with MenuSeparator.
- Submenus: MenuSubmenuRoot wrapping MenuSubmenuTrigger + another MenuContent; the chevron is automatic.
- size on MenuRoot: "default" | "compact", flows to submenus.
- Restyle in CSS via .ub-menu-popup, .ub-menu-item, [data-highlighted], [data-checked], [data-disabled], [data-popup-open] on the trigger, [data-starting-style]/[data-ending-style] for enter/exit. Tokens only.`}
      />
    </>
  );
}
