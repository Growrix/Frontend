"use client";

import * as React from "react";

import { useParams, useRouter } from "next/navigation";

import { BLOG_POSTS } from "../../_content/heliosContent";

import {
  ArrowRight,
  BottomNav,
  BottomNavItem,
  Button,
  Card,
  ChevronLeft,
  Clock,
  Bookmark,
  BookOpen,
  Check,
  Heart,
  Icon,
  Link,
  MessageCircle,
  Pressable,
  Share2,
  Send,
  Stack,
  Text,
  Textarea,
  UserCircle,
  UserPlus,
  X,
  Home as HomeIcon,
  TrendingUp,
  Zap,
  app,
} from "@/ds";

type Comment = {
  id: string;
  user: string;
  text: string;
  date: string;
  likes: number;
  isLiked: boolean;
};

export default function BlogPostPage() {
  const router = useRouter();
  const routeParams = useParams<{ id?: string | string[] }>();
  const id = React.useMemo(() => {
    const value = routeParams?.id;
    if (Array.isArray(value)) return value[0];
    return value;
  }, [routeParams?.id]);

  const post = React.useMemo(() => BLOG_POSTS.find((p) => p.id === id), [id]);

  const relatedPosts = React.useMemo(() => {
    if (!post) return [];
    return BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);
  }, [post]);

  const [showShareSheet, setShowShareSheet] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const [comments, setComments] = React.useState<Comment[]>([
    {
      id: "c1",
      user: "SolarSam",
      text: "This guide saved me thousands on my battery setup! Highly recommend Enphase for efficiency.",
      date: "2d ago",
      likes: 12,
      isLiked: false,
    },
    {
      id: "c2",
      user: "EcoWarrior_99",
      text: "Does the tax credit cover the roof repairs if done alongside solar?",
      date: "5h ago",
      likes: 3,
      isLiked: true,
    },
  ]);

  const [newCommentText, setNewCommentText] = React.useState("");

  const shareUrl = typeof window === "undefined" ? "" : window.location.href;

  const handleShare = React.useCallback(async () => {
    if (!post) return;
    if (typeof navigator === "undefined") return;

    // Use native share when available; fallback to prototype share sheet.
    const maybeShare = (navigator as unknown as { share?: (data: { title?: string; text?: string; url?: string }) => Promise<void> }).share;
    if (typeof maybeShare === "function") {
      try {
        await maybeShare({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
        return;
      } catch {
        // Fall through to share sheet
      }
    }

    setShowShareSheet(true);
  }, [post, shareUrl]);

  const copyToClipboard = React.useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // UI-only: ignore
    }
  }, [shareUrl]);

  const handleAddComment = React.useCallback(() => {
    const text = newCommentText.trim();
    if (!text) return;

    const next: Comment = {
      id: String(Date.now()),
      user: "Guest Reader",
      text,
      date: "Just now",
      likes: 0,
      isLiked: false,
    };

    setComments((prev) => [next, ...prev]);
    setNewCommentText("");
  }, [newCommentText]);

  const toggleLike = React.useCallback((id: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const isLiked = !c.isLiked;
        return {
          ...c,
          isLiked,
          likes: isLiked ? c.likes + 1 : Math.max(0, c.likes - 1),
        };
      })
    );
  }, []);

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
              icon={<Icon icon={MessageCircle} aria-hidden />}
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
            <header className="ui-helios-post-header">
              <Button variant="icon" aria-label="Back" onClick={() => router.push("/blog")}> 
                <Icon icon={ChevronLeft} aria-hidden />
              </Button>
              <div className="ui-helios-post-header__text">
                <div className="ui-helios-post-header__title">{post?.category ?? "Solar Insights"}</div>
                <div className="ui-helios-post-header__kicker">
                  <Icon icon={BookOpen} aria-hidden />
                  <span>Solar Insights</span>
                </div>
              </div>

              <div className="ui-helios-post-header__actions">
                <Button variant="icon" aria-label="Share" onClick={handleShare} disabled={!post}>
                  <Icon icon={Share2} aria-hidden />
                </Button>
                <Button variant="icon" aria-label="Bookmark" onClick={() => {}} disabled={!post}>
                  <Icon icon={Bookmark} aria-hidden />
                </Button>
              </div>
            </header>

            {post ? (
              <div className="ui-helios-post-body">
                <section className="ui-helios-post-hero" aria-label="Post hero">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.imageUrl} alt={post.title} className="ui-helios-post-hero__img" />
                  <div className="ui-helios-post-hero__overlay" aria-hidden />
                  <div className="ui-helios-post-hero__content">
                    <span className="ui-helios-post-hero__pill">{post.category}</span>
                    <h1 className="ui-helios-post-hero__title">{post.title}</h1>
                  </div>
                </section>

                <section className="ui-helios-post-meta" aria-label="Author and metadata">
                  <div className="ui-helios-post-meta__row">
                    <div className="ui-helios-post-author">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.author.avatar} alt={post.author.name} className="ui-helios-post-author__avatar" />
                      <div className="ui-helios-post-author__text">
                        <div className="ui-helios-post-author__name">{post.author.name}</div>
                        <div className="ui-helios-post-author__role">{post.author.role}</div>
                      </div>
                    </div>

                    <Pressable className="ui-helios-icon-btn" aria-label="Follow author" onClick={() => {}}>
                      <Icon icon={UserPlus} aria-hidden />
                    </Pressable>
                  </div>

                  <div className="ui-helios-post-meta__kicker">
                    <span className="ui-helios-post-meta__item">
                      <Icon icon={Clock} aria-hidden />
                      <span>{post.readTime}</span>
                    </span>
                    <span className="ui-helios-dot" aria-hidden />
                    <span className="ui-helios-post-meta__item">Published {post.date}</span>
                  </div>
                </section>

                <article className="ui-helios-post-article" aria-label="Post content">
                  {post.content
                    .split("\n\n")
                    .filter(Boolean)
                    .map((paragraph, i) => {
                      const isHeading = paragraph.trimStart().startsWith("###");
                      return (
                        <p key={i} className={isHeading ? "ui-helios-post-h" : "ui-helios-post-p"}>
                          {paragraph.replace(/^###\s*/, "").trim()}
                        </p>
                      );
                    })}

                  <Card className="ui-helios-takeaway">
                    <div className="ui-helios-takeaway__title">
                      <Icon icon={Zap} aria-hidden />
                      <span>Key Takeaway</span>
                    </div>
                    <Text tone="muted">
                      “Maximizing your ROI in 2024 requires a combination of high-efficiency hardware and timely application for federal tax credits.
                      Don’t wait until 2025 as policy shifts could impact incentive availability.”
                    </Text>
                  </Card>
                </article>

                <section className="ui-helios-blog-section" aria-label="Related posts">
                  <div className="ui-helios-blog-section__bar">
                    <div className="ui-helios-blog-section__label">You might also like</div>
                  </div>
                  <div className="ui-helios-post-related">
                    {relatedPosts.map((p) => (
                      <Pressable key={p.id} className="ui-helios-feed-item" onClick={() => router.push(`/blog/${p.id}`)}>
                        <div className="ui-helios-feed-item__thumb" aria-hidden>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.imageUrl} alt={p.title} className="ui-helios-feed-item__img" />
                        </div>
                        <div className="ui-helios-feed-item__body">
                          <div className="ui-helios-feed-item__title">{p.title}</div>
                          <div className="ui-helios-feed-item__meta">
                            <span className="ui-helios-feed-item__time">{p.date}</span>
                            <span className="ui-helios-dot" aria-hidden />
                            <span className="ui-helios-feed-item__time">{p.readTime}</span>
                          </div>
                          <div className="ui-helios-feed-item__row">
                            <span className="ui-helios-feed-item__byline">{p.author.name}</span>
                            <Icon icon={ArrowRight} aria-hidden />
                          </div>
                        </div>
                      </Pressable>
                    ))}
                  </div>
                </section>

                <section className="ui-helios-comments" aria-label="Community insights">
                  <div className="ui-helios-comments__bar">
                    <div className="ui-helios-comments__label">
                      <Icon icon={MessageCircle} aria-hidden />
                      <span>Community Insights</span>
                    </div>
                    <span className="ui-helios-comments__count" aria-label={`${comments.length} comments`}>
                      {comments.length}
                    </span>
                  </div>

                  <div className="ui-helios-comments__composer">
                    <div className="ui-helios-comments__input">
                      <Textarea
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        placeholder="Share your thoughts..."
                        rows={4}
                      />
                      <Pressable
                        className="ui-helios-comments__send"
                        aria-label="Send comment"
                        data-disabled={newCommentText.trim().length === 0 ? "true" : "false"}
                        onClick={handleAddComment}
                      >
                        <Icon icon={Send} aria-hidden />
                      </Pressable>
                    </div>
                  </div>

                  <div className="ui-helios-comments__list">
                    {comments.map((comment) => (
                      <div key={comment.id} className="ui-helios-comment">
                        <div className="ui-helios-comment__avatar" aria-hidden>
                          <Icon icon={UserCircle} aria-hidden />
                        </div>
                        <div className="ui-helios-comment__body">
                          <div className="ui-helios-comment__top">
                            <span className="ui-helios-comment__user">{comment.user}</span>
                            <span className="ui-helios-comment__date">{comment.date}</span>
                          </div>
                          <div className="ui-helios-comment__text">{comment.text}</div>
                          <div className="ui-helios-comment__actions">
                            <Pressable
                              className="ui-helios-comment__like"
                              data-liked={comment.isLiked ? "true" : "false"}
                              aria-label={comment.isLiked ? "Unlike" : "Like"}
                              onClick={() => toggleLike(comment.id)}
                            >
                              <span className="ui-helios-comment__like-pill">
                                <Icon icon={Heart} aria-hidden />
                                <span>{comment.likes}</span>
                              </span>
                            </Pressable>
                            <Pressable className="ui-helios-comment__reply" onClick={() => {}}>
                              REPLY
                            </Pressable>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {showShareSheet ? (
                  <div className="ui-helios-share" role="dialog" aria-modal="true" aria-label="Share Insight">
                    <Pressable className="ui-helios-share__backdrop" aria-label="Close" onClick={() => setShowShareSheet(false)} />
                    <div className="ui-helios-share__sheet">
                      <div className="ui-helios-share__top">
                        <div className="ui-helios-share__title">Share Insight</div>
                        <Pressable className="ui-helios-icon-btn" aria-label="Close" onClick={() => setShowShareSheet(false)}>
                          <Icon icon={X} aria-hidden />
                        </Pressable>
                      </div>

                      <div className="ui-helios-share__grid">
                        <Pressable className="ui-helios-share__item" onClick={() => {}}>
                          <div className="ui-helios-share__icon">
                            <Icon icon={Share2} aria-hidden />
                          </div>
                          <div className="ui-helios-share__label">Share</div>
                        </Pressable>
                        <Pressable className="ui-helios-share__item" onClick={copyToClipboard}>
                          <div className="ui-helios-share__icon" data-copied={copied ? "true" : "false"}>
                            <Icon icon={copied ? Check : Link} aria-hidden />
                          </div>
                          <div className="ui-helios-share__label">{copied ? "Copied!" : "Copy Link"}</div>
                        </Pressable>
                      </div>

                      <div className="ui-helios-share__url" aria-hidden>
                        <span className="ui-helios-share__url-text">{shareUrl}</span>
                        <Icon icon={Link} aria-hidden />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="ui-helios-blog-body">
                <Card className="ui-card--compact">
                  <Stack gap="compact">
                    <div className="text-heading-4">Post not found</div>
                    <Text tone="muted">This post may have been moved or removed.</Text>
                    <Button onClick={() => router.push("/blog")}>Back to blog</Button>
                  </Stack>
                </Card>
              </div>
            )}
          </div>
        </div>
      </app.mobile.MobileAppShell>
    </div>
  );
}
