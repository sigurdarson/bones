import type { Metadata } from "next";
import { Input } from "@usebones/react";
import { CodeBlock } from "@/components/code-block";
import { InputPlayground } from "@/components/input-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";
import { AgentInstructions } from "@/components/agent-instructions";

export const metadata: Metadata = { title: "Input" };

export default function Page() {
  return (
    <>
      <PageHeader title="Input" />
      <p className="lead">
        A text input wrapping the Base UI Input, with optional icons and a
        hint line. Drop it inside a Field for labels, descriptions, and
        validation wired automatically.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <InputPlayground />
      <h2>Variants</h2>
      <p>
        Bordered is the default; borderless trades the border for a muted
        fill, the same surface as a secondary button.
      </p>
      <Showcase
        code={`<Input placeholder="you@example.com" />
<Input variant="borderless" placeholder="you@example.com" />`}
      >
        <div className="showcase-stack" style={{ width: "18rem" }}>
          <Input placeholder="you@example.com" aria-label="Bordered" />
          <Input variant="borderless" placeholder="you@example.com" aria-label="Borderless" />
        </div>
      </Showcase>
      <h2>States</h2>
      <p>
        Focus rings on every focus, not just keyboard. Invalid turns the
        border, ring, and hint to the danger color.
      </p>
      <Showcase
        code={`<Input placeholder="you@example.com" />
<Input defaultValue="ada@usebones.com" />
<Input disabled placeholder="Disabled" />
<Input
  invalid
  defaultValue="ada@usebones"
  hint="That doesn't look like an email address."
/>`}
      >
        <div className="showcase-stack" style={{ width: "18rem" }}>
          <Input placeholder="you@example.com" aria-label="Empty" />
          <Input defaultValue="ada@usebones.com" aria-label="Filled" />
          <Input disabled placeholder="Disabled" aria-label="Disabled" />
          <Input
            invalid
            defaultValue="ada@usebones"
            hint="That doesn't look like an email address."
            aria-label="Invalid"
          />
        </div>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        Field state comes through data attributes
        (<code>data-focused</code>, <code>data-filled</code>,{" "}
        <code>data-invalid</code>), so custom styling never needs JavaScript:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-input[data-invalid] {
  border-color: var(--ub-danger);
}`}
      />
      <h2>Props</h2>
      <p>
        Everything a native <code>input</code> accepts, plus:
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
            description:
              "Default is 36px tall with 16px text; compact is 28px with 14px text. Replaces the native size attribute; control width with CSS.",
          },
          {
            name: "invalid",
            type: "boolean",
            defaultValue: "false",
            description: "Danger border, ring, and hint, plus aria-invalid.",
          },
          {
            name: "leadingIcon",
            type: "ReactNode",
            description: "Icon inside the input, before the text. Decorative.",
          },
          {
            name: "trailingIcon",
            type: "ReactNode",
            description: "Icon inside the input, after the text. Decorative.",
          },
          {
            name: "hint",
            type: "ReactNode",
            description: "Helper text below the input, linked via aria-describedby.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`Input, from @usebones/react.
- variant: "default" | "borderless". size: "default" | "compact". invalid for standalone error state.
- leadingIcon/trailingIcon take a ReactNode (use <Icon /> from @usebones/icons); they are decorative. hint renders below, linked via aria-describedby.
- The Bones size prop replaces the native size attribute; control width with CSS. All other native input props pass through.
- Inside FieldRoot, drop invalid and hint and use FieldLabel, FieldDescription, and FieldError instead.
- Restyle in CSS via [data-focused], [data-filled], [data-invalid], [data-disabled], using --ub-* tokens only.`}
      />
    </>
  );
}
