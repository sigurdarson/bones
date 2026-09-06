import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { OTPFieldPlayground } from "@/components/otp-field-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const Route = createFileRoute("/components/otp-field")({
  head: () => ({ meta: [{ title: "OTP field · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="OTP field" />
      <p className="lead">
        A one-time code entry, wrapping the Base UI OTP Field. One
        component: <code>length</code> renders the slots, typing and
        pasting distribute across them, and the value stays one string.
        Wrap it in a <Link to="/components/field">Field</Link> for a
        label and validation.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Try pasting a full code; the Code
        tab always shows the markup for exactly what you've configured.
      </p>
      <OTPFieldPlayground />
      <h2>Styling states</h2>
      <p>
        The root carries <code>data-complete</code> once every slot is
        filled; each slot carries <code>data-filled</code>,{" "}
        <code>data-invalid</code>, and <code>data-disabled</code>:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-otp-field[data-complete] .ub-otp-field-input {
  border-color: var(--ub-success);
}`}
      />
      <h2>Props</h2>
      <p>
        Everything the Base UI OTP Field root accepts passes through. The
        essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "length",
            type: "number",
            description: "How many characters the code has; renders that many slots.",
          },
          {
            name: "value",
            type: "string",
            description: "The whole code as one string (also defaultValue, onValueChange).",
          },
          {
            name: "onValueChange",
            type: "(value: string) => void",
            description: "Fires per keystroke; check value.length against length for completion.",
          },
          {
            name: "autoSubmit",
            type: "boolean",
            defaultValue: "false",
            description: "Submits the surrounding form once the code is complete.",
          },
          {
            name: "mask",
            type: "boolean",
            defaultValue: "false",
            description: "Hides the entered characters, for codes that act like passwords.",
          },
          {
            name: "size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Default slots are 36px; compact are 28px.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`OTPField, from @usebones/react.
- One component: length renders the slots; value/defaultValue/onValueChange treat the code as one string. Typing, pasting, and arrow keys are handled.
- Wrap in FieldRoot + FieldLabel in real forms (label and validation wire automatically), or pass aria-label.
- autoSubmit submits the surrounding form when complete; mask hides characters; autoComplete defaults to one-time-code so SMS autofill works.
- size "default" (36px slots) | "compact" (28px).
- Restyle in CSS via .ub-otp-field, .ub-otp-field-input, [data-complete] on the root, [data-filled]/[data-invalid]/[data-disabled] on slots. Tokens only.`}
      />
    </>
  );
}
