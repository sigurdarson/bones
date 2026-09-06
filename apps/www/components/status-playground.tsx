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

/* Label on: visible text beside a decorative dot. Label off: the dot
   alone, named through the label prop. */
function buildCode(color: StatusColor, labeled: boolean): string {
  const colorAttr = color === "neutral" ? "" : ` color="${color}"`;
  const markup = labeled
    ? `<Status${colorAttr} /> ${names[color]}`
    : `<Status${colorAttr} label="${names[color]}" />`;
  return `import { Status } from "@usebones/react";

${markup}`;
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
            Label on: the word sits beside the dot, so the dot is hidden
            from screen readers (the Badge's case). Label off: the dot
            stands alone and carries the name through its label prop.
          </>
        }
      >
        <div className="showcase-row">
          <Status color={color} label={labeled ? undefined : names[color]} />
          {labeled ? <span>{names[color]}</span> : null}
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
