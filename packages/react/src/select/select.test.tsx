import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger } from "./select";

function renderSelect(props?: { size?: "default" | "compact" }) {
  return render(
    <SelectRoot size={props?.size}>
      <SelectTrigger placeholder="Choose a plan" />
      <SelectContent>
        <SelectItem value="hobby">Hobby</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
      </SelectContent>
    </SelectRoot>,
  );
}

describe("Select", () => {
  it("renders the trigger with its placeholder", () => {
    renderSelect();
    expect(screen.getByText("Choose a plan")).toBeInTheDocument();
  });

  it("flows size from the root to the trigger", () => {
    const { container, unmount } = renderSelect();
    expect(container.querySelector(".ub-select-trigger")).toHaveAttribute(
      "data-size",
      "default",
    );
    unmount();
    const { container: compact } = renderSelect({ size: "compact" });
    expect(compact.querySelector(".ub-select-trigger")).toHaveAttribute(
      "data-size",
      "compact",
    );
  });

  it("marks invalid with data-invalid and aria-invalid", () => {
    render(
      <SelectRoot>
        <SelectTrigger placeholder="Plan" invalid />
        <SelectContent>
          <SelectItem value="hobby">Hobby</SelectItem>
        </SelectContent>
      </SelectRoot>,
    );
    const trigger = document.querySelector(".ub-select-trigger");
    expect(trigger).toHaveAttribute("data-invalid");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
  });

  it("links the hint via aria-describedby", () => {
    render(
      <SelectRoot>
        <SelectTrigger placeholder="Plan" hint="You can change plans anytime." />
        <SelectContent>
          <SelectItem value="hobby">Hobby</SelectItem>
        </SelectContent>
      </SelectRoot>,
    );
    const trigger = document.querySelector(".ub-select-trigger")!;
    const hint = screen.getByText("You can change plans anytime.");
    expect(trigger.getAttribute("aria-describedby")).toContain(hint.id);
  });

  it("supports disabled on the trigger", () => {
    render(
      <SelectRoot>
        <SelectTrigger placeholder="Plan" disabled />
        <SelectContent>
          <SelectItem value="hobby">Hobby</SelectItem>
        </SelectContent>
      </SelectRoot>,
    );
    expect(document.querySelector(".ub-select-trigger")).toHaveAttribute("data-disabled");
  });
});
