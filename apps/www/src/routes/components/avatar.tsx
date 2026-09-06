import { createFileRoute } from "@tanstack/react-router";
import { Avatar } from "@usebones/react";
import { Icon } from "@usebones/icons";
import { AgentInstructions } from "@/components/agent-instructions";
import { AvatarPlayground } from "@/components/avatar-playground";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/avatar")({
  head: () => ({ meta: [{ title: "Avatar · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Avatar" />
      <p className="lead">
        A person as a picture or initials, wrapping the Base UI Avatar.
        The fallback shows until the image has actually loaded and stays
        if it fails, so there's never an empty circle. Always round,
        independent of the radius setting.
      </p>
      <h2>Playground</h2>
      <p>
        Turn Image off to see the fallback take over, and Compact to see
        the initials scale with the circle. The Code tab shows the markup
        for exactly what you've configured.
      </p>
      <AvatarPlayground />
      <h2>Variants</h2>
      <p>
        Picture, initials, or an icon for a seat nobody has claimed yet,
        in both sizes. With the name visible beside it, as in a member
        list, the image's <code>alt</code> is empty so screen readers
        don't hear the name twice.
      </p>
      <Showcase
        code={`<Avatar src="https://github.com/sigurdarson.png" alt="" fallback="SS" /> Sigurdarson
<Avatar fallback="AL" /> Ada Lindqvist
<Avatar fallback={<Icon name="user" />} /> Invite pending
<Avatar fallback="KJ" size="compact" /> Kofi Jallow`}
      >
        <div className="showcase-stack">
          <div className="preview-field">
            <Avatar src="https://github.com/sigurdarson.png" alt="" fallback="SS" />
            Sigurdarson
          </div>
          <div className="preview-field">
            <Avatar fallback="AL" />
            Ada Lindqvist
          </div>
          <div className="preview-field">
            <Avatar fallback={<Icon name="user" />} />
            Invite pending
          </div>
          <div className="preview-field">
            <Avatar fallback="KJ" size="compact" />
            Kofi Jallow
          </div>
        </div>
      </Showcase>
      <h2>States</h2>
      <p>
        Loaded, or not: the fallback shows while the image loads, when it
        fails, and when there is no picture at all (the second one here).
        There are no hover or focus states; an avatar isn't interactive on
        its own.
      </p>
      <Showcase
        code={`<Avatar src="https://github.com/sigurdarson.png" alt="Sigurdarson" fallback="SS" />
<Avatar alt="Ada Lindqvist" fallback="AL" />`}
      >
        <Avatar src="https://github.com/sigurdarson.png" alt="Sigurdarson" fallback="SS" />
        <Avatar alt="Ada Lindqvist" fallback="AL" />
      </Showcase>
      <h2>Styling states</h2>
      <p>
        No state attributes beyond <code>data-size</code>; the hooks are
        the root, the image, and the fallback, so an accent-colored
        initials disc is one rule:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-avatar-fallback {
  background: var(--ub-accent);
  color: var(--ub-accent-contrast);
}`}
      />
      <h2>Props</h2>
      <p>
        One component; the image and fallback parts are managed
        automatically. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "src",
            type: "string",
            description: "Image URL; omit it to render just the fallback.",
          },
          {
            name: "alt",
            type: "string",
            description: "The person's name; empty string only when the name is visible beside it.",
          },
          {
            name: "fallback",
            type: "ReactNode",
            description: "Initials or an icon, shown while loading and on error.",
          },
          {
            name: "size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Default is 36px; compact is 28px.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`Avatar, from @usebones/react.
- One component: src + alt + fallback (initials or an icon); the fallback renders until the image loads and stays on error.
- alt is the person's name; a dev warning fires when src is set without alt. Pass alt="" only when the name is already visible beside the avatar.
- size "default" (36px) | "compact" (28px). Always round regardless of data-radius. Keep initials to two letters.
- Restyle in CSS via .ub-avatar, .ub-avatar-image, .ub-avatar-fallback, [data-size="compact"]. Tokens only.`}
      />
    </>
  );
}
