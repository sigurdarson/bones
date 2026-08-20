import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Separator } from "./separator";

describe("Separator", () => {
  it("renders separator semantics, horizontal by default", () => {
    render(<Separator />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("data-orientation", "horizontal");
  });

  it("supports the vertical orientation", () => {
    render(<Separator orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute(
      "data-orientation",
      "vertical",
    );
  });

  it("merges the consumer className", () => {
    render(<Separator className="extra" />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveClass("ub-separator");
    expect(separator).toHaveClass("extra");
  });
});
