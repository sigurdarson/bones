import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders a button with type=button by default", () => {
    render(<Button>Save changes</Button>);
    const button = screen.getByRole("button", { name: "Save changes" });
    expect(button).toHaveAttribute("type", "button");
  });

  it("respects an explicit type", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("carries variant and size as data attributes, defaulting to primary/default", () => {
    const { rerender } = render(<Button>Go</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-variant", "primary");
    expect(button).toHaveAttribute("data-size", "default");

    rerender(
      <Button variant="danger" size="compact">
        Go
      </Button>,
    );
    expect(button).toHaveAttribute("data-variant", "danger");
    expect(button).toHaveAttribute("data-size", "compact");
  });

  it("passes aria attributes through", () => {
    render(<Button aria-label="Close" aria-describedby="hint" />);
    const button = screen.getByRole("button", { name: "Close" });
    expect(button).toHaveAttribute("aria-describedby", "hint");
  });

  it("merges the consumer className with ub-button", () => {
    render(<Button className="mine">Go</Button>);
    expect(screen.getByRole("button")).toHaveClass("ub-button", "mine");
  });

  it("marks icon-only buttons and warns without an accessible name", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Button iconOnly />);
    expect(screen.getByRole("button")).toHaveAttribute("data-icon-only");
    expect(warn).toHaveBeenCalledOnce();
    warn.mockRestore();
  });

  it("does not warn when icon-only has an aria-label", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Button iconOnly aria-label="Search" />);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("supports disabled", () => {
    render(<Button disabled>Saving</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
