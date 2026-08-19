import type { Metadata } from "next";
import { NumberField } from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { NumberFieldPlayground } from "@/components/number-field-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const metadata: Metadata = { title: "Number field" };

export default function Page() {
  return (
    <>
      <PageHeader title="Number field" />
      <p className="lead">
        A number input with stepper buttons, wrapping the Base UI Number
        Field. Keyboard stepping, hold-to-repeat, and min/max clamping come
        from the foundation.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <NumberFieldPlayground />
      <h2>States</h2>
      <p>
        The steppers disable themselves at min and max. Disabled and invalid
        are the ones you set; invalid turns the border and hint to the
        danger color.
      </p>
      <Showcase
        code={`<NumberField defaultValue={1} min={1} max={12} />
<NumberField defaultValue={4} disabled />
<NumberField
  defaultValue={0}
  invalid
  hint="Pick at least one seat."
/>`}
      >
        <div className="showcase-stack">
          <NumberField defaultValue={1} min={1} max={12} aria-label="At minimum" />
          <NumberField defaultValue={4} disabled aria-label="Disabled" />
          <NumberField
            defaultValue={0}
            invalid
            hint="Pick at least one seat."
            aria-label="Invalid"
          />
        </div>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The root carries <code>data-invalid</code> and the parts carry{" "}
        <code>data-disabled</code>, so custom styling never needs JavaScript:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-number-field[data-invalid] .ub-number-field-group {
  border-color: var(--ub-danger);
}`}
      />
      <h2>Props</h2>
      <p>
        Everything the Base UI Number Field root accepts (min, max, step,
        largeStep, value, onValueChange, disabled, ...), plus:
      </p>
      <PropsTable
        rows={[
          {
            name: "variant",
            type: '"default" | "borderless"',
            defaultValue: '"default"',
            description: "Bordered, or a muted fill with no border.",
          },
          {
            name: "size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Default is 36px tall with 16px text; compact is 28px with 14px text.",
          },
          {
            name: "invalid",
            type: "boolean",
            defaultValue: "false",
            description: "Danger border, ring, and hint, plus aria-invalid.",
          },
          {
            name: "hint",
            type: "ReactNode",
            description: "Helper text below the field, linked via aria-describedby.",
          },
          {
            name: "placeholder",
            type: "string",
            description: "Placeholder for the inner input.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`NumberField, from @usebones/react.
- One component; steppers and input render automatically. min, max, step, largeStep, defaultValue, value + onValueChange, and disabled pass through to the root.
- variant "default" | "borderless"; size "default" | "compact"; invalid; hint (aria-describedby); placeholder.
- Inside FieldRoot, drop invalid and hint and use FieldLabel, FieldDescription, and FieldError instead.
- Restyle in CSS via [data-invalid] on .ub-number-field and [data-disabled] on the parts (.ub-number-field-input, .ub-number-field-step). Tokens only.`}
      />
    </>
  );
}
