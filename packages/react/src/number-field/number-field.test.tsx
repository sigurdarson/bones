import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NumberField } from "./number-field";
import { FieldRoot, FieldLabel, FieldDescription } from "../field/field";

describe("NumberField", () => {
  it("keeps container ARIA covering the input and stepper buttons", () => {
    render(<NumberField aria-hidden aria-label="Quantity" />);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Increase" })).not.toBeInTheDocument();
  });

  it("names and describes the editable input", () => {
    render(
      <>
        <p id="quantity-help">Seats for your team.</p>
        <NumberField aria-label="Quantity" aria-describedby="quantity-help" hint="At least one." />
      </>,
    );
    const input = screen.getByRole("textbox", { name: "Quantity" });
    expect(input).toHaveAccessibleDescription("At least one. Seats for your team.");
  });

  it("forwards external labels and error attributes to the input", () => {
    render(
      <>
        <span id="seats-label">Seats</span>
        <p id="seats-error">Choose a quantity.</p>
        <NumberField aria-labelledby="seats-label" aria-invalid aria-errormessage="seats-error" />
      </>,
    );
    const input = screen.getByRole("textbox", { name: "Seats" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-errormessage", "seats-error");
  });

  it("preserves a wrapping Field's label and description", () => {
    render(
      <FieldRoot invalid>
        <FieldLabel>Team size</FieldLabel>
        <FieldDescription>Include yourself.</FieldDescription>
        <NumberField />
      </FieldRoot>,
    );
    const input = screen.getByRole("textbox", { name: "Team size" });
    expect(input).toHaveAccessibleDescription("Include yourself.");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("renders an input with stepper buttons", () => {
    render(<NumberField defaultValue={2} aria-label="Quantity" />);
    expect(screen.getByRole("textbox")).toHaveValue("2");
    expect(screen.getByRole("button", { name: "Increase" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Decrease" })).toBeInTheDocument();
  });

  it("increments and decrements with the buttons", async () => {
    const user = userEvent.setup();
    render(<NumberField defaultValue={2} aria-label="Quantity" />);
    await user.click(screen.getByRole("button", { name: "Increase" }));
    expect(screen.getByRole("textbox")).toHaveValue("3");
    await user.click(screen.getByRole("button", { name: "Decrease" }));
    expect(screen.getByRole("textbox")).toHaveValue("2");
  });

  it("respects min by disabling the decrement", () => {
    render(<NumberField defaultValue={0} min={0} aria-label="Quantity" />);
    expect(screen.getByRole("button", { name: "Decrease" })).toHaveAttribute(
      "data-disabled",
    );
  });

  it("carries size and variant as data attributes", () => {
    const { container } = render(
      <NumberField size="compact" variant="borderless" aria-label="Quantity" />,
    );
    const root = container.querySelector(".ub-number-field");
    expect(root).toHaveAttribute("data-size", "compact");
    expect(root).toHaveAttribute("data-variant", "borderless");
  });

  it("marks invalid and links the hint", () => {
    const { container } = render(
      <NumberField invalid hint="Pick at least one seat." aria-label="Seats" />,
    );
    expect(container.querySelector(".ub-number-field")).toHaveAttribute("data-invalid");
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    const hint = screen.getByText("Pick at least one seat.");
    expect(input.getAttribute("aria-describedby")).toContain(hint.id);
  });

  it("disables everything from the root", () => {
    render(<NumberField disabled defaultValue={1} aria-label="Quantity" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Increase" })).toHaveAttribute(
      "data-disabled",
    );
  });
});
