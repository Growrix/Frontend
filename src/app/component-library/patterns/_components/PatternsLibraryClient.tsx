"use client";

import * as React from "react";
import Link from "next/link";

import {
  AuditLog,
  BlogCard,
  BlogList,
  BulkActionsToolbar,
  Button,
  Card,
  CookieConsentBanner,
  Divider,
  FAQAccordion,
  FeatureGrid,
  Field,
  FilterPanel,
  Grid,
  HeroSection,
  Input,
  NewsletterSignup,
  PricingTable,
  ResourceTable,
  RolePermissionManager,
  Select,
  SettingsPanel,
  SiteFooter,
  Stack,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  TestimonialCard,
  Text,
  UserTable,
} from "@/ds";

const TABS = [
  { value: "app", label: "App patterns" },
  { value: "public", label: "Public-facing" },
  { value: "shells", label: "Shells" },
];

export function PatternsLibraryClient() {
  const [tab, setTab] = React.useState<string>(TABS[0]?.value ?? "app");
  const [perm, setPerm] = React.useState<Record<string, string[]>>({ admin: ["view", "edit"], staff: ["view"] });

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList>
        {TABS.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsPanel value="app">
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">User table</div>
              <UserTable
                rows={[
                  { id: "u1", name: "Jane Doe", role: "Admin", status: "active" },
                  { id: "u2", name: "Sam Lee", role: "Staff", status: "pending" },
                  { id: "u3", name: "Alex Kim", role: "Viewer", status: "disabled" },
                ]}
              />
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
              <div className="text-heading-4">Bulk / filter</div>
              <BulkActionsToolbar
                selectedCount={3}
                onClear={() => {}}
                actions={[
                  { id: "assign", label: "Assign", onClick: () => {} },
                  { id: "delete", label: "Delete", onClick: () => {}, tone: "secondary" },
                ]}
              />
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
      </TabsPanel>

      <TabsPanel value="public">
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Hero / features / pricing</div>
              <HeroSection kicker="Blueprint" title="DS-first UI" lede="Composable components, semantic tokens, and minimal overrides." />
              <Divider />
              <FeatureGrid
                features={[
                  { id: "f1", title: "Tokens", description: "Centralized design decisions." },
                  { id: "f2", title: "Layouts", description: "Shells for app and public." },
                  { id: "f3", title: "Components", description: "Primitives + patterns." },
                ]}
              />
              <Divider />
              <PricingTable
                tiers={[
                  { id: "p1", title: "Starter", price: "$0", bullets: ["UI tokens", "Core components"] },
                  { id: "p2", title: "Pro", price: "$49", bullets: ["Dashboard shell", "Patterns"], featured: true },
                  { id: "p3", title: "Team", price: "$199", bullets: ["Governance", "Docs"] },
                ]}
              />
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
              <BlogList
                posts={[
                  { id: "b1", title: "DS principles", excerpt: "Tokens and semantics.", href: "#" },
                  { id: "b2", title: "Dashboard shell", excerpt: "Responsive patterns.", href: "#" },
                  { id: "b3", title: "Component audit", excerpt: "Checklist coverage.", href: "#" },
                ]}
              />
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
      </TabsPanel>

      <TabsPanel value="shells">
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Dashboard shell</div>
              <Text tone="muted">The component library itself uses the DashboardShell layout.</Text>
              <div className="ui-row">
                <Link className="ui-navlink ui-focus-ring" href="/dashboard">
                  Open dashboard demo
                </Link>
              </div>
            </Stack>
          </Card>

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Public shell</div>
              <Text tone="muted">Public-facing pages (marketing, landing, content) should use PublicShell layouts.</Text>
              <div className="ui-row">
                <Link className="ui-navlink ui-focus-ring" href="/">
                  Open home
                </Link>
              </div>
            </Stack>
          </Card>
        </Grid>

        <Card>
          <Stack gap="compact">
            <div className="text-heading-4">How to scale patterns</div>
            <Text tone="muted">Add new patterns as compositions of primitives/components, then document them here as tabbed demos.</Text>
          </Stack>
        </Card>
      </TabsPanel>
    </Tabs>
  );
}
