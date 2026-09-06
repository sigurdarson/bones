import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Status } from "./status";

describe("Status", () => {
  it("is an image named by its label", () => {
    render(<Status color="success" label="Online" />);
    const dot = screen.getByRole("img", { name: "Online" });
    expect(dot).toHaveClass("ub-status");
    expect(dot).toHaveAttribute("data-color", "success");
  });

  it("is decorative without a label", () => {
    const { container } = render(<Status color="danger" />);
    const dot = container.querySelector(".ub-status");
    expect(dot).toHaveAttribute("aria-hidden", "true");
    expect(dot).not.toHaveAttribute("role");
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("defaults to neutral", () => {
    const { container } = render(<Status />);
    expect(container.querySelector(".ub-status")).toHaveAttribute("data-color", "neutral");
  });

  it("merges className and passes attributes through", () => {
    render(<Status label="Syncing" className="extra" data-testid="dot" />);
    const dot = screen.getByTestId("dot");
    expect(dot).toHaveClass("ub-status");
    expect(dot).toHaveClass("extra");
    expect(dot).toHaveAttribute("aria-label", "Syncing");
  });
});
