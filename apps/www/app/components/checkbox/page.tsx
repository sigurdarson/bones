import type { Metadata } from "next";
import { Checkbox } from "@usebones/react";
import { CheckboxPlayground } from "@/components/checkbox-playground";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";
import { AgentInstructions } from "@/components/agent-instructions";

export const metadata: Metadata = { title: "Checkbox" };

export default function Page() {
  return (
    <>
      <PageHeader title="Checkbox" />
      <p className="lead">
        A checkbox wrapping the Base UI Checkbox. Keyboard accessible, with
        a dash indicator for the indeterminate state.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <CheckboxPlayground />
      <h2>States</h2>
      <p>
        Unchecked, checked, indeterminate, and disabled. The radius stays
        fixed even in pill mode, so a checkbox never reads as a radio.
      </p>
      <Showcase
        code={`<Checkbox />
<Checkbox defaultChecked />
<Checkbox indeterminate />
<Checkbox defaultChecked disabled />`}
      >
        <Checkbox aria-label="Unchecked" />
        <Checkbox defaultChecked aria-label="Checked" />
        <Checkbox indeterminate aria-label="Indeterminate" />
        <Checkbox defaultChecked disabled aria-label="Disabled" />
      </Showcase>
      <h2>Styling states</h2>
      <p>
        State comes through data attributes (<code>data-checked</code>,{" "}
        <code>data-indeterminate</code>, <code>data-disabled</code>), so
        custom styling never needs JavaScript:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-checkbox[data-checked] {
  background: var(--ub-success);
  border-color: var(--ub-success);
}`}
      />
      <h2>Props</h2>
      <p>
        The full Base UI Checkbox root API passes through. The ones you'll
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
            type: "(checked) => void",
            description: "Called when the state changes.",
          },
          {
            name: "indeterminate",
            type: "boolean",
            defaultValue: "false",
            description: "Shows the dash indicator; for a parent of a partly checked group.",
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
        instructions={`Checkbox, from @usebones/react.
- Uncontrolled: defaultChecked. Controlled: checked + onCheckedChange. indeterminate for a parent of a partly checked group. disabled.
- Wrap in a <label> with its text so the text is clickable, or put it inside FieldRoot with a FieldLabel.
- Restyle in CSS via [data-checked], [data-indeterminate], [data-disabled], using --ub-* tokens only.`}
      />
    </>
  );
}
