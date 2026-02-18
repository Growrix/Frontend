"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { BLOG_POSTS } from "../_content/heliosContent";

import {
  ArrowRight,
  BookOpen,
  BottomNav,
  BottomNavItem,
  Button,
  Card,
  Field,
  Home as HomeIcon,
  Icon,
  Input,
  Menu,
  Pressable,
  Search,
  SlidersHorizontal,
  Stack,
  Text,
  ToggleButton,
  X,
  Drawer,
  DrawerMenu,
  DrawerMenuItem,
  DrawerMenuSection,
  Gift,
  Battery,
  Globe,
  MessageSquare,
  Mail,
  User,
  ShieldCheck,
  Settings,
  LogOut,
  Zap,
  app,
  Badge,
  Clock,
  ChevronLeft,
  Bookmark,
  TrendingUp,
} from "@/ds";

const CATEGORIES = ["All", "Policy", "Hardware", "ROI", "Design", "Reviews"];

export default function BlogHomePage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredPosts = React.useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = q.length === 0 || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const listPosts = filteredPosts.slice(1);

  return (
    <div className="ui-only-mobile-block">
      <app.mobile.MobileAppShell
        bottomNav={
          <BottomNav>
            <BottomNavItem
              href="/#dashboard"
              label="Home"
              icon={<Icon icon={HomeIcon} aria-hidden />}
              onClick={(e) => {
                e.preventDefault();
                router.push("/#dashboard");
              }}
            />
            <BottomNavItem
              href="/#calculator"
              label="Calculator"
              icon={<Icon icon={Zap} aria-hidden />}
              onClick={(e) => {
                e.preventDefault();
                router.push("/#calculator");
              }}
            />
            <BottomNavItem
              href="/#analysis"
              label="Analysis"
              icon={<Icon icon={TrendingUp} aria-hidden />}
              onClick={(e) => {
                e.preventDefault();
                router.push("/#analysis");
              }}
            />
            <BottomNavItem
              href="/#ai"
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
          <div className="ui-helios-blog ui-scrollbar">
            <header className="ui-helios-blog-header">
              <div className="ui-helios-blog-header__left">
                <Pressable className="ui-helios-menu-btn" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
                  <Icon icon={Menu} aria-hidden />
                </Pressable>
                <div className="ui-helios-blog-header__text">
                  <div className="ui-helios-blog-header__title">SOLAR INSIGHTS</div>
                  <div className="ui-helios-blog-header__kicker">Knowledge Hub</div>
                </div>
              </div>

              <div className="ui-helios-blog-header__right">
                <Pressable className="ui-helios-icon-btn" aria-label="Bookmarks" onClick={() => {}}>
                  <Icon icon={Bookmark} aria-hidden />
                </Pressable>
                <div className="ui-helios-blog-header__badge" aria-hidden>
                  <Icon icon={BookOpen} aria-hidden />
                </div>
              </div>
            </header>

            <div className="ui-helios-blog-body">
              <div className="ui-helios-search">
                <Icon icon={Search} className="ui-helios-search__icon" aria-hidden />
                <Input
                  className="ui-helios-search__input"
                  placeholder="Search guides, hardware, policy..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Pressable className="ui-helios-search__filter" aria-label="Filter" onClick={() => {}}>
                  <Icon icon={SlidersHorizontal} aria-hidden />
                </Pressable>
              </div>

              <div className="ui-helios-chips ui-scrollbar" role="tablist" aria-label="Categories">
                {CATEGORIES.map((cat) => (
                  <ToggleButton
                    key={cat}
                    pressed={activeCategory === cat}
                    size="sm"
                    variant="secondary"
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat.toUpperCase()}
                  </ToggleButton>
                ))}
              </div>

              {featuredPost ? (
                <section className="ui-helios-blog-section">
                  <div className="ui-helios-blog-section__label">Editor’s Choice</div>
                  <Pressable className="ui-helios-featured" onClick={() => router.push(`/blog/${featuredPost.id}`)}>
                    <div className="ui-helios-featured__media" aria-hidden>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={featuredPost.imageUrl} alt="" className="ui-helios-featured__img" />
                      <div className="ui-helios-featured__overlay" />
                      <div className="ui-helios-featured__pill">
                        <Icon icon={Clock} aria-hidden />
                        <span>{featuredPost.readTime}</span>
                      </div>

                      <div className="ui-helios-featured__content">
                        <div className="ui-helios-featured__meta">
                          <span className="ui-helios-featured__tag">{featuredPost.category}</span>
                          <span className="ui-helios-featured__date">• {featuredPost.date}</span>
                        </div>
                        <div className="ui-helios-featured__title">{featuredPost.title}</div>
                        <Text tone="muted">{featuredPost.excerpt}</Text>
                        <div className="ui-helios-featured__author">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={featuredPost.author.avatar} alt="" className="ui-helios-avatar" />
                          <span className="ui-helios-featured__author-name">{featuredPost.author.name}</span>
                        </div>
                      </div>
                    </div>
                  </Pressable>
                </section>
              ) : (
                <Card className="ui-card--compact">
                  <Stack gap="compact">
                    <div className="text-heading-4">No posts found</div>
                    <Text tone="muted">Try a different category or search.</Text>
                  </Stack>
                </Card>
              )}

              {listPosts.length ? (
                <section className="ui-helios-blog-section">
                  <div className="ui-helios-blog-section__bar ui-helios-blog-section__bar--between">
                    <div className="ui-helios-blog-section__label">Latest Stories</div>
                    <Icon icon={TrendingUp} aria-hidden />
                  </div>
                  <div className="ui-helios-feed">
                    {listPosts.map((post) => (
                      <Pressable key={post.id} className="ui-helios-feed-item" onClick={() => router.push(`/blog/${post.id}`)}>
                        <div className="ui-helios-feed-item__thumb" aria-hidden>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={post.imageUrl} alt="" className="ui-helios-feed-item__img" />
                        </div>
                        <div className="ui-helios-feed-item__body">
                          <div className="ui-helios-feed-item__meta">
                            <span className="ui-helios-feed-item__category">{post.category}</span>
                            <span className="ui-helios-dot" aria-hidden />
                            <span className="ui-helios-feed-item__time">{post.readTime}</span>
                          </div>
                          <div className="ui-helios-feed-item__title">{post.title}</div>
                          <div className="ui-helios-feed-item__row">
                            <span className="ui-helios-feed-item__byline">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={post.author.avatar} alt="" className="ui-helios-feed-item__avatar" />
                              <span className="ui-helios-feed-item__byline-name">{post.author.name}</span>
                            </span>
                            <Icon icon={ArrowRight} aria-hidden />
                          </div>
                        </div>
                      </Pressable>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="ui-helios-blog-section">
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
                      <Field id="blog-newsletter-email" label="Email">
                        <Input placeholder="you@example.com" inputMode="email" />
                      </Field>
                      <Button>Subscribe</Button>
                      <div className="text-caption">Mock UI only.</div>
                    </div>
                  </div>
                </Card>
              </section>
            </div>
          </div>
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
              icon={ChevronLeft}
              label="Back to Home"
              onClick={() => {
                setMenuOpen(false);
                router.push("/");
              }}
            />
            <DrawerMenuItem icon={Gift} label="Solar Rebates" onClick={() => setMenuOpen(false)} />
            <DrawerMenuItem icon={Battery} label="Battery Storage" onClick={() => setMenuOpen(false)} />
            <DrawerMenuItem icon={Globe} label="Solar News" onClick={() => setMenuOpen(false)} />
            <DrawerMenuItem icon={MessageSquare} label="Helios AI Assistant" onClick={() => setMenuOpen(false)} />
          </DrawerMenuSection>

          <DrawerMenuSection label="Account">
            <DrawerMenuItem icon={Mail} label="Contact Us" onClick={() => setMenuOpen(false)} />
            <DrawerMenuItem icon={User} label="My Profile" onClick={() => setMenuOpen(false)} />
            <DrawerMenuItem icon={ShieldCheck} label="Security" onClick={() => setMenuOpen(false)} />
            <DrawerMenuItem icon={Settings} label="Settings" onClick={() => setMenuOpen(false)} />

            <div className="ui-drawer-menu__footer">
              <DrawerMenuItem className="ui-drawer-menu__danger" icon={LogOut} label="Sign Out" onClick={() => setMenuOpen(false)} />
            </div>
          </DrawerMenuSection>
        </DrawerMenu>
      </Drawer>
    </div>
  );
}
