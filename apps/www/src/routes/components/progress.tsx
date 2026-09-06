import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { ProgressPlayground } from "@/components/progress-playground";
import { PropsTable } from "@/components/props-table";

export const Route = createFileRoute("/components/progress")({
  head: () => ({ meta: [{ title: "Progress · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Progress" />
      <p className="lead">
        A task's completion, wrapping the Base UI Progress. One component:
        the track, indicator, and optional label row render automatically,
        and null means indeterminate. For a level that isn't a task (like
        storage used), reach for the{" "}
        <Link to="/components/meter">Meter</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <ProgressPlayground />
      <h2>Styling states</h2>
      <p>
        The root carries <code>data-indeterminate</code> while the value is
        null and <code>data-complete</code> at the max; the width
        transition and sweep animation both run on motion tokens:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-progress[data-complete] .ub-progress-indicator {
  background: var(--ub-success);
}`}
      />
      <h2>Props</h2>
      <p>
        Everything the Base UI Progress root accepts passes through
        (min, max, locale, format as Intl.NumberFormat options), plus:
      </p>
      <PropsTable
        rows={[
          {
            name: "value",
            type: "number | null",
            description: "Completion within min/max; null means indeterminate.",
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
            description: "How the value reads, e.g. { style: \"decimal\" }.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`Progress, from @usebones/react.
- One component; track, indicator, and the optional label row render automatically. value + min/max pass through; value={null} is indeterminate.
- Always pass label (or aria-label); a dev warning fires without one. showValue adds the formatted value, format takes Intl.NumberFormatOptions.
- For current levels (storage, quota) use Meter instead; Progress is for tasks underway.
- Restyle in CSS via .ub-progress-track, .ub-progress-indicator, [data-indeterminate], [data-complete]. Tokens only; the sweep animation derives from motion tokens so reduced motion stills it.`}
      />
    </>
  );
}
