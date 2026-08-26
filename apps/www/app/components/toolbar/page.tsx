import type { Metadata } from "next";
import Link from "next/link";
import { AgentInstructions } from "@/components/agent-instructions";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { ToolbarPlayground } from "@/components/toolbar-playground";

export const metadata: Metadata = { title: "Toolbar" };

export default function Page() {
  return (
    <>
      <PageHeader title="Toolbar" />
      <p className="lead">
        A row of controls that acts as one tab stop, wrapping the Base UI
        Toolbar: Tab lands once, arrow keys move along the row. The
        controls themselves are regular Bones parts (
        <Link href="/components/button">Buttons</Link>,{" "}
        <Link href="/components/toggle">Toggles</Link>) attached via{" "}
        <code>render</code>.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Tab into the toolbar and use the
        arrow keys; the Code tab always shows the markup for exactly what
        you've configured.
      </p>
      <ToolbarPlayground />
      <h2>Props</h2>
      <p>
        Six parts, all thin: the toolbar wires roving focus and semantics,
        the rendered controls keep their own behavior. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "ToolbarRoot.aria-label",
            type: "string",
            description: "Names the toolbar for screen readers; always pass one.",
          },
          {
            name: "ToolbarRoot.orientation",
            type: '"horizontal" | "vertical"',
            defaultValue: '"horizontal"',
            description: "Vertical stacks the controls and swaps the arrow keys.",
          },
          {
            name: "ToolbarRoot.disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Switches off every control inside.",
          },
          {
            name: "ToolbarButton.render",
            type: "ReactElement",
            description: "The real control: a Bones Button, Toggle, or anything focusable.",
          },
          {
            name: "ToolbarSeparator",
            type: "component",
            description: "A hairline, perpendicular to the toolbar automatically.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`ToolbarRoot, ToolbarButton, ToolbarLink, ToolbarGroup, ToolbarSeparator, ToolbarInput, from @usebones/react.
- Structure: ToolbarRoot (always pass aria-label) wrapping ToolbarButtons; group related ones with ToolbarGroup, divide with ToolbarSeparator.
- Attach real controls via render: ToolbarButton render={<Toggle iconOnly aria-label="..." />} or render={<Button variant="ghost" ... />}; ToolbarInput render={<Input ... />}. The control keeps its own styling and state.
- One tab stop; arrow keys move between controls (swapped by orientation "vertical"). disabled on the root switches off everything.
- Restyle in CSS via .ub-toolbar and [data-orientation]; the separator renders the Separator component's class (.ub-separator) plus .ub-toolbar-separator spacing, so restyling one restyles both. Tokens only.`}
      />
    </>
  );
}
