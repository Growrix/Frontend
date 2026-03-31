import { render, screen } from "@testing-library/react";

import { MetricWidget, WidgetShell } from "@/ds";

describe("DS widgets", () => {
  test("WidgetShell renders header, actions, body, and footer", () => {
    render(
      <WidgetShell title="Revenue" subtitle="Monthly recurring" actions={<button type="button">Refresh</button>} footer={<span>Updated now</span>}>
        <div>Content body</div>
      </WidgetShell>
    );

    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Monthly recurring")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();
    expect(screen.getByText("Content body")).toBeInTheDocument();
    expect(screen.getByText("Updated now")).toBeInTheDocument();
  });

  test("MetricWidget composes MetricCard inside the widget shell", () => {
    render(
      <MetricWidget
        metric={{
          label: "ARR",
          value: "$120k",
          hint: "Compared with last quarter",
          delta: "+8%",
        }}
        shell={{ title: "Finance widget", footer: <span>Finance footer</span> }}
      />
    );

    expect(screen.getByText("Finance widget")).toBeInTheDocument();
    expect(screen.getByText("ARR")).toBeInTheDocument();
    expect(screen.getByText("$120k")).toBeInTheDocument();
    expect(screen.getByText("Compared with last quarter")).toBeInTheDocument();
    expect(screen.getByText("+8%")).toBeInTheDocument();
    expect(screen.getByText("Finance footer")).toBeInTheDocument();
  });
});