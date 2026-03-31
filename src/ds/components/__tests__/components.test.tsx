import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  Accordion,
  AccordionItem,
  DataTable,
  DropdownMenu,
  DropdownMenuButton,
  Modal,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  ToastProvider,
  ToastViewport,
  type DataTableColumn,
  type ToastItem,
} from "@/ds";

/* ------------------------------------------------------------------ */
/*  Modal                                                              */
/* ------------------------------------------------------------------ */
describe("Modal", () => {
  it("renders dialog when open", () => {
    render(
      <Modal open onClose={() => {}} title={<span>Settings</span>}>
        <p>Body</p>
      </Modal>,
    );
    expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Modal open={false} onClose={() => {}} title={<span>Settings</span>}>
        <p>Body</p>
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("applies size class to panel", () => {
    render(
      <Modal open onClose={() => {}} size="lg" title={<span>Big</span>}>
        <p>Big body</p>
      </Modal>,
    );
    expect(document.querySelector(".ui-modal__panel--lg")).toBeInTheDocument();
  });

  it("exposes accessible description", () => {
    render(
      <Modal open onClose={() => {}} title={<span>Edit</span>} description="Change preferences">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole("dialog")).toHaveAccessibleDescription("Change preferences");
  });
});

/* ------------------------------------------------------------------ */
/*  Tabs (compound)                                                    */
/* ------------------------------------------------------------------ */
describe("Tabs", () => {
  it("renders tablist with triggers and panels", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsPanel value="a">Panel A</TabsPanel>
        <TabsPanel value="b">Panel B</TabsPanel>
      </Tabs>,
    );
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(2);
    expect(screen.getByText("Panel A")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    const { container } = render(
      <Tabs defaultValue="a" variant="pill">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
        </TabsList>
        <TabsPanel value="a">Panel A</TabsPanel>
      </Tabs>,
    );
    expect(container.querySelector(".ui-tabs--pill")).toBeInTheDocument();
  });

  it("marks active trigger", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsPanel value="a">Panel A</TabsPanel>
        <TabsPanel value="b">Panel B</TabsPanel>
      </Tabs>,
    );
    const tabA = screen.getByRole("tab", { name: "Tab A" });
    expect(tabA).toHaveAttribute("aria-selected", "true");
    expect(tabA).toHaveClass("ui-tabs__trigger--active");
  });

  it("switches panels on click", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsPanel value="a">Panel A</TabsPanel>
        <TabsPanel value="b">Panel B</TabsPanel>
      </Tabs>,
    );

    await user.click(screen.getByRole("tab", { name: "Tab B" }));
    expect(screen.getByText("Panel B")).toBeVisible();
  });
});

/* ------------------------------------------------------------------ */
/*  Accordion (compound)                                               */
/* ------------------------------------------------------------------ */
describe("Accordion", () => {
  it("renders items with triggers", () => {
    render(
      <Accordion>
        <AccordionItem value="1" title="Section 1">
          Content 1
        </AccordionItem>
        <AccordionItem value="2" title="Section 2">
          Content 2
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
  });

  it("opens item on click", async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem value="1" title="Section 1">
          Content 1
        </AccordionItem>
      </Accordion>,
    );

    await user.click(screen.getByText("Section 1"));
    expect(screen.getByText("Content 1")).toBeVisible();
  });

  it("opens default item", () => {
    render(
      <Accordion defaultValue="2">
        <AccordionItem value="1" title="Section 1">
          Content 1
        </AccordionItem>
        <AccordionItem value="2" title="Section 2">
          Content 2
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("Content 2")).toBeVisible();
  });
});

/* ------------------------------------------------------------------ */
/*  DropdownMenu                                                       */
/* ------------------------------------------------------------------ */
describe("DropdownMenu", () => {
  it("renders trigger", () => {
    render(
      <DropdownMenu trigger={<button type="button">Menu</button>}>
        <DropdownMenuButton>Action</DropdownMenuButton>
      </DropdownMenu>,
    );
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  });

  it("opens on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu trigger={<button type="button">Menu</button>}>
        <DropdownMenuButton>Action 1</DropdownMenuButton>
      </DropdownMenu>,
    );

    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Action 1" })).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/*  Toast                                                              */
/* ------------------------------------------------------------------ */
describe("Toast", () => {
  it("renders toast items in viewport", () => {
    const items: ToastItem[] = [
      { id: "1", tone: "success", title: "Saved", description: "Changes saved" },
    ];

    render(
      <ToastProvider>
        <ToastViewport items={items} onDismiss={() => {}} />
      </ToastProvider>,
    );

    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Changes saved")).toBeInTheDocument();
  });

  it("renders tone class", () => {
    const items: ToastItem[] = [
      { id: "1", tone: "danger", title: "Error" },
    ];

    render(
      <ToastProvider>
        <ToastViewport items={items} onDismiss={() => {}} />
      </ToastProvider>,
    );

    expect(document.querySelector(".ui-toast--danger")).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/*  DataTable                                                          */
/* ------------------------------------------------------------------ */
describe("DataTable", () => {
  type Row = { id: string; name: string; value: number };

  const columns: DataTableColumn<Row>[] = [
    { id: "name", header: "Name", cell: (r) => r.name },
    { id: "value", header: "Value", cell: (r) => r.value, sortable: true },
  ];

  const rows: Row[] = [
    { id: "1", name: "Alpha", value: 10 },
    { id: "2", name: "Beta", value: 20 },
  ];

  it("renders rows and columns", () => {
    render(<DataTable rows={rows} columns={columns} getRowId={(r) => r.id} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("renders caption", () => {
    render(<DataTable rows={rows} columns={columns} getRowId={(r) => r.id} caption="Test table" />);
    expect(screen.getByText("Test table")).toBeInTheDocument();
  });

  it("shows empty state when no rows", () => {
    render(<DataTable rows={[]} columns={columns} getRowId={(r) => r.id} empty="No data" />);
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("applies sticky header class", () => {
    const { container } = render(
      <DataTable rows={rows} columns={columns} getRowId={(r) => r.id} stickyHeader />,
    );
    expect(container.querySelector(".ui-table--sticky")).toBeInTheDocument();
  });

  it("renders sort button for sortable columns", () => {
    render(
      <DataTable
        rows={rows}
        columns={columns}
        getRowId={(r) => r.id}
        sort={{ columnId: "value", direction: "asc" }}
        onSortChange={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: /Value/i })).toBeInTheDocument();
  });
});
