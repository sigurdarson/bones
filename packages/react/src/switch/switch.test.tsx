import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./switch";

describe("Switch", () => {
  it("renders a switch role and toggles on click", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Notifications" onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole("switch", { name: "Notifications" });

    expect(control).not.toHaveAttribute("data-checked");
    await user.click(control);
    expect(control).toHaveAttribute("data-checked");
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
  });

  it("exposes the checked state as a data attribute when uncontrolled", () => {
    render(<Switch defaultChecked aria-label="On" />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-checked");
  });

  it("does not toggle while disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch disabled aria-label="Locked" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(screen.getByRole("switch")).toHaveAttribute("data-disabled");
  });

  it("merges the consumer className with ub-switch", () => {
    render(<Switch className="mine" aria-label="On" />);
    expect(screen.getByRole("switch")).toHaveClass("ub-switch", "mine");
  });
});
