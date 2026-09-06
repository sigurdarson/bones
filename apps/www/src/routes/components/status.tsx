import { createFileRoute, Link } from "@tanstack/react-router";
import { Status } from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";
import { StatusPlayground } from "@/components/status-playground";

export const Route = createFileRoute("/components/status")({
  head: () => ({
    meta: [
      { title: "Status · Bones" },
      { name: "description", content: "An 8px status dot in the five feedback colors, named for screen readers or decorative beside text." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Status" />
      <p className="lead">
        An 8px dot in one of the five feedback colors. A Bones component
        (Base UI has no such part), and the smallest one: it names itself
        for screen readers when it stands alone, and steps aside when text
        next to it already says the state.
      </p>
      <h2>Playground</h2>
      <p>
        Change the color and toggle the label to see how the dot presents
        itself to assistive tech; the Code tab shows the markup.
      </p>
      <StatusPlayground />
      <h2>Variants</h2>
      <p>
        Neutral, success, info, warning, and danger, straight from the
        feedback tokens. Color alone is never the whole message: pair the
        dot with a word, or give it a label.
      </p>
      <Showcase
        code={`<Status label="Offline" />
<Status color="success" label="Online" />
<Status color="info" label="Syncing" />
<Status color="warning" label="Degraded" />
<Status color="danger" label="Failed" />`}
      >
        <div className="showcase-row">
          <span className="showcase-row"><Status label="Offline" /> Offline</span>
          <span className="showcase-row"><Status color="success" label="Online" /> Online</span>
          <span className="showcase-row"><Status color="info" label="Syncing" /> Syncing</span>
          <span className="showcase-row"><Status color="warning" label="Degraded" /> Degraded</span>
          <span className="showcase-row"><Status color="danger" label="Failed" /> Failed</span>
        </div>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The color is a data attribute and the fills are the feedback tokens,
        so a theme recolors every dot; the <Link to="/components/badge">Badge</Link>{" "}
        renders the same element before its label:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-status[data-color="success"] {
  box-shadow: 0 0 0 0.125rem var(--ub-tint-green-bg);
}`}
      />
      <h2>Props</h2>
      <p>Everything a span accepts passes through, plus:</p>
      <PropsTable
        rows={[
          {
            name: "color",
            type: '"neutral" | "success" | "info" | "warning" | "danger"',
            defaultValue: '"neutral"',
            description: "Which feedback color the dot shows.",
          },
          {
            name: "label",
            type: "string",
            description: "Names the dot for screen readers (role img) when it stands alone; without it the dot is aria-hidden.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`Status, from @usebones/react.
- One part, an 8px dot: <Status color="success" label="Online" />. color "neutral" (default) | "success" | "info" | "warning" | "danger".
- Standing alone it needs label (it becomes role="img" with that name). Beside text that already says the state, omit label and the dot is aria-hidden; Badge's status prop does exactly that.
- Never let color be the only signal.
- Restyle in CSS via .ub-status and [data-color]; fills are --ub-success, --ub-info, --ub-warning, --ub-danger, neutral is --ub-text-tertiary. Tokens only.`}
      />
    </>
  );
}
