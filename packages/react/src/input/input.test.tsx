import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";

describe("Input", () => {
  it("renders a plain input with no wrapper when there are no extras", () => {
    const { container } = render(<Input aria-label="Email" />);
    expect((container.firstChild as HTMLElement).tagName).toBe("INPUT");
  });

  it("accepts typing", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Email" />);
    await user.type(screen.getByRole("textbox"), "ada@usebones.com");
    expect(screen.getByRole("textbox")).toHaveValue("ada@usebones.com");
  });

  it("carries size and variant as data attributes", () => {
    render(<Input aria-label="Email" size="compact" variant="borderless" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("data-size", "compact");
    expect(input).toHaveAttribute("data-variant", "borderless");
  });

  it("marks invalid with data-invalid and aria-invalid", () => {
    render(<Input aria-label="Email" invalid />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("data-invalid");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("renders the field wrapper with a hidden icon when icons are present", () => {
    const { container } = render(
      <Input aria-label="Email" leadingIcon={<svg data-testid="lead" />} />,
    );
    const field = container.firstChild as HTMLElement;
    expect(field).toHaveClass("ub-input-field");
    expect(field.querySelector(".ub-input-leading-icon")).toHaveAttribute(
      "aria-hidden",
    );
  });

  it("links the hint via aria-describedby and merges an existing one", () => {
    render(<Input aria-label="Email" hint="We only use this for receipts." aria-describedby="extra" />);
    const input = screen.getByRole("textbox");
    const hint = screen.getByText("We only use this for receipts.");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy.split(" ")).toContain(hint.id);
    expect(describedBy.split(" ")).toContain("extra");
  });
});
