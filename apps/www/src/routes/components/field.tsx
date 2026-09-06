import { createFileRoute } from "@tanstack/react-router";
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
  Input,
} from "@usebones/react";
import { CodeBlock } from "@/components/code-block";
import { FieldPlayground } from "@/components/field-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";
import { AgentInstructions } from "@/components/agent-instructions";

export const Route = createFileRoute("/components/field")({
  head: () => ({ meta: [{ title: "Field · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Field" />
      <p className="lead">
        Label, description, and error for any form control, wrapping the
        Base UI Field. Drop a Bones control inside and the accessibility
        wiring and validation state happen automatically.
      </p>
      <h2>Playground</h2>
      <p>
        Flip Invalid to watch the error replace the description and the
        input turn red at the same time; click the label to prove it
        focuses the input.
      </p>
      <FieldPlayground />
      <h2>States</h2>
      <p>
        Invalid and disabled are the ones you set; touched, dirty, and
        filled arrive on their own as the user works, and focus rings the
        control inside on every focus.
      </p>
      <Showcase
        code={`<FieldRoot name="email">
  <FieldLabel>Email</FieldLabel>
  <Input type="email" placeholder="you@example.com" />
  <FieldDescription>We only use this for receipts.</FieldDescription>
</FieldRoot>

<FieldRoot name="email" invalid>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" defaultValue="ada@usebones" />
  <FieldError match>That doesn't look like an email address.</FieldError>
</FieldRoot>

<FieldRoot name="email" disabled>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" defaultValue="ada@usebones.com" />
  <FieldDescription>Managed by your workspace admin.</FieldDescription>
</FieldRoot>`}
        note={
          <>
            A forced <code>invalid</code> marks the field but runs no
            validation, so a <code>FieldError</code> needs{" "}
            <code>match</code> to show; errors that come from validation
            render on their own.
          </>
        }
      >
        <div className="showcase-stack" style={{ width: "18rem" }}>
          <FieldRoot name="email">
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="you@example.com" />
            <FieldDescription>We only use this for receipts.</FieldDescription>
          </FieldRoot>
          <FieldRoot name="email" invalid>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" defaultValue="ada@usebones" />
            <FieldError match>That doesn't look like an email address.</FieldError>
          </FieldRoot>
          <FieldRoot name="email" disabled>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" defaultValue="ada@usebones.com" />
            <FieldDescription>Managed by your workspace admin.</FieldDescription>
          </FieldRoot>
        </div>
      </Showcase>
      <p>
        Beyond the manual invalid prop, fields validate from native
        constraints (required, type, pattern) or a custom validate function
        on the root. Each error can target one condition with{" "}
        <code>match</code>, so the message fits the mistake:
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
            name: "FieldRoot.validationMode",
            type: '"onBlur" | "onChange" | "onSubmit"',
            defaultValue: '"onSubmit"',
            description: "When validation runs; overrides the Form-level setting for this field.",
          },
          {
            name: "FieldRoot.validationDebounceTime",
            type: "number",
            defaultValue: "0",
            description: "Milliseconds to wait before validating on change.",
          },
          {
            name: "FieldRoot.validate",
            type: "(value, formValues) => string | string[] | null | Promise<...>",
            description: "Custom validation, sync or async; return the error message(s) or null. Receives the other fields' values too.",
          },
          {
            name: "FieldError.match",
            type: "boolean | keyof ValidityState",
            description: "Show this error only for one validity condition; true forces it on.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`FieldRoot, FieldLabel, FieldDescription, FieldError, from @usebones/react.
- Put one Bones control inside FieldRoot (Input, Checkbox, Select, Switch); label wiring, aria-describedby, and validation state are automatic.
- FieldRoot: name, disabled, invalid (for server errors), validate(value).
- FieldError renders only while invalid; match="valueMissing" (or any ValidityState key) binds it to one condition. A forced invalid on the root needs match (true) on the error for it to show.
- Inside a Field, prefer FieldDescription and FieldError over the control's own hint and invalid props.
- Restyle in CSS via .ub-field, .ub-field-label, .ub-field-description, .ub-field-error, and [data-invalid], [data-touched], [data-dirty], [data-filled], [data-disabled] on the root and the control. Tokens only.`}
      />
    </>
  );
}
