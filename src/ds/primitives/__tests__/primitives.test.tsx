import * as React from "react";
import { render, screen } from "@testing-library/react";
import type { TextProps } from "../Text";

import {
  Avatar,
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  Input,
  Radio,
  RangeSlider,
  Select,
  Spacer,
  Spinner,
  Stack,
  Switch,
  Text,
  Textarea,
} from "@/ds";

/* ------------------------------------------------------------------ */
/*  Button                                                             */
/* ------------------------------------------------------------------ */
describe("Button", () => {
  it("renders with base class", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button", { name: "Click" })).toHaveClass("ui-button");
  });

  it("applies variant class", () => {
    render(<Button variant="ghost">Go</Button>);
    expect(screen.getByRole("button")).toHaveClass("ui-button--ghost");
  });

  it("applies size class", () => {
    render(<Button size="lg">Big</Button>);
    expect(screen.getByRole("button")).toHaveClass("ui-button--lg");
  });

  it("applies tone class", () => {
    render(<Button tone="danger">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("ui-button--tone-danger");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("merges custom className", () => {
    render(<Button className="extra">Merge</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("ui-button");
    expect(btn).toHaveClass("extra");
  });

  it("sets disabled attribute", () => {
    render(<Button disabled>No</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

/* ------------------------------------------------------------------ */
/*  Input                                                              */
/* ------------------------------------------------------------------ */
describe("Input", () => {
  it("renders with base class", () => {
    render(<Input aria-label="email" />);
    expect(screen.getByRole("textbox")).toHaveClass("ui-input");
  });

  it("applies size class", () => {
    // @ts-expect-error — InputProps.size overrides the native HTML number type
    render(<Input size="sm" aria-label="small" />);
    expect(screen.getByRole("textbox")).toHaveClass("ui-input");
  });

  it("applies error class", () => {
    render(<Input error aria-label="err" />);
    expect(screen.getByRole("textbox")).toHaveClass("ui-input--error");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("merges custom className", () => {
    render(<Input className="extra" aria-label="cls" />);
    expect(screen.getByRole("textbox")).toHaveClass("extra");
  });
});

/* ------------------------------------------------------------------ */
/*  Textarea                                                           */
/* ------------------------------------------------------------------ */
describe("Textarea", () => {
  it("renders with base class", () => {
    render(<Textarea aria-label="msg" />);
    expect(screen.getByRole("textbox")).toHaveClass("ui-textarea");
  });

  it("applies error class", () => {
    render(<Textarea error aria-label="err" />);
    expect(screen.getByRole("textbox")).toHaveClass("ui-textarea--error");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} aria-label="ref" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});

/* ------------------------------------------------------------------ */
/*  Select                                                             */
/* ------------------------------------------------------------------ */
describe("Select", () => {
  it("renders with base class", () => {
    render(
      <Select aria-label="pick">
        <option>A</option>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toHaveClass("ui-select__control");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(
      <Select ref={ref} aria-label="ref">
        <option>A</option>
      </Select>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});

/* ------------------------------------------------------------------ */
/*  Checkbox                                                           */
/* ------------------------------------------------------------------ */
describe("Checkbox", () => {
  it("renders a checkbox input", () => {
    render(<Checkbox label="Accept" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders label text", () => {
    render(<Checkbox label="Terms" />);
    expect(screen.getByText("Terms")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} label="ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

/* ------------------------------------------------------------------ */
/*  Radio                                                              */
/* ------------------------------------------------------------------ */
describe("Radio", () => {
  it("renders a radio input", () => {
    render(<Radio label="Option A" name="group" value="a" />);
    expect(screen.getByRole("radio")).toBeInTheDocument();
  });

  it("renders label text", () => {
    render(<Radio label="Option B" name="group" value="b" />);
    expect(screen.getByText("Option B")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Radio ref={ref} label="ref" name="g" value="r" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

/* ------------------------------------------------------------------ */
/*  Switch                                                             */
/* ------------------------------------------------------------------ */
describe("Switch", () => {
  it("renders a switch button", () => {
    render(<Switch label="Notifications" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("applies active class when checked", () => {
    render(<Switch label="On" checked onCheckedChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveClass("ui-switch--on");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Switch ref={ref} label="ref" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

/* ------------------------------------------------------------------ */
/*  RangeSlider                                                        */
/* ------------------------------------------------------------------ */
describe("RangeSlider", () => {
  it("renders a slider input", () => {
    render(<RangeSlider label="Volume" min={0} max={100} />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<RangeSlider label="Brightness" min={0} max={100} />);
    expect(screen.getByText("Brightness")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<RangeSlider ref={ref} label="ref" min={0} max={100} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

/* ------------------------------------------------------------------ */
/*  Avatar                                                             */
/* ------------------------------------------------------------------ */
describe("Avatar", () => {
  it("renders with base class", () => {
    const { container } = render(<Avatar name="John" />);
    expect(container.querySelector(".ui-avatar")).toBeInTheDocument();
  });

  it("applies size class", () => {
    const { container } = render(<Avatar name="Jane" size="xl" />);
    expect(container.querySelector(".ui-avatar--xl")).toBeInTheDocument();
  });

  it("shows initials fallback when no src", () => {
    render(<Avatar name="Alex Blue" />);
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders status dot", () => {
    const { container } = render(<Avatar name="Sam" status="online" />);
    expect(container.querySelector(".ui-avatar__status--online")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Avatar ref={ref} name="ref" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

/* ------------------------------------------------------------------ */
/*  Spinner                                                            */
/* ------------------------------------------------------------------ */
describe("Spinner", () => {
  it("renders with base class", () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector(".ui-spinner")).toBeInTheDocument();
  });

  it("applies size class", () => {
    const { container } = render(<Spinner size="lg" />);
    expect(container.querySelector(".ui-spinner--lg")).toBeInTheDocument();
  });

  it("renders accessible label", () => {
    render(<Spinner label="Loading data" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading data");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

/* ------------------------------------------------------------------ */
/*  Container                                                          */
/* ------------------------------------------------------------------ */
describe("Container", () => {
  it("renders with base class", () => {
    render(<Container>Content</Container>);
    expect(screen.getByText("Content").closest(".ui-container")).toBeInTheDocument();
  });

  it("applies size class", () => {
    render(<Container size="narrow">Narrow</Container>);
    expect(screen.getByText("Narrow").closest(".ui-container--narrow")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Container ref={ref}>Ref</Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ------------------------------------------------------------------ */
/*  Stack                                                              */
/* ------------------------------------------------------------------ */
describe("Stack", () => {
  it("renders with base class", () => {
    render(<Stack>Items</Stack>);
    expect(screen.getByText("Items").closest(".ui-stack")).toBeInTheDocument();
  });

  it("applies gap class", () => {
    render(<Stack gap="tight">Tight</Stack>);
    expect(screen.getByText("Tight").closest(".ui-stack--tight")).toBeInTheDocument();
  });

  it("applies row direction class", () => {
    render(<Stack direction="row">Row</Stack>);
    expect(screen.getByText("Row").closest(".ui-stack--row")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Stack ref={ref}>Ref</Stack>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ------------------------------------------------------------------ */
/*  Grid                                                               */
/* ------------------------------------------------------------------ */
describe("Grid", () => {
  it("renders with base class", () => {
    render(<Grid>Cells</Grid>);
    expect(screen.getByText("Cells").closest(".ui-grid")).toBeInTheDocument();
  });

  it("applies columns class", () => {
    render(<Grid columns={3}>Three</Grid>);
    expect(screen.getByText("Three").closest(".ui-grid--3")).toBeInTheDocument();
  });

  it("applies auto-fill class", () => {
    render(<Grid columns="auto-fill">Auto</Grid>);
    expect(screen.getByText("Auto").closest(".ui-grid--auto")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Grid ref={ref}>Ref</Grid>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ------------------------------------------------------------------ */
/*  Spacer                                                             */
/* ------------------------------------------------------------------ */
describe("Spacer", () => {
  it("renders with base class", () => {
    const { container } = render(<Spacer />);
    expect(container.querySelector(".ui-spacer")).toBeInTheDocument();
  });

  it("applies size class", () => {
    const { container } = render(<Spacer size={3} />);
    expect(container.querySelector(".ui-spacer--3")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Spacer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ------------------------------------------------------------------ */
/*  Divider                                                            */
/* ------------------------------------------------------------------ */
describe("Divider", () => {
  it("renders with base class", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector(".ui-divider")).toBeInTheDocument();
  });

  it("applies vertical class", () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(container.querySelector(".ui-divider--vertical")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLHRElement>();
    render(<Divider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLHRElement);
  });
});

/* ------------------------------------------------------------------ */
/*  Text                                                               */
/* ------------------------------------------------------------------ */
describe("Text", () => {
  it("renders with default body class", () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText("Hello")).toHaveClass("text-body");
  });

  it("applies variant class", () => {
    render(<Text variant="heading-1">Title</Text>);
    expect(screen.getByText("Title")).toHaveClass("text-heading-1");
  });

  it("applies tone class", () => {
    render(<Text tone="muted">Muted</Text>);
    expect(screen.getByText("Muted")).toHaveClass("ui-text-muted");
  });

  it("applies truncate class", () => {
    render(<Text truncate>Long text</Text>);
    expect(screen.getByText("Long text")).toHaveClass("text-truncate");
  });

  it("applies line clamp class", () => {
    render(<Text truncate={3}>Clamped</Text>);
    expect(screen.getByText("Clamped")).toHaveClass("text-line-clamp-3");
  });

  it("applies alignment class", () => {
    render(<Text align="center">Center</Text>);
    expect(screen.getByText("Center")).toHaveClass("text-center");
  });

  it("renders as custom element via as prop", () => {
    const as = "h1" as TextProps["as"];
    render(<Text as={as} variant="heading-1">H1</Text>);
    const el = screen.getByText("H1");
    expect(el.tagName).toBe("H1");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Text ref={ref}>Ref</Text>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("merges custom className", () => {
    render(<Text className="extra">Merge</Text>);
    const el = screen.getByText("Merge");
    expect(el).toHaveClass("text-body");
    expect(el).toHaveClass("extra");
  });
});
