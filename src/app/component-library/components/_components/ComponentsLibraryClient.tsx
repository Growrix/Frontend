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
  BackButton,
  BarChart,
  BlogCard,
  BottomNav,
  BottomNavItem,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Carousel,
  CarouselItem,
  Checkbox,
  CloseButton,
  CollapsibleSection,
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
  Inline,
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
  SearchInput,
  OtpInput,
  ToggleButton,
  SplitButton,
  LongPressButton,
  PasswordInput,
  PasswordStrengthMeter,
  FeatureFlag,
  PermissionGate,
  RoleGate,
  ConnectivityGate,
  NoInternetState,
  PermissionDeniedState,
  MaintenanceState,
  UpdateRequiredState,
  SessionTimeoutState,
  RateLimitState,
  SectionedList,
  ExpandableListItem,
  SwipeableListItem,
  SwipeActionButton,
  InfiniteList,
  VirtualizedList,
  ReorderableList,
  ProgressRing,
  InlineMessage,
  Snackbar,
  OfflineIndicator,
  ErrorState,
  SuccessState,
  BottomSheet,
  FullScreenModal,
  ActionSheet,
  ImageViewer,
  ExpandableText,
  HighlightedText,
  MarkdownRenderer,
  RichText,
  SegmentedControl,
  FilterChips,
  RatingInput,
  AudioPlayer,
  Thumbnail,
  MediaGrid,
  MediaPreview,
  FilePreview,
  KeyValueTable,
  MasonryLayout,
  Pressable,
  Hoverable,
  AnimatedView,
  SwipeContainer,
  DragContainer,
  ParallaxContainer,
  SharedElementTransition,
  AiPromptInput,
  AiResultCard,
  AiStreamingResponse,
  AiActionSuggestions,
  SmartAutofill,
  AssistantSheet,
  PermissionPrompt,
  LocationPicker,
  QrScannerStub,
  HapticFeedbackTrigger,
  AppUpdateBanner,
  PushNotificationPreview,
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
  const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false);
  const [fullScreenOpen, setFullScreenOpen] = React.useState(false);
  const [actionSheetOpen, setActionSheetOpen] = React.useState(false);
  const [imageViewerOpen, setImageViewerOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [page, setPage] = React.useState(2);
  const [acValue, setAcValue] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [togglePressed, setTogglePressed] = React.useState(false);
  const [infiniteCount, setInfiniteCount] = React.useState(8);
  const [infiniteLoading, setInfiniteLoading] = React.useState(false);
  const [reorderItems, setReorderItems] = React.useState(() => [
    { id: "r-1", title: "First" },
    { id: "r-2", title: "Second" },
    { id: "r-3", title: "Third" },
  ]);
  const [multiValues, setMultiValues] = React.useState<string[]>(["solar"]);
  const [tags, setTags] = React.useState<string[]>(["nextjs", "ds-first"]);
  const [range, setRange] = React.useState(35);
  const [files, setFiles] = React.useState<File[]>([]);
  const [tableSort, setTableSort] = React.useState<DataTableSort | null>({ columnId: "name", direction: "asc" });
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>(["r2"]);
  const [md, setMd] = React.useState("# Notes\n\nUse **tokens** and `ui-*` classes.\n");
  const [segment, setSegment] = React.useState("first");
  const [chipValues, setChipValues] = React.useState<string[]>(["solar"]);
  const [rating, setRating] = React.useState(3);
  const [highlightQuery, setHighlightQuery] = React.useState("Solar");
  const [password, setPassword] = React.useState("");
  const [flagEnabled, setFlagEnabled] = React.useState(true);
  const [permissionAllowed, setPermissionAllowed] = React.useState(true);
  const [roleAllowed, setRoleAllowed] = React.useState(true);
  const [online, setOnline] = React.useState(true);
  const [motionOpen, setMotionOpen] = React.useState(true);
  const [gestureLog, setGestureLog] = React.useState<string>("");
  const [aiPrompt, setAiPrompt] = React.useState("Write a concise summary of this proposal.");
  const [aiStreaming, setAiStreaming] = React.useState(true);
  const [aiText, setAiText] = React.useState("Drafting response…");
  const [aiSheetOpen, setAiSheetOpen] = React.useState(false);
  const [autofillValue, setAutofillValue] = React.useState("");
  const [loc, setLoc] = React.useState({ lat: "-33.86", lng: "151.21" });
  const [qrValue, setQrValue] = React.useState("blueprint://demo");

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
                  <div className="text-heading-4">Inline / Card sections / Collapsible</div>

                  <Inline>
                    <Button size="sm" variant="secondary">
                      Left
                    </Button>
                    <Button size="sm" variant="secondary">
                      Middle
                    </Button>
                    <Button size="sm" variant="secondary">
                      Right
                    </Button>
                  </Inline>

                  <Card>
                    <CardHeader>
                      <div className="text-heading-4">Card header</div>
                      <Text tone="muted">Header uses DS tokens + borders.</Text>
                    </CardHeader>
                    <CardContent>
                      <Text tone="muted">Content section keeps spacing consistent.</Text>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" variant="secondary">
                        Cancel
                      </Button>
                      <Button size="sm">Save</Button>
                    </CardFooter>
                  </Card>

                  <CollapsibleSection id="cs-one" title="Collapsible section" defaultOpen>
                    <Text tone="muted">This is a single-item accordion wrapper.</Text>
                  </CollapsibleSection>
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

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Buttons & actions</div>
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
                  </div>
                  <div className="ui-row">
                    <Button size="sm" variant="danger">
                      Destructive
                    </Button>
                    <Button size="sm" isLoading loadingText="Loading…">
                      Loading
                    </Button>
                    <ToggleButton size="sm" pressed={togglePressed} onPressedChange={setTogglePressed}>
                      Toggle
                    </ToggleButton>
                    <SplitButton
                      size="sm"
                      variant="secondary"
                      primaryLabel="Split"
                      onPrimaryClick={() => setSnackbarOpen(true)}
                      items={[
                        { id: "s-a", label: "Secondary action" },
                        { id: "s-b", label: "Another action" },
                      ]}
                    />
                    <LongPressButton size="sm" variant="secondary" onLongPress={() => setSnackbarOpen(true)}>
                      Long press
                    </LongPressButton>
                  </div>
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

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Typography helpers</div>
                  <Field id="cl-highlight" label="Highlight query">
                    <Input value={highlightQuery} onChange={(e) => setHighlightQuery(e.target.value)} placeholder="Type to highlight…" />
                  </Field>
                  <HighlightedText text="Solar + battery rebates can be filtered and searched." query={highlightQuery} />
                  <Divider />
                  <ExpandableText collapsedLines={3}>
                    <Text tone="muted">
                      This is a longer paragraph to demonstrate multi-line truncation with a read-more toggle. The DS controls the
                      clamp via tokens and component classes, with no feature-level CSS.
                    </Text>
                  </ExpandableText>
                </Stack>
              </Card>
            </Grid>
          </TabsPanel>

          <TabsPanel value="nav">
            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">App bar / drawer / menus</div>

                  <div className="ui-container ui-container--narrow">
                    <AppBar
                      leading={
                        <BackButton onClick={() => setDrawerOpen(true)} aria-label="Open menu" />
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

                  <div className="ui-row">
                    <Text tone="muted">Header actions:</Text>
                    <CloseButton onClick={() => setDrawerOpen(false)} />
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
                  <div className="ui-container ui-container--narrow">
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
                  <div className="text-heading-4">Segmented control</div>
                  <SegmentedControl
                    value={segment}
                    onValueChange={setSegment}
                    items={[
                      { id: "first", label: "First" },
                      { id: "second", label: "Second" },
                      { id: "third", label: "Third" },
                    ]}
                  />
                  <Text tone="muted">Value: {segment}</Text>
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

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Key-value table</div>
                  <KeyValueTable
                    items={[
                      { id: "kv-1", key: "Installer", value: "Acme Solar" },
                      { id: "kv-2", key: "Status", value: <Badge tone="success">Active</Badge> },
                      { id: "kv-3", key: "Last updated", value: "Today" },
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

            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Expandable / Sectioned / Swipe</div>
                  <SectionedList
                    ariaLabel="Sectioned list"
                    sections={[
                      { id: "today", title: "Today", items: [{ id: "s1", name: "Jane" }, { id: "s2", name: "Sam" }] },
                      { id: "yesterday", title: "Yesterday", items: [{ id: "s3", name: "Alex" }] },
                    ]}
                    renderItem={(item) => (
                      <SwipeableListItem
                        key={item.id}
                        leading={<Avatar name={item.name} size="sm" />}
                        actions={
                          <>
                            <SwipeActionButton variant="secondary">More</SwipeActionButton>
                            <SwipeActionButton variant="danger">Delete</SwipeActionButton>
                          </>
                        }
                      >
                        <div className="text-body-small">{item.name}</div>
                        <Text tone="muted">Swipe for actions</Text>
                      </SwipeableListItem>
                    )}
                  />

                  <Divider />

                  <List ariaLabel="Expandable list">
                    <ExpandableListItem leading={<Avatar name="Taylor" size="sm" />} title="Expandable item" description="Tap to show details" defaultOpen>
                      <Text tone="muted">This is expandable content inside the list item.</Text>
                    </ExpandableListItem>
                  </List>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Reorderable</div>
                  <ReorderableList
                    ariaLabel="Reorderable list"
                    items={reorderItems}
                    getItemId={(i) => i.id}
                    onReorder={setReorderItems}
                    renderItem={(item, { dragHandleProps }) => (
                      <ListItem
                        leading={
                          <Button size="sm" variant="icon" aria-label="Drag" {...dragHandleProps}>
                            <Icon icon={Layers} aria-hidden />
                          </Button>
                        }
                      >
                        <div className="text-body-small">{item.title}</div>
                        <Text tone="muted">Drag to reorder (or use arrow keys)</Text>
                      </ListItem>
                    )}
                  />
                </Stack>
              </Card>
            </Grid>

            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Virtualized / Infinite</div>
                  <VirtualizedList
                    ariaLabel="Virtualized list"
                    items={Array.from({ length: 150 }, (_, i) => ({ id: `v-${i + 1}`, label: `Row ${i + 1}` }))}
                    getItemKey={(i) => i.id}
                    renderItem={(item) => (
                      <>
                        <div className="text-body-small">{item.label}</div>
                        <Text tone="muted">Windowed rendering</Text>
                      </>
                    )}
                  />

                  <Divider />

                  <InfiniteList
                    hasMore={infiniteCount < 20}
                    isLoading={infiniteLoading}
                    onLoadMore={() => {
                      setInfiniteLoading(true);
                      setTimeout(() => {
                        setInfiniteCount((c) => Math.min(20, c + 4));
                        setInfiniteLoading(false);
                      }, 250);
                    }}
                  >
                    <List ariaLabel="Infinite list">
                      {Array.from({ length: infiniteCount }, (_, i) => (
                        <ListItem key={i} leading={<Avatar name={`Item ${i + 1}`} size="sm" />}>
                          <div className="text-body-small">Item {i + 1}</div>
                          <Text tone="muted">Auto-loads near the bottom</Text>
                        </ListItem>
                      ))}
                    </List>
                  </InfiniteList>
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

            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Inline messages / snackbar</div>
                  <InlineMessage tone="info" title="Info">
                    Informational message.
                  </InlineMessage>
                  <InlineMessage tone="success" title="Success">
                    Success message.
                  </InlineMessage>
                  <InlineMessage tone="warning" title="Warning">
                    Warning message.
                  </InlineMessage>
                  <InlineMessage tone="danger" title="Error">
                    Error message.
                  </InlineMessage>
                  <Divider />
                  <div className="ui-row">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setSnackbarOpen(true);
                        window.setTimeout(() => setSnackbarOpen(false), 2000);
                      }}
                    >
                      Show snackbar
                    </Button>
                  </div>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Progress ring</div>
                  <div className="ui-row">
                    <ProgressRing value={22} size="sm" />
                    <ProgressRing value={64} size="md" />
                    <ProgressRing value={88} size="lg" />
                  </div>
                  <Divider />
                  <OfflineIndicator online={false} />
                </Stack>
              </Card>
            </Grid>

            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">States</div>
                  <ErrorState
                    title="Something went wrong"
                    description="Dummy error state using EmptyState + DS icon."
                    actions={
                      <Button size="sm" variant="secondary">
                        Retry
                      </Button>
                    }
                  />
                  <SuccessState
                    title="All set"
                    description="Dummy success state using EmptyState + DS icon."
                    actions={<Button size="sm">Continue</Button>}
                  />
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
                  <Field id="cl-password" label="Password" hint="DS PasswordInput pattern">
                    <Stack gap="compact">
                      <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                      <PasswordStrengthMeter password={password} />
                    </Stack>
                  </Field>
                </Grid>

                <Grid cols={colsPrimary}>
                  <Field id="cl-search" label="Search" hint="DS SearchInput pattern">
                    <SearchInput
                      placeholder="Search…"
                      value={acValue}
                      onChange={(e) => setAcValue(e.target.value)}
                      onClear={() => setAcValue("")}
                    />
                  </Field>

                  <Field id="cl-otp" label="OTP / Pin" hint="DS OtpInput pattern">
                    <Stack gap="compact">
                      <OtpInput length={6} value={otp} onValueChange={setOtp} />
                      <Text tone="muted">Value: {otp || "—"}</Text>
                    </Stack>
                  </Field>
                </Grid>

                <Grid cols={colsPrimary}>
                  <Field id="cl-chips" label="Filter chips" hint="Multi-select, token-driven chips">
                    <FilterChips
                      values={chipValues}
                      onValuesChange={setChipValues}
                      options={[
                        { id: "solar", label: "Solar" },
                        { id: "battery", label: "Battery" },
                        { id: "ev", label: "EV" },
                      ]}
                    />
                  </Field>

                  <Field id="cl-rating" label="Rating" hint="Selection input">
                    <Stack gap="compact">
                      <RatingInput value={rating} onValueChange={setRating} />
                      <Text tone="muted">Value: {rating}</Text>
                    </Stack>
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

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Audio / thumbnails / file preview</div>
                  <AudioPlayer src="" />
                  <Text tone="muted">Audio uses native controls; styling stays token-driven.</Text>
                  <Divider />
                  <div className="ui-row">
                    <Thumbnail src="/window.svg" alt="Window" size="sm" />
                    <Thumbnail src="/window.svg" alt="Window" size="md" />
                    <Thumbnail src="/window.svg" alt="Window" size="lg" />
                  </div>
                  <Divider />
                  <div className="text-heading-4">Media grid / preview</div>
                  <MediaGrid>
                    <MediaPreview thumbnail={{ src: "/window.svg", alt: "Window" }} title="Window" meta="SVG" />
                    <MediaPreview thumbnail={{ src: "/window.svg", alt: "Window" }} title="Window" meta="SVG" />
                    <MediaPreview thumbnail={{ src: "/window.svg", alt: "Window" }} title="Window" meta="SVG" />
                    <MediaPreview thumbnail={{ src: "/window.svg", alt: "Window" }} title="Window" meta="SVG" />
                  </MediaGrid>
                  <Divider />
                  <div className="text-heading-4">Masonry layout</div>
                  <MasonryLayout>
                    <Card>
                      <CardContent>
                        <Text tone="muted">Card A</Text>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent>
                        <Text tone="muted">Card B (more content)</Text>
                        <Text tone="muted">Second line</Text>
                        <Text tone="muted">Third line</Text>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent>
                        <Text tone="muted">Card C</Text>
                      </CardContent>
                    </Card>
                  </MasonryLayout>
                  <Divider />
                  <FilePreview name="proposal.pdf" meta="PDF · 2.4 MB" />
                </Stack>
              </Card>
            </Grid>

            <Card>
              <Stack gap="compact">
                <div className="text-heading-4">Markdown editor</div>
                <MarkdownEditor value={md} onValueChange={setMd} />
              </Stack>
            </Card>

            <Card>
              <Stack gap="compact">
                <div className="text-heading-4">Markdown renderer / rich text</div>
                <MarkdownRenderer value={md} />
                <Divider />
                <RichText>
                  <h3 className="text-heading-4">Rich text block</h3>
                  <p className="text-body-small ui-text-muted">
                    This is a lightweight rich text wrapper for content blocks.
                  </p>
                </RichText>
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
                  <div className="text-heading-4">Gates</div>
                  <Switch checked={flagEnabled} onCheckedChange={setFlagEnabled} label="Feature enabled" />
                  <Switch checked={permissionAllowed} onCheckedChange={setPermissionAllowed} label="Permission allowed" />
                  <Switch checked={roleAllowed} onCheckedChange={setRoleAllowed} label="Role allowed" />
                  <Switch checked={online} onCheckedChange={setOnline} label="Online" />
                  <Divider />
                  <FeatureFlag
                    enabled={flagEnabled}
                    fallback={<Alert tone="warning" title="Feature disabled">Enable the flag to view this content.</Alert>}
                  >
                    <Alert tone="info" title="Feature enabled">This content is behind a feature flag.</Alert>
                  </FeatureFlag>
                  <PermissionGate
                    allowed={permissionAllowed}
                    fallback={<PermissionDeniedState title="Permission denied" description="You don’t have access to this action." />}
                  >
                    <Alert tone="success" title="Permission granted">PermissionGate allowed this content.</Alert>
                  </PermissionGate>
                  <RoleGate
                    allowed={roleAllowed}
                    fallback={<PermissionDeniedState title="Role required" description="Your role doesn’t allow this action." />}
                  >
                    <Alert tone="success" title="Role ok">RoleGate allowed this content.</Alert>
                  </RoleGate>
                  <ConnectivityGate online={online} offlineFallback={<NoInternetState title="Offline" description="Reconnect to continue." />}>
                    <Alert tone="success" title="Online">ConnectivityGate allowed this content.</Alert>
                  </ConnectivityGate>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Edge states</div>
                  <NoInternetState title="No internet" description="Check your connection and try again." />
                  <Divider />
                  <MaintenanceState title="Maintenance" description="We’ll be back shortly." />
                  <Divider />
                  <UpdateRequiredState title="Update required" description="Please update the app to continue." />
                  <Divider />
                  <SessionTimeoutState title="Session expired" description="Sign in again to continue." />
                  <Divider />
                  <RateLimitState title="Too many requests" description="Please wait a moment and retry." />
                </Stack>
              </Card>
            </Grid>

            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Motion primitives</div>
                  <Switch checked={motionOpen} onCheckedChange={setMotionOpen} label="Open animated view" />
                  <AnimatedView open={motionOpen} motion="slide-up">
                    <Alert tone="info" title="AnimatedView">Token-driven fade/slide wrapper.</Alert>
                  </AnimatedView>
                  <Divider />
                  <div className="ui-row">
                    <Pressable onClick={() => setGestureLog("Pressed")}>Pressable</Pressable>
                    <Hoverable className="ui-card">
                      <Text tone="muted">Hoverable wrapper</Text>
                    </Hoverable>
                  </div>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Gestures</div>
                  <Text tone="muted">Try swipe/drag inside the box.</Text>
                  <SwipeContainer
                    onSwipe={(dir) => setGestureLog(`Swiped ${dir}`)}
                    className="ui-card"
                  >
                    <Text>Swipe area</Text>
                  </SwipeContainer>
                  <DragContainer
                    onDragMove={({ dx, dy }) => setGestureLog(`Dragging dx=${Math.round(dx)} dy=${Math.round(dy)}`)}
                    className="ui-card"
                  >
                    <Text>Drag area</Text>
                  </DragContainer>
                  <Divider />
                  <Text tone="muted">Gesture: {gestureLog || "—"}</Text>
                  <Divider />
                  <div className="text-heading-4">Parallax / shared element</div>
                  <ParallaxContainer>
                    <SharedElementTransition id="demo">
                      <Alert tone="success" title="SharedElementTransition">Lightweight wrapper (future-ready).</Alert>
                    </SharedElementTransition>
                  </ParallaxContainer>
                </Stack>
              </Card>
            </Grid>

            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">AI / experimental</div>
                  <AiPromptInput
                    value={aiPrompt}
                    onValueChange={setAiPrompt}
                    onSubmit={() => {
                      setAiStreaming(true);
                      setAiText("Generating…");
                    }}
                  />
                  <Divider />
                  <AiActionSuggestions
                    suggestions={[
                      { id: "s1", label: "Summarize", onSelect: () => setAiPrompt("Summarize the key points.") },
                      { id: "s2", label: "Extract tasks", onSelect: () => setAiPrompt("Extract an actionable task list.") },
                      { id: "s3", label: "Rewrite", onSelect: () => setAiPrompt("Rewrite this in a friendly tone.") },
                    ]}
                  />
                  <Divider />
                  <AiResultCard
                    title="AI Result"
                    subtitle="UI wrappers only (no model integration)"
                    actions={
                      <div className="ui-row">
                        <Switch checked={aiStreaming} onCheckedChange={setAiStreaming} label="Streaming" />
                        <Button size="sm" variant="secondary" onClick={() => setAiSheetOpen(true)}>
                          Open assistant sheet
                        </Button>
                      </div>
                    }
                  >
                    <AiStreamingResponse text={aiText} isStreaming={aiStreaming} emptyPlaceholder="No output yet" />
                  </AiResultCard>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Smart autofill</div>
                  <SmartAutofill
                    value={autofillValue}
                    onValueChange={setAutofillValue}
                    suggestion="Acme Solar"
                    placeholder="Company name"
                    onApplySuggestion={(s) => setAutofillValue(s)}
                  />
                  <Text tone="muted">Value: {autofillValue || "—"}</Text>
                </Stack>
              </Card>
            </Grid>

            <Grid cols={colsPrimary}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">System & device integration</div>
                  <AppUpdateBanner onAction={() => {}} onDismiss={() => {}} />
                  <Divider />
                  <PermissionPrompt
                    title="Allow location access?"
                    description="Used to show nearby installers and quotes."
                    onAllow={() => {}}
                    onDeny={() => {}}
                  />
                  <Divider />
                  <LocationPicker value={loc} onValueChange={setLoc} onUseCurrentLocation={() => {}} />
                  <Divider />
                  <div className="ui-row">
                    <HapticFeedbackTrigger />
                  </div>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">QR / notifications</div>
                  <QrScannerStub value={qrValue} onValueChange={setQrValue} onScan={() => {}} />
                  <Divider />
                  <PushNotificationPreview
                    title="New lead assigned"
                    body="A new customer request is ready to review."
                    appName="Blueprint"
                    time="1m"
                  />
                </Stack>
              </Card>
            </Grid>

            <AssistantSheet open={aiSheetOpen} onClose={() => setAiSheetOpen(false)} title="Assistant">
              <Stack gap="compact">
                <Text tone="muted">Use this as a mobile-friendly assistant surface.</Text>
                <AiStreamingResponse text={aiText} isStreaming={aiStreaming} emptyPlaceholder="No output yet" />
              </Stack>
            </AssistantSheet>

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

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Sheets / fullscreen</div>
                  <Text tone="muted">Mobile patterns built on DS Modal variants.</Text>
                  <div className="ui-row">
                    <Button size="sm" variant="secondary" onClick={() => setBottomSheetOpen(true)}>
                      Bottom sheet
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setActionSheetOpen(true)}>
                      Action sheet
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setFullScreenOpen(true)}>
                      Fullscreen
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setImageViewerOpen(true)}>
                      Image viewer
                    </Button>
                  </div>
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

      <BottomSheet
        open={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        title="Bottom sheet"
        description="Wrapper over Modal with bottom-sheet variant."
      >
        <Text tone="muted">Dummy bottom sheet content.</Text>
        <div className="ui-row">
          <Button onClick={() => setBottomSheetOpen(false)}>Close</Button>
        </div>
      </BottomSheet>

      <ActionSheet
        open={actionSheetOpen}
        onClose={() => setActionSheetOpen(false)}
        title="Actions"
        description="ActionSheet composes BottomSheet + DS buttons."
        actions={[
          { id: "share", label: "Share" },
          { id: "duplicate", label: "Duplicate" },
          { id: "delete", label: "Delete", tone: "danger" },
        ]}
      />

      <FullScreenModal
        open={fullScreenOpen}
        onClose={() => setFullScreenOpen(false)}
        title="Fullscreen modal"
        description="Panel uses the fullscreen modifier class."
      >
        <Text tone="muted">Dummy content in a fullscreen panel.</Text>
        <div className="ui-row">
          <Button onClick={() => setFullScreenOpen(false)}>Close</Button>
        </div>
      </FullScreenModal>

      <ImageViewer
        open={imageViewerOpen}
        onClose={() => setImageViewerOpen(false)}
        src="/window.svg"
        alt="Preview image"
      />

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        tone="info"
        message="This is a snackbar preview."
        actionLabel="Undo"
        onAction={() => setSnackbarOpen(false)}
      />
    </ToastProvider>
  );
}
