import * as React from "react";
import {
  Button,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from "@usebones/react";
import { Icon } from "@usebones/icons";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

type Side = "top" | "right" | "bottom" | "left";

const sides: Record<Side, string> = {
  top: "Top",
  right: "Right",
  bottom: "Bottom",
  left: "Left",
};

interface PlaygroundState {
  side: Side;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ side }: PlaygroundState): string {
  return `import {
  Button,
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from "@usebones/react";
import { Icon } from "@usebones/icons";

<TooltipRoot>
  <TooltipTrigger
    render={<Button variant="secondary" iconOnly aria-label="Copy link" />}
  >
    <Icon name="copy" />
  </TooltipTrigger>
  <TooltipContent${side !== "top" ? ` side="${side}"` : ""}>Copy link</TooltipContent>
</TooltipRoot>`;
}

export function TooltipPlayground() {
  const [side, setSide] = React.useState<Side>("top");

  return (
    <>
      <Showcase
        code={buildCode({ side })}
        note={
          <>
            The trigger wraps a real control via <code>render</code>, so
            the button keeps its own styling and accessible name; the
            tooltip adds a description, not a name.
          </>
        }
      >
        <TooltipRoot>
          <TooltipTrigger
            render={<Button variant="secondary" iconOnly aria-label="Copy link" />}
          >
            <Icon name="copy" />
          </TooltipTrigger>
          <TooltipContent side={side}>Copy link</TooltipContent>
        </TooltipRoot>
      </Showcase>
      <Controls>
        <ControlRow label="Side">
          <SelectRoot
            size="compact"
            items={sides}
            value={side}
            onValueChange={(value) => value && setSide(value as Side)}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {(Object.keys(sides) as Side[]).map((value) => (
                <SelectItem key={value} value={value}>
                  {sides[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
      </Controls>
    </>
  );
}
