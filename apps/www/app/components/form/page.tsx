import type { Metadata } from "next";
import Link from "next/link";
import { AgentInstructions } from "@/components/agent-instructions";
import { FormPlayground } from "@/components/form-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const metadata: Metadata = { title: "Form" };

export default function Page() {
  return (
    <>
      <PageHeader title="Form" />
      <p className="lead">
        A native form with consolidated error handling, wrapping the Base
        UI Form. Wrap <Link href="/components/field">fields</Link> inside
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
- Restyle in CSS via .ub-form (a 1rem column flex stack). Tokens only.`}
      />
    </>
  );
}
