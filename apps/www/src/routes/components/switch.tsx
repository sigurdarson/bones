import { createFileRoute } from "@tanstack/react-router";
import { Switch } from "@usebones/react";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";
import { SwitchPlayground } from "@/components/switch-playground";
import { AgentInstructions } from "@/components/agent-instructions";

export const Route = createFileRoute("/components/switch")({
  head: () => ({ meta: [{ title: "Switch · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Switch" />
      <p className="lead">
        A toggle for boolean settings, wrapping the Base UI Switch. Keyboard
        accessible, screen-reader friendly, springy thumb.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <SwitchPlayground />
      <h2>States</h2>
      <p>
        Off, on, and disabled in either position. The thumb settles with a
        light spring; keyboard focus adds a ring in any state.
      </p>
      <Showcase
        code={`<Switch />
<Switch defaultChecked />
<Switch disabled />
<Switch defaultChecked disabled />`}
      >
        <Switch aria-label="Off" />
        <Switch defaultChecked aria-label="On" />
        <Switch disabled aria-label="Disabled off" />
        <Switch defaultChecked disabled aria-label="Disabled on" />
      </Showcase>
      <h2>Styling states</h2>
      <p>
        State comes through data attributes (<code>data-checked</code>,{" "}
        <code>data-disabled</code>), so custom styling never needs JavaScript:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-switch[data-checked] {
  background: var(--ub-success);
}`}
      />
      <h2>Props</h2>
      <p>
        The full Base UI Switch root API passes through. The ones you'll
        reach for:
      </p>
      <PropsTable
        rows={[
          {
            name: "checked",
            type: "boolean",
            description: "Controlled state. Pair with onCheckedChange.",
          },
          {
            name: "defaultChecked",
            type: "boolean",
            defaultValue: "false",
            description: "Initial state when uncontrolled.",
          },
          {
            name: "onCheckedChange",
            type: "(checked: boolean) => void",
            description: "Called when the state changes.",
          },
          {
            name: "disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Blocks interaction and dims the control.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`Switch, from @usebones/react.
- Uncontrolled: defaultChecked. Controlled: checked + onCheckedChange. disabled.
- Wrap in a <label> with its text so the text is clickable, or put it inside FieldRoot with a FieldLabel.
- Restyle in CSS via [data-checked], [data-disabled]; the thumb is .ub-switch-thumb. Tokens only.`}
      />
    </>
  );
}
