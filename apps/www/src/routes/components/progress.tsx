import { createFileRoute, Link } from "@tanstack/react-router";
import { Progress } from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { ProgressPlayground } from "@/components/progress-playground";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/progress")({
  head: () => ({ meta: [{ title: "Progress · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Progress" />
      <p className="lead">
        A task's completion, wrapping the Base UI Progress. The track,
        indicator, and optional label row render automatically, and null
        means indeterminate; a level that isn't a task (storage used)
        belongs in the <Link to="/components/meter">Meter</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <ProgressPlayground />
      <h2>Variants</h2>
      <p>
        Determinate fills to the value and animates width changes;
        indeterminate (<code>value={"{null}"}</code>) sweeps a short bar
        across the track and drops the value, since there's nothing to
        show.
      </p>
      <Showcase
        code={`<Progress value={64} label="Uploading photos" showValue />
<Progress value={null} label="Preparing export" />`}
      >
        <div className="showcase-stack" style={{ width: "18rem" }}>
          <Progress value={64} label="Uploading photos" showValue />
          <Progress value={null} label="Preparing export" />
        </div>
      </Showcase>
      <h2>States</h2>
      <p>
        Base UI sets <code>data-progressing</code> between min and max,{" "}
        <code>data-indeterminate</code> for null, and{" "}
        <code>data-complete</code> at max; the bar looks the same at 100%
        until you style <code>data-complete</code>, so a finished upload
        usually swaps the label too.
      </p>
      <Showcase
        code={`<Progress value={24} label="Uploading photos" showValue />
<Progress value={null} label="Preparing export" />
<Progress value={100} label="Upload complete" showValue />`}
      >
        <div className="showcase-stack" style={{ width: "18rem" }}>
          <Progress value={24} label="Uploading photos" showValue />
          <Progress value={null} label="Preparing export" />
          <Progress value={100} label="Upload complete" showValue />
        </div>
      </Showcase>
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
- Restyle in CSS via .ub-progress-track, .ub-progress-indicator, [data-progressing], [data-indeterminate], [data-complete]. Tokens only; the sweep animation derives from motion tokens so reduced motion stills it.`}
      />
    </>
  );
}
