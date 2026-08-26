import type { Metadata } from "next";
import Link from "next/link";
import { Avatar, AvatarGroup } from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { AvatarGroupPlayground } from "@/components/avatar-group-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const metadata: Metadata = { title: "Avatar group" };

export default function Page() {
  return (
    <>
      <PageHeader title="Avatar group" />
      <p className="lead">
        Overlapping <Link href="/components/avatar">Avatars</Link> for a
        team or a set of collaborators. This one is a Bones composition
        (Base UI has no such part): a layout around Avatars, with anything
        past <code>max</code> collapsing into a +N chip.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <AvatarGroupPlayground />
      <h2>Variants</h2>
      <p>
        With and without overflow, in both sizes. Order children
        most-important first; the chip always sits last.
      </p>
      <Showcase
        code={`<AvatarGroup>
  <Avatar fallback="AL" />
  <Avatar fallback="GH" />
  <Avatar fallback="KJ" />
</AvatarGroup>

<AvatarGroup max={2}>
  <Avatar fallback="AL" />
  <Avatar fallback="GH" />
  <Avatar fallback="KJ" />
  <Avatar fallback="MB" />
</AvatarGroup>

<AvatarGroup max={2} size="compact">
  <Avatar fallback="AL" size="compact" />
  <Avatar fallback="GH" size="compact" />
  <Avatar fallback="KJ" size="compact" />
</AvatarGroup>`}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <AvatarGroup>
            <Avatar fallback="AL" />
            <Avatar fallback="GH" />
            <Avatar fallback="KJ" />
          </AvatarGroup>
          <AvatarGroup max={2}>
            <Avatar fallback="AL" />
            <Avatar fallback="GH" />
            <Avatar fallback="KJ" />
            <Avatar fallback="MB" />
          </AvatarGroup>
          <AvatarGroup max={2} size="compact">
            <Avatar fallback="AL" size="compact" />
            <Avatar fallback="GH" size="compact" />
            <Avatar fallback="KJ" size="compact" />
          </AvatarGroup>
        </div>
      </Showcase>
      <h2>Props</h2>
      <p>
        Everything a div accepts passes through. The avatars inside are
        regular Bones Avatars and keep their own props; match their size
        to the group's. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "max",
            type: "number",
            description: "How many avatars to show; the rest collapse into a +N chip.",
          },
          {
            name: "size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Sizes the +N chip; set the same size on the Avatars inside.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`AvatarGroup, from @usebones/react.
- Put Bones Avatars inside; order most-important first. max={n} collapses the rest into a +N chip; size sizes the chip (match the Avatars' size).
- A composition, not a Base UI wrapper: it is a div, so every div prop passes through.
- Each avatar gets a ring in the page background so the stack reads cleanly; override --ub-avatar-group-ring when the group sits on a card or other surface.
- Restyle in CSS via .ub-avatar-group and .ub-avatar-group-overflow. Tokens only.`}
      />
    </>
  );
}
