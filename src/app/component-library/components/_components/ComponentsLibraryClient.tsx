"use client";

import * as React from "react";

import {
  Accordion,
  AccordionItem,
  Alert,
  AppBar,
  Autocomplete,
  Avatar,
  AvatarGroup,
  Badge,
  Banner,
  BarChart,
  BlogCard,
  BottomNav,
  BottomNavItem,
  Breadcrumbs,
  Button,
  Card,
  Carousel,
  CarouselItem,
  Checkbox,
  ConfirmDialog,
  ContextMenu,
  DataGrid,
  DataTable,
  type DataTableSort,
  DatePicker,
  DateRangePicker,
  Divider,
  DonutChart,
  Drawer,
  DropdownMenu,
  DropdownMenuButton,
  EmptyState,
  ErrorBoundary,
  Field,
  Fieldset,
  FileDropzone,
  FormErrorSummary,
  Grid,
  HeroSection,
  IconCard,
  ImageCard,
  Icon,
  Input,
  LineChart,
  List,
  ListItem,
  MarkdownEditor,
  MetricCard,
  Modal,
  MultiSelect,
  Pagination,
  PieChart,
  Popover,
  ProgressBar,
  Radio,
  RangeSlider,
  ResponsiveImage,
  ScrollToTopButton,
  SectionHeader,
  Select,
  Skeleton,
  Spacer,
  Sparkline,
  Spinner,
  Stack,
  Stepper,
  StatusButton,
  StatusIndicator,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  TagInput,
  Text,
  Textarea,
  ThemeSwitcher,
  TimePicker,
  Timeline,
  ToastProvider,
  Tooltip,
  useToast,
  VideoPlayer,
  usePreviewPlatform,
} from "@/ds";

import { Bell, BookOpen, Home, Layers, Menu, Settings, Sun } from "@/ds";

const TABS = [
  { value: "layout", label: "Layout" },
  { value: "nav", label: "Navigation" },
  { value: "platform", label: "Platform" },
  { value: "data", label: "Data" },
  { value: "feedback", label: "Feedback" },
  { value: "forms", label: "Forms" },
  { value: "media", label: "Media" },
  { value: "utility", label: "Utility" },
  { value: "overlays", label: "Overlays" },
];

const MOCK_TABS = [
  { value: "first", label: "First", body: "Mock content for the first tab." },
  { value: "second", label: "Second", body: "Mock content for the second tab." },
  { value: "third", label: "Third", body: "Mock content for the third tab." },
];

const MOCK_MENU_ITEMS = [
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
  { id: "logout", label: "Log out" },
];

function FormErrorSummaryDemo() {
  return (
    <FormErrorSummary
      errors={[
        { id: "cl-email", message: "Email is required" },
        { id: "cl-plan", message: "Plan is invalid" },
      ]}
    />
  );
}

function ToastDemoButtons() {
  const { toast } = useToast();

  return (
    <div className="ui-row">
      <Button size="sm" variant="secondary" onClick={() => toast({ tone: "success", title: "Success", description: "Dummy success message." })}>
        Success
      </Button>
      <Button size="sm" variant="secondary" onClick={() => toast({ tone: "warning", title: "Warning", description: "Dummy warning message." })}>
        Warning
      </Button>
      <Button size="sm" variant="secondary" onClick={() => toast({ tone: "danger", title: "Error", description: "Dummy error message." })}>
        Error
      </Button>
      <Button size="sm" variant="secondary" onClick={() => toast({ tone: "info", title: "Info", description: "Dummy info message." })}>
        Info
      </Button>
    </div>
  );
}

export function ComponentsLibraryClient() {
  const { platform } = usePreviewPlatform();
  const isMobilePlatform = platform === "mobile";
  const colsPrimary = isMobilePlatform ? 1 : 2;
  const colsTight = isMobilePlatform ? 1 : 3;

  const [tab, setTab] = React.useState<string>(TABS[0]?.value ?? "layout");

  const [demoTab, setDemoTab] = React.useState(MOCK_TABS[0]?.value ?? "first");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [bottomNavVisible, setBottomNavVisible] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [page, setPage] = React.useState(2);
  const [acValue, setAcValue] = React.useState("");
  const [multiValues, setMultiValues] = React.useState<string[]>(["solar"]);
  const [tags, setTags] = React.useState<string[]>(["nextjs", "ds-first"]);
  const [range, setRange] = React.useState(35);
  const [files, setFiles] = React.useState<File[]>([]);
  const [tableSort, setTableSort] = React.useState<DataTableSort | null>({ columnId: "name", direction: "asc" });
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>(["r2"]);
  const [md, setMd] = React.useState("# Notes\n\nUse **tokens** and `ui-*` classes.\n");

  const tableRows = React.useMemo(
    () => [
      { id: "r1", name: "Acme Solar", status: "Active", value: 128 },
      { id: "r2", name: "Bright Roof", status: "Paused", value: 72 },
      { id: "r3", name: "Nova Panels", status: "Active", value: 210 },
    ],
    []
  );

  return (
    <ToastProvider>
      <Stack>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            {TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsPanel value="layout">
            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Grid / Card / Stack</div>
                  <Grid cols={colsTight}>
                    <Card>
                      <Text tone="muted">Card</Text>
                    </Card>
                    <Card>
                      <Text tone="muted">Card</Text>
                    </Card>
                    <Card>
                      <Text tone="muted">Card</Text>
                    </Card>
                  </Grid>
                  <Text tone="muted">This demonstrates responsive layout primitives.</Text>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Cards (Blog / Image / Icon)</div>
                  <Grid cols={isMobilePlatform ? 1 : 3}>
                    <BlogCard
                      title="How to design a platform-variant DS"
                      excerpt="One component can look app-like on mobile and web-like on desktop—without duplicating logic."
                      href="#"
                    />

                    <ImageCard
                      imageSrc="/window.svg"
                      imageAlt="Preview"
                      title="Image card"
                      description="Token-driven media card using the global DS image primitive."
                      href="#"
                      aspect="video"
                    />

                    <IconCard
                      icon={BookOpen}
                      title="Icon card"
                      description="Reusable card with an icon slot and consistent spacing."
                      href="#"
                    />
                  </Grid>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Tabs / Accordion / Breadcrumbs</div>
                  <Breadcrumbs items={[{ id: "b1", label: "Dashboard", href: "#" }, { id: "b2", label: "Settings", href: "#" }, { id: "b3", label: "Profile" }]} />
                  <Tabs value={demoTab} onValueChange={setDemoTab}>
                    <TabsList>
                      {MOCK_TABS.map((t) => (
                        <TabsTrigger key={t.value} value={t.value}>
                          {t.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {MOCK_TABS.map((t) => (
                      <TabsPanel key={t.value} value={t.value}>
                        <Text tone="muted">{t.body}</Text>
                      </TabsPanel>
                    ))}
                  </Tabs>
                  <Accordion type="single" defaultValue="one">
                    <AccordionItem value="one" title="First item">
                      <Text tone="muted">Accordion content (token-driven styling).</Text>
                    </AccordionItem>
                    <AccordionItem value="two" title="Second item">
                      <Text tone="muted">More content. No hardcoded colors.</Text>
                    </AccordionItem>
                  </Accordion>
                </Stack>
              </Card>
            </Grid>

            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Progress / Stepper / Pagination</div>
                  <ProgressBar value={range} label="Completion" />
                  <RangeSlider label={`Adjust (${range}%)`} value={range} min={0} max={100} onChange={(e) => setRange(Number(e.target.value))} />
                  <Divider />
                  <Stepper steps={[{ id: "s1", label: "Start", status: "complete" }, { id: "s2", label: "Configure", status: "current" }, { id: "s3", label: "Review", status: "upcoming" }]} />
                  <Divider />
                  <Pagination page={page} pageCount={10} onPageChange={setPage} />
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Section headers</div>
                  <SectionHeader kicker="Kicker" title="Section header" lede="Use SectionHeader to keep headings consistent." />
                  <Text tone="muted">This library uses the same DS primitives as app pages.</Text>
                </Stack>
              </Card>
            </Grid>
          </TabsPanel>

          <TabsPanel value="nav">
            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">App bar / drawer / menus</div>

                  <div style={{ maxWidth: "28rem" }}>
                    <AppBar
                      leading={
                        <Button size="sm" variant="secondary" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
                          <Icon icon={Menu} aria-hidden />
                        </Button>
                      }
                      title={<Text>Library</Text>}
                      actions={
                        <DropdownMenu
                          trigger={
                            <Button size="sm" variant="secondary" aria-label="Open actions">
                              <Icon icon={Bell} aria-hidden />
                            </Button>
                          }
                        >
                          <Stack gap="compact">
                            {MOCK_MENU_ITEMS.map((item) => (
                              <DropdownMenuButton key={item.id} onClick={() => {}}>
                                {item.label}
                              </DropdownMenuButton>
                            ))}
                          </Stack>
                        </DropdownMenu>
                      }
                    />
                  </div>

                  <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} side="left" title="Menu" description="Navigation">
                    <Stack gap="compact">
                      <a className="ui-navlink ui-focus-ring" href="#">
                        Home
                      </a>
                      <a className="ui-navlink ui-focus-ring" href="#">
                        Settings
                      </a>
                    </Stack>
                  </Drawer>

                  <Divider />

                  <ContextMenu
                    items={MOCK_MENU_ITEMS.map((i) => ({
                      id: i.id,
                      label: i.label,
                      onSelect: () => {},
                    }))}
                  >
                    <div className="ui-drop">Right-click</div>
                  </ContextMenu>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Bottom navigation</div>
                  <div style={{ maxWidth: "28rem" }}>
                    {isMobilePlatform ? (
                      <BottomNav>
                        <BottomNavItem href="#" label="Home" active icon={<Icon icon={Home} aria-hidden />} iconOnly />
                        <BottomNavItem href="#" label="Components" icon={<Icon icon={Layers} aria-hidden />} iconOnly />
                        <BottomNavItem href="#" label="Settings" icon={<Icon icon={Settings} aria-hidden />} iconOnly />
                      </BottomNav>
                    ) : (
                      <>
                        <Button size="sm" variant="secondary" onClick={() => setBottomNavVisible((v) => !v)}>
                          {bottomNavVisible ? "Hide" : "Show"}
                        </Button>
                        <Spacer size={2} />
                        {bottomNavVisible ? (
                          <BottomNav>
                            <BottomNavItem href="#" label="Home" active icon={<Icon icon={Home} aria-hidden />} iconOnly />
                            <BottomNavItem href="#" label="Components" icon={<Icon icon={Layers} aria-hidden />} iconOnly />
                            <BottomNavItem href="#" label="Settings" icon={<Icon icon={Settings} aria-hidden />} iconOnly />
                          </BottomNav>
                        ) : null}
                      </>
                    )}
                  </div>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Search / autocomplete</div>
                  <Autocomplete
                    value={acValue}
                    onValueChange={setAcValue}
                    placeholder="Search…"
                    options={[
                      { id: "o1", label: "Solar", value: "solar" },
                      { id: "o2", label: "Battery", value: "battery" },
                      { id: "o3", label: "Rebates", value: "rebates" },
                      { id: "o4", label: "Leads", value: "leads" },
                    ]}
                  />
                  <Text tone="muted">Value: {acValue || "(empty)"}</Text>
                </Stack>
              </Card>
            </Grid>
          </TabsPanel>

          <TabsPanel value="platform">
            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Hero section (Web vs Mobile)</div>
                  <Text tone="muted">
                    Same component. Mobile variant is driven by the data-platform token presets (not just responsive shrink).
                  </Text>

                  <Grid cols={isMobilePlatform ? 1 : 2}>
                    <Card>
                      <Stack gap="compact">
                        <div className="text-label">Web</div>
                        <HeroSection
                          kicker="Web"
                          title="Build fast. Stay consistent."
                          lede="This is the default web hero (centered, wider)."
                          primaryAction={{ label: "Get started", href: "#" }}
                          secondaryAction={{ label: "Learn more", href: "#" }}
                        />
                      </Stack>
                    </Card>

                    <Card>
                      <Stack gap="compact">
                        <div className="text-label">Mobile</div>
                        <div data-platform="mobile" data-density="compact">
                          <HeroSection
                            kicker="Mobile"
                            title="App-like mobile UI"
                            lede="Same DS component, but tuned for a mobile platform feel."
                            primaryAction={{ label: "Continue", href: "#" }}
                            secondaryAction={{ label: "Details", href: "#" }}
                          />
                        </div>
                      </Stack>
                    </Card>
                  </Grid>
                </Stack>
              </Card>
            </Grid>
          </TabsPanel>

          <TabsPanel value="data">
            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Metric cards</div>
                  <Grid cols={colsTight}>
                    <MetricCard label="Revenue" value="$42k" delta="+8%" hint="vs last week" />
                    <MetricCard label="Leads" value="128" delta="+12" hint="this week" />
                    <MetricCard label="Conversion" value="6.4%" delta="-0.3" hint="7d" />
                  </Grid>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Charts / sparklines</div>
                  <div className="ui-row">
                    <Sparkline data={[2, 4, 3, 7, 6, 9, 8]} />
                    <Sparkline data={[9, 8, 7, 6, 5, 4, 3]} label="Downtrend" />
                  </div>
                  <div className="ui-row">
                    <LineChart data={[2, 4, 3, 7, 6, 9]} />
                    <BarChart data={[5, 2, 8, 4, 7]} />
                  </div>
                  <div className="ui-row">
                    <PieChart slices={[{ id: "a", value: 45 }, { id: "b", value: 25 }, { id: "c", value: 20 }, { id: "d", value: 10 }]} />
                    <DonutChart slices={[{ id: "a", value: 60 }, { id: "b", value: 20 }, { id: "c", value: 20 }]} />
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Table</div>
                  <DataTable
                    caption="Mock data table"
                    rows={tableRows}
                    getRowId={(r) => r.id}
                    selectable
                    selectedRowIds={selectedRowIds}
                    onSelectedRowIdsChange={setSelectedRowIds}
                    sort={tableSort ?? undefined}
                    onSortChange={(s) => setTableSort(s)}
                    columns={[
                      { id: "name", header: "Name", sortable: true, sortValue: (r) => r.name, cell: (r) => <span className="text-body-small">{r.name}</span> },
                      {
                        id: "status",
                        header: "Status",
                        sortable: true,
                        sortValue: (r) => r.status,
                        cell: (r) => <Badge tone={r.status === "Active" ? "success" : "warning"}>{r.status}</Badge>,
                        width: "shrink",
                      },
                      {
                        id: "value",
                        header: "Value",
                        sortable: true,
                        sortValue: (r) => r.value,
                        cell: (r) => <span className="text-body-small">{r.value}</span>,
                        align: "end",
                        width: "shrink",
                      },
                    ]}
                  />
                  <Text tone="muted">Selected: {selectedRowIds.join(", ")}</Text>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Data grid (selection + bulk + paging)</div>
                  <DataGrid
                    caption="Mock grid"
                    searchable
                    pageSize={2}
                    rows={tableRows}
                    getRowId={(r) => r.id}
                    bulkActions={[
                      { id: "archive", label: "Archive", onClick: () => {} },
                      { id: "export", label: "Export", onClick: () => {} },
                    ]}
                    columns={[
                      { id: "name", header: "Name", sortable: true, sortValue: (r) => r.name, cell: (r) => r.name },
                      { id: "status", header: "Status", sortable: true, sortValue: (r) => r.status, cell: (r) => r.status, width: "shrink" },
                      { id: "value", header: "Value", sortable: true, sortValue: (r) => r.value, cell: (r) => r.value, width: "shrink", align: "end" },
                    ]}
                  />
                </Stack>
              </Card>
            </Grid>

            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">List</div>
                  <List ariaLabel="Mock list">
                    <ListItem leading={<Avatar name="Jane" size="sm" />} trailing={<Button size="sm" variant="secondary">View</Button>}>
                      <div className="text-body-small">Jane Doe</div>
                      <Text tone="muted">Lead · 2m ago</Text>
                    </ListItem>
                    <ListItem leading={<Avatar name="Sam" size="sm" />} trailing={<Button size="sm" variant="secondary">View</Button>}>
                      <div className="text-body-small">Sam Lee</div>
                      <Text tone="muted">Quote · Today</Text>
                    </ListItem>
                  </List>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Timeline + Empty state</div>
                  <Timeline items={[{ id: "t1", title: "Lead created", meta: "2m" }, { id: "t2", title: "Quote sent", meta: "18m" }, { id: "t3", title: "Payment received", meta: "Today" }]} />
                  <Divider />
                  <EmptyState
                    title="No results"
                    description="Try changing filters or creating a new item."
                    actions={
                      <div className="ui-row">
                        <Button size="sm">Create</Button>
                        <Button size="sm" variant="secondary">
                          Learn more
                        </Button>
                      </div>
                    }
                  />
                </Stack>
              </Card>
            </Grid>
          </TabsPanel>

          <TabsPanel value="feedback">
            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Alerts + toasts</div>
                  <Text tone="muted">Toasts render in a portal and auto-dismiss.</Text>
                  <ToastDemoButtons />
                  <Spacer size={2} />
                  <Alert tone="info" title="Alert">
                    Dummy alert content for component preview.
                  </Alert>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Banner / Popover / Confirm</div>
                  <Banner
                    tone="info"
                    title="Heads up"
                    actions={
                      <Button size="sm" variant="secondary" onClick={() => setConfirmOpen(true)}>
                        Confirm
                      </Button>
                    }
                  >
                    This is a banner (for persistent notices).
                  </Banner>
                  <div className="ui-row">
                    <Popover trigger={<Button size="sm" variant="secondary">Popover</Button>}>
                      <Stack gap="compact">
                        <div className="text-heading-4">Popover title</div>
                        <Text tone="muted">Popover content area (not menu semantics).</Text>
                      </Stack>
                    </Popover>
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Badges / tooltip</div>
                  <div className="ui-row">
                    <Badge tone="accent">accent</Badge>
                    <Badge tone="success">success</Badge>
                    <Badge tone="warning">warning</Badge>
                    <Badge tone="danger">danger</Badge>
                    <Badge tone="info">info</Badge>
                    <Badge tone="neutral">neutral</Badge>
                  </div>
                  <Divider />
                  <Tooltip content="This is a dummy tooltip">
                    <Button size="sm" variant="secondary">
                      Hover me
                    </Button>
                  </Tooltip>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Skeleton</div>
                  <Skeleton lines={3} />
                  <Text tone="muted">Skeleton uses tokens for shape and spacing.</Text>
                </Stack>
              </Card>
            </Grid>
          </TabsPanel>

          <TabsPanel value="forms">
            <Card>
              <Stack>
                <div className="text-heading-4">Form controls</div>
                <FormErrorSummaryDemo />
                <Grid cols={colsPrimary}>
                  <Field id="cl-name" label="Name" hint="Mock hint">
                    <Input placeholder="Jane Doe" />
                  </Field>
                  <Field id="cl-email" label="Email" error="Mock error state">
                    <Input placeholder="jane@example.com" />
                  </Field>
                </Grid>
                <Field id="cl-plan" label="Plan" hint="Dummy options">
                  <Select defaultValue="pro">
                    <option value="starter">Starter</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                  </Select>
                </Field>
                <Field id="cl-notes" label="Notes">
                  <Textarea placeholder="Write a note…" />
                </Field>
                <Fieldset legend="Preferences">
                  <Switch label="Enable setting" defaultChecked />
                  <Checkbox label="I agree" />
                </Fieldset>
                <Divider />
                <div className="ui-row ui-row--between">
                  <Radio name="cl-radio" value="a" defaultChecked label="Radio A" description="Mock option" />
                  <Radio name="cl-radio" value="b" label="Radio B" description="Mock option" />
                </div>
              </Stack>
            </Card>

            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Uploads / tags / multi-select</div>
                  <FileDropzone multiple onFilesChange={setFiles} />
                  <Text tone="muted">Files: {files.length}</Text>
                  <Divider />
                  <TagInput value={tags} onValueChange={setTags} />
                  <Divider />
                  <MultiSelect
                    label="Products"
                    values={multiValues}
                    onValuesChange={setMultiValues}
                    options={[
                      { id: "m1", label: "Solar", value: "solar" },
                      { id: "m2", label: "Battery", value: "battery" },
                      { id: "m3", label: "EV", value: "ev" },
                    ]}
                  />
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Date & time</div>
                  <Grid cols={colsPrimary}>
                    <Field id="cl-date" label="Date">
                      <DatePicker />
                    </Field>
                    <Field id="cl-time" label="Time">
                      <TimePicker />
                    </Field>
                  </Grid>
                  <Field id="cl-range" label="Date range">
                    <DateRangePicker startProps={{}} endProps={{}} />
                  </Field>
                </Stack>
              </Card>
            </Grid>
          </TabsPanel>

          <TabsPanel value="media">
            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Images + Carousel</div>
                  <ResponsiveImage src="/favicon.ico" alt="Favicon" aspect="square" />
                  <Carousel>
                    <CarouselItem>
                      <Card>
                        <Stack gap="compact">
                          <div className="text-heading-4">Slide A</div>
                          <Text tone="muted">Scroll-snap carousel track.</Text>
                        </Stack>
                      </Card>
                    </CarouselItem>
                    <CarouselItem>
                      <Card>
                        <Stack gap="compact">
                          <div className="text-heading-4">Slide B</div>
                          <Text tone="muted">Token-driven spacing & borders.</Text>
                        </Stack>
                      </Card>
                    </CarouselItem>
                    <CarouselItem>
                      <Card>
                        <Stack gap="compact">
                          <div className="text-heading-4">Slide C</div>
                          <Text tone="muted">No hardcoded colors.</Text>
                        </Stack>
                      </Card>
                    </CarouselItem>
                  </Carousel>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Video player</div>
                  <VideoPlayer src="" />
                  <Text tone="muted">Provide a real video source when used.</Text>
                </Stack>
              </Card>
            </Grid>

            <Card>
              <Stack gap="compact">
                <div className="text-heading-4">Markdown editor</div>
                <MarkdownEditor value={md} onValueChange={setMd} />
              </Stack>
            </Card>
          </TabsPanel>

          <TabsPanel value="utility">
            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Theme switcher</div>
                  <ThemeSwitcher />
                  <Text tone="muted">Theme switching is token-driven.</Text>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Error boundary</div>
                  <ErrorBoundary fallback={<Alert tone="danger" title="Fallback">This is an error boundary fallback.</Alert>}>
                    <Text tone="muted">ErrorBoundary wraps runtime errors for a subtree.</Text>
                  </ErrorBoundary>
                </Stack>
              </Card>
            </Grid>

            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Scroll to top</div>
                  <Text tone="muted">Scroll down to see the button.</Text>
                  <ScrollToTopButton />
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Statuses</div>
                  <div className="ui-row">
                    <StatusIndicator tone="active" label="Active" />
                    <StatusIndicator tone="pending" label="Pending" />
                    <StatusIndicator tone="disabled" label="Disabled" />
                  </div>
                  <div className="ui-row">
                    <StatusButton tone="active" label="Active" />
                    <StatusButton tone="pending" label="Pending" />
                    <StatusButton tone="disabled" label="Disabled" />
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Card>
              <Stack gap="compact">
                <div className="text-heading-4">Avatar group / spinner</div>
                <div className="ui-row">
                  <AvatarGroup people={[{ name: "Jane" }, { name: "Sam" }, { name: "Alex" }, { name: "Taylor" }, { name: "Morgan" }, { name: "Riley" }]} />
                  <Spinner size="sm" />
                  <Spinner />
                  <Button size="sm" variant="icon" aria-label="Icon button">
                    <Icon icon={Sun} aria-hidden />
                  </Button>
                </div>
              </Stack>
            </Card>
          </TabsPanel>

          <TabsPanel value="overlays">
            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Modal / Drawer</div>
                  <Text tone="muted">Open overlays using the buttons below.</Text>
                  <div className="ui-row">
                    <Button size="sm" onClick={() => setModalOpen(true)}>
                      Open modal
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setDrawerOpen(true)}>
                      Open drawer
                    </Button>
                  </div>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Popover</div>
                  <Popover trigger={<Button size="sm" variant="secondary">Open popover</Button>}>
                    <Stack gap="compact">
                      <div className="text-heading-4">Popover title</div>
                      <Text tone="muted">Popover content area (not menu semantics).</Text>
                    </Stack>
                  </Popover>
                  <Divider />
                  <Button size="sm" variant="secondary" onClick={() => setConfirmOpen(true)}>
                    Open confirm dialog
                  </Button>
                </Stack>
              </Card>
            </Grid>
          </TabsPanel>
        </Tabs>
      </Stack>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Mock modal" description="This is dummy content to preview the modal layout.">
        <Text tone="muted">Use this area for forms, confirmations, etc.</Text>
        <div className="ui-row">
          <Button onClick={() => setModalOpen(false)}>Close</Button>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Secondary
          </Button>
        </div>
      </Modal>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} side="bottom" title="Mock drawer" description="Bottom-sheet style drawer for mobile patterns.">
        <Text tone="muted">Dummy content inside the drawer.</Text>
        <div className="ui-row">
          <Button onClick={() => setDrawerOpen(false)}>Close</Button>
        </div>
      </Drawer>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm action"
        description="This is a confirm dialog wrapper over Modal."
        onConfirm={() => setConfirmOpen(false)}
      />
    </ToastProvider>
  );
}
