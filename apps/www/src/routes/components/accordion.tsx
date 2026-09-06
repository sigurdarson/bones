import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
} from "@usebones/react";
import { AccordionPlayground } from "@/components/accordion-playground";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/accordion")({
  head: () => ({ meta: [{ title: "Accordion · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Accordion" />
      <p className="lead">
        A stack of expandable sections, wrapping the Base UI Accordion.
        Triggers live in real heading elements, height animates from a
        measured variable, and one section is open at a time unless you say
        otherwise. For a single section, use the{" "}
        <Link to="/components/collapsible">Collapsible</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Open one question, then another: with Multiple off the first one
        closes on its own, with it on they stack. The Code tab shows the
        markup for exactly what you've configured.
      </p>
      <AccordionPlayground />
      <h2>States</h2>
      <p>
        A section is open or closed, and any item can be disabled on its
        own. Hover and keyboard focus (a ring around the trigger) sit on
        top of whichever state the section is in.
      </p>
      <Showcase
        code={`<AccordionRoot defaultValue={["notifications"]}>
  <AccordionItem value="notifications">
    <AccordionTrigger>Notifications</AccordionTrigger>
    <AccordionPanel>Email for mentions, push for direct messages.</AccordionPanel>
  </AccordionItem>
  <AccordionItem value="security">
    <AccordionTrigger>Security</AccordionTrigger>
    <AccordionPanel>Two-factor auth is on for every member.</AccordionPanel>
  </AccordionItem>
  <AccordionItem value="legacy" disabled>
    <AccordionTrigger>Legacy API keys</AccordionTrigger>
    <AccordionPanel>Retired in March; nothing to manage here.</AccordionPanel>
  </AccordionItem>
</AccordionRoot>`}
      >
        <div style={{ width: "22rem" }}>
          <AccordionRoot defaultValue={["notifications"]}>
            <AccordionItem value="notifications">
              <AccordionTrigger>Notifications</AccordionTrigger>
              <AccordionPanel>
                Email for mentions, push for direct messages.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="security">
              <AccordionTrigger>Security</AccordionTrigger>
              <AccordionPanel>
                Two-factor auth is on for every member.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="legacy" disabled>
              <AccordionTrigger>Legacy API keys</AccordionTrigger>
              <AccordionPanel>
                Retired in March; nothing to manage here.
              </AccordionPanel>
            </AccordionItem>
          </AccordionRoot>
        </div>
      </Showcase>
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
            name: "onValueChange",
            type: "(value) => void",
            description: "Fires with the new set of open values.",
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
            description: "Blocks toggling on every section; also available per AccordionItem.",
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
          {
            name: "keepMounted",
            type: "boolean",
            defaultValue: "false",
            description: "Keeps a closed panel in the DOM, for content that must stay mounted.",
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
