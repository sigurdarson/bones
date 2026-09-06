import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Avatar,
  PreviewCardContent,
  PreviewCardRoot,
  PreviewCardTrigger,
} from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PreviewCardPlayground } from "@/components/preview-card-playground";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

type Side = "top" | "right" | "bottom" | "left";

interface Person {
  name: string;
  role: string;
  initials: string;
}

const people = {
  ada: { name: "Ada Byrne", role: "Frontend lead", initials: "AB" },
  grace: { name: "Grace Okafor", role: "Reviewer", initials: "GO" },
  linus: { name: "Linus Berg", role: "Platform", initials: "LB" },
  margaret: { name: "Margaret Chen", role: "Release manager", initials: "MC" },
} satisfies Record<string, Person>;

/* A person link with the same card on every side; the demo cards share
   this so the four sides differ by one prop only. */
function PersonLink({
  person,
  side,
  delay,
}: {
  person: Person;
  side?: Side;
  delay?: number;
}) {
  return (
    <PreviewCardRoot>
      <PreviewCardTrigger href="#" delay={delay}>
        {person.name}
      </PreviewCardTrigger>
      <PreviewCardContent side={side}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Avatar fallback={person.initials} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 500 }}>{person.name}</span>
            <span style={{ color: "var(--ub-text-secondary)" }}>
              {person.role}
            </span>
          </div>
        </div>
      </PreviewCardContent>
    </PreviewCardRoot>
  );
}

export const Route = createFileRoute("/components/preview-card")({
  head: () => ({ meta: [{ title: "Preview card · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Preview card" />
      <p className="lead">
        A rich preview that opens while hovering a link, wrapping the Base
        UI Preview Card. The trigger is a real anchor, so navigation works
        everywhere and the card is a bonus for pointer users; for plain
        text on any control, use the{" "}
        <Link to="/components/tooltip">Tooltip</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Hover (or focus) the link; the Code
        tab always shows the markup for exactly what you've configured.
      </p>
      <PreviewCardPlayground />
      <h2>Variants</h2>
      <p>
        Four sides, each flipping when out of room. In running text, top
        keeps the card off the lines that follow, which is why it's the
        usual pick for inline links.
      </p>
      <Showcase
        code={`<p>
  Pull request #482 was opened by{" "}
  <PreviewCardRoot>
    <PreviewCardTrigger href="/people/ada">Ada Byrne</PreviewCardTrigger>
    <PreviewCardContent side="top">
      <Avatar fallback="AB" /> Ada Byrne, frontend lead
    </PreviewCardContent>
  </PreviewCardRoot>
  {/* side="right", side="bottom" (the default), side="left" */}
</p>`}
      >
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          Pull request #482 was opened by{" "}
          <PersonLink person={people.ada} side="top" />, reviewed by{" "}
          <PersonLink person={people.grace} side="right" /> and{" "}
          <PersonLink person={people.linus} side="bottom" />, and merged by{" "}
          <PersonLink person={people.margaret} side="left" />.
        </p>
      </Showcase>
      <h2>States</h2>
      <p>
        Closed and open, both live: hover or focus a link and wait out the
        delay, 600ms by default so a cursor passing through doesn't open
        it. While open, the trigger carries <code>data-popup-open</code>{" "}
        and the card <code>data-open</code>, and the card stays open while
        hovered so anything inside stays clickable.
      </p>
      <Showcase
        code={`<PreviewCardTrigger href="/people/ada">Ada Byrne</PreviewCardTrigger>
<PreviewCardTrigger href="/people/grace" delay={0}>
  Grace Okafor
</PreviewCardTrigger>`}
      >
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          Assigned to <PersonLink person={people.ada} /> (default delay) and{" "}
          <PersonLink person={people.grace} delay={0} /> (no delay).
        </p>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The trigger carries <code>data-popup-open</code> while the preview
        shows, and the popup carries <code>data-side</code> plus the{" "}
        <code>data-starting-style</code>/<code>data-ending-style</code>{" "}
        enter and exit hooks:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-preview-card-trigger[data-popup-open] {
  text-decoration-color: var(--ub-accent);
}`}
      />
      <h2>Props</h2>
      <p>
        The trigger is an anchor and takes every anchor prop; position
        lives on the content. The essentials, by part:
      </p>
      <PropsTable
        rows={[
          {
            name: "PreviewCardRoot.open",
            type: "boolean",
            description: "Controlled state. Pair with onOpenChange; defaultOpen for uncontrolled.",
          },
          {
            name: "PreviewCardRoot.onOpenChange",
            type: "(open: boolean) => void",
            description: "Called on every open and close, including pointer leave and Escape.",
          },
          {
            name: "PreviewCardTrigger.href",
            type: "string",
            description: "Where the link goes; clicking navigates like any anchor.",
          },
          {
            name: "PreviewCardTrigger.delay",
            type: "number",
            defaultValue: "600",
            description: "Milliseconds before opening on hover.",
          },
          {
            name: "PreviewCardTrigger.closeDelay",
            type: "number",
            defaultValue: "300",
            description: "Milliseconds before closing once the pointer leaves the link and card.",
          },
          {
            name: "PreviewCardContent.side",
            type: '"top" | "right" | "bottom" | "left"',
            defaultValue: '"bottom"',
            description: "Preferred side; flips to the opposite when out of room.",
          },
          {
            name: "PreviewCardContent.align",
            type: '"start" | "center" | "end"',
            defaultValue: '"center"',
            description: "Alignment along that side.",
          },
          {
            name: "PreviewCardContent.sideOffset",
            type: "number",
            defaultValue: "8",
            description: "Gap between the link and the card, in pixels.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`PreviewCardRoot, PreviewCardTrigger, PreviewCardContent, from @usebones/react.
- Structure: PreviewCardRoot wraps PreviewCardTrigger (a real anchor; pass href) + PreviewCardContent (the floating preview; put an Avatar, headings, text inside).
- The preview is an enhancement: everything essential must be reachable through the link itself, since touch users never see the card.
- PreviewCardContent: side "bottom" (default) | "top" | "right" | "left", align, sideOffset (8). The card stays open while hovered, so links inside are clickable. Timing on the trigger: delay (600ms), closeDelay (300ms).
- Restyle in CSS via .ub-preview-card-popup, [data-popup-open] on the trigger, [data-open]/[data-side] on the popup, [data-starting-style]/[data-ending-style]. Tokens only.`}
      />
    </>
  );
}
