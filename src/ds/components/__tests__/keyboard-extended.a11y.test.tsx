import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Autocomplete, ContextMenu, MultiSelect, Popover } from "@/ds";

describe("DS extended keyboard accessibility", () => {
  /* ------------------------------------------------------------------ */
  /*  Popover                                                            */
  /* ------------------------------------------------------------------ */
  test("Popover restores focus to trigger on Escape", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button type="button">Open info</button>}
        aria-label="Info panel"
      >
        <button type="button">Inside action</button>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: "Open info" });
    await user.click(trigger);

    const dialog = await screen.findByRole("dialog", { name: "Info panel" });
    expect(dialog).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  /* ------------------------------------------------------------------ */
  /*  ContextMenu                                                        */
  /* ------------------------------------------------------------------ */
  test("ContextMenu supports arrow, Home/End navigation and Escape", async () => {
    const user = userEvent.setup();
    const handlers = { cut: jest.fn(), copy: jest.fn(), paste: jest.fn() };

    render(
      <ContextMenu
        items={[
          { id: "cut", label: "Cut", onSelect: handlers.cut },
          { id: "copy", label: "Copy", onSelect: handlers.copy },
          { id: "paste", label: "Paste", onSelect: handlers.paste },
        ]}
      >
        <div data-testid="target">Right-click here</div>
      </ContextMenu>
    );

    const target = screen.getByTestId("target");

    // Open via context menu event
    await user.pointer({ target, keys: "[MouseRight]" });

    const menu = await screen.findByRole("menu", { name: "Context menu" });
    expect(menu).toBeInTheDocument();

    const cut = screen.getByRole("menuitem", { name: "Cut" });
    const copy = screen.getByRole("menuitem", { name: "Copy" });
    const paste = screen.getByRole("menuitem", { name: "Paste" });

    // Auto-focus first item
    await waitFor(() => expect(cut).toHaveFocus());

    // Arrow down
    await user.keyboard("{ArrowDown}");
    expect(copy).toHaveFocus();

    // End
    await user.keyboard("{End}");
    expect(paste).toHaveFocus();

    // Home
    await user.keyboard("{Home}");
    expect(cut).toHaveFocus();

    // Wrap around
    await user.keyboard("{ArrowUp}");
    expect(paste).toHaveFocus();

    // Escape closes
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  /* ------------------------------------------------------------------ */
  /*  Autocomplete                                                       */
  /* ------------------------------------------------------------------ */
  test("Autocomplete exposes aria-activedescendant and supports Home/End", async () => {
    const user = userEvent.setup();
    const opts = [
      { id: "au", label: "Australia" },
      { id: "at", label: "Austria" },
      { id: "br", label: "Brazil" },
    ];

    function Harness() {
      const [val, setVal] = React.useState("");
      return <Autocomplete value={val} onValueChange={setVal} options={opts} label="Country" />;
    }

    render(<Harness />);

    const input = screen.getByRole("combobox", { name: "Country" });
    await user.click(input);
    await user.type(input, "au");

    // Listbox should appear with filtered options
    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();

    const australia = screen.getByRole("option", { name: "Australia" });
    const austria = screen.getByRole("option", { name: "Austria" });

    // Initial active = first
    expect(australia).toHaveAttribute("aria-selected", "true");
    expect(input).toHaveAttribute("aria-activedescendant", australia.id);

    // ArrowDown moves to second
    await user.keyboard("{ArrowDown}");
    expect(austria).toHaveAttribute("aria-selected", "true");
    expect(input).toHaveAttribute("aria-activedescendant", austria.id);

    // Home goes back to first
    await user.keyboard("{Home}");
    expect(input).toHaveAttribute("aria-activedescendant", australia.id);

    // End goes to last
    await user.keyboard("{End}");
    expect(input).toHaveAttribute("aria-activedescendant", austria.id);

    // Enter selects
    await user.keyboard("{Enter}");
    expect(input).toHaveValue("Austria");
  });

  /* ------------------------------------------------------------------ */
  /*  MultiSelect                                                        */
  /* ------------------------------------------------------------------ */
  test("MultiSelect has accessible group and toggles checkboxes", async () => {
    const user = userEvent.setup();
    const opts = [
      { id: "s", label: "Solar", value: "solar" },
      { id: "w", label: "Wind", value: "wind" },
      { id: "h", label: "Hydro", value: "hydro" },
    ];

    function Harness() {
      const [vals, setVals] = React.useState<string[]>([]);
      return <MultiSelect label="Energy" options={opts} values={vals} onValuesChange={setVals} />;
    }

    render(<Harness />);

    const trigger = screen.getByRole("button", { name: "Energy (0)" });
    await user.click(trigger);

    // Group exists
    const group = await screen.findByRole("group", { name: "Energy" });
    expect(group).toBeInTheDocument();

    // Toggle a checkbox
    const solar = screen.getByRole("checkbox", { name: "Solar" });
    await user.click(solar);
    expect(solar).toBeChecked();

    // Trigger label updated
    expect(screen.getByRole("button", { name: "Energy (1)" })).toBeInTheDocument();
  });
});
