import Link from "next/link";

import { PublicBottomNav } from "./_components/PublicBottomNav";
import { LeadGenHomeClient, LeadGenHomeMobileClient } from "./_components/LeadGenHomeClient";

import {
  Alert,
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Checkbox,
  Field,
  Input,
  AppBar,
  PublicHeaderBar,
  PublicShell,
  Section,
  SectionHeader,
  Select,
  Spacer,
  Stack,
  Text,
  Switch,
  Textarea,
  ThemeSwitcher,
  app,
} from "@/ds";

const MOCK_FEATURES = [
  {
    title: "Token-first UI",
    description: "Every component consumes semantic tokens—no random CSS values scattered in features.",
    tone: "accent" as const,
  },
  {
    title: "Responsive layouts",
    description: "Compose sections and grids that adapt cleanly from mobile to desktop.",
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
        <app.mobile.MobileAppShell
          topbar={
            <AppBar
              title={
                <div className="ui-row">
                  <strong className="text-label">SolarMatch</strong>
                  <Badge tone="accent">Quote</Badge>
                </div>
              }
              actions={
                <div className="ui-row">
                  <ThemeSwitcher />
                </div>
              }
            />
          }
          bottomNav={<PublicBottomNav />}
        >
          <LeadGenHomeMobileClient />
        </app.mobile.MobileAppShell>
      </div>

      <div className="ui-only-desktop-block">
        <PublicShell
          header={
            <PublicHeaderBar>
              <div className="ui-row ui-row--between">
                <div className="ui-row">
                  <strong className="text-label">SolarMatch</strong>
                  <Badge tone="accent">Solar Leads</Badge>
                </div>
                <div className="ui-row">
                  <ThemeSwitcher />
                  <a className="ui-navlink ui-focus-ring" href="#quote">
                    Instant quote
                  </a>
                  <a className="ui-navlink ui-focus-ring" href="#rebates">
                    Rebates
                  </a>
                  <a className="ui-navlink ui-focus-ring" href="#blog">
                    Blog
                  </a>
                  <a className="ui-navlink ui-focus-ring" href="#newsletter">
                    Newsletter
                  </a>
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
                      <Text tone="muted">Lead-gen homepage built with DS primitives + components.</Text>
                    </Stack>
                  </div>

                  <div>
                    <div className="text-label">Product</div>
                    <Spacer size={2} />
                    <ul className="ui-footer-links">
                      <li>
                        <a className="ui-navlink ui-focus-ring" href="#quote">Instant quote</a>
                      </li>
                      <li>
                        <a className="ui-navlink ui-focus-ring" href="#rebates">Rebates</a>
                      </li>
                      <li>
                        <a className="ui-navlink ui-focus-ring" href="#blog">Blog</a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-label">Resources</div>
                    <Spacer size={2} />
                    <ul className="ui-footer-links">
                      <li>
                        <a className="ui-navlink ui-focus-ring" href="#newsletter">Newsletter</a>
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
            <LeadGenHomeClient />
          </div>
        </PublicShell>
      </div>
    </>
  );
}
