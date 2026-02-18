"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { BLOG_POSTS, NEWS_ITEMS } from "./_content/heliosContent";

import {
  Badge,
  Battery,
  Bell,
  BookOpen,
  BottomNav,
  BottomNavItem,
  Button,
  Card,
  DollarSign,
  Clock,
  Cloud,
  Drawer,
  DrawerMenu,
  DrawerMenuItem,
  DrawerMenuSection,
  ExternalLink,
  Field,
  FileText,
  Gift,
  Globe,
  Grid,
  HeroSection,
  Home as HomeIcon,
  Icon,
  Input,
  Mail,
  Menu,
  MessageSquare,
  Newspaper,
  Pressable,
  PublicHeaderBar,
  PublicShell,
  Section,
  SectionHeader,
  Stack,
  Sun,
  User,
  ShieldCheck,
  Settings,
  Text,
  ThemeSwitcher,
  TrendingUp,
  Zap,
  app,
  ArrowRight,
  Phone,
  Gavel,
  LogOut,
  X,
} from "@/ds";

type MobileView = "dashboard" | "calculator" | "analysis" | "ai";

function parseMobileViewHash(hash: string): MobileView {
  const value = hash.replace(/^#/, "");
  if (value === "calculator" || value === "analysis" || value === "ai" || value === "dashboard") return value;
  return "dashboard";
}

function QuoteOptionCard({
  title,
  description,
  icon,
  recommended,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ComponentProps<typeof Icon>["icon"];
  recommended?: boolean;
  onClick?: () => void;
}) {
  return (
    <Pressable
      className={["ui-card ui-card--compact", recommended ? "ui-surface--brand-gradient" : null].filter(Boolean).join(" ")}
      onClick={onClick}
    >
      <Stack gap="compact">
        <div className="ui-row ui-row--between">
          <div className="ui-row">
            <Icon icon={icon} aria-hidden />
            <div className="text-heading-4">{title}</div>
          </div>
          {recommended ? <Badge tone="accent">Recommended</Badge> : <Icon icon={ArrowRight} aria-hidden />}
        </div>
        <Text tone={recommended ? undefined : "muted"}>{description}</Text>
      </Stack>
    </Pressable>
  );
}

function HeliosMobileDashboard({ onOpenMenu }: { onOpenMenu: () => void }) {
  const router = useRouter();
  const recentPosts = BLOG_POSTS.slice(0, 2);
  const displayNews = NEWS_ITEMS.slice(0, 3);

  return (
    <div className="ui-helios-dashboard ui-scrollbar">
      {/* Header */}
      <div className="ui-helios-header">
        <div className="ui-helios-header__left">
          <Pressable className="ui-helios-menu-btn" aria-label="Open menu" onClick={onOpenMenu}>
            <Icon icon={Menu} aria-hidden />
          </Pressable>
          <div className="ui-helios-header__text">
            <div className="ui-helios-header__title">Welcome Home</div>
            <div className="ui-helios-header__subtitle">Solar yield is high today</div>
          </div>
        </div>
        <div className="ui-helios-sun-badge" aria-hidden>
          <Icon icon={Sun} aria-hidden />
        </div>
      </div>

      {/* Hero Action Card */}
      <Pressable className="ui-helios-hero" onClick={() => {}}>
        <div className="ui-helios-hero__body">
          <div className="ui-helios-hero__title">Switch to Solar</div>
          <div className="ui-helios-hero__lede">See how much you could save with a custom Helios installation.</div>
          <div className="ui-helios-hero__cta">
            <span>Get Instant Quote</span>
            <Icon icon={ArrowRight} aria-hidden />
          </div>
        </div>
        <Icon icon={Zap} className="ui-helios-hero__mark" aria-hidden />
      </Pressable>

      {/* Rebate Sections */}
      <div className="ui-helios-list">
        <Pressable className="ui-helios-item" onClick={() => {}}>
          <div className="ui-helios-item__left">
            <div className="ui-helios-item__tile" aria-hidden>
              <Icon icon={Gift} aria-hidden />
            </div>
            <div className="ui-helios-item__text">
              <div className="ui-helios-item__title">Solar Rebate Calculator</div>
              <div className="ui-helios-item__subtitle">Find federal & state incentives</div>
            </div>
          </div>
          <Icon icon={ArrowRight} className="ui-helios-item__chev" aria-hidden />
        </Pressable>

        <Pressable className="ui-helios-item" onClick={() => {}}>
          <div className="ui-helios-item__left">
            <div className="ui-helios-item__tile" aria-hidden>
              <Icon icon={Battery} aria-hidden />
            </div>
            <div className="ui-helios-item__text">
              <div className="ui-helios-item__title">Battery Rebate Calculator</div>
              <div className="ui-helios-item__subtitle">Storage & SGIP incentives</div>
            </div>
          </div>
          <Icon icon={ArrowRight} className="ui-helios-item__chev" aria-hidden />
        </Pressable>
      </div>

      {/* Quick Stats Grid */}
      <Grid cols={2}>
        <Card className="ui-helios-stat">
          <div className="ui-helios-stat__tile" aria-hidden>
            <Icon icon={DollarSign} aria-hidden />
          </div>
          <div className="ui-helios-stat__value">$1,240</div>
          <div className="ui-helios-stat__label">Estimated Annual Savings</div>
        </Card>
        <Card className="ui-helios-stat">
          <div className="ui-helios-stat__tile" aria-hidden>
            <Icon icon={Zap} aria-hidden />
          </div>
          <div className="ui-helios-stat__value">12.4 kW</div>
          <div className="ui-helios-stat__label">Avg. System Capacity</div>
        </Card>
      </Grid>

      {/* AI Assistant Callout */}
      <Pressable className="ui-helios-ai" onClick={() => {}}>
        <div className="ui-helios-ai__left">
          <div className="ui-helios-ai__tile" aria-hidden>
            <Icon icon={Cloud} aria-hidden />
          </div>
          <div className="ui-helios-ai__text">
            <div className="ui-helios-ai__title">Ask Helios AI</div>
            <div className="ui-helios-ai__subtitle">Instant Solar Answers</div>
          </div>
        </div>
        <Icon icon={ArrowRight} className="ui-helios-ai__chev" aria-hidden />
      </Pressable>

      {/* Latest Insights */}
      <section className="ui-helios-section">
        <div className="ui-helios-section__header">
          <div className="ui-helios-section__title">
            <Icon icon={BookOpen} aria-hidden />
            <span>Latest Insights</span>
          </div>
          <Pressable className="ui-helios-section__action" onClick={() => router.push("/blog") }>
            <span>View all</span>
            <Icon icon={ArrowRight} aria-hidden />
          </Pressable>
        </div>

        <div className="ui-helios-posts">
          {recentPosts.map((post) => (
            <Pressable key={post.id} className="ui-helios-post" onClick={() => router.push(`/blog/${post.id}`)}>
              <div className="ui-helios-post__thumb" aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.imageUrl} alt="" className="ui-helios-post__img" />
              </div>
              <div className="ui-helios-post__body">
                <div className="ui-helios-post__meta">
                  <span className="ui-helios-post__category">{post.category}</span>
                  <span className="ui-helios-dot" aria-hidden />
                  <span className="ui-helios-post__time">
                    <Icon icon={Clock} aria-hidden />
                    {post.readTime}
                  </span>
                </div>
                <div className="ui-helios-post__title">{post.title}</div>
              </div>
            </Pressable>
          ))}
        </div>
      </section>

      {/* Market Pulse */}
      <section className="ui-helios-section">
        <div className="ui-helios-market__header">
          <div className="ui-helios-section__title">
            <Icon icon={Globe} aria-hidden />
            <span>Market Pulse</span>
          </div>
          <div className="ui-helios-market__kicker">Real-time Updates</div>
        </div>

        <div className="ui-helios-pulse ui-divide-y">
          {displayNews.map((news) => (
            <Pressable key={news.id} className="ui-helios-pulse__item" onClick={() => {}}>
              <div className="ui-helios-pulse__top">
                <div className="ui-helios-pulse__meta">
                  <span className="ui-helios-pulse__source">{news.source}</span>
                  <span className="ui-helios-dot" aria-hidden />
                  <span className="ui-helios-pulse__time">{news.time}</span>
                </div>
                {news.trending ? (
                  <div className="ui-helios-trending">
                    <Icon icon={Zap} aria-hidden />
                    <span>Trending</span>
                  </div>
                ) : null}
              </div>

              <div className="ui-helios-pulse__row">
                <div className="ui-helios-pulse__title">{news.title}</div>
                <Icon icon={ExternalLink} className="ui-helios-pulse__link" aria-hidden />
              </div>
            </Pressable>
          ))}
        </div>

        <Pressable className="ui-helios-archive" onClick={() => {}}>
          <Icon icon={Newspaper} aria-hidden />
          <span>Browse Industry Archive</span>
        </Pressable>
      </section>

      {/* Newsletter */}
      <section className="ui-helios-section">
        <Card className="ui-helios-newsletter ui-surface--brand-gradient">
          <div className="ui-helios-newsletter__grid">
            <div className="ui-helios-newsletter__copy">
              <div className="ui-kicker">Newsletter</div>
              <div className="ui-helios-newsletter__title">Get updates that matter</div>
              <div className="ui-helios-newsletter__lede">Rebates, installer tips, and market news. No spam.</div>
              <div className="ui-row">
                <Badge tone="accent">Weekly</Badge>
                <Badge tone="success">Actionable</Badge>
              </div>
            </div>

            <div className="ui-helios-newsletter__form">
              <Field id="mobile-newsletter-email" label="Email">
                <Input placeholder="you@example.com" inputMode="email" />
              </Field>
              <Button>Subscribe</Button>
              <div className="text-caption">Mock UI only.</div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

function HeliosMobileCalculator() {
  const [bill, setBill] = React.useState("150");
  return (
    <Section container="full" size="lg">
      <Stack>
        <SectionHeader kicker="Instant" title="Quote Calculator" lede="UI-only placeholder." />
        <Card>
          <Stack>
            <Field id="bill" label="Monthly electricity bill">
              <Input value={bill} onChange={(e) => setBill(e.target.value)} inputMode="decimal" />
            </Field>
            <Button>See analysis</Button>
          </Stack>
        </Card>
      </Stack>
    </Section>
  );
}

function HeliosMobileAnalysis() {
  return (
    <Section container="full" size="lg">
      <Stack>
        <SectionHeader kicker="Results" title="Savings Analysis" lede="UI-only placeholder." />
        <Grid cols={2}>
          <Card className="ui-card--compact">
            <Stack gap="compact">
              <div className="ui-row"><Icon icon={TrendingUp} aria-hidden /> <div className="text-label">Payback</div></div>
              <div className="text-heading-2">4.2 yrs</div>
              <Text tone="muted">Estimated</Text>
            </Stack>
          </Card>
          <Card className="ui-card--compact">
            <Stack gap="compact">
              <div className="ui-row"><Icon icon={DollarSign} aria-hidden /> <div className="text-label">Monthly</div></div>
              <div className="text-heading-2">$68</div>
              <Text tone="muted">Savings</Text>
            </Stack>
          </Card>
        </Grid>
      </Stack>
    </Section>
  );
}

function HeliosMobileAI() {
  return (
    <Section container="full" size="lg">
      <Stack>
        <SectionHeader kicker="Helios" title="AI Assistant" lede="UI-only placeholder." />
        <Card>
          <Stack>
            <Text tone="muted">Ask questions about rebates, installers, and system sizing.</Text>
            <Button>Start chat</Button>
          </Stack>
        </Card>
      </Stack>
    </Section>
  );
}

export default function Home() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [mobileView, setMobileView] = React.useState<MobileView>("dashboard");

  React.useEffect(() => {
    const applyFromHash = () => {
      setMobileView(parseMobileViewHash(window.location.hash));
    };

    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  return (
    <>
      {/* Mobile homepage = Helios app-like */}
      <div className="ui-only-mobile-block">
        <app.mobile.MobileAppShell
          bottomNav={
            <BottomNav>
              <BottomNavItem
                href="/#dashboard"
                active={mobileView === "dashboard"}
                label="Home"
                icon={<Icon icon={HomeIcon} aria-hidden />}
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/#dashboard");
                }}
              />
              <BottomNavItem
                href="/#calculator"
                active={mobileView === "calculator"}
                label="Calculator"
                icon={<Icon icon={Zap} aria-hidden />}
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/#calculator");
                }}
              />
              <BottomNavItem
                href="/#analysis"
                active={mobileView === "analysis"}
                label="Analysis"
                icon={<Icon icon={TrendingUp} aria-hidden />}
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/#analysis");
                }}
              />
              <BottomNavItem
                href="/#ai"
                active={mobileView === "ai"}
                label="Helios AI"
                icon={<Icon icon={MessageSquare} aria-hidden />}
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/#ai");
                }}
              />
            </BottomNav>
          }
        >
          <div id="main" className="ui-mobile-scroll">
            {mobileView === "dashboard" ? <HeliosMobileDashboard onOpenMenu={() => setMenuOpen(true)} /> : null}
            {mobileView === "calculator" ? <HeliosMobileCalculator /> : null}
            {mobileView === "analysis" ? <HeliosMobileAnalysis /> : null}
            {mobileView === "ai" ? <HeliosMobileAI /> : null}
          </div>
        </app.mobile.MobileAppShell>

        <Drawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          side="left"
          title={
            <div className="ui-row">
              <Icon icon={Zap} aria-hidden />
              <span>HELIOS</span>
            </div>
          }
          description=""
          headerActions={
            <Button variant="icon" aria-label="Close" onClick={() => setMenuOpen(false)}>
              <Icon icon={X} aria-hidden />
            </Button>
          }
        >
          <DrawerMenu>
            <DrawerMenuSection label="Main Navigation">
              <DrawerMenuItem
                icon={HomeIcon}
                label="Dashboard"
                active={mobileView === "dashboard"}
                onClick={() => {
                  router.push("/#dashboard");
                  setMenuOpen(false);
                }}
              />
              <DrawerMenuItem
                icon={Zap}
                label="Instant Quote"
                active={mobileView === "calculator"}
                onClick={() => {
                  router.push("/#calculator");
                  setMenuOpen(false);
                }}
              />
              <DrawerMenuItem icon={Gift} label="Solar Rebates" onClick={() => setMenuOpen(false)} />
              <DrawerMenuItem icon={Battery} label="Battery Storage" onClick={() => setMenuOpen(false)} />
              <DrawerMenuItem
                icon={BookOpen}
                label="Solar Knowledge"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/blog");
                }}
              />
              <DrawerMenuItem icon={Globe} label="Solar News" onClick={() => setMenuOpen(false)} />
              <DrawerMenuItem
                icon={MessageSquare}
                label="Helios AI Assistant"
                active={mobileView === "ai"}
                onClick={() => {
                  router.push("/#ai");
                  setMenuOpen(false);
                }}
              />
            </DrawerMenuSection>

            <DrawerMenuSection label="Account">
              <DrawerMenuItem icon={Mail} label="Contact Us" onClick={() => setMenuOpen(false)} />
              <DrawerMenuItem icon={User} label="My Profile" onClick={() => setMenuOpen(false)} />
              <DrawerMenuItem icon={ShieldCheck} label="Security" onClick={() => setMenuOpen(false)} />
              <DrawerMenuItem icon={Settings} label="Settings" onClick={() => setMenuOpen(false)} />

              <div className="ui-drawer-menu__footer">
                <DrawerMenuItem
                  className="ui-drawer-menu__danger"
                  icon={LogOut}
                  label="Sign Out"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/#dashboard");
                  }}
                />
              </div>
            </DrawerMenuSection>
          </DrawerMenu>
        </Drawer>
      </div>

      {/* Desktop homepage = SolarConnect structure */}
      <div className="ui-only-desktop-block">
        <PublicShell
          header={
            <PublicHeaderBar>
              <div className="ui-row ui-row--between">
                <div className="ui-row">
                  <Icon icon={Sun} aria-hidden />
                  <strong className="text-label">SolarConnect</strong>
                </div>
                <div className="ui-row">
                  <a className="ui-navlink ui-focus-ring" href="#resources">Resources</a>
                  <a className="ui-navlink ui-focus-ring" href="#news">News</a>
                  <a className="ui-navlink ui-focus-ring" href="#newsletter">Newsletter</a>
                  <ThemeSwitcher />
                  <Button size="sm">Sign in</Button>
                </div>
              </div>
            </PublicHeaderBar>
          }
        >
          <div id="main">
            <Section container="wide" size="lg">
              <Stack>
                <HeroSection
                  className="ui-hero--full"
                  kicker={<span className="ui-row"><Icon icon={Bell} aria-hidden /> Trusted installers</span>}
                  title="Compare solar quotes in minutes"
                  lede="Start with a quick call, competitive bidding, or a written quote—then decide when you’re ready."
                  primaryAction={{ label: "Get quotes", href: "#quote" }}
                  secondaryAction={{ label: "Browse resources", href: "#resources" }}
                />

                <Grid cols={3}>
                  <QuoteOptionCard
                    title="Consultation"
                    description="Talk to an expert and get guidance for your home."
                    icon={Phone}
                    onClick={() => {}}
                  />
                  <QuoteOptionCard
                    title="Bidding"
                    description="Invite installers to compete on price and quality."
                    icon={Gavel}
                    recommended
                    onClick={() => {}}
                  />
                  <QuoteOptionCard
                    title="Written Quote"
                    description="Receive a detailed proposal you can review anytime."
                    icon={FileText}
                    onClick={() => {}}
                  />
                </Grid>
              </Stack>
            </Section>

            <Section id="resources" tone="surface" container="wide" size="lg">
              <Stack>
                <SectionHeader
                  kicker="Resources"
                  title="Latest insights"
                  lede="Playbooks, rebates, and buyer guides (mock content)."
                />
                <Grid cols={3}>
                  {BLOG_POSTS.map((p) => (
                    <Card key={p.id}>
                      <Stack gap="compact">
                        <div className="text-heading-4">{p.title}</div>
                        <Text tone="muted">{p.excerpt}</Text>
                        <div className="ui-row">
                          <Button variant="secondary" size="sm">Read</Button>
                        </div>
                      </Stack>
                    </Card>
                  ))}
                </Grid>
              </Stack>
            </Section>

            <Section id="news" tone="surface" container="wide" size="lg">
              <Stack>
                <SectionHeader
                  kicker="In the news"
                  title="Solar market pulse"
                  lede="Headlines and analysis (mock content)."
                />

                <Grid cols={2}>
                  <Card>
                    <Stack>
                      <div className="text-heading-3">{NEWS_ITEMS[0]?.title}</div>
                      <Text tone="muted">Featured story • {NEWS_ITEMS[0]?.source} • {NEWS_ITEMS[0]?.time}</Text>
                      <div className="ui-row">
                        <Button variant="secondary">Open</Button>
                        <Button variant="text">Share</Button>
                      </div>
                    </Stack>
                  </Card>

                  <Card>
                    <Stack gap="compact">
                      {NEWS_ITEMS.slice(1).map((n) => (
                        <Pressable key={n.id} className="ui-pressable" onClick={() => {}}>
                          <div className="ui-row ui-row--between" style={{ width: "100%" }}>
                            <div>
                              <div className="text-micro ui-text-muted">{n.source} • {n.time}</div>
                              <div className="text-body">{n.title}</div>
                            </div>
                            <Icon icon={ExternalLink} aria-hidden />
                          </div>
                        </Pressable>
                      ))}
                    </Stack>
                  </Card>
                </Grid>
              </Stack>
            </Section>

            <Section id="newsletter" container="wide" size="lg">
              <Card className="ui-surface--brand-gradient">
                <Grid cols={2}>
                  <Stack>
                    <div className="ui-kicker">Newsletter</div>
                    <div className="text-heading-2">Get updates that matter</div>
                    <div className="text-body">Rebates, installer tips, and market news. No spam.</div>
                    <div className="ui-row">
                      <Badge tone="accent">Weekly</Badge>
                      <Badge tone="success">Actionable</Badge>
                    </div>
                  </Stack>

                  <Stack>
                    <Field id="email" label="Email">
                      <Input placeholder="you@example.com" inputMode="email" />
                    </Field>
                    <Button>Subscribe</Button>
                    <div className="text-caption">Mock UI only.</div>
                  </Stack>
                </Grid>
              </Card>
            </Section>
          </div>
        </PublicShell>
      </div>
    </>
  );
}
