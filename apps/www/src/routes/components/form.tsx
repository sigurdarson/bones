import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Button,
  FieldError,
  FieldLabel,
  FieldRoot,
  Form,
  Input,
} from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { FormPlayground } from "@/components/form-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/form")({
  head: () => ({ meta: [{ title: "Form · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Form" />
      <p className="lead">
        A native form with consolidated error handling, wrapping the Base
        UI Form. Wrap <Link to="/components/field">fields</Link> inside
        and validation, focus management, and server errors are handled in
        one place.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Try submitting empty, then with a
        typo'd email; flip on the server error to see the{" "}
        <code>errors</code> prop land on the right field.
      </p>
      <FormPlayground />
      <h2>States</h2>
      <p>
        The form has no state of its own; its fields carry it. Invalid,
        touched, and dirty arrive as the user works (focus rings the
        control being edited), and <code>errors</code> pushes a field into
        the invalid state from outside, before any submit:
      </p>
      <Showcase
        code={`<Form errors={{ username: "That name is taken." }}>
  <FieldRoot name="username">
    <FieldLabel>Username</FieldLabel>
    <Input defaultValue="ada" />
    <FieldError />
  </FieldRoot>
  <Button type="submit">Claim username</Button>
</Form>`}
        note={
          <>
            A bare <code>FieldError</code> (no <code>match</code>) renders
            whatever message the <code>errors</code> prop holds for its
            field; editing the field clears it again, so pass the prop from
            state rather than a constant.
          </>
        }
      >
        <div style={{ width: "18rem" }}>
          <Form errors={{ username: "That name is taken." }}>
            <FieldRoot name="username">
              <FieldLabel>Username</FieldLabel>
              <Input defaultValue="ada" />
              <FieldError />
            </FieldRoot>
            <Button type="submit">Claim username</Button>
          </Form>
        </div>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The form element carries no state attributes; the fields inside do
        (<code>data-invalid</code>, <code>data-valid</code>,{" "}
        <code>data-touched</code>, <code>data-dirty</code>), so a form-wide
        treatment scopes through <code>.ub-form</code>:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-form .ub-input[data-valid] {
  border-color: var(--ub-success);
}`}
      />
      <h2>Props</h2>
      <p>
        Everything a native form accepts passes through. Submission goes
        through <code>onFormSubmit</code> so you get parsed values instead
        of a raw event; it only fires once every field is valid.
      </p>
      <PropsTable
        rows={[
          {
            name: "onFormSubmit",
            type: "(values) => void",
            description: "Called with the field values (keyed by Field name) once they all pass validation.",
          },
          {
            name: "validationMode",
            type: '"onSubmit" | "onBlur" | "onChange"',
            defaultValue: '"onSubmit"',
            description: "When fields validate; after a submit attempt they re-validate on change.",
          },
          {
            name: "errors",
            type: "Record<string, string | string[]>",
            description: "Server errors keyed by Field name; each FieldError renders its field's message.",
          },
          {
            name: "actionsRef",
            type: "RefObject<FormActions>",
            description: "Imperative validate(), for all fields or one by name.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`Form, from @usebones/react.
- Wrap Fields inside (FieldRoot name="..." + control + FieldError); submit with a Bones Button type="submit".
- onFormSubmit(values) fires only when all fields are valid; values are keyed by Field name.
- validationMode: "onSubmit" (default) | "onBlur" | "onChange".
- Server errors: pass errors={{ fieldName: "message" }} and render a bare <FieldError /> in that field; clear by passing undefined.
- Group related fields with FieldsetRoot + FieldsetLegend inside the form.
- Restyle in CSS via .ub-form (a 1rem column flex stack) scoping the fields' [data-invalid], [data-valid], [data-touched], [data-dirty]. Tokens only.`}
      />
    </>
  );
}
