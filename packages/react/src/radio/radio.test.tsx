import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Radio, RadioGroup } from "./radio";

function renderGroup(props?: { disabled?: boolean; onValueChange?: (v: unknown) => void }) {
  return render(
    <RadioGroup
      defaultValue="hobby"
      disabled={props?.disabled}
      onValueChange={props?.onValueChange}
    >
      <label>
        <Radio value="hobby" /> Hobby
      </label>
      <label>
        <Radio value="pro" /> Pro
      </label>
    </RadioGroup>,
  );
}

describe("Radio", () => {
  it("renders radios inside a radiogroup with the default selected", () => {
    renderGroup();
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Hobby" })).toHaveAttribute("data-checked");
    expect(screen.getByRole("radio", { name: "Pro" })).not.toHaveAttribute("data-checked");
  });

  it("moves the selection on click and reports the value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderGroup({ onValueChange });
    await user.click(screen.getByRole("radio", { name: "Pro" }));
    expect(screen.getByRole("radio", { name: "Pro" })).toHaveAttribute("data-checked");
    expect(screen.getByRole("radio", { name: "Hobby" })).not.toHaveAttribute("data-checked");
    expect(onValueChange).toHaveBeenCalledWith("pro", expect.anything());
  });

  it("does not change while the group is disabled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderGroup({ disabled: true, onValueChange });
    await user.click(screen.getByRole("radio", { name: "Pro" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("merges consumer classNames on both parts", () => {
    const { container } = render(
      <RadioGroup className="mine">
        <Radio value="a" className="also-mine" aria-label="A" />
      </RadioGroup>,
    );
    expect(container.querySelector(".ub-radio-group")).toHaveClass("mine");
    expect(container.querySelector(".ub-radio")).toHaveClass("also-mine");
  });
});
