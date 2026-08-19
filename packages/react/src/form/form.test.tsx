import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "./form";
import { FieldError, FieldLabel, FieldRoot } from "../field/field";
import { Input } from "../input/input";
import { Button } from "../button/button";

function EmailForm(props: React.ComponentProps<typeof Form>) {
  return (
    <Form {...props}>
      <FieldRoot name="email">
        <FieldLabel>Email</FieldLabel>
        <Input type="email" required />
        <FieldError match="valueMissing">Enter your email.</FieldError>
      </FieldRoot>
      <Button type="submit">Subscribe</Button>
    </Form>
  );
}

describe("Form", () => {
  it("submits the field values once valid", async () => {
    const user = userEvent.setup();
    const onFormSubmit = vi.fn();
    render(<EmailForm onFormSubmit={onFormSubmit} />);

    await user.type(screen.getByRole("textbox"), "ada@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
    expect(onFormSubmit).toHaveBeenCalledWith(
      { email: "ada@example.com" },
      expect.anything(),
    );
  });

  it("blocks submission and shows the error while invalid", async () => {
    const user = userEvent.setup();
    const onFormSubmit = vi.fn();
    render(<EmailForm onFormSubmit={onFormSubmit} />);

    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(onFormSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Enter your email.")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("data-invalid");
  });

  it("maps server errors onto fields by name", () => {
    render(
      <Form errors={{ email: "That address is already subscribed." }}>
        <FieldRoot name="email">
          <FieldLabel>Email</FieldLabel>
          <Input type="email" />
          <FieldError />
        </FieldRoot>
      </Form>,
    );
    expect(
      screen.getByText("That address is already subscribed."),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("data-invalid");
  });
});
