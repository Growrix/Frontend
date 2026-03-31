import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Sheet } from "@/ds";

describe("Sheet", () => {
  test("traps focus and restores it on close", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    const { rerender } = render(
      <>
        <button type="button">Outside</button>
        <Sheet open={false} onClose={onClose} title="Quick actions">
          <button type="button">First action</button>
          <button type="button">Second action</button>
        </Sheet>
      </>
    );

    const outside = screen.getByRole("button", { name: "Outside" });
    outside.focus();

    rerender(
      <>
        <button type="button">Outside</button>
        <Sheet open onClose={onClose} title="Quick actions">
          <button type="button">First action</button>
          <button type="button">Second action</button>
        </Sheet>
      </>
    );

    const first = await screen.findByRole("button", { name: "First action" });
    const second = screen.getByRole("button", { name: "Second action" });

    await waitFor(() => expect(first).toHaveFocus());

    await user.tab();
    expect(second).toHaveFocus();

    await user.tab();
    expect(first).toHaveFocus();

    rerender(
      <>
        <button type="button">Outside</button>
        <Sheet open={false} onClose={onClose} title="Quick actions">
          <button type="button">First action</button>
          <button type="button">Second action</button>
        </Sheet>
      </>
    );

    await waitFor(() => expect(outside).toHaveFocus());
  });

  test("calls onClose on escape", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Sheet open onClose={onClose} title="Quick actions">
        <button type="button">Dismiss</button>
      </Sheet>
    );

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});