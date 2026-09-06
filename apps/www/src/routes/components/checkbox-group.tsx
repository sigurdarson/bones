import { createFileRoute } from "@tanstack/react-router";
import { Checkbox, CheckboxGroup } from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CheckboxGroupPlayground } from "@/components/checkbox-group-playground";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/checkbox-group")({
  head: () => ({ meta: [{ title: "Checkbox group · Bones" }] }),
  component: Page,
});

const channels = ["email", "sms", "push"];

function ChannelRows() {
  return (
    <>
      <label className="preview-field">
        <Checkbox parent /> All channels
      </label>
      <label className="preview-field">
        <Checkbox value="email" /> Email
      </label>
      <label className="preview-field">
        <Checkbox value="sms" /> SMS
      </label>
      <label className="preview-field">
        <Checkbox value="push" /> Push
      </label>
    </>
  );
}

function Page() {
  return (
    <>
      <PageHeader title="Checkbox group" />
      <p className="lead">
        Several checkboxes, one value array, wrapping the Base UI Checkbox
        Group. Add a parent checkbox and select-all with an indeterminate
        middle state comes free.
      </p>
      <h2>Playground</h2>
      <p>
        With the parent row on, uncheck one channel and the parent drops
        to the indeterminate dash; Disabled greys the whole group at once.
        The Code tab shows the markup for exactly what you've configured.
      </p>
      <CheckboxGroupPlayground />
      <h2>States</h2>
      <p>
        None, some, and all checked: the parent row follows the members,
        unchecked, dash, then check. Click any row to watch it move;
        keyboard focus rings each box in turn, and hover does nothing
        visible on purpose.
      </p>
      <Showcase
        code={`const channels = ["email", "sms", "push"];

<CheckboxGroup allValues={channels} defaultValue={[]}>
  <label><Checkbox parent /> All channels</label>
  <label><Checkbox value="email" /> Email</label>
  <label><Checkbox value="sms" /> SMS</label>
  <label><Checkbox value="push" /> Push</label>
</CheckboxGroup>

<CheckboxGroup allValues={channels} defaultValue={["email"]}>
  {/* same rows */}
</CheckboxGroup>

<CheckboxGroup allValues={channels} defaultValue={channels}>
  {/* same rows */}
</CheckboxGroup>`}
      >
        <div style={{ width: "8rem" }}>
          <CheckboxGroup allValues={channels} defaultValue={[]}>
            <ChannelRows />
          </CheckboxGroup>
        </div>
        <div style={{ width: "8rem" }}>
          <CheckboxGroup allValues={channels} defaultValue={["email"]}>
            <ChannelRows />
          </CheckboxGroup>
        </div>
        <div style={{ width: "8rem" }}>
          <CheckboxGroup allValues={channels} defaultValue={channels}>
            <ChannelRows />
          </CheckboxGroup>
        </div>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The group carries <code>data-disabled</code> when disabled as a
        whole; each member is a regular Checkbox with its own{" "}
        <code>data-checked</code> and <code>data-indeterminate</code>, so
        a softer parent dash is one rule scoped to the group:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-checkbox-group .ub-checkbox[data-indeterminate] {
  background: var(--ub-accent-hover);
}

.ub-checkbox-group[data-disabled] {
  color: var(--ub-text-tertiary);
}`}
      />
      <h2>Props</h2>
      <p>
        The group passes the full Base UI API through, and the checkboxes
        inside are regular Bones Checkboxes. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "defaultValue",
            type: "string[]",
            description: "Checked values on first render, when uncontrolled.",
          },
          {
            name: "value",
            type: "string[]",
            description: "Controlled checked values. Pair with onValueChange.",
          },
          {
            name: "onValueChange",
            type: "(value: string[]) => void",
            description: "Called with the new array when any member changes.",
          },
          {
            name: "allValues",
            type: "string[]",
            description: "Every member value; required for a parent checkbox.",
          },
          {
            name: "disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Disables every checkbox inside.",
          },
          {
            name: "Checkbox.value",
            type: "string",
            description: "Joins the checkbox to the group under this value.",
          },
          {
            name: "Checkbox.parent",
            type: "boolean",
            defaultValue: "false",
            description: "Makes this checkbox the select-all parent.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`CheckboxGroup, from @usebones/react.
- Wraps Bones Checkboxes; each joins via value="...". Group state: defaultValue or value + onValueChange (string arrays).
- Select-all: pass allValues={[...]} on the group and render one <Checkbox parent /> row; it checks, unchecks, and shows indeterminate automatically.
- disabled on the group disables every member.
- Wrap each checkbox in a <label> with its text so the text is clickable.
- Restyle in CSS via .ub-checkbox-group, [data-disabled] on the group, and the member Checkbox's [data-checked], [data-indeterminate], [data-disabled]. Tokens only.`}
      />
    </>
  );
}
