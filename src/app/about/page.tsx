import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Globe, Users, Star } from "lucide-react";
import { siteSettings } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Expats Connect Netherlands — a community built by expats, for expats, with a mission to help internationals feel at home in the Netherlands.",
};

export default function AboutPage() {
  const values = [
    {
      emoji: "🤝",
      title: "Genuine Connection",
      desc: "We create spaces for real, meaningful relationships — not just surface-level networking.",
    },
    {
      emoji: "🌍",
      title: "Radical Inclusion",
      desc: "Every nationality, background and story is welcome. Diversity is our strength.",
    },
    {
      emoji: "💛",
      title: "Warm Welcome",
      desc: "Whether it's your first week in the Netherlands or your fifth year, we meet you where you are.",
    },
    {
      emoji: "🙌",
      title: "Community First",
      desc: "Every decision we make puts the health and wellbeing of our community members at the centre.",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-navy to-brand-navy-light py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 text-[20rem] flex items-center justify-end pr-10 select-none pointer-events-none">
          🌷
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-orange mb-4">
            Our Story
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 max-w-2xl leading-tight">
            Building a home away from home in the Netherlands
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Expats Connect Netherlands was born out of a simple belief: that
            nobody should feel alone when building a life in a new country.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section id="mission" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3 block">
              Our Mission
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-navy mb-6">
              Real connections for international lives
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Moving abroad is one of life&apos;s greatest adventures. But it can
              also be one of its loneliest experiences. The excitement of a new
              country quickly gives way to the reality of building a life from
              scratch — new language, new culture, no existing support network.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              Expats Connect Netherlands exists to bridge that gap. Through
              regular events, community gatherings and practical resources, we
              help internationals living in the Netherlands do more than just
              survive — we help them thrive.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We&apos;re not a corporation or a startup — we&apos;re a community run by
              expats, for expats. Every event, every article, every connection
              made through our platform is guided by one simple question:{" "}
              <em>does this make life better for expats in the Netherlands?</em>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: siteSettings.stats.members, label: "Members", icon: Users },
              { value: siteSettings.stats.events, label: "Events Hosted", icon: Star },
              { value: siteSettings.stats.nationalities, label: "Nationalities", icon: Globe },
              { value: siteSettings.stats.yearsActive, label: "Years Active", icon: Heart },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
                >
                  <Icon size={22} className="text-brand-orange mx-auto mb-2" />
                  <div className="font-display text-3xl font-bold text-brand-navy">
                    {s.value}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3 block">
              What We Stand For
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-navy">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex gap-5 p-6 rounded-2xl bg-brand-cream hover:shadow-md transition-shadow"
              >
                <div className="text-4xl shrink-0">{v.emoji}</div>
                <div>
                  <h3 className="font-semibold text-brand-navy mb-1.5">
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand-navy to-brand-navy-light py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Ready to connect?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Join us at our next event. Everyone is welcome.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-orange-dark transition-colors"
          >
            See Upcoming Events <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
