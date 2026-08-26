import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import { MeterPlayground } from "@/components/meter-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

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
        storage used, seats filled, battery left. It reports a level, so
        there's no indeterminate state; for tasks underway, use{" "}
        <Link to="/components/progress">Progress</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <MeterPlayground />
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
- Restyle in CSS via .ub-meter-track, .ub-meter-indicator. Tokens only.`}
      />
    </>
  );
}
