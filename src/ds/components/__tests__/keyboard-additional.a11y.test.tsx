import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  Accordion,
  AccordionItem,
  CommandPalette,
  ConfirmDialog,
  Tooltip,
} from "@/ds";

describe("DS keyboard accessibility — additional", () => {
  /* ------------------------------------------------------------------ */
  /*  Accordion                                                          */
  /* ------------------------------------------------------------------ */
  test("Accordion arrow-key navigation, Home/End, Enter/Space toggle", async () => {
    const user = userEvent.setup();

    render(
      <Accordion>
        <AccordionItem value="1" title="Section 1">Content 1</AccordionItem>
        <AccordionItem value="2" title="Section 2">Content 2</AccordionItem>
        <AccordionItem value="3" title="Section 3">Content 3</AccordionItem>
      </Accordion>,
    );

    const triggers = screen.getAllByRole("button");
    const [s1, s2, s3] = triggers;

    // Focus first trigger
    s1.focus();
    expect(s1).toHaveFocus();

    // ArrowDown moves to next
    await user.keyboard("{ArrowDown}");
    expect(s2).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(s3).toHaveFocus();

    // End goes to last
    await user.keyboard("{Home}");
    expect(s1).toHaveFocus();

    await user.keyboard("{End}");
    expect(s3).toHaveFocus();

    // Enter toggles open
    await user.keyboard("{Enter}");
    expect(screen.getByText("Content 3")).toBeVisible();

    // Space toggles close
    await user.keyboard(" ");
    // Content 3's panel should be hidden
    const panel = screen.getByText("Content 3").closest("[role='region']");
    expect(panel).toHaveAttribute("hidden");
  });

  test("Accordion panel has role=region and aria-labelledby", () => {
    render(
      <Accordion defaultValue="1">
        <AccordionItem value="1" title="Details">Region content</AccordionItem>
      </Accordion>,
    );

    const region = screen.getByRole("region");
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("aria-labelledby");
  });

  /* ------------------------------------------------------------------ */
  /*  ConfirmDialog                                                      */
  /* ------------------------------------------------------------------ */
  test("ConfirmDialog focuses cancel button (least destructive) on open", async () => {
    render(
      <ConfirmDialog
        open
        onClose={() => {}}
        onConfirm={() => {}}
        title="Delete account?"
        description="This action cannot be undone."
        cancelLabel="Keep account"
        confirmLabel="Delete"
        tone="danger"
      />,
    );

    const dialog = await screen.findByRole("dialog", { name: "Delete account?" });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAccessibleDescription("This action cannot be undone.");

    // Cancel button should auto-focus
    const cancel = screen.getByRole("button", { name: "Keep account" });
    await waitFor(() => expect(cancel).toHaveFocus());
  });

  test("ConfirmDialog calls onConfirm when confirm clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();
    const onClose = jest.fn();

    render(
      <ConfirmDialog
        open
        onClose={onClose}
        onConfirm={onConfirm}
        title="Proceed?"
        confirmLabel="Yes"
        cancelLabel="No"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Yes" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  /* ------------------------------------------------------------------ */
  /*  CommandPalette                                                      */
  /* ------------------------------------------------------------------ */
  test("CommandPalette supports arrow nav, Enter to select, Escape to close", async () => {
    const user = userEvent.setup();
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const onOpenChange = jest.fn();

    render(
      <CommandPalette
        open
        onOpenChange={onOpenChange}
        items={[
          { id: "1", label: "Create project", onSelect: handler1 },
          { id: "2", label: "Open settings", onSelect: handler2 },
        ]}
      />,
    );

    // Search input should be focused — portal'd to body, rAF delayed
    const input = document.querySelector(".ui-command__search input") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    await waitFor(() => expect(input).toHaveFocus());

    // Active index starts at 0, first item already selected
    const items = document.querySelectorAll(".ui-command__item");
    expect(items[0]).toHaveAttribute("aria-selected", "true");

    // ArrowDown moves to second item
    await user.keyboard("{ArrowDown}");
    expect(items[1]).toHaveAttribute("aria-selected", "true");

    // Enter selects active item
    await user.keyboard("{Enter}");
    expect(handler2).toHaveBeenCalledTimes(1);
  });

  test("CommandPalette Escape closes", async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <CommandPalette
        open
        onOpenChange={onOpenChange}
        items={[{ id: "1", label: "Test", onSelect: () => {} }]}
      />,
    );

    // Wait for input to get focus (rAF)
    const input = document.querySelector(".ui-command__search input") as HTMLInputElement;
    await waitFor(() => expect(input).toHaveFocus());

    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test("CommandPalette filters items by search term", async () => {
    const user = userEvent.setup();

    render(
      <CommandPalette
        open
        onOpenChange={() => {}}
        items={[
          { id: "1", label: "Create project", onSelect: () => {} },
          { id: "2", label: "Open settings", onSelect: () => {} },
          { id: "3", label: "Delete project", onSelect: () => {} },
        ]}
      />,
    );

    const input = document.querySelector(".ui-command__search input") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    await waitFor(() => expect(input).toHaveFocus());
    await user.type(input, "project");

    const items = document.querySelectorAll(".ui-command__item");
    expect(items).toHaveLength(2); // "Create project" and "Delete project"
  });

  /* ------------------------------------------------------------------ */
  /*  Tooltip                                                            */
  /* ------------------------------------------------------------------ */
  test("Tooltip shows on focus and hides on blur", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Helpful tip">
        <button type="button">Info</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Info" });

    // Focus should show tooltip
    await user.tab();
    expect(trigger).toHaveFocus();
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("Helpful tip");

    // Blur should hide tooltip
    await user.tab();
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });
});
