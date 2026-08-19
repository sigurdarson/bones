import type { Metadata } from "next";
import Link from "next/link";
import { AgentInstructions } from "@/components/agent-instructions";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { ToggleGroupPlayground } from "@/components/toggle-group-playground";

export const metadata: Metadata = { title: "Toggle group" };

export default function Page() {
  return (
    <>
      <PageHeader title="Toggle group" />
      <p className="lead">
        Several <Link href="/components/toggle">toggles</Link>, one value
        array, wrapping the Base UI Toggle Group. The natural fit for
        toolbars: formatting marks, alignment, view switches.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <ToggleGroupPlayground />
      <h2>Props</h2>
      <p>
        The group passes the full Base UI API through, and the toggles
        inside are regular bones Toggles. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "defaultValue",
            type: "string[]",
            description: "Pressed values on first render, when uncontrolled.",
          },
          {
            name: "value",
            type: "string[]",
            description: "Controlled pressed values. Pair with onValueChange.",
          },
          {
            name: "onValueChange",
            type: "(value: string[]) => void",
            description: "Called with the new array when any toggle changes.",
          },
          {
            name: "multiple",
            type: "boolean",
            defaultValue: "false",
            description: "Allow several pressed at once instead of single-select.",
          },
          {
            name: "disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Disables every toggle inside.",
          },
          {
            name: "Toggle.value",
            type: "string",
            description: "Joins the toggle to the group under this value.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`ToggleGroup, from @usebones/react.
- Wraps bones Toggles; each joins via value="...". Group state is a string array: defaultValue or value + onValueChange.
- Single-select by default (alignment); multiple for independent toggles (formatting marks).
- disabled on the group disables every member.
- Restyle the container in CSS via .ub-toggle-group; the toggles style themselves. Tokens only.`}
      />
    </>
  );
}
