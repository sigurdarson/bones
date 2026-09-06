import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Button,
  Toggle,
  ToolbarButton,
  ToolbarRoot,
  ToolbarSeparator,
} from "@usebones/react";
import { Icon } from "@usebones/icons";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";
import { ToolbarPlayground } from "@/components/toolbar-playground";

export const Route = createFileRoute("/components/toolbar")({
  head: () => ({ meta: [{ title: "Toolbar · Bones" }] }),
  component: Page,
});

const marks = [
  { value: "bold", label: "Bold", icon: "bold" as const },
  { value: "italic", label: "Italic", icon: "italic" as const },
  { value: "underline", label: "Underline", icon: "underline" as const },
];

/* Formatting marks plus a copy button; the same children serve both
   orientations and both disabled examples. */
function FormattingControls({ disabledValue }: { disabledValue?: string }) {
  return (
    <>
      {marks.map((mark) => (
        <ToolbarButton
          key={mark.value}
          render={
            <Toggle
              iconOnly
              aria-label={mark.label}
              defaultPressed={mark.value === "bold"}
            />
          }
          disabled={mark.value === disabledValue}
        >
          <Icon name={mark.icon} />
        </ToolbarButton>
      ))}
      <ToolbarSeparator />
      <ToolbarButton
        render={<Button variant="ghost" iconOnly aria-label="Copy link" />}
      >
        <Icon name="copy" />
      </ToolbarButton>
    </>
  );
}

function Page() {
  return (
    <>
      <PageHeader title="Toolbar" />
      <p className="lead">
        A row of controls that acts as one tab stop, wrapping the Base UI
        Toolbar: Tab lands once, arrow keys move along the row. The
        controls themselves are regular Bones parts (
        <Link to="/components/button">Buttons</Link>,{" "}
        <Link to="/components/toggle">Toggles</Link>) attached via{" "}
        <code>render</code>.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Tab into the toolbar and use the
        arrow keys; the Code tab always shows the markup for exactly what
        you've configured.
      </p>
      <ToolbarPlayground />
      <h2>Variants</h2>
      <p>
        Horizontal by default; <code>orientation="vertical"</code> stacks
        the same children, turns the separators sideways, and swaps the
        arrow keys to up and down.
      </p>
      <Showcase
        code={`<ToolbarRoot aria-label="Formatting">
  <ToolbarButton render={<Toggle iconOnly aria-label="Bold" defaultPressed />}>
    <Icon name="bold" />
  </ToolbarButton>
  <ToolbarButton render={<Toggle iconOnly aria-label="Italic" />}>
    <Icon name="italic" />
  </ToolbarButton>
  <ToolbarButton render={<Toggle iconOnly aria-label="Underline" />}>
    <Icon name="underline" />
  </ToolbarButton>
  <ToolbarSeparator />
  <ToolbarButton render={<Button variant="ghost" iconOnly aria-label="Copy link" />}>
    <Icon name="copy" />
  </ToolbarButton>
</ToolbarRoot>

<ToolbarRoot aria-label="Formatting" orientation="vertical">
  {/* same children */}
</ToolbarRoot>`}
        note={
          <>
            ToolbarSeparator picks the perpendicular orientation on its
            own. ToolbarGroup always lays its children out in a row, so in
            a vertical toolbar put the controls straight in the root.
          </>
        }
      >
        <ToolbarRoot aria-label="Formatting">
          <FormattingControls />
        </ToolbarRoot>
        <ToolbarRoot aria-label="Formatting" orientation="vertical">
          <FormattingControls />
        </ToolbarRoot>
      </Showcase>
      <h2>States</h2>
      <p>
        Disable one control with <code>disabled</code> on its
        ToolbarButton, or everything at once on the root; both surface as{" "}
        <code>data-disabled</code>. Focus is live: Tab lands on one control
        and the ring draws on the real Button or Toggle, not on a wrapper.
      </p>
      <Showcase
        code={`<ToolbarRoot aria-label="Formatting">
  <ToolbarButton render={<Toggle iconOnly aria-label="Bold" defaultPressed />}>
    <Icon name="bold" />
  </ToolbarButton>
  <ToolbarButton render={<Toggle iconOnly aria-label="Italic" />} disabled>
    <Icon name="italic" />
  </ToolbarButton>
  {/* underline, separator, copy link */}
</ToolbarRoot>

<ToolbarRoot aria-label="Formatting" disabled>
  {/* same children */}
</ToolbarRoot>`}
        note={
          <>
            Pressed state belongs to the Toggle inside, so a disabled
            toolbar still shows which marks were on. Disabling the root
            also covers controls added later; nothing inside needs its own
            prop.
          </>
        }
      >
        <ToolbarRoot aria-label="Formatting">
          <FormattingControls disabledValue="italic" />
        </ToolbarRoot>
        <ToolbarRoot aria-label="Formatting" disabled>
          <FormattingControls />
        </ToolbarRoot>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The root carries <code>data-orientation</code> and{" "}
        <code>data-disabled</code>. ToolbarSeparator renders both{" "}
        <code>.ub-separator</code> (the hairline) and{" "}
        <code>.ub-toolbar-separator</code> (the toolbar spacing), so
        restyling the Separator component restyles toolbar dividers too;
        target the toolbar class when you only want these:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-toolbar[data-orientation="vertical"] {
  gap: 0.5rem;
}

.ub-toolbar-separator[data-orientation="vertical"] {
  margin-inline: 0.5rem;
}`}
      />
      <h2>Props</h2>
      <p>
        Six parts, all thin: the toolbar wires roving focus and semantics,
        the rendered controls keep their own behavior. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "ToolbarRoot.aria-label",
            type: "string",
            description: "Names the toolbar for screen readers; always pass one.",
          },
          {
            name: "ToolbarRoot.orientation",
            type: '"horizontal" | "vertical"',
            defaultValue: '"horizontal"',
            description: "Vertical stacks the controls and swaps the arrow keys.",
          },
          {
            name: "ToolbarRoot.disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Switches off every control inside.",
          },
          {
            name: "ToolbarButton.render",
            type: "ReactElement",
            description: "The real control: a Bones Button, Toggle, or anything focusable.",
          },
          {
            name: "ToolbarButton.disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Switches off this one control; forwarded to the rendered element.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`ToolbarRoot, ToolbarButton, ToolbarLink, ToolbarGroup, ToolbarSeparator, ToolbarInput, from @usebones/react.
- Structure: ToolbarRoot (always pass aria-label) wrapping ToolbarButtons; group related ones with ToolbarGroup, divide with ToolbarSeparator.
- Attach real controls via render: ToolbarButton render={<Toggle iconOnly aria-label="..." />} or render={<Button variant="ghost" ... />}; ToolbarInput render={<Input ... />}. The control keeps its own styling and state.
- One tab stop; arrow keys move between controls (swapped by orientation "vertical"). disabled on the root switches off everything; disabled on a ToolbarButton switches off one.
- ToolbarGroup lays out in a row regardless of orientation; in a vertical toolbar put controls straight in the root.
- Restyle in CSS via .ub-toolbar, [data-orientation], [data-disabled]; the separator renders the Separator component's class (.ub-separator) plus .ub-toolbar-separator spacing, so restyling one restyles both. Tokens only.`}
      />
    </>
  );
}
