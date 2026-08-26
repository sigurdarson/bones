import { createFileRoute } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import { CheckboxGroupPlayground } from "@/components/checkbox-group-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const Route = createFileRoute("/components/checkbox-group")({
  head: () => ({ meta: [{ title: "Checkbox group · Bones" }] }),
  component: Page,
});

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
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured; try unchecking one channel with
        the parent row on.
      </p>
      <CheckboxGroupPlayground />
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
- Wrap each checkbox in a <label> with its text so the text is clickable.`}
      />
    </>
  );
}
