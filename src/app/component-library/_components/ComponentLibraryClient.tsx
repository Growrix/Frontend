"use client";

import * as React from "react";

import {
  Alert,
  Accordion,
  AccordionItem,
  Autocomplete,
  AppBar,
  Avatar,
  AvatarGroup,
  Badge,
  Banner,
  BlogCard,
  BlogList,
  Breadcrumbs,
  BottomNav,
  BottomNavItem,
  BarChart,
  Button,
  BulkActionsToolbar,
  Card,
  DataGrid,
  Checkbox,
  CookieConsentBanner,
  DonutChart,
  ConfirmDialog,
  ContextMenu,
  Carousel,
  CarouselItem,
  ErrorBoundary,
  ResourceTable,
  FAQAccordion,
  DataTable,
  type DataTableSort,
  DatePicker,
  DateRangePicker,
  Divider,
  Drawer,
  DropdownMenu,
  DropdownMenuButton,
  EmptyState,
  FormErrorSummary,
  Fieldset,
  FeatureGrid,
  Field,
  FileDropzone,
  FilterPanel,
  Grid,
  HeroSection,
  Icon,
  Input,
  LineChart,
  List,
  ListItem,
  MarkdownEditor,
  Modal,
  MultiSelect,
  MetricCard,
  NewsletterSignup,
  Pagination,
  PieChart,
  Popover,
  PricingTable,
  ProgressBar,
  Radio,
  RangeSlider,
  ResponsiveImage,
  Select,
  Skeleton,
  ScrollToTopButton,
  SectionHeader,
  SiteFooter,
  Sparkline,
  Spacer,
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
  TestimonialCard,
  ThemeSwitcher,
  TimePicker,
  Timeline,
  ToastProvider,
  Tooltip,
  useToast,
  UserTable,
  RolePermissionManager,
  AuditLog,
  SettingsPanel,
  VideoPlayer,
} from "@/ds";

import { Bell, Home, Layers, Menu, Settings, Sun } from "@/ds";

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

const CHECKLIST_SECTIONS = [
  { id: "core", label: "Core controls" },
  { id: "layout", label: "Layout & structure" },
  { id: "nav", label: "Navigation" },
  { id: "data", label: "Data display" },
  { id: "feedback", label: "Feedback & messaging" },
  { id: "forms", label: "Forms & validation" },
  { id: "media", label: "Media & visuals" },
  { id: "patterns", label: "App patterns" },
  { id: "public", label: "Public-facing" },
  { id: "utility", label: "Utility" },
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
      <Button
        size="sm"
        variant="secondary"
        onClick={() => toast({ tone: "success", title: "Success", description: "Dummy success message." })}
      >
        Success
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => toast({ tone: "warning", title: "Warning", description: "Dummy warning message." })}
      >
        Warning
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => toast({ tone: "danger", title: "Error", description: "Dummy error message." })}
      >
        Error
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => toast({ tone: "info", title: "Info", description: "Dummy info message." })}
      >
        Info
      </Button>
    </div>
  );
}

export function ComponentLibraryClient() {
  const [tab, setTab] = React.useState(MOCK_TABS[0]?.value ?? "first");
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
  const [perm, setPerm] = React.useState<Record<string, string[]>>({ admin: ["view", "edit"], staff: ["view"] });

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
        <Card>
          <Stack gap="compact">
            <SectionHeader
              kicker="Checklist view"
              title="Component Library"
              lede="Components are grouped by the checklist categories for fast auditing."
            />
            <Grid cols={3}>
              {CHECKLIST_SECTIONS.map((s) => (
                <a key={s.id} className="ui-navlink ui-focus-ring" href={`#${s.id}`}>
                  {s.label}
                </a>
              ))}
            </Grid>
          </Stack>
        </Card>

        <div id="core" />
        <SectionHeader kicker="Category" title="Core controls" />
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Buttons / badges / divider</div>
              <div className="ui-row">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="secondary">
                  Secondary
                </Button>
                <Button size="sm" variant="ghost">
                  Ghost
                </Button>
                <Button size="sm" variant="text">
                  Text
                </Button>
                <Button size="sm" variant="icon" aria-label="Icon button">
                  <Icon icon={Sun} aria-hidden />
                </Button>
              </div>
              <div className="ui-row">
                <Badge tone="accent">accent</Badge>
                <Badge tone="success">success</Badge>
                <Badge tone="warning">warning</Badge>
                <Badge tone="danger">danger</Badge>
                <Badge tone="info">info</Badge>
              </div>
              <Divider />
              <Text tone="muted">Divider uses tokens (no hardcoded colors).</Text>
            </Stack>
          </Card>

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Avatar / spinner / tooltip</div>
              <div className="ui-row">
                <Avatar name="Jane Doe" />
                <Avatar name="Sam" size="sm" />
                <Avatar name="Alex Kim" size="lg" shape="rounded" />
                <AvatarGroup people={[{ name: "Jane" }, { name: "Sam" }, { name: "Alex" }, { name: "Taylor" }, { name: "Morgan" }, { name: "Riley" }]} />
                <Spinner size="sm" />
                <Spinner />
              </div>
              <div className="ui-row">
                <Tooltip content="This is a dummy tooltip">
                  <Button size="sm" variant="secondary">
                    Hover me
                  </Button>
                </Tooltip>
              </div>
            </Stack>
          </Card>
        </Grid>

        <div id="layout" />
        <SectionHeader kicker="Category" title="Layout & structure" />
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Grid / Card / Stack</div>
              <Grid cols={3}>
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
              <div className="text-heading-4">Tabs / Accordion / Breadcrumbs</div>
              <Breadcrumbs items={[{ id: "b1", label: "Dashboard", href: "#" }, { id: "b2", label: "Settings", href: "#" }, { id: "b3", label: "Profile" }]} />
              <Tabs value={tab} onValueChange={setTab}>
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

        <Grid cols={2}>
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
        </Grid>

        <div id="nav" />
        <SectionHeader kicker="Category" title="Navigation" />
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">AppBar / menus</div>
              <AppBar leading={<Button size="sm" variant="secondary">Menu</Button>} title={<span>Blueprint</span>} actions={<Button size="sm">Action</Button>} />
              <Divider />
              <div className="ui-row">
                <DropdownMenu
                  trigger={
                    <Button size="sm" variant="secondary">
                      <Icon icon={Menu} aria-hidden />
                      Dropdown
                    </Button>
                  }
                >
                  {MOCK_MENU_ITEMS.map((item) => (
                    <DropdownMenuButton key={item.id} onClick={() => {}}>
                      {item.label}
                    </DropdownMenuButton>
                  ))}
                </DropdownMenu>
                <ContextMenu
                  items={[
                    { id: "open", label: "Open", onSelect: () => {} },
                    { id: "rename", label: "Rename", onSelect: () => {} },
                    { id: "delete", label: "Delete", onSelect: () => {} },
                  ]}
                >
                  <div className="ui-drop">Right-click</div>
                </ContextMenu>
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

        <Card>
          <Stack gap="compact">
            <div className="text-heading-4">Bottom navigation (mobile)</div>
            <Text tone="muted">This component is fixed-position. Toggle it on/off for preview.</Text>
            <div className="ui-row">
              <Button size="sm" variant={bottomNavVisible ? "secondary" : "primary"} onClick={() => setBottomNavVisible((v) => !v)}>
                {bottomNavVisible ? "Hide" : "Show"} bottom nav
              </Button>
            </div>
            {bottomNavVisible ? (
              <>
                <Spacer size={6} />
                <BottomNav>
                  <BottomNavItem href="#" active icon={<Icon icon={Home} aria-hidden />} label="Home" />
                  <BottomNavItem href="#" icon={<Icon icon={Layers} aria-hidden />} label="Library" />
                  <BottomNavItem href="#" icon={<Icon icon={Bell} aria-hidden />} label="Alerts" />
                  <BottomNavItem href="#" icon={<Icon icon={Settings} aria-hidden />} label="Settings" />
                </BottomNav>
              </>
            ) : null}
          </Stack>
        </Card>

        <div id="data" />
        <SectionHeader kicker="Category" title="Data display" />
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Metric cards</div>
              <Grid cols={3}>
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

        <Grid cols={2}>
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
                  { id: "status", header: "Status", sortable: true, sortValue: (r) => r.status, cell: (r) => <Badge tone={r.status === "Active" ? "success" : "warning"}>{r.status}</Badge>, width: "shrink" },
                  { id: "value", header: "Value", sortable: true, sortValue: (r) => r.value, cell: (r) => <span className="text-body-small">{r.value}</span>, align: "end", width: "shrink" },
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
                bulkActions={[{ id: "archive", label: "Archive", onClick: () => {} }, { id: "export", label: "Export", onClick: () => {} }]}
                columns={[
                  { id: "name", header: "Name", sortable: true, sortValue: (r) => r.name, cell: (r) => r.name },
                  { id: "status", header: "Status", sortable: true, sortValue: (r) => r.status, cell: (r) => r.status, width: "shrink" },
                  { id: "value", header: "Value", sortable: true, sortValue: (r) => r.value, cell: (r) => r.value, width: "shrink", align: "end" },
                ]}
              />
            </Stack>
          </Card>
        </Grid>

        <Grid cols={2}>
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

        <div id="feedback" />
        <SectionHeader kicker="Category" title="Feedback & messaging" />
        <Grid cols={2}>
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

        <div id="forms" />
        <SectionHeader kicker="Category" title="Forms & validation" />
        <Card>
          <Stack>
            <div className="text-heading-4">Form controls</div>
            <FormErrorSummaryDemo />
            <Grid cols={2}>
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

        <Grid cols={2}>
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
                options={[{ id: "m1", label: "Solar", value: "solar" }, { id: "m2", label: "Battery", value: "battery" }, { id: "m3", label: "EV", value: "ev" }]}
              />
            </Stack>
          </Card>

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Date & time</div>
              <Grid cols={2}>
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

        <div id="media" />
        <SectionHeader kicker="Category" title="Media & visuals" />
        <Grid cols={2}>
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

        <div id="patterns" />
        <SectionHeader kicker="Category" title="App patterns" />
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">User table / statuses</div>
              <UserTable
                rows={[
                  { id: "u1", name: "Jane Doe", role: "Admin", status: "active" },
                  { id: "u2", name: "Sam Lee", role: "Staff", status: "pending" },
                  { id: "u3", name: "Alex Kim", role: "Viewer", status: "disabled" },
                ]}
              />
              <Divider />
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

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Role manager / audit / settings</div>
              <RolePermissionManager
                roles={[{ id: "admin", name: "Admin" }, { id: "staff", name: "Staff" }]}
                permissions={[{ id: "view", label: "View" }, { id: "edit", label: "Edit" }, { id: "delete", label: "Delete" }]}
                assignments={perm}
                onAssignmentsChange={setPerm}
              />
              <AuditLog items={[{ id: "a1", title: "User updated role", meta: "Today" }, { id: "a2", title: "Export ran", meta: "Yesterday" }]} />
              <SettingsPanel />
            </Stack>
          </Card>
        </Grid>

        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Bulk / filter / resources</div>
              <BulkActionsToolbar selectedCount={3} onClear={() => {}} actions={[{ id: "assign", label: "Assign", onClick: () => {} }, { id: "delete", label: "Delete", onClick: () => {}, tone: "secondary" }]} />
              <Divider />
              <FilterPanel actions={<Button size="sm" variant="secondary">Reset</Button>}>
                <Grid cols={2}>
                  <Field id="fp-q" label="Query">
                    <Input placeholder="Search…" />
                  </Field>
                  <Field id="fp-status" label="Status">
                    <Select defaultValue="all">
                      <option value="all">All</option>
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                    </Select>
                  </Field>
                </Grid>
              </FilterPanel>
            </Stack>
          </Card>

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Resource management</div>
              <ResourceTable
                rows={[
                  { id: "res1", name: "Lead Pipeline", updatedAt: "Today" },
                  { id: "res2", name: "Quote Templates", updatedAt: "Yesterday" },
                  { id: "res3", name: "Installer Roster", updatedAt: "Last week" },
                ]}
                onCreate={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </Stack>
          </Card>
        </Grid>

        <Card>
          <Stack gap="compact">
            <div className="text-heading-4">Markdown editor</div>
            <MarkdownEditor value={md} onValueChange={setMd} />
          </Stack>
        </Card>

        <div id="public" />
        <SectionHeader kicker="Category" title="Public-facing" />
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Hero / features / pricing</div>
              <HeroSection kicker="Blueprint" title="DS-first UI" lede="Composable components, semantic tokens, and minimal overrides." />
              <Divider />
              <FeatureGrid features={[{ id: "f1", title: "Tokens", description: "Centralized design decisions." }, { id: "f2", title: "Layouts", description: "Shells for app and public." }, { id: "f3", title: "Components", description: "Primitives + patterns." }]} />
              <Divider />
              <PricingTable tiers={[{ id: "p1", title: "Starter", price: "$0", bullets: ["UI tokens", "Core components"] }, { id: "p2", title: "Pro", price: "$49", bullets: ["Dashboard shell", "Patterns"], featured: true }, { id: "p3", title: "Team", price: "$199", bullets: ["Governance", "Docs"] }]} />
            </Stack>
          </Card>

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">FAQ / blog / footer</div>
              <FAQAccordion items={[{ id: "q1", q: "What is this?", a: "A token-driven DS." }, { id: "q2", q: "Does it scale?", a: "Yes, with governance." }]} />
              <Divider />
              <TestimonialCard quote="The DS-first approach scales." name="Ops Team" meta="Internal" />
              <BlogCard title="Design system update" excerpt="How we ship components without drift." href="#" />
              <Divider />
              <BlogList posts={[{ id: "b1", title: "DS principles", excerpt: "Tokens and semantics.", href: "#" }, { id: "b2", title: "Dashboard shell", excerpt: "Responsive patterns.", href: "#" }, { id: "b3", title: "Component audit", excerpt: "Checklist coverage.", href: "#" }]} />
              <Divider />
              <NewsletterSignup />
              <SiteFooter
                columns={[
                  { id: "c1", title: "Product", links: [{ label: "Docs", href: "#" }, { label: "Pricing", href: "#" }] },
                  { id: "c2", title: "Company", links: [{ label: "About", href: "#" }, { label: "Careers", href: "#" }] },
                  { id: "c3", title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }] },
                ]}
              />
              <CookieConsentBanner />
            </Stack>
          </Card>
        </Grid>

        <div id="utility" />
        <SectionHeader kicker="Category" title="Utility" />
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Skeleton / scroll to top</div>
              <Skeleton lines={3} />
              <Text tone="muted">Scroll down to see the button.</Text>
              <ScrollToTopButton />
            </Stack>
          </Card>

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Error boundary / theme switcher</div>
              <ThemeSwitcher />
              <Divider />
              <ErrorBoundary fallback={<Alert tone="danger" title="Fallback">This is an error boundary fallback.</Alert>}>
                <Text tone="muted">ErrorBoundary wraps runtime errors for a subtree.</Text>
              </ErrorBoundary>
            </Stack>
          </Card>
        </Grid>
      </Stack>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Mock modal"
        description="This is dummy content to preview the modal layout."
      >
        <Text tone="muted">Use this area for forms, confirmations, etc.</Text>
        <div className="ui-row">
          <Button onClick={() => setModalOpen(false)}>Close</Button>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Secondary
          </Button>
        </div>
      </Modal>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        side="bottom"
        title="Mock drawer"
        description="Bottom-sheet style drawer for mobile patterns."
      >
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
