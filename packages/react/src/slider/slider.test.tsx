import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Slider } from "./slider";

describe("Slider", () => {
  it("renders a slider with its value", () => {
    render(<Slider defaultValue={40} aria-label="Volume" />);
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveAttribute("aria-valuenow", "40");
  });

  it("steps with the keyboard and reports the value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Slider defaultValue={40} aria-label="Volume" onValueChange={onValueChange} />);
    const slider = screen.getByRole("slider");
    await user.click(slider);
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalled();
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "41");
  });

  it("renders a thumb per entry for range values", () => {
    render(<Slider defaultValue={[20, 60]} aria-label="Price" />);
    const sliders = screen.getAllByRole("slider");
    expect(sliders).toHaveLength(2);
    expect(sliders[0]).toHaveAccessibleName("Price 1");
    expect(sliders[1]).toHaveAccessibleName("Price 2");
  });

  it("exposes disabled on the root", () => {
    const { container } = render(<Slider defaultValue={40} disabled aria-label="Volume" />);
    expect(container.querySelector(".ub-slider")).toHaveAttribute("data-disabled");
  });
});
