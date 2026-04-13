import * as React from "react";
import {
  PublicShell,
  HeroSection,
  FeatureGrid,
  TestimonialCard,
  FAQAccordion,
  SiteFooter,
  Section,
  SectionHeader,
  Stack,
  Text,
  PublicHeaderBar,
  Button
} from "@/ds";

const SOLAR_CONTENT = {
  header: {
    logo: "SolarMatch",
    links: [
      { id: "h1", label: "Residential", href: "#residential" },
      { id: "h2", label: "Commercial", href: "#commercial" },
      { id: "h3", label: "Process", href: "#process" },
      { id: "h4", label: "Contact", href: "#contact" },
    ],
    cta: "Get Started",
  },
  hero: {
    kicker: "Powering the Future",
    title: "Clean Energy for Your Home and Business",
    lede: "Join the thousands of homeowners who have switched to solar and started saving on their energy bills while helping the planet.",
    primaryAction: { label: "Get a Free Quote", href: "#quote" },
    secondaryAction: { label: "Learn More", href: "#residential" },
  },
  features: [
    {
      id: "f1",
      title: "Expert Installation",
      description: "Our certified technicians ensure your solar panels are installed to the highest standards for maximum efficiency.",
    },
    {
      id: "f2",
      title: "Energy Independence",
      description: "Reduce your reliance on the grid and protect yourself from rising electricity costs with your own clean power.",
    },
    {
      id: "f3",
      title: "Sustainable Impact",
      description: "Do your part for the environment by reducing your carbon footprint with renewable solar energy.",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote: "Switching to SolarMatch was the best decision we've made for our home. Our energy bills have dropped significantly!",
      name: "Jane Doe",
      meta: "Homeowner",
    },
    {
      id: "t2",
      quote: "The installation process was seamless and the team was professional throughout. Highly recommended.",
      name: "John Smith",
      meta: "Business Owner",
    },
  ],
  faqs: [
    { id: "q1", q: "How much can I save with solar?", a: "Savings vary based on your location and energy usage, but most customers see a significant reduction in their monthly bills." },
    { id: "q2", q: "What is the maintenance like?", a: "Solar panels require very little maintenance. Occasional cleaning and professional inspections are usually enough." },
    { id: "q3", q: "How long do panels last?", a: "Most modern solar panels are designed to last 25 to 30 years or more." },
  ],
  footer: [
    {
      id: "c1",
      title: "Solutions",
      links: [
        { label: "Residential Solar", href: "#" },
        { label: "Commercial Solar", href: "#" },
        { label: "Battery Storage", href: "#" },
      ],
    },
    {
      id: "c2",
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Our Team", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      id: "c3",
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Contact Us", href: "#" },
        { label: "Privacy Policy", href: "#" },
      ],
    },
  ],
  ctaSection: {
    title: "Ready to start your solar journey?",
    lede: "Get in touch with us for a personalized quote and energy assessment.",
    buttonLabel: "Schedule Consultation",
  },
};

export default function SolarPage() {
  return (
    <PublicShell
      header={
        <PublicHeaderBar>
          <div className="ui-row ui-row--between">
            <div className="text-heading-3">{SOLAR_CONTENT.header.logo}</div>
            <nav className="ui-row ui-only-desktop">
              {SOLAR_CONTENT.header.links.map((link) => (
                <a key={link.id} href={link.href} className="ui-navlink">
                  {link.label}
                </a>
              ))}
            </nav>
            <Button variant="primary" size="sm">{SOLAR_CONTENT.header.cta}</Button>
          </div>
        </PublicHeaderBar>
      }
      footer={<SiteFooter columns={SOLAR_CONTENT.footer} />}
    >
      <Section size="lg">
        <HeroSection
          kicker={SOLAR_CONTENT.hero.kicker}
          title={SOLAR_CONTENT.hero.title}
          lede={SOLAR_CONTENT.hero.lede}
          primaryAction={SOLAR_CONTENT.hero.primaryAction}
          secondaryAction={SOLAR_CONTENT.hero.secondaryAction}
        />
      </Section>

      <Section id="residential" container="wide" size="lg">
        <Stack gap="spacious">
          <SectionHeader
            title="Why Choose Solar?"
            lede="Discover the benefits of making the switch to renewable energy today."
            align="center"
          />
          <FeatureGrid features={SOLAR_CONTENT.features} />
        </Stack>
      </Section>

      <Section container="default" size="lg">
        <Stack gap="spacious">
          <SectionHeader title="What Our Customers Say" align="center" />
          <div className="ui-grid ui-grid--2 ui-grid--gap-compact">
            {SOLAR_CONTENT.testimonials.map((t) => (
              <TestimonialCard key={t.id} quote={t.quote} name={t.name} meta={t.meta} />
            ))}
          </div>
        </Stack>
      </Section>

      <Section container="narrow" size="lg">
        <Stack gap="spacious">
          <SectionHeader title="Frequently Asked Questions" align="center" />
          <FAQAccordion items={SOLAR_CONTENT.faqs} />
        </Stack>
      </Section>

      <Section container="wide" size="lg">
        <div className="ui-card ui-card--compact ui-theme-scope bg-surface-elevated">
          <Stack className="ui-text-center" gap="compact">
            <Text variant="heading-2">{SOLAR_CONTENT.ctaSection.title}</Text>
            <Text tone="muted">{SOLAR_CONTENT.ctaSection.lede}</Text>
            <div className="ui-spacer --4" />
            <Button size="lg">{SOLAR_CONTENT.ctaSection.buttonLabel}</Button>
          </Stack>
        </div>
      </Section>
    </PublicShell>
  );
}
