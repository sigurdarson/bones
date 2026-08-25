import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteRoot,
} from "./autocomplete";

const pages = ["Button", "Checkbox", "Combobox", "Theming", "Motion"];

function DocsSearch({
  onValueChange,
}: {
  onValueChange?: (value: string) => void;
}) {
  return (
    <AutocompleteRoot items={pages} onValueChange={onValueChange}>
      <AutocompleteInput placeholder="Search the docs" aria-label="Search" />
      <AutocompleteContent empty="No pages found.">
        {(page: string) => (
          <AutocompleteItem key={page} value={page}>
            {page}
          </AutocompleteItem>
        )}
      </AutocompleteContent>
    </AutocompleteRoot>
  );
}

describe("Autocomplete", () => {
  it("suggests while typing and fills the input on selection", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<DocsSearch onValueChange={onValueChange} />);

    const input = screen.getByRole("combobox", { name: "Search" });
    await user.type(input, "Che");

    await user.click(await screen.findByRole("option", { name: "Checkbox" }));
    expect(input).toHaveValue("Checkbox");
    expect(onValueChange).toHaveBeenLastCalledWith("Checkbox", expect.anything());
  });

  it("keeps free text that matches nothing", async () => {
    const user = userEvent.setup();
    render(<DocsSearch />);

    const input = screen.getByRole("combobox");
    await user.type(input, "tokens galore");
    expect(await screen.findByText("No pages found.")).toBeInTheDocument();
    expect(input).toHaveValue("tokens galore");
  });

  it("clears the text from the clear button", async () => {
    const user = userEvent.setup();
    render(<DocsSearch />);

    const input = screen.getByRole("combobox");
    await user.type(input, "The");
    /* The clear button is aria-hidden while the popup is open (a pointer
       affordance; keyboard users just edit), so query by class. */
    await user.click(document.querySelector(".ub-combobox-clear")!);
    expect(input).toHaveValue("");
  });

  it("shares the combobox styling and carries the size", () => {
    render(
      <AutocompleteRoot items={pages} size="compact">
        <AutocompleteInput aria-label="Search" />
        <AutocompleteContent>
          {(page: string) => (
            <AutocompleteItem key={page} value={page}>
              {page}
            </AutocompleteItem>
          )}
        </AutocompleteContent>
      </AutocompleteRoot>,
    );

    const group = document.querySelector(".ub-autocomplete-input-group");
    expect(group).toHaveClass("ub-combobox-input-group");
    expect(group).toHaveAttribute("data-size", "compact");
    /* No chevron: the autocomplete is typing-first. */
    expect(
      screen.queryByRole("button", { name: "Open list" }),
    ).not.toBeInTheDocument();
  });
});
