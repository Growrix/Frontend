import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DataGrid, ResourceTable } from "@/ds";

describe("DS data components", () => {
  test("DataGrid searches across row values and paginates results", async () => {
    const user = userEvent.setup();

    render(
      <DataGrid
        caption="Customers"
        rows={[
          { id: "1", name: "Solar Match", seats: 12 },
          { id: "2", name: "Blueprint Labs", seats: 4 },
          { id: "3", name: "Grid Works", seats: 7 },
        ]}
        columns={[
          { id: "name", header: "Name", cell: (row) => row.name, sortable: true, sortValue: (row) => row.name },
          { id: "seats", header: "Seats", cell: (row) => String(row.seats), sortable: true, sortValue: (row) => row.seats },
        ]}
        getRowId={(row) => row.id}
        searchable
        pageSize={2}
      />
    );

    expect(screen.getByText("Solar Match")).toBeInTheDocument();
    expect(screen.getByText("Blueprint Labs")).toBeInTheDocument();
    expect(screen.queryByText("Grid Works")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "2" }));
    expect(screen.getByText("Grid Works")).toBeInTheDocument();

    await user.clear(screen.getByRole("textbox"));
    await user.type(screen.getByRole("textbox"), "grid");
    expect(screen.getByText("Grid Works")).toBeInTheDocument();
    expect(screen.queryByText("Solar Match")).not.toBeInTheDocument();
  });

  test("ResourceTable exposes create, edit, and delete actions", async () => {
    const user = userEvent.setup();
    const onCreate = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    render(
      <ResourceTable
        title="Resources"
        rows={[{ id: "res-1", name: "Dashboard", updatedAt: "2026-03-30" }]}
        onCreate={onCreate}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    await user.click(screen.getByRole("button", { name: "Create" }));
    await user.click(screen.getByRole("button", { name: "Edit" }));
    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith("res-1");
    expect(onDelete).toHaveBeenCalledWith("res-1");
  });
});