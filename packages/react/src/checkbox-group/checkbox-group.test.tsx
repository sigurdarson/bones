import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckboxGroup } from "./checkbox-group";
import { Checkbox } from "../checkbox/checkbox";

describe("CheckboxGroup", () => {
  it("tracks member checkboxes by value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <CheckboxGroup defaultValue={["email"]} onValueChange={onValueChange}>
        <label>
          <Checkbox value="email" /> Email
        </label>
        <label>
          <Checkbox value="sms" /> Text message
        </label>
      </CheckboxGroup>,
    );

    expect(screen.getByRole("checkbox", { name: "Email" })).toHaveAttribute("data-checked");
    expect(screen.getByRole("checkbox", { name: "Text message" })).not.toHaveAttribute(
      "data-checked",
    );

    await user.click(screen.getByRole("checkbox", { name: "Text message" }));
    expect(onValueChange).toHaveBeenCalledWith(
      expect.arrayContaining(["email", "sms"]),
      expect.anything(),
    );
  });

  it("supports a select-all parent through allValues", async () => {
    const user = userEvent.setup();
    render(
      <CheckboxGroup defaultValue={[]} allValues={["email", "sms"]}>
        <label>
          <Checkbox parent /> All notifications
        </label>
        <label>
          <Checkbox value="email" /> Email
        </label>
        <label>
          <Checkbox value="sms" /> Text message
        </label>
      </CheckboxGroup>,
    );

    await user.click(screen.getByRole("checkbox", { name: "All notifications" }));
    expect(screen.getByRole("checkbox", { name: "Email" })).toHaveAttribute("data-checked");
    expect(screen.getByRole("checkbox", { name: "Text message" })).toHaveAttribute(
      "data-checked",
    );

    await user.click(screen.getByRole("checkbox", { name: "Email" }));
    expect(screen.getByRole("checkbox", { name: "All notifications" })).toHaveAttribute(
      "data-indeterminate",
    );
  });

  it("disables all members from the group", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <CheckboxGroup disabled onValueChange={onValueChange}>
        <label>
          <Checkbox value="email" /> Email
        </label>
      </CheckboxGroup>,
    );
    await user.click(screen.getByRole("checkbox", { name: "Email" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
