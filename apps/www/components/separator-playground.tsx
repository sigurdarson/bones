import * as React from "react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Separator,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

type Orientation = "horizontal" | "vertical";

const orientations: Record<Orientation, string> = {
  horizontal: "Horizontal",
  vertical: "Vertical",
};

interface PlaygroundState {
  orientation: Orientation;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ orientation }: PlaygroundState): string {
  if (orientation === "vertical") {
    return `import { Separator } from "@usebones/react";

<nav style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
  <a href="#">Home</a>
  <a href="#">Pricing</a>
  <a href="#">Blog</a>
  <a href="#">Support</a>
  <Separator orientation="vertical" />
  <a href="#">Log in</a>
  <a href="#">Sign up</a>
</nav>`;
  }
  return `import { Separator } from "@usebones/react";

<p>Everyone with the link can view.</p>
<Separator />
<p>Invited people can edit.</p>`;
}

const navLink: React.CSSProperties = {
  fontSize: "0.875rem",
  color: "var(--ub-text-primary)",
  textDecoration: "none",
};

export function SeparatorPlayground() {
  const [orientation, setOrientation] = React.useState<Orientation>("vertical");

  return (
    <>
      <Showcase
        code={buildCode({ orientation })}
        note={
          <>
            Vertical stretches to the row through <code>align-self</code>,
            which only works inside a flex parent; horizontal spans the
            full width of whatever contains it.
          </>
        }
      >
        {orientation === "vertical" ? (
          <nav style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a href="#" style={navLink}>
              Home
            </a>
            <a href="#" style={navLink}>
              Pricing
            </a>
            <a href="#" style={navLink}>
              Blog
            </a>
            <a href="#" style={navLink}>
              Support
            </a>
            <Separator orientation="vertical" />
            <a href="#" style={navLink}>
              Log in
            </a>
            <a href="#" style={navLink}>
              Sign up
            </a>
          </nav>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              width: "16rem",
              fontSize: "0.875rem",
              color: "var(--ub-text-secondary)",
            }}
          >
            <span>Everyone with the link can view.</span>
            <Separator />
            <span>Invited people can edit.</span>
          </div>
        )}
      </Showcase>
      <Controls>
        <ControlRow label="Direction">
          <SelectRoot
            size="compact"
            items={orientations}
            value={orientation}
            onValueChange={(value) =>
              value && setOrientation(value as Orientation)
            }
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {(Object.keys(orientations) as Orientation[]).map((value) => (
                <SelectItem key={value} value={value}>
                  {orientations[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
      </Controls>
    </>
  );
}
