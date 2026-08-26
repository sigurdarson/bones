import type { Metadata } from "next";
import Link from "next/link";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { FieldsetPlayground } from "@/components/fieldset-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const metadata: Metadata = { title: "Fieldset" };

export default function Page() {
  return (
    <>
      <PageHeader title="Fieldset" />
      <p className="lead">
        Related <Link href="/components/field">fields</Link> grouped under
        one legend, wrapping the Base UI Fieldset. It renders a native
        fieldset, so disabling the group disables everything inside the way
        browsers already understand.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <FieldsetPlayground />
      <h2>Styling states</h2>
      <p>
        The root and legend both carry <code>data-disabled</code> while the
        group is off, so custom styling never needs JavaScript:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-fieldset[data-disabled] .ub-fieldset-legend {
  color: var(--ub-text-disabled);
}`}
      />
      <h2>Props</h2>
      <p>
        Both parts pass every native attribute through; the legend is an
        accessible name, not a styling hook. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "FieldsetRoot.disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Disables every control inside, natively.",
          },
          {
            name: "FieldsetLegend.children",
            type: "ReactNode",
            description: "The group's title, announced by screen readers.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`FieldsetRoot and FieldsetLegend, from @usebones/react.
- Put Field components (FieldRoot + FieldLabel + a control) inside FieldsetRoot; FieldsetLegend names the group.
- disabled on the root disables every control inside (native fieldset behavior).
- For a whole form, wrap fieldsets in the Bones Form component.
- Restyle in CSS via .ub-fieldset, .ub-fieldset-legend, [data-disabled]. Tokens only.`}
      />
    </>
  );
}
