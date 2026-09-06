import * as React from "react";
import {
  Badge,
  type BadgeColor,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  type StatusColor,
  Switch,
} from "@usebones/react";
import { Icon } from "@usebones/icons";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const colors: BadgeColor[] = [
  "neutral",
  "red",
  "orange",
  "green",
  "teal",
  "blue",
  "violet",
  "fuchsia",
  "rose",
];
const statuses = ["none", "neutral", "success", "info", "warning", "danger"] as const;
type StatusChoice = (typeof statuses)[number];

const labelOf = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

interface PlaygroundState {
  color: BadgeColor;
  compact: boolean;
  status: StatusChoice;
  icon: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ color, compact, status, icon }: PlaygroundState): string {
  const attrs = [
    color === "neutral" ? "" : ` color="${color}"`,
    compact ? ' size="compact"' : "",
    status === "none" ? "" : ` status="${status}"`,
  ].join("");
  const imports = icon
    ? 'import { Badge } from "@usebones/react";\nimport { Icon } from "@usebones/icons";'
    : 'import { Badge } from "@usebones/react";';
  const child = icon ? `\n  <Icon name="check" />\n  Verified\n` : "Verified";
  return `${imports}

<Badge${attrs}>${child}</Badge>`;
}

export function BadgePlayground() {
  const [color, setColor] = React.useState<BadgeColor>("neutral");
  const [compact, setCompact] = React.useState(false);
  const [status, setStatus] = React.useState<StatusChoice>("none");
  const [icon, setIcon] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ color, compact, status, icon })}
        note={
          <>
            A badge is plain text to assistive tech: no role, no focus. The
            status dot and any icon are decorative, so the label has to
            say the whole thing on its own.
          </>
        }
      >
        <Badge
          color={color}
          size={compact ? "compact" : "default"}
          status={status === "none" ? undefined : (status as StatusColor)}
        >
          {icon ? <Icon name="check" /> : null}
          Verified
        </Badge>
      </Showcase>
      <Controls>
        <ControlRow label="Color">
          <SelectRoot
            size="compact"
            items={Object.fromEntries(colors.map((c) => [c, labelOf(c)]))}
            value={color}
            onValueChange={(value) => value && setColor(value as BadgeColor)}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {colors.map((c) => (
                <SelectItem key={c} value={c}>
                  {labelOf(c)}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
        <ControlRow label="Status">
          <SelectRoot
            size="compact"
            items={Object.fromEntries(statuses.map((s) => [s, labelOf(s)]))}
            value={status}
            onValueChange={(value) => value && setStatus(value as StatusChoice)}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {labelOf(s)}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
        <ControlRow label="Icon">
          <Switch checked={icon} onCheckedChange={setIcon} />
        </ControlRow>
        <ControlRow label="Compact">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </ControlRow>
      </Controls>
    </>
  );
}
