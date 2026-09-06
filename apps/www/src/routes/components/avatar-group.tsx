import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import {
  AvatarGroupPlayground,
  AvatarGroupVariants,
} from "@/components/avatar-group-playground";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const Route = createFileRoute("/components/avatar-group")({
  head: () => ({ meta: [{ title: "Avatar group · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Avatar group" />
      <p className="lead">
        Overlapping <Link to="/components/avatar">Avatars</Link> for a
        team or a set of collaborators. This one is a Bones composition
        (Base UI has no such part): a layout around Avatars, with anything
        past <code>max</code> collapsing into a +N chip.
      </p>
      <h2>Playground</h2>
      <p>
        Pick a Max to watch the tail of the team fold into a +N chip, and
        flip Compact to shrink the chip and every avatar together. The
        Code tab shows the markup for exactly what you've configured.
      </p>
      <AvatarGroupPlayground />
      <h2>Variants</h2>
      <p>
        Everyone fits, or the tail collapses, in both sizes. Order
        children most-important first; the chip always sits last, and
        the pictured member gets a real <code>alt</code> because no name
        is visible beside the stack.
      </p>
      <AvatarGroupVariants />
      <h2>Styling states</h2>
      <p>
        No interactive states; the hooks are the group, the +N chip (which
        also carries <code>.ub-avatar</code> and <code>data-size</code>),
        and the ring variable for groups that sit on a surface instead of
        the page background:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-avatar-group-overflow {
  background: var(--ub-accent);
  color: var(--ub-accent-contrast);
}

.card .ub-avatar-group {
  --ub-avatar-group-ring: var(--ub-surface);
}`}
      />
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
- Put Bones Avatars inside, one per person with alt set to their name; order most-important first. max={n} collapses the rest into a +N chip; size sizes the chip (match the Avatars' size).
- A composition, not a Base UI wrapper: it is a div, so every div prop passes through.
- Each avatar gets a ring in the page background so the stack reads cleanly; override --ub-avatar-group-ring when the group sits on a card or other surface.
- Restyle in CSS via .ub-avatar-group and .ub-avatar-group-overflow. Tokens only.`}
      />
    </>
  );
}
