import type { Metadata } from "next";
import Link from "next/link";
import { AccordionPlayground } from "@/components/accordion-playground";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const metadata: Metadata = { title: "Accordion" };

export default function Page() {
  return (
    <>
      <PageHeader title="Accordion" />
      <p className="lead">
        A stack of expandable sections, wrapping the Base UI Accordion.
        Triggers live in real heading elements, height animates from a
        measured variable, and one section is open at a time unless you say
        otherwise. For a single section, use the{" "}
        <Link href="/components/collapsible">Collapsible</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <AccordionPlayground />
      <h2>Styling states</h2>
      <p>
        Triggers carry <code>data-panel-open</code> while their section is
        expanded (the built-in chevron rotates on it), items carry{" "}
        <code>data-open</code>, and panels expose their measured height as{" "}
        <code>--accordion-panel-height</code> during the transition:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-accordion-item[data-open] {
  background: var(--ub-bg-subtle);
}`}
      />
      <h2>Props</h2>
      <p>
        The open sections live on the root as an array of item values. The
        essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "defaultValue",
            type: "string[]",
            description: "Sections open on first render, when uncontrolled.",
          },
          {
            name: "value",
            type: "string[]",
            description: "Controlled open sections. Pair with onValueChange.",
          },
          {
            name: "multiple",
            type: "boolean",
            defaultValue: "false",
            description: "Allow several sections open at once.",
          },
          {
            name: "disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Blocks toggling on every section.",
          },
          {
            name: "AccordionItem.value",
            type: "string",
            description: "Identifies the section in the root's value array.",
          },
          {
            name: "hiddenUntilFound",
            type: "boolean",
            defaultValue: "false",
            description: "Keeps closed content findable with the browser's in-page search.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`AccordionRoot, AccordionItem, AccordionTrigger, AccordionPanel, from @usebones/react.
- Structure: AccordionRoot wraps AccordionItems; each item holds an AccordionTrigger (children become the label; heading element and chevron are automatic) + AccordionPanel.
- Identify items with value; the root's value/defaultValue is a string array. One open at a time by default; multiple lets several stay open.
- disabled on the root or an item blocks toggling; hiddenUntilFound keeps closed content searchable.
- Restyle in CSS via .ub-accordion-item, .ub-accordion-trigger, .ub-accordion-panel, [data-panel-open] on triggers, [data-open] on items. Height animates via --accordion-panel-height; keep the transition on height. Tokens only.`}
      />
    </>
  );
}
