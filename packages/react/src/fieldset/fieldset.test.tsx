import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FieldsetLegend, FieldsetRoot } from "./fieldset";
import { FieldLabel, FieldRoot } from "../field/field";
import { Input } from "../input/input";

describe("Fieldset", () => {
  it("renders a group named by its legend", () => {
    render(
      <FieldsetRoot>
        <FieldsetLegend>Shipping address</FieldsetLegend>
        <FieldRoot name="city">
          <FieldLabel>City</FieldLabel>
          <Input />
        </FieldRoot>
      </FieldsetRoot>,
    );
    expect(
      screen.getByRole("group", { name: "Shipping address" }),
    ).toBeInTheDocument();
  });

  it("disables every control inside", () => {
    render(
      <FieldsetRoot disabled>
        <FieldsetLegend>Shipping address</FieldsetLegend>
        <FieldRoot name="city">
          <FieldLabel>City</FieldLabel>
          <Input />
        </FieldRoot>
      </FieldsetRoot>,
    );
    expect(screen.getByRole("group")).toHaveAttribute("data-disabled");
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("merges the consumer className", () => {
    render(
      <FieldsetRoot className="extra" data-testid="fieldset">
        <FieldsetLegend>Legend</FieldsetLegend>
      </FieldsetRoot>,
    );
    const fieldset = screen.getByTestId("fieldset");
    expect(fieldset).toHaveClass("ub-fieldset");
    expect(fieldset).toHaveClass("extra");
  });
});
