import Link from "next/link";
import { ArrowRight, Users, Calendar, Globe, Heart } from "lucide-react";
import EventCard from "@/components/EventCard";
import BlogCard from "@/components/BlogCard";
import CountdownTimer from "@/components/CountdownTimer";
import Newsletter from "@/components/Newsletter";
import { getFeaturedEvent, getUpcomingEvents } from "@/data/events";
import { getPublishedPosts } from "@/data/posts";
import { siteSettings } from "@/data/site";
import { formatEventDate, formatTime } from "@/lib/utils";

export default function HomePage() {
  const featuredEvent = getFeaturedEvent();
  const upcomingEvents = getUpcomingEvents(3);
  const posts = getPublishedPosts().slice(0, 3);

  const stats = [
    { label: "Community Members", value: siteSettings.stats.members, icon: Users },
    { label: "Events Hosted", value: siteSettings.stats.events, icon: Calendar },
    { label: "Nationalities", value: siteSettings.stats.nationalities, icon: Globe },
    { label: "Years Strong", value: siteSettings.stats.yearsActive, icon: Heart },
  ];

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy-light to-[#2a3f6f] min-h-[92vh] flex items-center">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-orange/10 translate-x-1/3 -translate-y-1/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-gold/10 -translate-x-1/4 translate-y-1/4 blur-3xl" />
        {/* Tulip accent */}
        <div className="absolute top-20 right-10 text-8xl opacity-10 select-none hidden lg:block">
          🌷
        </div>
        <div className="absolute bottom-20 left-10 text-6xl opacity-10 select-none hidden lg:block">
          🌷
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-semibold uppercase tracking-widest mb-6">
              <span className="w-8 h-px bg-brand-orange" />
              Expat Community · Netherlands
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Connect.{" "}
              <span className="text-brand-orange">Belong.</span>
              <br />
              Thrive.
            </h1>
            <p className="text-xl text-white/70 leading-relaxed mb-10 max-w-xl">
              Building a vibrant expat community in the Netherlands — for
              internationals who want to make real connections, feel at home,
              and thrive together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-brand-orange-dark transition-colors shadow-lg shadow-brand-orange/30"
              >
                See Upcoming Events <ArrowRight size={20} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Sip & Pray Countdown Banner ────────────────────────────── */}
      {featuredEvent && (
        <section className="bg-brand-cream border-b border-brand-cream-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="text-center mb-8">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
                Next Event
              </span>
              <h2 className="font-display text-3xl font-bold text-brand-navy">
                {featuredEvent.title}
              </h2>
              <p className="text-gray-500 mt-1">
                {formatEventDate(featuredEvent.date)} &middot;{" "}
                {formatTime(featuredEvent.startTime)} &middot;{" "}
                {featuredEvent.location}
              </p>
            </div>
            <CountdownTimer
              targetDate={featuredEvent.date}
              targetTime={featuredEvent.startTime}
            />
            <div className="text-center mt-8">
              <Link
                href={`/events/${featuredEvent.slug}`}
                className="inline-flex items-center gap-2 bg-brand-navy text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-brand-orange transition-colors"
              >
                RSVP for Free <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── Stats ──────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-cream group-hover:bg-brand-orange transition-colors mb-3">
                    <Icon size={22} className="text-brand-orange group-hover:text-white transition-colors" />
                  </div>
                  <div className="font-display text-4xl font-bold text-brand-navy">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Featured Event ──────────────────────────────────────────── */}
      {featuredEvent && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                Don&apos;t Miss Out
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-navy">
                Featured Event
              </h2>
            </div>
            <Link
              href="/events"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-orange transition-colors"
            >
              All Events <ArrowRight size={16} />
            </Link>
          </div>
          <EventCard event={featuredEvent} featured />
        </section>
      )}

      {/* ─── Upcoming Events Grid ────────────────────────────────────── */}
      {upcomingEvents.length > 1 && (
        <section className="bg-brand-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  What&apos;s On
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-navy">
                  Upcoming Events
                </h2>
              </div>
              <Link
                href="/events"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-orange transition-colors"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-orange transition-colors"
              >
                View All Events <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── About Teaser ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4 block">
              Who We Are
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-navy mb-6 leading-tight">
              A home away from home in the Netherlands
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Moving to a new country is one of life&apos;s biggest adventures — but
              it can also be lonely. Expats Connect Netherlands exists to change
              that. We create spaces where internationals can meet, build
              friendships, and support each other through the joys and
              challenges of expat life.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you&apos;ve just arrived or have been here for years, whether
              you speak Dutch or not — you belong here.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-brand-navy text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-brand-orange transition-colors"
            >
              Read Our Story <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: "☕", title: "Coffee & Community", desc: "Regular casual meetups in local cafés" },
              { emoji: "🙏", title: "Faith & Fellowship", desc: "Prayer gatherings for all backgrounds" },
              { emoji: "🗣️", title: "Language Support", desc: "Dutch practice sessions for all levels" },
              { emoji: "🌍", title: "35+ Nationalities", desc: "Truly diverse, truly welcoming" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-brand-cream rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-semibold text-brand-navy text-sm mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Blog Preview ─────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="bg-brand-cream border-t border-brand-cream-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Resources & Stories
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-navy">
                  From the Blog
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-orange transition-colors"
              >
                All Articles <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <BlogCard key={post.id} post={post} featured={i === 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Newsletter ───────────────────────────────────────────────── */}
      <Newsletter />
    </>
  );
}
