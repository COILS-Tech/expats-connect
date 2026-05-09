import type { Event } from "@/lib/types";

export const events: Event[] = [
  {
    id: "1",
    slug: "sip-and-pray-june-2026",
    title: "Sip & Pray",
    subtitle: "A morning of connection, coffee & conversation",
    description:
      "Join fellow expats in the Netherlands for an intimate 90-minute gathering of prayer, connection and community over coffee and tea.",
    longDescription: `Are you an expat living in the Netherlands looking for genuine community? Come join us for Sip & Pray — a warm, welcoming 90-minute gathering designed to help you connect with others who understand the unique joys and challenges of expat life.

Over coffee, tea and light snacks, we'll come together to pray for our lives here in the Netherlands, share our stories, and build lasting friendships. Whether you've just arrived or have been living here for years, all are welcome.

What to expect:
• A warm, relaxed atmosphere
• Coffee, tea & light refreshments
• Open prayer and reflection time
• Genuine conversation and connection
• New friendships with fellow expats

No prior faith background required — just an open heart and a desire to connect. This is a space for all expats, regardless of nationality, background or belief.

Bring a friend, come as you are. We look forward to meeting you!`,
    date: "2026-06-06",
    startTime: "12:00",
    endTime: "13:30",
    duration: "90 minutes",
    location: "Amsterdam, Netherlands",
    address: "Venue details will be shared upon RSVP",
    category: "Community",
    tags: ["prayer", "coffee", "networking", "community", "expats", "faith"],
    image: "/images/sip-and-pray.jpg",
    isFeatured: true,
    isPublished: true,
    price: "Free",
    maxAttendees: 40,
    rsvpEmail: "hello@expatsconnectnl.com",
    organizer: "Expats Connect Netherlands",
    createdAt: "2026-05-06T00:00:00Z",
    updatedAt: "2026-05-06T00:00:00Z",
  },
  {
    id: "2",
    slug: "expat-welcome-walk-amsterdam",
    title: "Expat Welcome Walk",
    subtitle: "Explore Amsterdam with new friends",
    description:
      "A guided walk through the heart of Amsterdam for newly arrived expats — meet people, discover the city, and feel at home.",
    longDescription: `Just moved to the Netherlands? Join our Expat Welcome Walk and discover Amsterdam with fellow newcomers. Our friendly guide will take you through iconic neighbourhoods while you make new connections along the way.

This 2-hour walk is the perfect way to break the ice, learn local tips, and start building your network in the Netherlands.`,
    date: "2026-06-20",
    startTime: "10:00",
    endTime: "12:00",
    duration: "2 hours",
    location: "Amsterdam, Netherlands",
    address: "Meet at Dam Square (exact meeting point shared on RSVP)",
    category: "Social",
    tags: ["walking", "amsterdam", "newcomers", "social", "networking"],
    image: "/images/amsterdam-walk.jpg",
    isFeatured: false,
    isPublished: true,
    price: "Free",
    maxAttendees: 25,
    rsvpEmail: "hello@expatsconnectnl.com",
    organizer: "Expats Connect Netherlands",
    createdAt: "2026-05-06T00:00:00Z",
    updatedAt: "2026-05-06T00:00:00Z",
  },
  {
    id: "3",
    slug: "dutch-language-exchange-july-2026",
    title: "Dutch Language Exchange",
    subtitle: "Practice Dutch with native speakers",
    description:
      "An informal language exchange evening where expats practice Dutch with local native speakers — all levels welcome.",
    longDescription: `Struggling with Dutch? You're not alone! Join our monthly language exchange where expats and Dutch locals come together to practise languages in a relaxed, supportive setting.

Bring your Dutch phrase book, your questions, and your sense of humour. This is a no-judgement zone where learning through laughter is encouraged!`,
    date: "2026-07-10",
    startTime: "19:00",
    endTime: "21:00",
    duration: "2 hours",
    location: "Utrecht, Netherlands",
    address: "Location shared with confirmed attendees",
    category: "Learning",
    tags: ["dutch", "language", "learning", "social", "integration"],
    image: "/images/language-exchange.jpg",
    isFeatured: false,
    isPublished: true,
    price: "Free",
    maxAttendees: 30,
    rsvpEmail: "hello@expatsconnectnl.com",
    organizer: "Expats Connect Netherlands",
    createdAt: "2026-05-06T00:00:00Z",
    updatedAt: "2026-05-06T00:00:00Z",
  },
];

export function getPublishedEvents(): Event[] {
  return events
    .filter((e) => e.isPublished)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getFeaturedEvent(): Event | undefined {
  return events.find((e) => e.isFeatured && e.isPublished);
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug && e.isPublished);
}

export function getUpcomingEvents(limit?: number): Event[] {
  const now = new Date();
  const upcoming = events
    .filter((e) => e.isPublished && new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return limit ? upcoming.slice(0, limit) : upcoming;
}
