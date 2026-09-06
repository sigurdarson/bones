import { createFileRoute, Link } from "@tanstack/react-router";
import { Meter } from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { MeterPlayground } from "@/components/meter-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/meter")({
  head: () => ({ meta: [{ title: "Meter · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Meter" />
      <p className="lead">
        A measurement within a known range, wrapping the Base UI Meter:
        storage used, seats filled, battery left. It reports a level rather
        than a task, so there's no indeterminate state; tasks underway
        belong in <Link to="/components/progress">Progress</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <MeterPlayground />
      <h2>Variants</h2>
      <p>
        With the label row, or the bare bar. The label is what names the
        meter for screen readers, so a bare bar needs{" "}
        <code>aria-label</code> instead.
      </p>
      <Showcase
        code={`<Meter value={62} label="Storage used" showValue />
<Meter value={62} aria-label="Storage used" />`}
      >
        <div className="showcase-stack" style={{ width: "18rem" }}>
          <Meter value={62} label="Storage used" showValue />
          <Meter value={62} aria-label="Storage used" />
        </div>
      </Showcase>
      <h2>States</h2>
      <p>
        Low and high are just values: the indicator animates between them
        on the base duration, and there's no built-in threshold color,
        since what counts as nearly full depends on the product.
      </p>
      <Showcase
        code={`<Meter value={12} label="Storage used" showValue />
<Meter value={94} label="Storage used" showValue />`}
      >
        <div className="showcase-stack" style={{ width: "18rem" }}>
          <Meter value={12} label="Storage used" showValue />
          <Meter value={94} label="Storage used" showValue />
        </div>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The meter carries no state attributes of its own (a level is a
        number, not a state), so the hooks are the parts:{" "}
        <code>.ub-meter-track</code> and <code>.ub-meter-indicator</code>.
        Thresholds are yours to add: set a class on the root when the value
        crosses one and target it.
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-meter-track {
  height: 0.5rem;
}

.ub-meter.nearly-full .ub-meter-indicator {
  background: var(--ub-danger);
}`}
      />
      <h2>Props</h2>
      <p>
        Everything the Base UI Meter root accepts passes through (min,
        max, locale, format as Intl.NumberFormat options), plus:
      </p>
      <PropsTable
        rows={[
          {
            name: "value",
            type: "number",
            description: "The current level within min/max.",
          },
          {
            name: "label",
            type: "ReactNode",
            description: "Text above the bar; also names it for screen readers.",
          },
          {
            name: "showValue",
            type: "boolean",
            defaultValue: "false",
            description: "Renders the formatted value (a percentage by default) beside the label.",
          },
          {
            name: "format",
            type: "Intl.NumberFormatOptions",
            description: "How the value reads, e.g. { style: \"unit\", unit: \"gigabyte\" }.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`Meter, from @usebones/react.
- One component; track, indicator, and the optional label row render automatically. value + min/max pass through.
- Always pass label (or aria-label); a dev warning fires without one. showValue adds the formatted value, format takes Intl.NumberFormatOptions.
- A meter is a current level, never a loading state; use Progress for tasks underway.
- No state attributes; restyle in CSS via .ub-meter-track, .ub-meter-indicator, and add your own class for thresholds. Tokens only.`}
      />
    </>
  );
}
