import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders a plain span with the default tint and size", () => {
    render(<Badge>Beta</Badge>);
    const badge = screen.getByText("Beta");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass("ub-badge");
    expect(badge).toHaveAttribute("data-color", "neutral");
    expect(badge).toHaveAttribute("data-size", "default");
    expect(badge).not.toHaveAttribute("role");
  });

  it("exposes color and size as data attributes", () => {
    render(
      <Badge color="violet" size="compact">
        Design
      </Badge>,
    );
    const badge = screen.getByText("Design");
    expect(badge).toHaveAttribute("data-color", "violet");
    expect(badge).toHaveAttribute("data-size", "compact");
  });

  it("renders a decorative status dot before the label", () => {
    render(<Badge status="success">Active</Badge>);
    const badge = screen.getByText("Active");
    const dot = badge.querySelector(".ub-status");
    expect(dot).toHaveAttribute("data-color", "success");
    expect(dot).toHaveAttribute("aria-hidden", "true");
    expect(badge.firstChild).toBe(dot);
  });

  it("keeps icon children before the text", () => {
    render(
      <Badge>
        <svg data-testid="icon" aria-hidden />
        Verified
      </Badge>,
    );
    const badge = screen.getByText("Verified");
    expect(badge.firstChild).toBe(screen.getByTestId("icon"));
  });

  it("merges className and passes aria attributes through", () => {
    render(
      <Badge className="extra" aria-label="Three unread">
        3
      </Badge>,
    );
    const badge = screen.getByLabelText("Three unread");
    expect(badge).toHaveClass("ub-badge");
    expect(badge).toHaveClass("extra");
  });
});
