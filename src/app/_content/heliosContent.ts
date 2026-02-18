export type HeliosBlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  imageUrl: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
};

export type HeliosNewsItem = {
  id: string;
  source: string;
  time: string;
  title: string;
  summary: string;
  trending: boolean;
  category: string;
};

export const BLOG_POSTS: HeliosBlogPost[] = [
  {
    id: "1",
    title: "The 2024 Federal Tax Credit Guide: Save 30% Today",
    excerpt:
      "The Residential Clean Energy Credit is at an all-time high. Learn how to maximize your return before the next policy shift.",
    category: "Policy",
    readTime: "6 min read",
    date: "Oct 12, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Sarah Jensen",
      role: "Policy Lead",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    content:
      "The Residential Clean Energy Credit is one of the most significant incentives for homeowners looking to go solar. In 2024, the credit remains at a robust 30% of your total system cost.\n\n### What is covered?\nIt's not just the panels. The credit applies to labor, assembly, installation, and even the piping or wiring required for the system. Furthermore, if you install a battery storage system with at least 3kWh capacity, that is also eligible for the full 30% credit.\n\n### How to claim it?\nWhen you file your federal income taxes, you'll use IRS Form 5695. This form allows you to calculate your credit based on the qualified expenses you paid for your solar energy system.",
  },
  {
    id: "2",
    title: "Tesla Powerwall 3 vs. Enphase IQ Battery 5P",
    excerpt: "We deep dive into the two industry titans of 2024. Which storage solution wins for your specific home size?",
    category: "Hardware",
    readTime: "12 min read",
    date: "Oct 10, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Marcus Chen",
      role: "Storage Engineer",
      avatar: "https://i.pravatar.cc/150?u=marcus",
    },
    content:
      "As energy prices fluctuate and grid instability becomes more common, battery storage is no longer just an accessory—it's becoming a necessity for many solar homeowners.\n\n### Energy Independence\nWith a battery, you can store excess energy produced during the day to use at night or during an outage. This is particularly valuable in states with \"Time of Use\" (TOU) rates, where electricity is significantly more expensive during evening peak hours.",
  },
  {
    id: "3",
    title: "Top 5 Panel Brands for High-Yield Performance",
    excerpt: "We rank the most efficient solar panels currently available on the market for residential use.",
    category: "Reviews",
    readTime: "5 min read",
    date: "Oct 05, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1509391366360-fe5bb584850a?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "David Miller",
      role: "Field Specialist",
      avatar: "https://i.pravatar.cc/150?u=david",
    },
    content:
      "Efficiency is the name of the game in 2024. Standard panels usually hover around 17–19% efficiency, but the top-tier brands we've reviewed are pushing past 22%.\n\n### Shortlist\n1. SunPower Maxeon\n2. REC Alpha Pure-R\n3. QCells Duo\n\n### What to compare\nLook at efficiency, temperature coefficient, degradation, and manufacturer support.",
  },
];

export const NEWS_ITEMS: HeliosNewsItem[] = [
  {
    id: "n1",
    source: "EnergyWire",
    time: "2h ago",
    category: "Global",
    title: "Global solar output projected to rise 22% by end of 2024.",
    summary:
      "New report from the International Energy Agency shows unprecedented growth in photovoltaic installations globally.",
    trending: true,
  },
  {
    id: "n2",
    source: "EcoTimes",
    time: "5h ago",
    category: "Tech",
    title: "New solid-state battery tech promises 15-year home lifespan.",
    summary:
      "Researchers in Germany developed a solid-state electrolyte that significantly reduces degradation in home storage units.",
    trending: false,
  },
  {
    id: "n3",
    source: "PolicyDaily",
    time: "1d ago",
    category: "Policy",
    title: "IRS clarifies new rules for multi-family solar tax credits.",
    summary:
      "The IRS issued guidance on how multi-unit dwellings can claim solar incentives under updated rules.",
    trending: false,
  },
];
