"use client";

import * as React from "react";
import {
  Avatar,
  AvatarGroup,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const team = [
  { fallback: "SS", src: "https://github.com/sigurdarson.png" },
  { fallback: "AL" },
  { fallback: "GH" },
  { fallback: "KJ" },
  { fallback: "MB" },
];

const maxOptions: Record<string, string> = {
  none: "None",
  "3": "3",
  "4": "4",
};

interface PlaygroundState {
  max: string;
  compact: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ max, compact }: PlaygroundState): string {
  const sizeAttr = compact ? ' size="compact"' : "";
  const avatars = team
    .map(
      (member) =>
        `  <Avatar${member.src ? `\n    src="${member.src}"\n    alt=""\n   ` : ""} fallback="${member.fallback}"${sizeAttr} />`,
    )
    .join("\n");
  const groupAttrs = [
    max !== "none" ? ` max={${max}}` : "",
    compact ? ` size="compact"` : "",
  ].join("");
  return `import { Avatar, AvatarGroup } from "@usebones/react";

<AvatarGroup${groupAttrs}>
${avatars}
</AvatarGroup>`;
}

export function AvatarGroupPlayground() {
  const [max, setMax] = React.useState("3");
  const [compact, setCompact] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ max, compact })}
        note={
          <>
            Avatars past <code>max</code> collapse into a +N chip. Each
            avatar gets a ring in the page background; override{" "}
            <code>--ub-avatar-group-ring</code> on a surface.
          </>
        }
      >
        <AvatarGroup
          max={max === "none" ? undefined : Number(max)}
          size={compact ? "compact" : "default"}
        >
          {team.map((member) => (
            <Avatar
              key={member.fallback}
              src={member.src}
              alt={member.src ? "" : undefined}
              fallback={member.fallback}
              size={compact ? "compact" : "default"}
            />
          ))}
        </AvatarGroup>
      </Showcase>
      <Controls>
        <ControlRow label="Max">
          <SelectRoot
            size="compact"
            items={maxOptions}
            value={max}
            onValueChange={(value) => value && setMax(value)}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {Object.keys(maxOptions).map((value) => (
                <SelectItem key={value} value={value}>
                  {maxOptions[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
        <ControlRow label="Compact">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </ControlRow>
      </Controls>
    </>
  );
}
