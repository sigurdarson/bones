import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { CollapsiblePlayground } from "@/components/collapsible-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const Route = createFileRoute("/components/collapsible")({
  head: () => ({ meta: [{ title: "Collapsible · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Collapsible" />
      <p className="lead">
        One section that expands and collapses, wrapping the Base UI
        Collapsible. The height animates from a measured CSS variable, so
        the motion works without JavaScript. A stack of these with one
        value is an <Link to="/components/accordion">Accordion</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <CollapsiblePlayground />
      <h2>Styling states</h2>
      <p>
        The trigger carries <code>data-panel-open</code> while expanded
        (the built-in chevron rotates on it), and the panel exposes its
        measured height as <code>--collapsible-panel-height</code> during
        the transition:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-collapsible-trigger[data-panel-open] {
  color: var(--ub-accent);
}`}
      />
      <h2>Props</h2>
      <p>
        Open state lives on the root; the panel decides how closed content
        behaves. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "defaultOpen",
            type: "boolean",
            defaultValue: "false",
            description: "Starts expanded when uncontrolled.",
          },
          {
            name: "open",
            type: "boolean",
            description: "Controlled state. Pair with onOpenChange.",
          },
          {
            name: "disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Blocks toggling and dims the trigger.",
          },
          {
            name: "CollapsiblePanel.hiddenUntilFound",
            type: "boolean",
            defaultValue: "false",
            description: "Keeps closed content findable with the browser's in-page search.",
          },
          {
            name: "CollapsiblePanel.keepMounted",
            type: "boolean",
            defaultValue: "false",
            description: "Keeps the panel in the DOM while closed.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`CollapsibleRoot, CollapsibleTrigger, CollapsiblePanel, from @usebones/react.
- Structure: CollapsibleRoot wraps CollapsibleTrigger (children become the label; chevron renders automatically) + CollapsiblePanel (the content).
- defaultOpen or open + onOpenChange on the root; disabled blocks toggling.
- hiddenUntilFound on the panel keeps closed content findable via in-page search; keepMounted keeps it in the DOM.
- Restyle in CSS via .ub-collapsible-trigger, .ub-collapsible-panel, [data-panel-open] on the trigger, [data-starting-style]/[data-ending-style] on the panel. Height animates via --collapsible-panel-height; keep the transition on height. Tokens only.`}
      />
    </>
  );
}
