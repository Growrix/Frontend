"use client";

import * as React from "react";

import {
  Alert,
  Badge,
  BottomNav,
  BottomNavItem,
  Button,
  Card,
  Checkbox,
  Divider,
  Drawer,
  DropdownMenu,
  DropdownMenuButton,
  Field,
  Grid,
  Icon,
  Input,
  Modal,
  Select,
  Spacer,
  Stack,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  Text,
  Textarea,
  ToastProvider,
  Tooltip,
  useToast,
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

  return (
    <ToastProvider>
      <Stack>
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Navigation</div>
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

              <Divider />

              <div className="ui-row">
                <DropdownMenu
                  trigger={
                    <Button size="sm" variant="secondary">
                      <Icon icon={Menu} aria-hidden />
                      Menu
                    </Button>
                  }
                >
                  {MOCK_MENU_ITEMS.map((item) => (
                    <DropdownMenuButton key={item.id} onClick={() => {}}>
                      {item.label}
                    </DropdownMenuButton>
                  ))}
                </DropdownMenu>

                <Tooltip content="This is a dummy tooltip">
                  <Button size="sm" variant="ghost">
                    <Icon icon={Sun} aria-hidden />
                    Tooltip
                  </Button>
                </Tooltip>
              </div>
            </Stack>
          </Card>

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Feedback & overlays</div>

              <div className="ui-row">
                <Button size="sm" onClick={() => setModalOpen(true)}>
                  Open modal
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setDrawerOpen(true)}>
                  Open drawer
                </Button>
              </div>

              <Text tone="muted">Toasts render in a portal and auto-dismiss.</Text>
              <ToastDemoButtons />

              <Spacer size={2} />
              <Alert tone="info" title="Alert">
                Dummy alert content for component preview.
              </Alert>
            </Stack>
          </Card>
        </Grid>

        <Card>
          <Stack>
            <div className="text-heading-4">Form controls</div>
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

            <div className="ui-row ui-row--between">
              <Checkbox label="I agree" />
              <Switch label="Enable setting" defaultChecked />
            </div>

            <div className="ui-row">
              <Badge tone="accent">accent</Badge>
              <Badge tone="success">success</Badge>
              <Badge tone="warning">warning</Badge>
              <Badge tone="danger">danger</Badge>
              <Badge tone="info">info</Badge>
            </div>
          </Stack>
        </Card>

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
                <div style={{ height: "var(--ds-size-bottom-nav-h)" }} />
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
    </ToastProvider>
  );
}
