import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
} from "./combobox";

const languages = ["English", "French", "German", "Icelandic", "Italian"];

function LanguagePicker({
  onValueChange,
}: {
  onValueChange?: (value: string | null) => void;
}) {
  return (
    <ComboboxRoot items={languages} onValueChange={onValueChange}>
      <ComboboxInput placeholder="Choose a language" aria-label="Language" />
      <ComboboxContent empty="No languages found.">
        {(item: string) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxContent>
    </ComboboxRoot>
  );
}

describe("Combobox", () => {
  it("filters the list while typing and selects an option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<LanguagePicker onValueChange={onValueChange} />);

    const input = screen.getByRole("combobox", { name: "Language" });
    await user.type(input, "Ice");

    const option = await screen.findByRole("option", { name: "Icelandic" });
    expect(screen.queryByRole("option", { name: "French" })).not.toBeInTheDocument();

    await user.click(option);
    expect(onValueChange).toHaveBeenCalledWith("Icelandic", expect.anything());
    expect(input).toHaveValue("Icelandic");
  });

  it("opens the whole list from the chevron", async () => {
    const user = userEvent.setup();
    render(<LanguagePicker />);

    await user.click(screen.getByRole("button", { name: "Open list" }));
    expect(await screen.findByRole("option", { name: "English" })).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(languages.length);
  });

  it("shows the empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<LanguagePicker />);

    await user.type(screen.getByRole("combobox"), "Klingon");
    expect(await screen.findByText("No languages found.")).toBeInTheDocument();
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });

  it("clears the selection from the clear button", async () => {
    const user = userEvent.setup();
    render(<LanguagePicker />);

    const input = screen.getByRole("combobox");
    await user.type(input, "Ger");
    await user.click(await screen.findByRole("option", { name: "German" }));
    expect(input).toHaveValue("German");

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(input).toHaveValue("");
  });

  it("carries the size from the root onto the input group and popup", async () => {
    const user = userEvent.setup();
    render(
      <ComboboxRoot items={languages} size="compact">
        <ComboboxInput aria-label="Language" />
        <ComboboxContent>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxContent>
      </ComboboxRoot>,
    );

    const group = document.querySelector(".ub-combobox-input-group");
    expect(group).toHaveAttribute("data-size", "compact");
    expect(group).toHaveAttribute("data-variant", "default");
    expect(group).toHaveAttribute("data-clearable");
    await user.click(screen.getByRole("button", { name: "Open list" }));
    await waitFor(() =>
      expect(document.querySelector(".ub-combobox-popup")).toHaveAttribute(
        "data-size",
        "compact",
      ),
    );
  });
});
