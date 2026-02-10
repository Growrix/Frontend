import Link from "next/link";

import { CommonSetDemo } from "./_components/CommonSetDemo";
import { PublicBottomNav } from "./_components/PublicBottomNav";

import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Field,
  Grid,
  Input,
  AppBar,
  DashboardShell,
  PublicHeaderBar,
  PublicShell,
  Section,
  SectionHeader,
  Select,
  Spacer,
  Stack,
  Switch,
  Text,
  Textarea,
  ThemeSwitcher,
} from "@/ds";

const MOCK_FEATURES = [
  {
    title: "Token-first UI",
    description: "Every component consumes semantic tokens—no random CSS values scattered in features.",
    tone: "accent" as const,
  },
  {
    title: "Mobile app feel",
    description: "Touch targets, spacing, and bottom-sheet patterns are built-in for small screens.",
    tone: "info" as const,
  },
  {
    title: "Accessible by default",
    description: "Focus rings, labels, and states are standard—not optional.",
    tone: "success" as const,
  },
];

const MOCK_STATS = [
  { label: "Theme", value: "SolarConnect Dark" },
  { label: "Tokens", value: "Semantic" },
  { label: "Baseline", value: "Mobile-first" },
];

const MOCK_FAQ = [
  {
    q: "Can I add more themes later?",
    a: "Yes—extend CSS variables per theme. Component code stays the same.",
  },
  {
    q: "Do pages import UI directly?",
    a: "No. Pages import from the single DS entry so the boundary stays clean.",
  },
  {
    q: "Can I use Tailwind utilities?",
    a: "This project is DS-class driven. Prefer DS primitives/components and semantic utilities.",
  },
];

export default function Home() {
  return (
    <>
      <div className="ui-only-mobile-block">
        <DashboardShell
          containerWidth="wide"
          topbar={
            <AppBar
              title={
                <div className="ui-row">
                  <strong className="text-label">SolarMatch</strong>
                  <Badge tone="accent">Home</Badge>
                </div>
              }
              actions={
                <div className="ui-row">
                  <ThemeSwitcher />
                  <Link className="ui-button ui-button--sm ui-button--secondary ui-focus-ring" href="/admin/dashboard">
                    Dashboard
                  </Link>
                </div>
              }
            />
          }
          bottomNav={<PublicBottomNav />}
        >
          <Section container="wide" size="lg">
            <Stack>
              <div>
                <div className="ui-kicker">App-like preview</div>
                <h1 className="text-heading-2">Homepage (mobile)</h1>
                <Spacer size={2} />
                <Text tone="muted">This layout uses only DS shells, components, utilities, and tokens.</Text>
              </div>

              <Divider />

              <Grid cols={2}>
                <Card>
                  <Stack gap="compact">
                    <div className="text-label">Component Library</div>
                    <Text tone="muted">Preview primitives/components in a controlled shell.</Text>
                    <Link className="ui-button ui-button--sm ui-button--secondary ui-focus-ring" href="/admin/component-library">
                      Open
                    </Link>
                  </Stack>
                </Card>

                <Card>
                  <Stack gap="compact">
                    <div className="text-label">Dashboard</div>
                    <Text tone="muted">See the app-like dashboard shell and patterns.</Text>
                    <Link className="ui-button ui-button--sm ui-button--secondary ui-focus-ring" href="/admin/dashboard">
                      Open
                    </Link>
                  </Stack>
                </Card>
              </Grid>

              <Card>
                <Stack gap="compact">
                  <div className="text-label">Quick actions</div>
                  <div className="ui-row ui-row--wrap">
                    <Link className="ui-button ui-button--md ui-button--primary ui-focus-ring" href="/admin/dashboard">
                      Go to dashboard
                    </Link>
                    <Link className="ui-button ui-button--md ui-button--secondary ui-focus-ring" href="/admin/component-library">
                      Open component library
                    </Link>
                  </div>
                </Stack>
              </Card>
            </Stack>
          </Section>
        </DashboardShell>
      </div>

      <div className="ui-only-desktop-block">
        <PublicShell
          header={
            <PublicHeaderBar>
              <div className="ui-row ui-row--between">
                <div className="ui-row">
                  <strong className="text-label">SolarMatch</strong>
                  <Badge tone="accent">Design System</Badge>
                </div>
                <div className="ui-row">
                  <ThemeSwitcher />
                  <Link className="ui-navlink ui-focus-ring" href="/admin/dashboard">
                    Dashboard
                  </Link>
                  <Link className="ui-navlink ui-focus-ring" href="/admin/component-library">
                    Component Library
                  </Link>
                </div>
              </div>
            </PublicHeaderBar>
          }
          footer={
            <div className="ui-band ui-band--surface">
              <div className="ui-container">
                <div className="ui-footer-grid">
                  <div>
                    <Stack gap="compact">
                      <div className="text-heading-4">SolarMatch</div>
                      <Text tone="muted">
                        DS-first UI foundation. Build fast, stay consistent, and ship a mobile-friendly experience.
                      </Text>
                    </Stack>
                  </div>

                  <div>
                    <div className="text-label">Product</div>
                    <Spacer size={2} />
                    <ul className="ui-footer-links">
                      <li>
                        <a className="ui-navlink ui-focus-ring" href="#features">
                          Features
                        </a>
                      </li>
                      <li>
                        <Link className="ui-navlink ui-focus-ring" href="/admin/component-library">
                          Component Library
                        </Link>
                      </li>
                      <li>
                        <a className="ui-navlink ui-focus-ring" href="#build">
                          Component demo
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-label">Resources</div>
                    <Spacer size={2} />
                    <ul className="ui-footer-links">
                      <li>
                        <a className="ui-navlink ui-focus-ring" href="#faq">
                          FAQ
                        </a>
                      </li>
                      <li>
                        <a className="ui-navlink ui-focus-ring" href="#main">
                          Back to top
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <Divider />
                <Spacer size={4} />
                <Text tone="muted">Built with tokens → themes → primitives → components → layouts → pages.</Text>
                <Spacer size={4} />
              </div>
            </div>
          }
        >
          <div id="main">
            <Section container="wide" size="lg">
              <div className="ui-hero">
                <Stack>
                  <div className="ui-text-center">
                    <div className="ui-kicker">SolarConnect Dark</div>
                    <h1 className="text-heading-1">A DS-first UI that feels like an app.</h1>
                    <div className="text-body-large ui-center">
                      Build your components once, then compose pages without styling drift.
                    </div>

                    <Spacer size={4} />
                    <div className="ui-row ui-row--center">
                      <a className="ui-button ui-button--md ui-button--primary ui-focus-ring" href="#features">
                        Explore the system
                      </a>
                      <a className="ui-button ui-button--md ui-button--secondary ui-focus-ring" href="#build">
                        See components
                      </a>
                    </div>

                    <Spacer size={4} />
                    <Grid cols={3}>
                      {MOCK_STATS.map((s) => (
                        <Card key={s.label}>
                          <div className="text-label">{s.label}</div>
                          <Spacer size={2} />
                          <div className="text-heading-3">{s.value}</div>
                        </Card>
                      ))}
                    </Grid>
                  </div>
                </Stack>
              </div>
            </Section>

            <Section id="features" tone="surface" container="wide">
              <Stack>
                <SectionHeader
                  kicker="Why DS-first"
                  title="Consistency that scales"
                  lede="Tokens keep your UI coherent across desktop and mobile."
                  align="center"
                />

                <Grid cols={3}>
                  {MOCK_FEATURES.map((f) => (
                    <Card key={f.title}>
                      <Stack gap="compact">
                        <div className="ui-row">
                          <Badge tone={f.tone}>{f.tone}</Badge>
                          <span className="text-label">{f.title}</span>
                        </div>
                        <Text tone="muted">{f.description}</Text>
                      </Stack>
                    </Card>
                  ))}
                </Grid>
              </Stack>
            </Section>

            <Section id="build" container="wide">
              <Stack>
                <SectionHeader
                  kicker="Basics"
                  title="Common components"
                  lede="These are the building blocks used everywhere."
                />

                <Grid cols={2}>
                  <Card>
                    <Stack gap="compact">
                      <div className="text-heading-4">Buttons</div>
                      <div className="ui-row">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="text">Text</Button>
                      </div>
                    </Stack>
                  </Card>

                  <Card>
                    <Stack gap="compact">
                      <div className="text-heading-4">Alerts</div>
                      <Alert tone="info" title="Mock notice">
                        This is dummy content to show DS styling.
                      </Alert>
                    </Stack>
                  </Card>
                </Grid>

                <Card>
                  <Stack>
                    <div className="text-heading-4">Form example</div>
                    <Text tone="muted">Everything uses DS controls and accessibility wiring.</Text>

                    <Grid cols={2}>
                      <Field id="name" label="Full name" hint="Dummy hint text">
                        <Input placeholder="Jane Doe" />
                      </Field>

                      <Field id="plan" label="Plan" hint="Mock options">
                        <Select defaultValue="pro">
                          <option value="starter">Starter</option>
                          <option value="pro">Pro</option>
                          <option value="enterprise">Enterprise</option>
                        </Select>
                      </Field>
                    </Grid>

                    <Field id="note" label="Notes" hint="Dummy multi-line input">
                      <Textarea placeholder="Write a short note…" />
                    </Field>

                    <div className="ui-row ui-row--between">
                      <Checkbox label="I agree to the dummy terms" />
                      <Switch label="Enable mock setting" defaultChecked />
                    </div>

                    <div className="ui-row">
                      <Button isLoading loadingText="Submitting…">
                        Submit
                      </Button>
                      <Button variant="secondary">Cancel</Button>
                    </div>
                  </Stack>
                </Card>

                <CommonSetDemo />
              </Stack>
            </Section>

            <Section id="faq" tone="surface" container="wide">
              <Stack>
                <SectionHeader
                  kicker="FAQ"
                  title="Common questions"
                  lede="Quick answers for how this DS is intended to be used."
                />

                <Grid cols={2}>
                  {MOCK_FAQ.map((item) => (
                    <Card key={item.q}>
                      <Stack gap="compact">
                        <div className="text-heading-4">{item.q}</div>
                        <Text tone="muted">{item.a}</Text>
                      </Stack>
                    </Card>
                  ))}
                </Grid>
              </Stack>
            </Section>
          </div>
        </PublicShell>
      </div>
    </>
  );
}
