import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle, ToggleGroup } from "./toggle";

describe("Toggle", () => {
  it("renders a pressable button and toggles on click", async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Bold</Toggle>);
    const toggle = screen.getByRole("button", { name: "Bold" });

    expect(toggle).toHaveAttribute("aria-pressed", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveAttribute("data-pressed");
    expect(onPressedChange).toHaveBeenCalledTimes(1);
  });

  it("carries size and defaults, and squares off icon-only", () => {
    render(<Toggle size="compact" iconOnly aria-label="Bold" />);
    const toggle = screen.getByRole("button", { name: "Bold" });
    expect(toggle).toHaveAttribute("data-size", "compact");
    expect(toggle).toHaveAttribute("data-icon-only");
  });

  it("warns when icon-only has no accessible name", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Toggle iconOnly />);
    expect(warn).toHaveBeenCalledOnce();
    warn.mockRestore();
  });

  it("does not toggle while disabled", async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    render(<Toggle disabled onPressedChange={onPressedChange}>Bold</Toggle>);
    await user.click(screen.getByRole("button"));
    expect(onPressedChange).not.toHaveBeenCalled();
  });
});

describe("ToggleGroup", () => {
  it("single-selects by default", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup defaultValue={["left"]}>
        <Toggle value="left">Left</Toggle>
        <Toggle value="right">Right</Toggle>
      </ToggleGroup>,
    );
    await user.click(screen.getByRole("button", { name: "Right" }));
    expect(screen.getByRole("button", { name: "Right" })).toHaveAttribute("data-pressed");
    expect(screen.getByRole("button", { name: "Left" })).not.toHaveAttribute(
      "data-pressed",
    );
  });

  it("allows independent toggles with multiple", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup defaultValue={["bold"]} multiple>
        <Toggle value="bold">Bold</Toggle>
        <Toggle value="italic">Italic</Toggle>
      </ToggleGroup>,
    );
    await user.click(screen.getByRole("button", { name: "Italic" }));
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("data-pressed");
    expect(screen.getByRole("button", { name: "Italic" })).toHaveAttribute("data-pressed");
  });
});
