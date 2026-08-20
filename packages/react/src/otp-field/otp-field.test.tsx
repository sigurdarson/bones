import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OTPField } from "./otp-field";
import { FieldLabel, FieldRoot } from "../field/field";

describe("OTPField", () => {
  it("renders one slot per length", () => {
    render(<OTPField length={6} aria-label="Verification code" />);
    expect(document.querySelectorAll(".ub-otp-field-input")).toHaveLength(6);
  });

  it("distributes typed characters and reports the joined value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <OTPField length={4} aria-label="Verification code" onValueChange={onValueChange} />,
    );

    const slots = document.querySelectorAll<HTMLInputElement>(
      ".ub-otp-field-input",
    );
    await user.click(slots[0]!);
    await user.keyboard("1234");

    expect(onValueChange).toHaveBeenLastCalledWith("1234", expect.anything());
    const root = document.querySelector(".ub-otp-field");
    expect(root).toHaveAttribute("data-complete");
  });

  it("carries size and defaults", () => {
    render(<OTPField length={4} size="compact" aria-label="Code" />);
    expect(document.querySelector(".ub-otp-field")).toHaveAttribute(
      "data-size",
      "compact",
    );
  });

  it("is labeled and driven by a wrapping Field", () => {
    render(
      <FieldRoot name="code" invalid>
        <FieldLabel>Verification code</FieldLabel>
        <OTPField length={4} />
      </FieldRoot>,
    );
    const slot = document.querySelector(".ub-otp-field-input");
    expect(slot).toHaveAttribute("data-invalid");
  });

  it("disables every slot", () => {
    render(<OTPField length={4} disabled aria-label="Code" />);
    for (const slot of document.querySelectorAll(".ub-otp-field-input")) {
      expect(slot).toBeDisabled();
    }
  });
});
