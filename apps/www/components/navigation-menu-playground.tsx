"use client";

import * as React from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const delays: Record<string, string> = {
  "50": "50ms",
  "200": "200ms",
  "400": "400ms",
};

interface PlaygroundState {
  delay: number;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ delay }: PlaygroundState): string {
  return `import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from "@usebones/react";

<NavigationMenuRoot${delay !== 50 ? ` delay={${delay}}` : ""}>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Product</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/components">
          Components
        </NavigationMenuLink>
        <NavigationMenuLink href="/theming">Theming</NavigationMenuLink>
        <NavigationMenuLink href="/skills">Skills</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/changelog">Changelog</NavigationMenuLink>
        <NavigationMenuLink href="/llms.txt">llms.txt</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenuRoot>`;
}

const description: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  color: "var(--ub-text-secondary)",
};

export function NavigationMenuPlayground() {
  const [delay, setDelay] = React.useState(50);

  return (
    <>
      <Showcase
        code={buildCode({ delay })}
        note={
          <>
            One shared popup morphs between the open item's content
            (hover between Product and Resources to see it). Links are
            real anchors; plug a router in via{" "}
            <code>render={"{<Link />}"}</code>.
          </>
        }
      >
        <NavigationMenuRoot delay={delay}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div style={{ display: "flex", flexDirection: "column", width: "14rem" }}>
                  <NavigationMenuLink>
                    Components
                    <span style={description}>Every primitive, themed</span>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    Theming
                    <span style={description}>Tokens and attributes</span>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    Skills
                    <span style={description}>Teach your agent bones</span>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div style={{ display: "flex", flexDirection: "column", width: "11rem" }}>
                  <NavigationMenuLink>Changelog</NavigationMenuLink>
                  <NavigationMenuLink>llms.txt</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Pricing</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenuRoot>
      </Showcase>
      <Controls>
        <ControlRow label="Delay">
          <SelectRoot
            size="compact"
            items={delays}
            value={String(delay)}
            onValueChange={(value) => value && setDelay(Number(value))}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {Object.keys(delays).map((value) => (
                <SelectItem key={value} value={value}>
                  {delays[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
      </Controls>
    </>
  );
}
