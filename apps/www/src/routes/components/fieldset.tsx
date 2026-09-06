import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FieldLabel,
  FieldRoot,
  FieldsetLegend,
  FieldsetRoot,
  Input,
} from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { FieldsetPlayground } from "@/components/fieldset-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/fieldset")({
  head: () => ({ meta: [{ title: "Fieldset · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Fieldset" />
      <p className="lead">
        Related <Link to="/components/field">fields</Link> grouped under
        one legend, wrapping the Base UI Fieldset. It renders a native
        fieldset, so disabling the group disables everything inside the way
        browsers already understand.
      </p>
      <h2>Playground</h2>
      <p>
        Flip Disabled and tab through the preview: both inputs drop out of
        the tab order and the legend dims, with nothing set on the fields
        themselves.
      </p>
      <FieldsetPlayground />
      <h2>States</h2>
      <p>
        Enabled or disabled is the whole story; hover and focus belong to
        the controls inside, and a disabled group takes them out of the tab
        order entirely.
      </p>
      <Showcase
        code={`<FieldsetRoot>
  <FieldsetLegend>Billing address</FieldsetLegend>
  <FieldRoot name="street">
    <FieldLabel>Street</FieldLabel>
    <Input placeholder="12 North Road" />
  </FieldRoot>
</FieldsetRoot>

<FieldsetRoot disabled>
  <FieldsetLegend>Billing address</FieldsetLegend>
  <FieldRoot name="street">
    <FieldLabel>Street</FieldLabel>
    <Input defaultValue="12 North Road" />
  </FieldRoot>
</FieldsetRoot>`}
      >
        <div className="showcase-stack" style={{ width: "18rem" }}>
          <FieldsetRoot>
            <FieldsetLegend>Billing address</FieldsetLegend>
            <FieldRoot name="street">
              <FieldLabel>Street</FieldLabel>
              <Input placeholder="12 North Road" />
            </FieldRoot>
          </FieldsetRoot>
          <FieldsetRoot disabled>
            <FieldsetLegend>Billing address</FieldsetLegend>
            <FieldRoot name="street">
              <FieldLabel>Street</FieldLabel>
              <Input defaultValue="12 North Road" />
            </FieldRoot>
          </FieldsetRoot>
        </div>
      </Showcase>
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
      <p>
        One quirk: a native fieldset refuses to shrink below its content
        (browsers default it to <code>min-width: min-content</code>), which
        breaks inside flex and grid layouts; Bones resets that to 0, so the
        group behaves like any other block.
      </p>
      <AgentInstructions
        instructions={`FieldsetRoot and FieldsetLegend, from @usebones/react.
- Put Field components (FieldRoot + FieldLabel + a control) inside FieldsetRoot; FieldsetLegend names the group.
- disabled on the root disables every control inside (native fieldset behavior); nothing to set on the fields.
- For a whole form, wrap fieldsets in the Bones Form component.
- Restyle in CSS via .ub-fieldset, .ub-fieldset-legend, [data-disabled]. Tokens only.`}
      />
    </>
  );
}
