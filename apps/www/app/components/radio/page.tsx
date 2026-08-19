import type { Metadata } from "next";
import { Radio, RadioGroup } from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { RadioPlayground } from "@/components/radio-playground";
import { Showcase } from "@/components/showcase";

export const metadata: Metadata = { title: "Radio" };

export default function Page() {
  return (
    <>
      <PageHeader title="Radio" />
      <p className="lead">
        One choice from a set, wrapping the Base UI Radio and Radio Group.
        Arrow keys move the selection; the dot indicator renders itself.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <RadioPlayground />
      <h2>States</h2>
      <p>
        Checked, unchecked, and disabled. Radios stay round even in pill
        mode, because they were round already.
      </p>
      <Showcase
        code={`<RadioGroup defaultValue="checked">
  <Radio value="checked" />
  <Radio value="unchecked" />
  <Radio value="disabled" disabled />
</RadioGroup>`}
      >
        <RadioGroup defaultValue="checked" style={{ flexDirection: "row", gap: "0.625rem" }}>
          <Radio value="checked" aria-label="Checked" />
          <Radio value="unchecked" aria-label="Unchecked" />
          <Radio value="disabled" disabled aria-label="Disabled" />
        </RadioGroup>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        State comes through data attributes (<code>data-checked</code>,{" "}
        <code>data-disabled</code>), so custom styling never needs JavaScript:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-radio[data-checked] {
  background: var(--ub-success);
  border-color: var(--ub-success);
}`}
      />
      <h2>Props</h2>
      <p>
        Both parts pass the full Base UI API through. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "RadioGroup.defaultValue",
            type: "any",
            description: "The option selected on first render, when uncontrolled.",
          },
          {
            name: "RadioGroup.value",
            type: "any",
            description: "Controlled selection. Pair with onValueChange.",
          },
          {
            name: "RadioGroup.onValueChange",
            type: "(value) => void",
            description: "Called when the selection changes.",
          },
          {
            name: "RadioGroup.disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Disables every radio inside.",
          },
          {
            name: "Radio.value",
            type: "any",
            description: "Identity of this option within the group.",
          },
          {
            name: "Radio.disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Disables just this option.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`Radio and RadioGroup, from @usebones/react.
- RadioGroup: defaultValue or value + onValueChange; disabled disables every radio inside. Radios go inside as <Radio value="..." />.
- Wrap each radio in a <label> with its text so the text is clickable.
- The dot indicator renders automatically; arrow keys move the selection.
- Restyle in CSS via [data-checked], [data-disabled]; the dot is .ub-radio-indicator. Tokens only.`}
      />
    </>
  );
}
