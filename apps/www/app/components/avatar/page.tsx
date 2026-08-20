import type { Metadata } from "next";
import { Avatar } from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { AvatarPlayground } from "@/components/avatar-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const metadata: Metadata = { title: "Avatar" };

export default function Page() {
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
        Every control maps to a prop. Turn the image off to see the
        fallback; the Code tab always shows the markup for exactly what
        you've configured.
      </p>
      <AvatarPlayground />
      <h2>Variants</h2>
      <p>
        Picture, initials, or an icon fallback, in both sizes. The
        fallback is whatever you pass; initials read best at these sizes.
      </p>
      <Showcase
        code={`<Avatar src="https://github.com/sigurdarson.png" alt="Sigurdarson" />
<Avatar fallback="AL" />
<Avatar fallback="AL" size="compact" />`}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Avatar src="https://github.com/sigurdarson.png" alt="Sigurdarson" />
          <Avatar fallback="AL" />
          <Avatar fallback="AL" size="compact" />
        </div>
      </Showcase>
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
- size "default" (36px) | "compact" (28px). Always round regardless of data-radius.
- Restyle in CSS via .ub-avatar, .ub-avatar-image, .ub-avatar-fallback. Tokens only.`}
      />
    </>
  );
}
