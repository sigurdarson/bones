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
      <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="two-column-grid">
          <NavigationMenuLink href="/quick-start">
            Quick start
            <span>Install and import the tokens.</span>
          </NavigationMenuLink>
          {/* Accessibility, Changelog, Theming */}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Handbook</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/motion">Motion</NavigationMenuLink>
        <NavigationMenuLink href="/sizes">Sizes</NavigationMenuLink>
        <NavigationMenuLink href="/skills">Skills</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="https://github.com/sigurdarson/bones">
        GitHub
      </NavigationMenuLink>
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
              <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "0.25rem",
                    width: "26rem",
                  }}
                >
                  <NavigationMenuLink>
                    Quick start
                    <span style={description}>
                      Install and import the tokens.
                    </span>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    Accessibility
                    <span style={description}>
                      How every part stays operable.
                    </span>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    Changelog
                    <span style={description}>
                      What's new in each release.
                    </span>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    Theming
                    <span style={description}>
                      Tokens, attributes, accents.
                    </span>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Handbook</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "11rem",
                  }}
                >
                  <NavigationMenuLink>Motion</NavigationMenuLink>
                  <NavigationMenuLink>Sizes</NavigationMenuLink>
                  <NavigationMenuLink>Skills</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>GitHub</NavigationMenuLink>
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
