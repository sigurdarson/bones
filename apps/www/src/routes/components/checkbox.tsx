import { createFileRoute } from "@tanstack/react-router";
import { Checkbox } from "@usebones/react";
import { CheckboxPlayground } from "@/components/checkbox-playground";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";
import { AgentInstructions } from "@/components/agent-instructions";

export const Route = createFileRoute("/components/checkbox")({
  head: () => ({ meta: [{ title: "Checkbox · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Checkbox" />
      <p className="lead">
        A checkbox wrapping the Base UI Checkbox. Keyboard accessible, with
        a dash indicator for the indeterminate state.
      </p>
      <h2>Playground</h2>
      <p>
        Flip Indeterminate to see the dash take over the check, then click
        the box in the preview: the Checked control moves with it, since
        they share one piece of state. The Code tab shows the markup for
        exactly what you've configured.
      </p>
      <CheckboxPlayground />
      <h2>States</h2>
      <p>
        Unchecked, checked, indeterminate, and disabled, one preference
        four ways. Hover changes nothing on purpose and keyboard focus adds
        a ring; the radius stays fixed even in pill mode, so a checkbox
        never reads as a radio.
      </p>
      <Showcase
        code={`<label><Checkbox /> Email me about product updates</label>
<label><Checkbox defaultChecked /> Email me about product updates</label>
<label><Checkbox indeterminate /> Email me about product updates</label>
<label><Checkbox defaultChecked disabled /> Email me about product updates</label>`}
      >
        <div className="showcase-stack">
          <label className="preview-field">
            <Checkbox /> Email me about product updates
          </label>
          <label className="preview-field">
            <Checkbox defaultChecked /> Email me about product updates
          </label>
          <label className="preview-field">
            <Checkbox indeterminate /> Email me about product updates
          </label>
          <label className="preview-field">
            <Checkbox defaultChecked disabled /> Email me about product updates
          </label>
        </div>
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
          {
            name: "value",
            type: "string",
            description: "Identifies the box inside a CheckboxGroup; see that page for parent and select-all.",
          },
          {
            name: "required",
            type: "boolean",
            defaultValue: "false",
            description: "Native required validation, surfaced by a wrapping Field.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`Checkbox, from @usebones/react.
- Uncontrolled: defaultChecked. Controlled: checked + onCheckedChange. indeterminate is display only (it shows the dash without changing checked); use it for a parent of a partly checked group. disabled.
- Wrap in a <label> with its text so the text is clickable, or put it inside FieldRoot with a FieldLabel.
- Restyle in CSS via .ub-checkbox, .ub-checkbox-indicator, [data-checked], [data-indeterminate], [data-disabled]. Tokens only.`}
      />
    </>
  );
}
