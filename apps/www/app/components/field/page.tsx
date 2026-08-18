import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { FieldPlayground } from "@/components/field-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { AgentInstructions } from "@/components/agent-instructions";

export const metadata: Metadata = { title: "Field" };

export default function Page() {
  return (
    <>
      <PageHeader title="Field" />
      <p className="lead">
        Label, description, and error for any form control, wrapping the
        Base UI Field. Drop a bones control inside and the accessibility
        wiring and validation state happen automatically.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <FieldPlayground />
      <h2>Validation</h2>
      <p>
        Beyond the manual invalid prop, fields validate from native
        constraints (required, type, pattern) or a custom validate function
        on the root; the error can target a specific condition with match:
      </p>
      <CodeBlock
        code={`<FieldRoot name="email">
  <FieldLabel>Email</FieldLabel>
  <Input type="email" required />
  <FieldError match="valueMissing">Email is required.</FieldError>
  <FieldError match="typeMismatch">That doesn't look like an email.</FieldError>
</FieldRoot>`}
      />
      <h2>Styling states</h2>
      <p>
        The field and the control inside both carry the state
        (<code>data-invalid</code>, <code>data-touched</code>,{" "}
        <code>data-dirty</code>, <code>data-disabled</code>), so custom
        styling never needs JavaScript:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-field[data-invalid] .ub-field-label {
  color: var(--ub-danger);
}`}
      />
      <h2>Props</h2>
      <p>
        Each part passes the full Base UI API through. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "FieldRoot.name",
            type: "string",
            description: "The field's name, forwarded to the control inside.",
          },
          {
            name: "FieldRoot.invalid",
            type: "boolean",
            description: "Forces the invalid state, for server-side errors.",
          },
          {
            name: "FieldRoot.disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Disables the control and dims the label.",
          },
          {
            name: "FieldRoot.validate",
            type: "(value) => string | string[] | null",
            description: "Custom validation; return the error message(s) or null.",
          },
          {
            name: "FieldError.match",
            type: "boolean | keyof ValidityState",
            description: "Show this error only for one validity condition.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`FieldRoot, FieldLabel, FieldDescription, FieldError, from @usebones/react.
- Put one bones control inside FieldRoot (Input, Checkbox, Select, Switch); label wiring, aria-describedby, and validation state are automatic.
- FieldRoot: name, disabled, invalid (for server errors), validate(value).
- FieldError renders only while invalid; match="valueMissing" (or any ValidityState key) binds it to one condition.
- Inside a Field, prefer FieldDescription and FieldError over the control's own hint and invalid props.`}
      />
    </>
  );
}
