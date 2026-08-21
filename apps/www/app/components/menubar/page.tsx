import type { Metadata } from "next";
import Link from "next/link";
import { AgentInstructions } from "@/components/agent-instructions";
import { MenubarPlayground } from "@/components/menubar-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const metadata: Metadata = { title: "Menubar" };

export default function Page() {
  return (
    <>
      <PageHeader title="Menubar" />
      <p className="lead">
        A horizontal strip of menus (File, Edit, View), wrapping the Base
        UI Menubar. Only the bar is new; every menu inside is a regular
        bones <Link href="/components/menu">Menu</Link>, submenus and
        checkbox items included.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Open a menu and slide along the bar;
        the Code tab always shows the markup for exactly what you've
        configured.
      </p>
      <MenubarPlayground />
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
      <AgentInstructions
        instructions={`Menubar, from @usebones/react.
- One container: put regular bones Menus inside (MenuRoot + MenuTrigger render={<Button variant="ghost" />} + MenuContent with MenuItem, MenuCheckboxItem, MenuRadioGroup, MenuSeparator, submenus).
- One menu open at a time; hovering another trigger switches to it, arrow keys move along the bar (swapped by orientation "vertical").
- disabled on the bar switches off every menu.
- Restyle in CSS via .ub-menubar and [data-orientation]; the menus use Menu's classes. Tokens only.`}
      />
    </>
  );
}
