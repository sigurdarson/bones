import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
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
        Open the menu and toggle the checkbox and radio items to see them
        stay open, then pick Reset to see a plain item close it; Compact
        shrinks every row at once.
      </p>
      <MenuPlayground />
      <h2>Variants</h2>
      <p>
        Two sizes, set once on the root: default rows are 36px tall with
        16px text, compact rows 28px with 14px text, and the trigger button
        takes its own matching <code>size</code>.
      </p>
      <Showcase
        code={`<MenuRoot>
  <MenuTrigger render={<Button variant="secondary" />}>Options</MenuTrigger>
  <MenuContent>
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuItem>Archive</MenuItem>
  </MenuContent>
</MenuRoot>

<MenuRoot size="compact">
  <MenuTrigger render={<Button variant="secondary" size="compact" />}>
    Options
  </MenuTrigger>
  <MenuContent>
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuItem>Archive</MenuItem>
  </MenuContent>
</MenuRoot>`}
      >
        <MenuRoot>
          <MenuTrigger render={<Button variant="secondary" />}>Options</MenuTrigger>
          <MenuContent>
            <MenuItem>Rename</MenuItem>
            <MenuItem>Duplicate</MenuItem>
            <MenuItem>Archive</MenuItem>
          </MenuContent>
        </MenuRoot>
        <MenuRoot size="compact">
          <MenuTrigger render={<Button variant="secondary" size="compact" />}>
            Options
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Rename</MenuItem>
            <MenuItem>Duplicate</MenuItem>
            <MenuItem>Archive</MenuItem>
          </MenuContent>
        </MenuRoot>
      </Showcase>
      <h2>States</h2>
      <p>
        Open and highlighted are live (hover or arrow keys); checked and
        disabled are the ones you set, and keyboard focus stays on the popup
        while the highlight moves, so there is no per-item focus ring.
      </p>
      <Showcase
        code={`<MenuRoot>
  <MenuTrigger render={<Button variant="secondary" />}>Document</MenuTrigger>
  <MenuContent>
    <MenuItem>Rename</MenuItem>
    <MenuItem disabled>Move to trash</MenuItem>
    <MenuSeparator />
    <MenuCheckboxItem defaultChecked>Pinned</MenuCheckboxItem>
    <MenuCheckboxItem>Watch changes</MenuCheckboxItem>
  </MenuContent>
</MenuRoot>`}
      >
        <MenuRoot>
          <MenuTrigger render={<Button variant="secondary" />}>Document</MenuTrigger>
          <MenuContent>
            <MenuItem>Rename</MenuItem>
            <MenuItem disabled>Move to trash</MenuItem>
            <MenuSeparator />
            <MenuCheckboxItem defaultChecked>Pinned</MenuCheckboxItem>
            <MenuCheckboxItem>Watch changes</MenuCheckboxItem>
          </MenuContent>
        </MenuRoot>
      </Showcase>
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
        Everything Base UI's Menu parts accept passes through. The
        essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "MenuContent.portalContainer",
            type: "HTMLElement | ShadowRoot | RefObject | null",
            description: "Portal parent for a local theme. Omit to use the parent portal or document body; see Theming.",
          },
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
            name: "MenuContent.side",
            type: "PositionerSide",
            description: "Which side of the trigger to open on; below by default, beside for submenus.",
          },
          {
            name: "MenuContent.sideOffset",
            type: "number",
            defaultValue: "4",
            description: "Gap between the trigger and the menu, in pixels.",
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
      <p>
        One quirk: plain items close the menu on click unless told
        otherwise, while checkbox and radio items stay open by default so
        the change is visible; pass <code>closeOnClick</code> on either to
        flip it.
      </p>
      <AgentInstructions
        instructions={`MenuRoot, MenuTrigger, MenuContent, MenuItem, MenuCheckboxItem, MenuRadioGroup, MenuRadioItem, MenuGroup, MenuGroupLabel, MenuSeparator, MenuSubmenuRoot, MenuSubmenuTrigger, from @usebones/react.
- MenuContent accepts portalContainer (element or ref) to keep overlays inside a local theme; omit for the parent portal or document body.
- Structure: MenuRoot wraps MenuTrigger + MenuContent; items go inside the content. Attach the trigger to a real control via render={<Button ... />}.
- MenuItem runs onClick and closes (closeOnClick={false} keeps it open); disabled dims it and skips it. MenuCheckboxItem (defaultChecked/checked + onCheckedChange) and MenuRadioItem inside MenuRadioGroup (value + onValueChange) stay open; indicators render automatically.
- Group related items with MenuGroup + MenuGroupLabel; divide with MenuSeparator.
- Submenus: MenuSubmenuRoot wrapping MenuSubmenuTrigger + another MenuContent; the chevron is automatic.
- size on MenuRoot: "default" | "compact", flows to submenus; give the trigger Button the same size.
- Restyle in CSS via .ub-menu-popup, .ub-menu-item, [data-highlighted], [data-checked], [data-disabled], [data-popup-open] on the trigger, [data-starting-style]/[data-ending-style] for enter/exit. Tokens only.`}
      />
    </>
  );
}
