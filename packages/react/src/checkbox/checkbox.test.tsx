import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("renders a checkbox role and toggles on click", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Updates" onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole("checkbox", { name: "Updates" });

    expect(control).not.toHaveAttribute("data-checked");
    await user.click(control);
    expect(control).toHaveAttribute("data-checked");
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
  });

  it("exposes indeterminate as a data attribute", () => {
    render(<Checkbox indeterminate aria-label="Some" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-indeterminate");
  });

  it("does not toggle while disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox disabled aria-label="Locked" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("merges the consumer className with ub-checkbox", () => {
    render(<Checkbox className="mine" aria-label="A" />);
    expect(screen.getByRole("checkbox")).toHaveClass("ub-checkbox", "mine");
  });
});
