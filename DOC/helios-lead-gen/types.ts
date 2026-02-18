
export enum AppView {
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  LEAD_FORM = 'LEAD_FORM',
  ANALYSIS = 'ANALYSIS',
  AI_CHAT = 'AI_CHAT',
  PROFILE = 'PROFILE',
  CALCULATOR = 'CALCULATOR',
  SOLAR_REBATE = 'SOLAR_REBATE',
  BATTERY_REBATE = 'BATTERY_REBATE',
  BLOG = 'BLOG',
  BLOG_POST = 'BLOG_POST',
  NEWS = 'NEWS',
  NEWS_POST = 'NEWS_POST',
  CONTACT = 'CONTACT'
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  readTime: string;
  date: string;
  imageUrl: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface NewsItem {
  id: string;
  source: string;
  time: string;
  title: string;
  summary: string;
  content: string;
  trending: boolean;
  category: string;
  imageUrl?: string;
}

export interface LeadData {
  address: string;
  monthlyBill: number;
  roofType: string;
  exposure: string;
  zipCode: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  id: string;
}
