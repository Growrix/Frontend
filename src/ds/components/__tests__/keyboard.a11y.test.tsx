import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  DataTable,
  Drawer,
  DropdownMenu,
  DropdownMenuButton,
  Modal,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  type DataTableSort,
} from "@/ds";

describe("DS keyboard accessibility", () => {
  test("Modal traps focus, restores focus, and exposes accessible labelling", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    const { rerender } = render(
      <>
        <button type="button">Open modal</button>
        <Modal open={false} onClose={onClose} title={<span>Account settings</span>} description="Manage profile">
          <button type="button">Save changes</button>
          <button type="button">Cancel</button>
        </Modal>
      </>
    );

    const opener = screen.getByRole("button", { name: "Open modal" });
    opener.focus();

    rerender(
      <>
        <button type="button">Open modal</button>
        <Modal open onClose={onClose} title={<span>Account settings</span>} description="Manage profile">
          <button type="button">Save changes</button>
          <button type="button">Cancel</button>
        </Modal>
      </>
    );

    const dialog = await screen.findByRole("dialog", { name: "Account settings" });
    const save = screen.getByRole("button", { name: "Save changes" });
    const cancel = screen.getByRole("button", { name: "Cancel" });

    expect(dialog).toHaveAccessibleDescription("Manage profile");
    await waitFor(() => expect(save).toHaveFocus());

    await user.tab();
    expect(cancel).toHaveFocus();

    await user.tab();
    expect(save).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("Drawer traps focus, restores focus, and exposes accessible labelling", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    const { rerender } = render(
      <>
        <button type="button">Open drawer</button>
        <Drawer open={false} onClose={onClose} title={<span>Filters</span>} description="Filter dashboard results">
          <button type="button">Apply filters</button>
          <button type="button">Reset</button>
        </Drawer>
      </>
    );

    const opener = screen.getByRole("button", { name: "Open drawer" });
    opener.focus();

    rerender(
      <>
        <button type="button">Open drawer</button>
        <Drawer open onClose={onClose} title={<span>Filters</span>} description="Filter dashboard results">
          <button type="button">Apply filters</button>
          <button type="button">Reset</button>
        </Drawer>
      </>
    );

    const dialog = await screen.findByRole("dialog", { name: "Filters" });
    const apply = screen.getByRole("button", { name: "Apply filters" });
    const reset = screen.getByRole("button", { name: "Reset" });

    expect(dialog).toHaveAccessibleDescription("Filter dashboard results");
    await waitFor(() => expect(apply).toHaveFocus());

    await user.tab();
    expect(reset).toHaveFocus();

    await user.tab();
    expect(apply).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("DropdownMenu supports arrow navigation, Home/End, and Escape focus restore", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu trigger={<button type="button">Open menu</button>}>
        <DropdownMenuButton>Profile</DropdownMenuButton>
        <DropdownMenuButton>Billing</DropdownMenuButton>
        <DropdownMenuButton>Logout</DropdownMenuButton>
      </DropdownMenu>
    );

    const trigger = screen.getByRole("button", { name: "Open menu" });
    trigger.focus();

    await user.keyboard("{ArrowDown}");
    const menu = await screen.findByRole("menu");
    const profile = screen.getByRole("menuitem", { name: "Profile" });
    const billing = screen.getByRole("menuitem", { name: "Billing" });
    const logout = screen.getByRole("menuitem", { name: "Logout" });

    expect(menu).toBeInTheDocument();
    await waitFor(() => expect(profile).toHaveFocus());

    await user.keyboard("{ArrowDown}");
    expect(billing).toHaveFocus();

    await user.keyboard("{End}");
    expect(logout).toHaveFocus();

    await user.keyboard("{Home}");
    expect(profile).toHaveFocus();

    await user.keyboard("{Escape}");
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  test("Tabs support arrow, Home, and End keyboard navigation", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        <TabsPanel value="overview">Overview panel</TabsPanel>
        <TabsPanel value="billing">Billing panel</TabsPanel>
        <TabsPanel value="members">Members panel</TabsPanel>
      </Tabs>
    );

    const overview = screen.getByRole("tab", { name: "Overview" });
    const billing = screen.getByRole("tab", { name: "Billing" });
    const members = screen.getByRole("tab", { name: "Members" });

    overview.focus();
    await user.keyboard("{ArrowRight}");
    expect(billing).toHaveFocus();
    expect(billing).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{End}");
    expect(members).toHaveFocus();
    expect(members).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Home}");
    expect(overview).toHaveFocus();
    expect(overview).toHaveAttribute("aria-selected", "true");

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Overview panel");
  });

  test("DataTable supports keyboard sorting and row selection", async () => {
    const user = userEvent.setup();

    function TableHarness() {
      const [sort, setSort] = React.useState<DataTableSort | null>(null);
      const [selected, setSelected] = React.useState<string[]>([]);

      return (
        <DataTable
          caption="Accounts"
          rows={[
            { id: "r1", name: "Gamma", seats: 6 },
            { id: "r2", name: "Alpha", seats: 2 },
          ]}
          columns={[
            { id: "name", header: "Name", sortable: true, sortValue: (row) => row.name, cell: (row) => row.name },
            { id: "seats", header: "Seats", sortable: true, sortValue: (row) => row.seats, cell: (row) => String(row.seats) },
          ]}
          getRowId={(row) => row.id}
          sort={sort ?? undefined}
          onSortChange={setSort}
          selectable
          selectedRowIds={selected}
          onSelectedRowIdsChange={setSelected}
        />
      );
    }

    render(<TableHarness />);

    const sortByName = screen.getByRole("button", { name: "Sort by name" });
    sortByName.focus();
    await user.keyboard("{Enter}");
    expect(sortByName.className).toContain("ui-table__sort--active");

    const selectAll = screen.getByRole("checkbox", { name: "Select all rows" });
    selectAll.focus();
    await user.keyboard(" ");
    expect(selectAll).toBeChecked();

    const rowCheckbox = screen.getByRole("checkbox", { name: "Select row r1" });
    rowCheckbox.focus();
    await user.keyboard(" ");
    expect(rowCheckbox).not.toBeChecked();
  });
});