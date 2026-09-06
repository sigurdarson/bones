import * as React from "react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Status,
  type StatusColor,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const colors: StatusColor[] = ["neutral", "success", "info", "warning", "danger"];
const labelOf = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
const names: Record<StatusColor, string> = {
  neutral: "Offline",
  success: "Online",
  info: "Syncing",
  warning: "Degraded",
  danger: "Failed",
};

function buildCode(color: StatusColor, labeled: boolean): string {
  return `import { Status } from "@usebones/react";

<Status${color === "neutral" ? "" : ` color="${color}"`}${labeled ? ` label="${names[color]}"` : ""} />`;
}

export function StatusPlayground() {
  const [color, setColor] = React.useState<StatusColor>("success");
  const [labeled, setLabeled] = React.useState(true);

  return (
    <>
      <Showcase
        code={buildCode(color, labeled)}
        note={
          <>
            Label on: the dot stands alone and screen readers hear its
            name. Label off: it sits beside text that already says the
            state and is hidden from them, which is the Badge's case.
          </>
        }
      >
        <div className="showcase-row">
          <Status color={color} label={labeled ? names[color] : undefined} />
          {labeled ? null : <span>{names[color]}</span>}
        </div>
      </Showcase>
      <Controls>
        <ControlRow label="Color">
          <SelectRoot
            size="compact"
            items={Object.fromEntries(colors.map((c) => [c, labelOf(c)]))}
            value={color}
            onValueChange={(value) => value && setColor(value as StatusColor)}
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
        <ControlRow label="Label">
          <Switch checked={labeled} onCheckedChange={setLabeled} />
        </ControlRow>
      </Controls>
    </>
  );
}
