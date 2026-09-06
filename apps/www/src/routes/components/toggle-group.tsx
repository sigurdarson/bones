import { createFileRoute, Link } from "@tanstack/react-router";
import { Toggle, ToggleGroup } from "@usebones/react";
import { Icon } from "@usebones/icons";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";
import { ToggleGroupPlayground } from "@/components/toggle-group-playground";

export const Route = createFileRoute("/components/toggle-group")({
  head: () => ({ meta: [{ title: "Toggle group · Bones" }] }),
  component: Page,
});

const alignments = [
  { value: "left", label: "Align left", icon: "align-left" as const },
  { value: "center", label: "Align center", icon: "align-center" as const },
  { value: "right", label: "Align right", icon: "align-right" as const },
];

const marks = [
  { value: "bold", label: "Bold", icon: "bold" as const },
  { value: "italic", label: "Italic", icon: "italic" as const },
  { value: "underline", label: "Underline", icon: "underline" as const },
];

function AlignmentToggles({ size }: { size?: "default" | "compact" }) {
  return alignments.map((alignment) => (
    <Toggle
      key={alignment.value}
      value={alignment.value}
      iconOnly
      aria-label={alignment.label}
      size={size}
    >
      <Icon name={alignment.icon} />
    </Toggle>
  ));
}

function MarkToggles({ size }: { size?: "default" | "compact" }) {
  return marks.map((mark) => (
    <Toggle
      key={mark.value}
      value={mark.value}
      iconOnly
      aria-label={mark.label}
      size={size}
    >
      <Icon name={mark.icon} />
    </Toggle>
  ));
}

function Page() {
  return (
    <>
      <PageHeader title="Toggle group" />
      <p className="lead">
        Several <Link to="/components/toggle">toggles</Link>, one value
        array, wrapping the Base UI Toggle Group. The natural fit for
        toolbars: formatting marks, alignment, view switches.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <ToggleGroupPlayground />
      <h2>Variants</h2>
      <p>
        Single-select (alignment: one at a time) beside multiple
        (formatting: any combination), in both sizes. Size lives on the
        toggles, not the group.
      </p>
      <Showcase
        code={`<ToggleGroup defaultValue={["left"]}>
  <Toggle value="left" iconOnly aria-label="Align left">
    <Icon name="align-left" />
  </Toggle>
  <Toggle value="center" iconOnly aria-label="Align center">
    <Icon name="align-center" />
  </Toggle>
  <Toggle value="right" iconOnly aria-label="Align right">
    <Icon name="align-right" />
  </Toggle>
</ToggleGroup>

<ToggleGroup defaultValue={["bold", "italic"]} multiple>
  <Toggle value="bold" iconOnly aria-label="Bold">
    <Icon name="bold" />
  </Toggle>
  <Toggle value="italic" iconOnly aria-label="Italic">
    <Icon name="italic" />
  </Toggle>
  <Toggle value="underline" iconOnly aria-label="Underline">
    <Icon name="underline" />
  </Toggle>
</ToggleGroup>

{/* compact: size="compact" on each Toggle; the group has no size prop */}
<ToggleGroup defaultValue={["left"]}>
  <Toggle value="left" iconOnly aria-label="Align left" size="compact">
    <Icon name="align-left" />
  </Toggle>
  {/* center, right */}
</ToggleGroup>

<ToggleGroup defaultValue={["bold", "italic"]} multiple>
  <Toggle value="bold" iconOnly aria-label="Bold" size="compact">
    <Icon name="bold" />
  </Toggle>
  {/* italic, underline */}
</ToggleGroup>`}
        note={
          <>
            The group is a flex row with a 0.25rem gap and nothing else; it
            never sets the size, so a mixed-size group is possible but
            looks wrong. Put <code>size="compact"</code> on every toggle.
          </>
        }
      >
        <ToggleGroup defaultValue={["left"]}>
          <AlignmentToggles />
        </ToggleGroup>
        <ToggleGroup defaultValue={["bold", "italic"]} multiple>
          <MarkToggles />
        </ToggleGroup>
        <ToggleGroup defaultValue={["left"]}>
          <AlignmentToggles size="compact" />
        </ToggleGroup>
        <ToggleGroup defaultValue={["bold", "italic"]} multiple>
          <MarkToggles size="compact" />
        </ToggleGroup>
      </Showcase>
      <h2>States</h2>
      <p>
        Pressed and unpressed belong to the toggles; disabled on the group
        dims every member. Arrow keys move focus along the group, and in
        single-select mode pressing the active toggle again unpresses it,
        so the value can become an empty array.
      </p>
      <Showcase
        code={`<ToggleGroup defaultValue={["left"]}>
  <Toggle value="left" iconOnly aria-label="Align left">
    <Icon name="align-left" />
  </Toggle>
  {/* center, right */}
</ToggleGroup>

<ToggleGroup defaultValue={["left"]} disabled>
  <Toggle value="left" iconOnly aria-label="Align left">
    <Icon name="align-left" />
  </Toggle>
  {/* center, right */}
</ToggleGroup>`}
        note={
          <>
            If one option must always stay pressed (alignment usually
            should), control <code>value</code> and ignore updates that
            come back empty.
          </>
        }
      >
        <ToggleGroup defaultValue={["left"]}>
          <AlignmentToggles />
        </ToggleGroup>
        <ToggleGroup defaultValue={["left"]} disabled>
          <AlignmentToggles />
        </ToggleGroup>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The group is a plain flex container, <code>.ub-toggle-group</code>,
        carrying <code>data-multiple</code> when several can be pressed and{" "}
        <code>data-disabled</code> when switched off; the toggles keep their
        own <code>data-pressed</code>. A segmented look is a few lines:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-toggle-group {
  gap: 0;
  padding: 0.125rem;
  border-radius: var(--ub-radius-control);
  background: var(--ub-bg-muted);
}

.ub-toggle-group .ub-toggle[data-pressed] {
  background: var(--ub-bg);
  box-shadow: var(--ub-shadow-sm);
}`}
      />
      <h2>Props</h2>
      <p>
        The group passes the full Base UI API through, and the toggles
        inside are regular Bones Toggles. The essentials:
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
            description: "Called with the new array when any toggle changes; empty when nothing is pressed.",
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
- Wraps Bones Toggles; each joins via value="...". Group state is a string array: defaultValue or value + onValueChange.
- Single-select by default (alignment); multiple for independent toggles (formatting marks). Single-select can still unpress to []; control value if one must stay pressed.
- Size goes on each Toggle (size="compact"); the group has no size prop. disabled on the group disables every member.
- Restyle in CSS via .ub-toggle-group, [data-multiple], [data-disabled]; the toggles style themselves via [data-pressed]. Tokens only.`}
      />
    </>
  );
}
