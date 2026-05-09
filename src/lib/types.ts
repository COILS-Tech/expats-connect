export interface Event {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  location: string;
  address: string;
  category: string;
  tags: string[];
  image: string;
  isFeatured: boolean;
  isPublished: boolean;
  price: string;
  maxAttendees: number;
  rsvpEmail: string;
  organizer: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio: string;
  category: string;
  tags: string[];
  image: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  readTime: number;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    whatsapp: string;
  };
  stats: {
    members: string;
    events: string;
    nationalities: string;
    yearsActive: string;
  };
  adminPassword: string;
}
