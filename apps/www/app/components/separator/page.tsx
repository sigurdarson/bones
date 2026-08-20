import type { Metadata } from "next";
import { Separator } from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { SeparatorPlayground } from "@/components/separator-playground";
import { Showcase } from "@/components/showcase";

export const metadata: Metadata = { title: "Separator" };

export default function Page() {
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
        code={`<a href="/blog">Blog</a>
<a href="/support">Support</a>
<Separator orientation="vertical" />
<a href="/log-in">Log in</a>

<p>Everyone with the link can view.</p>
<Separator />
<p>Invited people can edit.</p>`}
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
            <span>Blog</span>
            <span>Support</span>
            <Separator orientation="vertical" />
            <span>Log in</span>
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
