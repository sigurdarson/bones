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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.25rem", width: "26rem" }}>
          <NavigationMenuLink href="/analytics">
            Analytics
            <span>Dashboards, funnels, and retention.</span>
          </NavigationMenuLink>
          {/* Automations, Integrations, Security */}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/solutions/startups">For startups</NavigationMenuLink>
        <NavigationMenuLink href="/solutions/agencies">For agencies</NavigationMenuLink>
        <NavigationMenuLink href="/solutions/enterprise">For enterprise</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
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
            One shared popup morphs between the open item's content (hover
            between Product and Solutions to see it). Arrow keys move along
            the list and Escape closes. Links are real anchors; plug a
            router in via <code>render={"{<Link />}"}</code>.
          </>
        }
      >
        <NavigationMenuRoot delay={delay}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
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
                    Analytics
                    <span style={description}>
                      Dashboards, funnels, and retention.
                    </span>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    Automations
                    <span style={description}>
                      Trigger actions from any event.
                    </span>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    Integrations
                    <span style={description}>
                      Connect the tools you already use.
                    </span>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    Security
                    <span style={description}>
                      SSO, audit logs, data residency.
                    </span>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "11rem",
                  }}
                >
                  <NavigationMenuLink>For startups</NavigationMenuLink>
                  <NavigationMenuLink>For agencies</NavigationMenuLink>
                  <NavigationMenuLink>For enterprise</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Pricing</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Docs</NavigationMenuLink>
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
