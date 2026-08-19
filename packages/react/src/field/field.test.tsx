import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FieldDescription, FieldError, FieldLabel, FieldRoot } from "./field";
import { Input } from "../input/input";

describe("Field", () => {
  it("labels the control inside", () => {
    render(
      <FieldRoot name="email">
        <FieldLabel>Email</FieldLabel>
        <Input />
      </FieldRoot>,
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
  });

  it("links the description via aria-describedby", () => {
    render(
      <FieldRoot name="email">
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldDescription>We only use this for receipts.</FieldDescription>
      </FieldRoot>,
    );
    const input = screen.getByRole("textbox");
    const description = screen.getByText("We only use this for receipts.");
    expect(input.getAttribute("aria-describedby")).toContain(description.id);
  });

  it("drives the control's invalid state from the root", () => {
    render(
      <FieldRoot name="email" invalid>
        <FieldLabel>Email</FieldLabel>
        <Input />
      </FieldRoot>,
    );
    expect(screen.getByRole("textbox")).toHaveAttribute("data-invalid");
  });

  it("shows the error only while matched", () => {
    const { rerender } = render(
      <FieldRoot name="email">
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldError match={false}>Bad email.</FieldError>
      </FieldRoot>,
    );
    expect(screen.queryByText("Bad email.")).not.toBeInTheDocument();

    rerender(
      <FieldRoot name="email" invalid>
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldError match>Bad email.</FieldError>
      </FieldRoot>,
    );
    expect(screen.getByText("Bad email.")).toBeInTheDocument();
  });

  it("disables the control from the root", () => {
    render(
      <FieldRoot name="email" disabled>
        <FieldLabel>Email</FieldLabel>
        <Input />
      </FieldRoot>,
    );
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
