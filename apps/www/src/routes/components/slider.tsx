import { createFileRoute } from "@tanstack/react-router";
import { Slider } from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";
import { SliderPlayground } from "@/components/slider-playground";

export const Route = createFileRoute("/components/slider")({
  head: () => ({ meta: [{ title: "Slider · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Slider" />
      <p className="lead">
        Pick a value (or a range) from a track, wrapping the Base UI Slider.
        Keyboard stepping and pointer dragging come from the foundation.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <SliderPlayground />
      <h2>States</h2>
      <p>
        Dragging tracks the pointer with zero lag on purpose; position is
        never animated. Disabled dims the whole control.
      </p>
      <Showcase
        code={`<Slider defaultValue={40} aria-label="Volume" />
<Slider defaultValue={[20, 60]} aria-label="Price" />
<Slider defaultValue={40} disabled aria-label="Volume" />`}
      >
        <div className="showcase-stack" style={{ width: "16rem" }}>
          <Slider defaultValue={40} aria-label="Volume" />
          <Slider defaultValue={[20, 60]} aria-label="Price" />
          <Slider defaultValue={40} disabled aria-label="Volume" />
        </div>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The root carries <code>data-disabled</code> and thumbs carry{" "}
        <code>data-dragging</code> while held, so custom styling never needs
        JavaScript:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-slider-thumb[data-dragging] {
  border-color: var(--ub-accent);
}`}
      />
      <h2>Props</h2>
      <p>
        Everything the Base UI Slider root accepts (min, max, step,
        largeStep, orientation, ...), plus:
      </p>
      <PropsTable
        rows={[
          {
            name: "defaultValue",
            type: "number | number[]",
            description: "Initial value; an array renders a thumb per entry (range).",
          },
          {
            name: "value",
            type: "number | number[]",
            description: "Controlled value. Pair with onValueChange.",
          },
          {
            name: "onValueChange",
            type: "(value) => void",
            description: "Called continuously while sliding; onValueCommitted fires on release.",
          },
          {
            name: "aria-label",
            type: "string",
            description: "Accessible name for the thumb; ranges suffix it with the index.",
          },
          {
            name: "disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Blocks interaction and dims the control.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`Slider, from @usebones/react.
- One component; track, indicator, and thumbs render automatically. min, max, step, largeStep, orientation, defaultValue, value + onValueChange, onValueCommitted, and disabled pass through.
- An array value ([20, 60]) renders a range with a thumb per entry.
- Always pass aria-label (ranges suffix it per thumb), or wrap in a Field with a FieldLabel.
- Restyle in CSS via .ub-slider-track, .ub-slider-indicator, .ub-slider-thumb, [data-dragging], [data-disabled]. Never animate thumb position. Tokens only.`}
      />
    </>
  );
}
