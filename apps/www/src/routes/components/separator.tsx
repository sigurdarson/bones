import { createFileRoute } from "@tanstack/react-router";
import { Separator } from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { SeparatorPlayground } from "@/components/separator-playground";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/separator")({
  head: () => ({ meta: [{ title: "Separator · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Separator" />
      <p className="lead">
        A hairline between things, wrapping the Base UI Separator. It
        renders real separator semantics, so screen readers know the two
        sides are distinct; purely decorative lines can stay as CSS
        borders.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <SeparatorPlayground />
      <h2>Variants</h2>
      <p>
        Two directions. Vertical stretches to the row's height inside flex
        layouts; horizontal spans its container's width.
      </p>
      <Showcase
        code={`<a href="#">Blog</a>
<a href="#">Support</a>
<Separator orientation="vertical" />
<a href="#">Log in</a>

<p>Everyone with the link can view.</p>
<Separator />
<p>Invited people can edit.</p>`}
        note={
          <>
            Vertical only works inside a flex row: it stretches via{" "}
            <code>align-self</code>, so in a block layout it has no height
            and disappears. Give it a flex parent or set a height yourself.
          </>
        }
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            width: "16rem",
            fontSize: "0.875rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a href="#">Blog</a>
            <a href="#">Support</a>
            <Separator orientation="vertical" />
            <a href="#">Log in</a>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              color: "var(--ub-text-secondary)",
            }}
          >
            <span>Everyone with the link can view.</span>
            <Separator />
            <span>Invited people can edit.</span>
          </div>
        </div>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The only state is direction, exposed as{" "}
        <code>data-orientation</code> on the element, so a thicker or
        tinted vertical rule is one selector away:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-separator[data-orientation="vertical"] {
  background: var(--ub-border-strong);
}`}
      />
      <h2>Props</h2>
      <p>
        Everything a div accepts passes through, plus:
      </p>
      <PropsTable
        rows={[
          {
            name: "orientation",
            type: '"horizontal" | "vertical"',
            defaultValue: '"horizontal"',
            description: "Vertical stretches to the row's height inside flex layouts.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`Separator, from @usebones/react.
- Renders a 1px line with separator semantics. orientation "horizontal" (default) | "vertical"; vertical stretches to the row via align-self inside flex layouts.
- Menus have their own MenuSeparator; use this one everywhere else.
- Use it when the division carries meaning; decorative lines can stay as CSS borders.
- Restyle in CSS via .ub-separator and [data-orientation]. Tokens only.`}
      />
    </>
  );
}
