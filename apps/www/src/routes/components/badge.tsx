import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge, Status } from "@usebones/react";
import { Icon } from "@usebones/icons";
import { AgentInstructions } from "@/components/agent-instructions";
import { BadgePlayground } from "@/components/badge-playground";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/badge")({
  head: () => ({
    meta: [
      { title: "Badge · Bones" },
      { name: "description", content: "A small label for categories, counts, and states, in nine tints and two sizes." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Badge" />
      <p className="lead">
        A small label for categories, counts, and states. A Bones component
        (Base UI has no such part): a plain span with a soft tint per palette
        hue, an optional status dot, and icons as children.
      </p>
      <h2>Playground</h2>
      <p>
        Pick a tint and a status dot, add the icon, and switch to compact to
        see the 16px form; the Code tab shows the exact markup.
      </p>
      <BadgePlayground />
      <h2>Variants</h2>
      <p>
        Neutral plus the eight palette hues, each a soft fill with readable
        text from the tint tokens, so they hold up in both themes. Hues are
        for categories; feedback (success, warning) belongs to the status
        dot, so meaning never rides on the tint alone.
      </p>
      <Showcase
        code={`<Badge>Neutral</Badge>
<Badge color="red">Red</Badge>
<Badge color="orange">Orange</Badge>
<Badge color="green">Green</Badge>
<Badge color="teal">Teal</Badge>
<Badge color="blue">Blue</Badge>
<Badge color="violet">Violet</Badge>
<Badge color="fuchsia">Fuchsia</Badge>
<Badge color="rose">Rose</Badge>`}
      >
        <div className="showcase-row">
          <Badge>Neutral</Badge>
          <Badge color="red">Red</Badge>
          <Badge color="orange">Orange</Badge>
          <Badge color="green">Green</Badge>
          <Badge color="teal">Teal</Badge>
          <Badge color="blue">Blue</Badge>
          <Badge color="violet">Violet</Badge>
          <Badge color="fuchsia">Fuchsia</Badge>
          <Badge color="rose">Rose</Badge>
        </div>
      </Showcase>
      <h2>Sizes, status, and icons</h2>
      <p>
        Default is 24px tall with the compact text size; compact is 16px
        with text one step smaller, for table cells and dense lists. The
        status dot goes first, then any icon, then the text; the dot and
        the icon are hidden from screen readers, so the text carries the
        meaning.
      </p>
      <Showcase
        code={`<Badge status="success">Deployed</Badge>
<Badge status="warning" color="orange">Degraded</Badge>
<Badge status="danger" size="compact">Failed</Badge>
<Badge color="blue">
  <Icon name="check" />
  Verified
</Badge>
<Badge color="violet" size="compact">
  <Icon name="user" />
  Owner
</Badge>`}
        note={
          <>
            Counts and short states read best in a badge; anything a user
            needs to act on belongs in a real control, since a badge is
            not focusable.
          </>
        }
      >
        <div className="showcase-row">
          <Badge status="success">Deployed</Badge>
          <Badge status="warning" color="orange">
            Degraded
          </Badge>
          <Badge status="danger" size="compact">
            Failed
          </Badge>
          <Badge color="blue">
            <Icon name="check" />
            Verified
          </Badge>
          <Badge color="violet" size="compact">
            <Icon name="user" />
            Owner
          </Badge>
        </div>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The tint and size are data attributes, and the fills come from the{" "}
        <code>--ub-tint-*</code> token pairs (see{" "}
        <Link to="/theming">Theming</Link>), so a theme recolors every
        badge at once and a one-off is a single rule:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-badge[data-color="blue"] {
  background: var(--ub-accent);
  color: var(--ub-accent-contrast);
}

.ub-badge[data-size="compact"] {
  font-weight: 600;
}`}
      />
      <h2>Props</h2>
      <p>Everything a span accepts passes through, plus:</p>
      <PropsTable
        rows={[
          {
            name: "color",
            type: '"neutral" | "red" | "orange" | "green" | "teal" | "blue" | "violet" | "fuchsia" | "rose"',
            defaultValue: '"neutral"',
            description: "The tint; hues are for categories, not feedback.",
          },
          {
            name: "size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Default is 24px tall with the compact text size; compact is 16px with text one step smaller.",
          },
          {
            name: "status",
            type: '"neutral" | "success" | "info" | "warning" | "danger"',
            description: "Adds a decorative status dot before the label; see Status for the standalone dot.",
          },
        ]}
      />
      <p>
        One thing to know: a badge has no role and is never focusable. If it
        should open or filter something, wrap it in a Button or a link
        instead of adding handlers to it.
      </p>
      <AgentInstructions
        instructions={`Badge, from @usebones/react.
- One part, a plain span: <Badge color="teal" size="compact" status="success">Label</Badge>. color "neutral" (default) | "red" | "orange" | "green" | "teal" | "blue" | "violet" | "fuchsia" | "rose"; size "default" (24px) | "compact" (16px).
- Icons are children before the text: <Badge><Icon name="check" />Verified</Badge>. status adds a decorative dot first; both are aria-hidden, so the text must carry the meaning.
- Hues are for categories; put feedback in status (success, warning, danger) rather than in the tint. Not interactive: wrap in a Button or link if it should do something.
- Restyle in CSS via .ub-badge, [data-color], [data-size], .ub-badge-status; fills come from the --ub-tint-<hue>-bg and -text tokens. Tokens only.`}
      />
    </>
  );
}
