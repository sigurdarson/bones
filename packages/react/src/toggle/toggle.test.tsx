import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "./toggle";

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
