"use client";

import * as React from "react";

import {
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Field,
  Grid,
  HeroSection,
  Input,
  MobilePanel,
  MobileQuickStatTile,
  Section,
  SectionHeader,
  Select,
  Spacer,
  Stack,
  Switch,
  Text,
  ToastProvider,
  useToast,
} from "@/ds";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function toNumber(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const number1 = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });

type QuoteInputs = {
  postcode: string;
  monthlyBill: string;
  propertyType: "house" | "townhouse" | "apartment";
  ownsHome: boolean;
};

type RebateInputs = {
  state: "NSW" | "VIC" | "QLD" | "SA" | "WA" | "TAS" | "ACT";
  batteryKwh: string;
  batteryCost: string;
  eligible: boolean;
};

function estimateSolarQuote(inputs: QuoteInputs) {
  const monthlyBill = toNumber(inputs.monthlyBill);

  // Simple estimate model (placeholder; replace when you have real tariff/irradiance data).
  const assumedTariffPerKwh = 0.3;
  const monthlyKwh = monthlyBill > 0 ? monthlyBill / assumedTariffPerKwh : 0;
  const dailyKwh = monthlyKwh / 30;
  const sunHours = 4.2;
  const systemKw = clamp(dailyKwh / sunHours, 3, 15);

  const installedCostPerKw = 1200;
  const upfrontCost = systemKw * installedCostPerKw;

  const savingsRate = 0.55;
  const estimatedMonthlySavings = monthlyBill * savingsRate;
  const estimatedYearlySavings = estimatedMonthlySavings * 12;
  const paybackYears = estimatedYearlySavings > 0 ? upfrontCost / estimatedYearlySavings : 0;

  return {
    systemKw,
    upfrontCost,
    estimatedMonthlySavings,
    paybackYears,
    monthlyKwh,
  };
}

function estimateBatteryRebate(inputs: RebateInputs) {
  const batteryKwh = clamp(toNumber(inputs.batteryKwh), 0, 100);
  const batteryCost = clamp(toNumber(inputs.batteryCost), 0, 999999);

  const baseRateByState: Record<RebateInputs["state"], number> = {
    NSW: 0.18,
    VIC: 0.2,
    QLD: 0.16,
    SA: 0.22,
    WA: 0.14,
    TAS: 0.2,
    ACT: 0.18,
  };

  const rate = inputs.eligible ? baseRateByState[inputs.state] : 0;
  const cap = 3500;

  const kwhBoost = batteryKwh >= 10 ? 1.05 : 1;
  const raw = batteryCost * rate * kwhBoost;
  const rebate = clamp(raw, 0, cap);

  return {
    rebate,
    netCost: Math.max(0, batteryCost - rebate),
    rate,
    cap,
  };
}

function NewsletterCard() {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");

  return (
    <Card>
      <Stack>
        <div className="text-heading-4">Newsletter</div>
        <Text tone="muted">Get rebate updates and lead-gen playbooks. No spam.</Text>

        <Field id="newsletter-email" label="Email">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" inputMode="email" />
        </Field>

        <div className="ui-row">
          <Button
            onClick={() => {
              const ok = /.+@.+\..+/.test(email);
              if (!ok) {
                toast({ tone: "warning", title: "Invalid email", description: "Enter a valid email address." });
                return;
              }
              toast({ tone: "success", title: "Subscribed", description: "You’re on the list (mock)." });
              setEmail("");
            }}
          >
            Subscribe
          </Button>
          <Button variant="secondary" onClick={() => setEmail("")}>Clear</Button>
        </div>

        <Text tone="muted">
          This form is UI-only for now. Wire it to your backend when ready.
        </Text>
      </Stack>
    </Card>
  );
}

export function LeadGenHomeClient() {
  const [quote, setQuote] = React.useState<QuoteInputs>({
    postcode: "",
    monthlyBill: "",
    propertyType: "house",
    ownsHome: true,
  });

  const [rebate, setRebate] = React.useState<RebateInputs>({
    state: "NSW",
    batteryKwh: "13.5",
    batteryCost: "",
    eligible: true,
  });

  const quoteResult = React.useMemo(() => estimateSolarQuote(quote), [quote]);
  const rebateResult = React.useMemo(() => estimateBatteryRebate(rebate), [rebate]);

  return (
    <ToastProvider>
      <div id="main">
        <Section container="wide" size="lg">
          <div className="ui-hero">
            <Stack>
              <div className="ui-text-center">
                <div className="ui-kicker">Solar lead generation</div>
                <h1 className="text-heading-1">Get an instant solar quote.</h1>
                <div className="text-body-large ui-center">Estimate system size, savings, and rebates in minutes.</div>

                <Spacer size={4} />
                <div className="ui-row ui-row--center">
                  <a className="ui-button ui-button--md ui-button--primary ui-focus-ring" href="#quote">
                    Get instant quote
                  </a>
                  <a className="ui-button ui-button--md ui-button--secondary ui-focus-ring" href="#rebates">
                    Check rebates
                  </a>
                </div>

                <Spacer size={4} />
                <Grid cols={3}>
                  <Card>
                    <div className="text-label">Speed</div>
                    <Spacer size={2} />
                    <div className="text-heading-3">2–3 min</div>
                    <Text tone="muted">Quote estimate</Text>
                  </Card>
                  <Card>
                    <div className="text-label">Clarity</div>
                    <Spacer size={2} />
                    <div className="text-heading-3">No calls</div>
                    <Text tone="muted">Until you opt in</Text>
                  </Card>
                  <Card>
                    <div className="text-label">Next</div>
                    <Spacer size={2} />
                    <div className="text-heading-3">Book</div>
                    <Text tone="muted">Install consult</Text>
                  </Card>
                </Grid>
              </div>
            </Stack>
          </div>
        </Section>

        <Section id="quote" tone="surface" container="wide">
          <Stack>
            <SectionHeader
              kicker="Instant quote"
              title="System size + savings estimate"
              lede="A fast estimate based on your monthly bill (replace with your real model later)."
            />

            <Grid cols={2}>
              <Card>
                <Stack>
                  <div className="text-heading-4">Your details</div>

                  <Grid cols={2}>
                    <Field id="q-postcode" label="Postcode">
                      <Input value={quote.postcode} onChange={(e) => setQuote((v) => ({ ...v, postcode: e.target.value }))} placeholder="e.g. 2000" />
                    </Field>

                    <Field id="q-bill" label="Monthly electricity bill">
                      <Input
                        value={quote.monthlyBill}
                        onChange={(e) => setQuote((v) => ({ ...v, monthlyBill: e.target.value }))}
                        placeholder="e.g. 220"
                        inputMode="decimal"
                      />
                    </Field>
                  </Grid>

                  <Grid cols={2}>
                    <Field id="q-property" label="Property type">
                      <Select
                        value={quote.propertyType}
                        onChange={(e) => setQuote((v) => ({ ...v, propertyType: e.target.value as QuoteInputs["propertyType"] }))}
                      >
                        <option value="house">House</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="apartment">Apartment</option>
                      </Select>
                    </Field>

                    <div className="ui-row ui-row--between">
                      <Switch
                        label="I own the property"
                        checked={quote.ownsHome}
                        onCheckedChange={(checked) => setQuote((v) => ({ ...v, ownsHome: checked }))}
                      />
                    </div>
                  </Grid>

                  <Divider />

                  <Text tone="muted">
                    We use an assumed tariff and sun-hours model. Treat results as a quick estimate.
                  </Text>
                </Stack>
              </Card>

              <Card>
                <Stack>
                  <div className="text-heading-4">Estimate</div>

                  <Grid cols={2}>
                    <Card>
                      <div className="text-label">System size</div>
                      <Spacer size={2} />
                      <div className="text-heading-3">{number1.format(quoteResult.systemKw)} kW</div>
                      <Text tone="muted">Suggested range</Text>
                    </Card>
                    <Card>
                      <div className="text-label">Upfront cost</div>
                      <Spacer size={2} />
                      <div className="text-heading-3">{currency.format(quoteResult.upfrontCost)}</div>
                      <Text tone="muted">Before rebates</Text>
                    </Card>
                  </Grid>

                  <Grid cols={2}>
                    <Card>
                      <div className="text-label">Monthly savings</div>
                      <Spacer size={2} />
                      <div className="text-heading-3">{currency.format(quoteResult.estimatedMonthlySavings)}</div>
                      <Text tone="muted">Estimated</Text>
                    </Card>
                    <Card>
                      <div className="text-label">Payback</div>
                      <Spacer size={2} />
                      <div className="text-heading-3">{quoteResult.paybackYears ? number1.format(quoteResult.paybackYears) : "—"} yrs</div>
                      <Text tone="muted">Rough estimate</Text>
                    </Card>
                  </Grid>

                  <Divider />

                  <div className="ui-row">
                    <Button>Request a real quote</Button>
                    <Button variant="secondary">Talk to an installer</Button>
                  </div>

                  <Text tone="muted">Buttons are placeholders until you connect your lead pipeline.</Text>
                </Stack>
              </Card>
            </Grid>
          </Stack>
        </Section>

        <Section id="rebates" container="wide">
          <Stack>
            <SectionHeader kicker="Rebates" title="Battery rebate calculator" lede="Estimate rebates and net cost for your battery install." />

            <Grid cols={2}>
              <Card>
                <Stack>
                  <div className="text-heading-4">Battery inputs</div>

                  <Grid cols={2}>
                    <Field id="r-state" label="State">
                      <Select value={rebate.state} onChange={(e) => setRebate((v) => ({ ...v, state: e.target.value as RebateInputs["state"] }))}>
                        <option value="NSW">NSW</option>
                        <option value="VIC">VIC</option>
                        <option value="QLD">QLD</option>
                        <option value="SA">SA</option>
                        <option value="WA">WA</option>
                        <option value="TAS">TAS</option>
                        <option value="ACT">ACT</option>
                      </Select>
                    </Field>

                    <div className="ui-row ui-row--between">
                      <Checkbox
                        label="Eligible"
                        checked={rebate.eligible}
                        onChange={(e) =>
                          setRebate((v) => ({ ...v, eligible: (e.target as HTMLInputElement).checked }))
                        }
                      />
                    </div>
                  </Grid>

                  <Grid cols={2}>
                    <Field id="r-kwh" label="Battery size (kWh)">
                      <Input value={rebate.batteryKwh} onChange={(e) => setRebate((v) => ({ ...v, batteryKwh: e.target.value }))} inputMode="decimal" />
                    </Field>

                    <Field id="r-cost" label="Battery cost">
                      <Input value={rebate.batteryCost} onChange={(e) => setRebate((v) => ({ ...v, batteryCost: e.target.value }))} placeholder="e.g. 9500" inputMode="decimal" />
                    </Field>
                  </Grid>

                  <Divider />

                  <Text tone="muted">Rates and caps are placeholders for UI. Replace with real incentive rules per region.</Text>
                </Stack>
              </Card>

              <Card>
                <Stack>
                  <div className="text-heading-4">Rebate estimate</div>

                  <Grid cols={2}>
                    <Card>
                      <div className="text-label">Rate</div>
                      <Spacer size={2} />
                      <div className="text-heading-3">{Math.round(rebateResult.rate * 100)}%</div>
                      <Text tone="muted">By state</Text>
                    </Card>
                    <Card>
                      <div className="text-label">Cap</div>
                      <Spacer size={2} />
                      <div className="text-heading-3">{currency.format(rebateResult.cap)}</div>
                      <Text tone="muted">Max rebate</Text>
                    </Card>
                  </Grid>

                  <Grid cols={2}>
                    <Card>
                      <div className="text-label">Rebate</div>
                      <Spacer size={2} />
                      <div className="text-heading-3">{currency.format(rebateResult.rebate)}</div>
                      <Text tone="muted">Estimated</Text>
                    </Card>
                    <Card>
                      <div className="text-label">Net cost</div>
                      <Spacer size={2} />
                      <div className="text-heading-3">{currency.format(rebateResult.netCost)}</div>
                      <Text tone="muted">After rebate</Text>
                    </Card>
                  </Grid>

                  <Divider />

                  <div className="ui-row">
                    <Button variant="secondary">Download rebate checklist</Button>
                  </div>

                  <Text tone="muted">Placeholder CTA until you add downloads/forms.</Text>
                </Stack>
              </Card>
            </Grid>
          </Stack>
        </Section>

        <Section id="blog" tone="surface" container="wide">
          <Stack>
            <SectionHeader kicker="Blog" title="Learn + convert" lede="Short, high-intent content blocks for lead gen." />

            <Grid cols={3}>
              {[
                {
                  tag: "Guide",
                  title: "How to qualify solar leads fast",
                  body: "A simple questionnaire that boosts conversion without annoying users.",
                },
                {
                  tag: "Rebates",
                  title: "Battery rebates explained",
                  body: "What impacts eligibility and how to avoid common paperwork mistakes.",
                },
                {
                  tag: "Costs",
                  title: "What a solar install really costs",
                  body: "Transparent cost drivers and what to ask before signing.",
                },
              ].map((post) => (
                <Card key={post.title}>
                  <Stack gap="compact">
                    <div className="ui-row">
                      <Badge tone="info">{post.tag}</Badge>
                      <span className="text-label">Article</span>
                    </div>
                    <div className="text-heading-4">{post.title}</div>
                    <Text tone="muted">{post.body}</Text>
                  </Stack>
                </Card>
              ))}
            </Grid>

            <Text tone="muted">This section is content-only right now (no blog routes required).</Text>
          </Stack>
        </Section>

        <Section id="newsletter" container="wide">
          <Stack>
            <SectionHeader kicker="Newsletter" title="Stay updated" lede="Send new rebates, offers, and conversion tips." />
            <NewsletterCard />
          </Stack>
        </Section>
      </div>
    </ToastProvider>
  );
}

export function LeadGenHomeMobileClient() {
  const [quote, setQuote] = React.useState<QuoteInputs>({
    postcode: "",
    monthlyBill: "",
    propertyType: "house",
    ownsHome: true,
  });

  const [rebate, setRebate] = React.useState<RebateInputs>({
    state: "NSW",
    batteryKwh: "13.5",
    batteryCost: "",
    eligible: true,
  });

  const quoteResult = React.useMemo(() => estimateSolarQuote(quote), [quote]);
  const rebateResult = React.useMemo(() => estimateBatteryRebate(rebate), [rebate]);

  return (
    <ToastProvider>
      <div id="main">
        <Section container="full" size="lg">
          <Stack gap="compact">
            <HeroSection
              kicker="Solar lead generation"
              title="Get an instant solar quote."
              lede="Estimate system size, savings, and rebates in minutes."
              primaryAction={{ label: "Get instant quote", href: "#quote" }}
              secondaryAction={{ label: "Check rebates", href: "#rebates" }}
            />

            <Grid cols={3}>
              <MobileQuickStatTile label="Speed" value="2–3 min" description="Quote estimate" />
              <MobileQuickStatTile label="Clarity" value="No calls" description="Until you opt in" />
              <MobileQuickStatTile label="Next" value="Book" description="Install consult" />
            </Grid>
          </Stack>
        </Section>

        <Section id="quote" tone="surface" container="full">
          <Stack gap="compact">
            <SectionHeader
              kicker="Instant quote"
              title="System size + savings estimate"
              lede="A fast estimate based on your monthly bill (replace with your real model later)."
            />

            <Grid cols={1}>
              <MobilePanel title="Your details">
                <Grid cols={2}>
                  <Field id="mq-postcode" label="Postcode">
                    <Input value={quote.postcode} onChange={(e) => setQuote((v) => ({ ...v, postcode: e.target.value }))} placeholder="e.g. 2000" />
                  </Field>

                  <Field id="mq-bill" label="Monthly electricity bill">
                    <Input
                      value={quote.monthlyBill}
                      onChange={(e) => setQuote((v) => ({ ...v, monthlyBill: e.target.value }))}
                      placeholder="e.g. 220"
                      inputMode="decimal"
                    />
                  </Field>
                </Grid>

                <Grid cols={2}>
                  <Field id="mq-property" label="Property type">
                    <Select
                      value={quote.propertyType}
                      onChange={(e) => setQuote((v) => ({ ...v, propertyType: e.target.value as QuoteInputs["propertyType"] }))}
                    >
                      <option value="house">House</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="apartment">Apartment</option>
                    </Select>
                  </Field>

                  <div className="ui-row ui-row--between">
                    <Switch label="I own the property" checked={quote.ownsHome} onCheckedChange={(checked) => setQuote((v) => ({ ...v, ownsHome: checked }))} />
                  </div>
                </Grid>

                <Divider />

                <Text tone="muted">We use an assumed tariff and sun-hours model. Treat results as a quick estimate.</Text>
              </MobilePanel>

              <MobilePanel title="Estimate">
                <Grid cols={2}>
                  <MobileQuickStatTile label="System size" value={`${number1.format(quoteResult.systemKw)} kW`} description="Suggested range" />
                  <MobileQuickStatTile label="Upfront cost" value={currency.format(quoteResult.upfrontCost)} description="Before rebates" />
                </Grid>

                <Grid cols={2}>
                  <MobileQuickStatTile label="Monthly savings" value={currency.format(quoteResult.estimatedMonthlySavings)} description="Estimated" />
                  <MobileQuickStatTile
                    label="Payback"
                    value={quoteResult.paybackYears ? `${number1.format(quoteResult.paybackYears)} yrs` : "—"}
                    description="Rough estimate"
                  />
                </Grid>

                <Divider />

                <div className="ui-row ui-row--wrap">
                  <Button>Request a real quote</Button>
                  <Button variant="secondary">Talk to an installer</Button>
                </div>

                <Text tone="muted">Buttons are placeholders until you connect your lead pipeline.</Text>
              </MobilePanel>
            </Grid>
          </Stack>
        </Section>

        <Section id="rebates" container="full">
          <Stack gap="compact">
            <SectionHeader kicker="Rebates" title="Battery rebate calculator" lede="Estimate rebates and net cost for your battery install." />

            <Grid cols={1}>
              <MobilePanel title="Battery inputs">
                <Grid cols={2}>
                  <Field id="mr-state" label="State">
                    <Select value={rebate.state} onChange={(e) => setRebate((v) => ({ ...v, state: e.target.value as RebateInputs["state"] }))}>
                      <option value="NSW">NSW</option>
                      <option value="VIC">VIC</option>
                      <option value="QLD">QLD</option>
                      <option value="SA">SA</option>
                      <option value="WA">WA</option>
                      <option value="TAS">TAS</option>
                      <option value="ACT">ACT</option>
                    </Select>
                  </Field>

                  <div className="ui-row ui-row--between">
                    <Checkbox
                      label="Eligible"
                      checked={rebate.eligible}
                      onChange={(e) => setRebate((v) => ({ ...v, eligible: (e.target as HTMLInputElement).checked }))}
                    />
                  </div>
                </Grid>

                <Grid cols={2}>
                  <Field id="mr-kwh" label="Battery size (kWh)">
                    <Input value={rebate.batteryKwh} onChange={(e) => setRebate((v) => ({ ...v, batteryKwh: e.target.value }))} inputMode="decimal" />
                  </Field>

                  <Field id="mr-cost" label="Battery cost">
                    <Input
                      value={rebate.batteryCost}
                      onChange={(e) => setRebate((v) => ({ ...v, batteryCost: e.target.value }))}
                      placeholder="e.g. 9500"
                      inputMode="decimal"
                    />
                  </Field>
                </Grid>

                <Divider />

                <Text tone="muted">Rates and caps are placeholders for UI. Replace with real incentive rules per region.</Text>
              </MobilePanel>

              <MobilePanel title="Rebate estimate">
                <Grid cols={2}>
                  <MobileQuickStatTile label="Rate" value={`${Math.round(rebateResult.rate * 100)}%`} description="By state" />
                  <MobileQuickStatTile label="Cap" value={currency.format(rebateResult.cap)} description="Max rebate" />
                </Grid>

                <Grid cols={2}>
                  <MobileQuickStatTile label="Rebate" value={currency.format(rebateResult.rebate)} description="Estimated" />
                  <MobileQuickStatTile label="Net cost" value={currency.format(rebateResult.netCost)} description="After rebate" />
                </Grid>

                <Divider />

                <div className="ui-row ui-row--wrap">
                  <Button variant="secondary">Download rebate checklist</Button>
                </div>

                <Text tone="muted">Placeholder CTA until you add downloads/forms.</Text>
              </MobilePanel>
            </Grid>
          </Stack>
        </Section>

        <Section id="blog" tone="surface" container="full">
          <Stack gap="compact">
            <SectionHeader kicker="Blog" title="Learn + convert" lede="Short, high-intent content blocks for lead gen." />

            <Grid cols={1}>
              {[
                {
                  tag: "Guide",
                  title: "How to qualify solar leads fast",
                  body: "A simple questionnaire that boosts conversion without annoying users.",
                },
                {
                  tag: "Rebates",
                  title: "Battery rebates explained",
                  body: "What impacts eligibility and how to avoid common paperwork mistakes.",
                },
                {
                  tag: "Costs",
                  title: "What a solar install really costs",
                  body: "Transparent cost drivers and what to ask before signing.",
                },
              ].map((post) => (
                <Card key={post.title}>
                  <Stack gap="compact">
                    <div className="ui-row">
                      <Badge tone="info">{post.tag}</Badge>
                      <span className="text-label">Article</span>
                    </div>
                    <div className="text-heading-4">{post.title}</div>
                    <Text tone="muted">{post.body}</Text>
                  </Stack>
                </Card>
              ))}
            </Grid>

            <Text tone="muted">This section is content-only right now (no blog routes required).</Text>
          </Stack>
        </Section>

        <Section id="newsletter" container="full">
          <Stack gap="compact">
            <SectionHeader kicker="Newsletter" title="Stay updated" lede="Send new rebates, offers, and conversion tips." />
            <NewsletterCard />
          </Stack>
        </Section>
      </div>
    </ToastProvider>
  );
}
