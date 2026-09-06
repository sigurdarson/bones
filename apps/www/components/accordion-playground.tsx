import * as React from "react";
import {
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const faqs = [
  {
    value: "refunds",
    question: "Can I get a refund?",
    answer: "Within 30 days of purchase, no questions asked.",
  },
  {
    value: "cancel",
    question: "How do I cancel?",
    answer: "From billing settings, anytime; access runs to the period's end.",
  },
  {
    value: "invoices",
    question: "Where are my invoices?",
    answer: "Emailed monthly, and always available under billing history.",
  },
];

interface PlaygroundState {
  multiple: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ multiple }: PlaygroundState): string {
  const items = faqs
    .map(
      (faq) => `  <AccordionItem value="${faq.value}">
    <AccordionTrigger>${faq.question}</AccordionTrigger>
    <AccordionPanel>${faq.answer}</AccordionPanel>
  </AccordionItem>`,
    )
    .join("\n");
  return `import {
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
} from "@usebones/react";

<AccordionRoot${multiple ? " multiple" : ""}>
${items}
</AccordionRoot>`;
}

export function AccordionPlayground() {
  const [multiple, setMultiple] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ multiple })}
        note={
          <>
            <code>value</code> is always an array, even with one section
            open, so a controlled root reads <code>value[0]</code> in single
            mode. Arrow keys move between triggers and Home and End jump to
            the first and last.
          </>
        }
      >
        <div style={{ width: "22rem" }}>
          <AccordionRoot key={String(multiple)} multiple={multiple}>
            {faqs.map((faq) => (
              <AccordionItem key={faq.value} value={faq.value}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionPanel>{faq.answer}</AccordionPanel>
              </AccordionItem>
            ))}
          </AccordionRoot>
        </div>
      </Showcase>
      <Controls>
        <ControlRow label="Multiple">
          <Switch checked={multiple} onCheckedChange={setMultiple} />
        </ControlRow>
      </Controls>
    </>
  );
}
