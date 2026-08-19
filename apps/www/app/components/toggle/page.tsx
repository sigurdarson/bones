import type { Metadata } from "next";
import Link from "next/link";
import { Toggle } from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";
import { TogglePlayground } from "@/components/toggle-playground";

export const metadata: Metadata = { title: "Toggle" };

export default function Page() {
  return (
    <>
      <PageHeader title="Toggle" />
      <p className="lead">
        A pressed/unpressed button, wrapping the Base UI Toggle. Good for
        on/off actions that live outside a form: mute, favorite, show
        details. Several of them become a{" "}
        <Link href="/components/toggle-group">Toggle group</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <TogglePlayground />
      <h2>States</h2>
      <p>
        Pressed, unpressed, and disabled. Pressed uses the same muted
        surface as a secondary button, one step deeper on hover.
      </p>
      <Showcase
        code={`<Toggle defaultPressed>Pressed</Toggle>
<Toggle>Unpressed</Toggle>
<Toggle disabled>Disabled</Toggle>`}
      >
        <Toggle defaultPressed>Pressed</Toggle>
        <Toggle>Unpressed</Toggle>
        <Toggle disabled>Disabled</Toggle>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The pressed state comes through <code>data-pressed</code> (and{" "}
        <code>aria-pressed</code> for screen readers), so custom styling
        never needs JavaScript:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-toggle[data-pressed] {
  background: var(--ub-accent);
  color: var(--ub-accent-contrast);
}`}
      />
      <h2>Props</h2>
      <p>
        Everything the Base UI Toggle accepts passes through. The
        essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "defaultPressed",
            type: "boolean",
            defaultValue: "false",
            description: "Initial state when uncontrolled.",
          },
          {
            name: "pressed",
            type: "boolean",
            description: "Controlled state. Pair with onPressedChange.",
          },
          {
            name: "value",
            type: "string",
            description: "Identity within a ToggleGroup.",
          },
          {
            name: "size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Default is 36px tall with 16px text; compact is 28px with 14px text.",
          },
          {
            name: "iconOnly",
            type: "boolean",
            defaultValue: "false",
            description: "Square toggle holding only an icon; pair with aria-label.",
          },
          {
            name: "disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Blocks interaction and dims the toggle.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`Toggle, from @usebones/react.
- defaultPressed or pressed + onPressedChange; size "default" | "compact"; iconOnly requires aria-label; icons are children via @usebones/icons.
- Inside a ToggleGroup, identify each toggle with value="..." (see the Toggle group page).
- Restyle in CSS via [data-pressed], [data-disabled], [data-size]. Tokens only.`}
      />
    </>
  );
}
