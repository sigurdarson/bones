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

const team: Array<{ name: string; initials: string; src?: string }> = [
  { name: "Sigurdarson", initials: "SS", src: "https://github.com/sigurdarson.png" },
  { name: "Ada Lindqvist", initials: "AL" },
  { name: "Gabriel Huang", initials: "GH" },
  { name: "Kofi Jallow", initials: "KJ" },
  { name: "Maya Brooks", initials: "MB" },
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
      (person) =>
        `  <Avatar${person.src ? `\n    src="${person.src}"\n    alt="${person.name}"\n   ` : ""} fallback="${person.initials}"${sizeAttr} />`,
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

function TeamAvatars({ count, compact }: { count: number; compact?: boolean }) {
  return (
    <>
      {team.slice(0, count).map((person) => (
        <Avatar
          key={person.name}
          src={person.src}
          alt={person.src ? person.name : undefined}
          fallback={person.initials}
          size={compact ? "compact" : "default"}
        />
      ))}
    </>
  );
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
            <code>max</code> counts children, not people: render one Avatar
            per person and let the group trim the tail. The ring is a
            shadow in <code>--ub-bg</code>, so on a card set{" "}
            <code>--ub-avatar-group-ring</code> to that surface or the
            seams show.
          </>
        }
      >
        <AvatarGroup
          max={max === "none" ? undefined : Number(max)}
          size={compact ? "compact" : "default"}
        >
          <TeamAvatars count={team.length} compact={compact} />
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

const variantsCode = `const team = [
  { name: "Sigurdarson", initials: "SS", src: "https://github.com/sigurdarson.png" },
  { name: "Ada Lindqvist", initials: "AL" },
  { name: "Gabriel Huang", initials: "GH" },
  { name: "Kofi Jallow", initials: "KJ" },
  { name: "Maya Brooks", initials: "MB" },
];

<AvatarGroup>
  {team.slice(0, 3).map((person) => (
    <Avatar key={person.name} src={person.src} alt={person.name} fallback={person.initials} />
  ))}
</AvatarGroup>

<AvatarGroup max={3}>
  {team.map((person) => (
    <Avatar key={person.name} src={person.src} alt={person.name} fallback={person.initials} />
  ))}
</AvatarGroup>

<AvatarGroup max={3} size="compact">
  {team.map((person) => (
    <Avatar key={person.name} src={person.src} alt={person.name} fallback={person.initials} size="compact" />
  ))}
</AvatarGroup>`;

export function AvatarGroupVariants() {
  return (
    <Showcase
      code={variantsCode}
      note={
        <>
          The chip is a plain span, so "+2" says nothing about who is
          hidden; put the full list a click away (a popover or the
          members page) when it matters.
        </>
      }
    >
      <div className="showcase-stack">
        <div className="preview-field">
          <AvatarGroup>
            <TeamAvatars count={3} />
          </AvatarGroup>
          Editing now
        </div>
        <div className="preview-field">
          <AvatarGroup max={3}>
            <TeamAvatars count={5} />
          </AvatarGroup>
          Shared with 5 people
        </div>
        <div className="preview-field">
          <AvatarGroup max={3} size="compact">
            <TeamAvatars count={5} compact />
          </AvatarGroup>
          Reviewers
        </div>
      </div>
    </Showcase>
  );
}
