import * as React from "react";
import { createRoot } from "react-dom/client";
import "@usebones/tokens/index.css";
import "@usebones/tokens/themes/matrix.css";
import "@usebones/react/styles.css";
import {
  Button,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  Input,
  NumberField,
  ScrollArea,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Slider,
} from "@usebones/react";
import { ThemeToggle } from "../components/theme-toggle";
import { MatrixSwitch } from "../components/matrix-switch";

// Deliberately no site stylesheet or global reset: exercise the shipped CSS.
function Consumer() {
  const [host, setHost] = React.useState<HTMLDivElement | null>(null);
  const [theme, setTheme] = React.useState("dark");
  return (
    <>
      <style>{`[data-theme="custom"] { --ub-surface: rgb(12, 34, 56); --ub-text-primary: white; }`}</style>
      <section aria-label="Standalone controls">
        <div style={{ width: 200 }} data-testid="input-container">
          <Input aria-label="Default input" />
          <Input size="compact" aria-label="Compact input" />
        </div>
        <div
          data-testid="unrelated"
          style={{ width: 100, padding: 10, border: "1px solid" }}
        >
          App content
        </div>
        <NumberField
          aria-label="Quantity"
          hint="At least one."
          defaultValue={2}
        />
        <ScrollArea
          data-testid="max-height-scroll"
          style={{ maxHeight: 100, width: 200 }}
        >
          <div style={{ height: 400 }}>Long content</div>
        </ScrollArea>
        <ScrollArea
          data-testid="fixed-height-scroll"
          style={{ height: 100, width: 200 }}
        >
          <div style={{ height: 400 }}>Long content</div>
        </ScrollArea>
        <Slider
          data-testid="vertical"
          orientation="vertical"
          style={{ height: 200 }}
          defaultValue={40}
          aria-label="Vertical volume"
        />
        <Slider
          data-testid="horizontal"
          style={{ width: 200 }}
          defaultValue={40}
          aria-label="Horizontal volume"
        />
      </section>
      <section aria-label="Scoped themes">
        <label>
          Local theme
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
          >
            <option value="dark">Dark</option>
            <option value="matrix">Matrix</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        <div
          ref={setHost}
          data-testid="theme-scope"
          data-theme={theme}
          data-radius="pill"
        >
          <span
            data-testid="expected-glass"
            style={{
              background:
                "color-mix(in oklab, var(--ub-surface) 90%, transparent)",
            }}
          />
          <DialogRoot>
            <DialogTrigger render={<Button />}>
              Open themed dialog
            </DialogTrigger>
            <DialogContent portalContainer={host}>
              <DialogTitle>Themed dialog</DialogTitle>
              <SelectRoot items={{ one: "One", two: "Two" }}>
                <SelectTrigger
                  aria-label="Nested choice"
                  placeholder="Choose"
                />
                <SelectContent>
                  <SelectItem value="one">One</SelectItem>
                  <SelectItem value="two">Two</SelectItem>
                </SelectContent>
              </SelectRoot>
              <DialogClose render={<Button />}>Close dialog</DialogClose>
            </DialogContent>
          </DialogRoot>
          <SelectRoot items={{ one: "One", two: "Two" }}>
            <SelectTrigger aria-label="Local choice" placeholder="Choose" />
            <SelectContent portalContainer={host}>
              <SelectItem value="one">One</SelectItem>
              <SelectItem value="two">Two</SelectItem>
            </SelectContent>
          </SelectRoot>
        </div>
      </section>
      <section aria-label="Site theme controls">
        <ThemeToggle />
        <MatrixSwitch />
      </section>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Consumer />);
