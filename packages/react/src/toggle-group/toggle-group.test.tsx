import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "../toggle/toggle";
import { ToggleGroup } from "./toggle-group";

describe("ToggleGroup", () => {
  it("single-selects by default", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup defaultValue={["left"]}>
        <Toggle value="left">Left</Toggle>
        <Toggle value="right">Right</Toggle>
      </ToggleGroup>,
    );
    await user.click(screen.getByRole("button", { name: "Right" }));
    expect(screen.getByRole("button", { name: "Right" })).toHaveAttribute("data-pressed");
    expect(screen.getByRole("button", { name: "Left" })).not.toHaveAttribute(
      "data-pressed",
    );
  });

  it("allows independent toggles with multiple", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup defaultValue={["bold"]} multiple>
        <Toggle value="bold">Bold</Toggle>
        <Toggle value="italic">Italic</Toggle>
      </ToggleGroup>,
    );
    await user.click(screen.getByRole("button", { name: "Italic" }));
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("data-pressed");
    expect(screen.getByRole("button", { name: "Italic" })).toHaveAttribute("data-pressed");
  });
});
