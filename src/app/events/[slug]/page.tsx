import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
  ArrowLeft,
  Mail,
} from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import { getEventBySlug, getPublishedEvents } from "@/data/events";
import { formatEventDate, formatTime, isEventPast } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const past = isEventPast(event.date);

  const rsvpSubject = encodeURIComponent(`RSVP: ${event.title} – ${formatEventDate(event.date)}`);
  const rsvpBody = encodeURIComponent(
    `Hi,\n\nI would like to RSVP for the following event:\n\nEvent: ${event.title}\nDate: ${formatEventDate(event.date)}\nTime: ${formatTime(event.startTime)} – ${formatTime(event.endTime)}\nLocation: ${event.location}\n\nPlease confirm my spot.\n\nThank you!`
  );

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-navy via-brand-navy-light to-[#2a3f6f]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Events
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-semibold uppercase tracking-wider">
              {event.category}
            </span>
            {event.price === "Free" && (
              <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium">
                Free Entry
              </span>
            )}
            {event.isFeatured && (
              <span className="px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-medium">
                ✦ Featured
              </span>
            )}
            {past && (
              <span className="px-3 py-1 rounded-full bg-gray-500/30 text-gray-300 text-xs">
                Past Event
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            {event.title}
          </h1>
          <p className="text-xl text-white/70 mb-8">{event.subtitle}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Calendar, label: "Date", value: formatEventDate(event.date) },
              { icon: Clock, label: "Time", value: `${formatTime(event.startTime)} – ${formatTime(event.endTime)}` },
              { icon: MapPin, label: "Location", value: event.location },
              { icon: Users, label: "Capacity", value: `Max ${event.maxAttendees} people` },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-brand-orange mb-1">
                    <Icon size={14} />
                    <span className="text-xs uppercase tracking-wider text-white/60">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-white text-sm font-semibold">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Countdown */}
            {!past && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
                <h2 className="font-display text-xl font-bold text-brand-navy text-center mb-6">
                  Event Starts In
                </h2>
                <CountdownTimer
                  targetDate={event.date}
                  targetTime={event.startTime}
                />
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
              <h2 className="font-display text-2xl font-bold text-brand-navy mb-5">
                About This Event
              </h2>
              <div className="prose max-w-none">
                {event.longDescription.split("\n\n").map((para, i) => {
                  if (para.startsWith("What to expect:") || para.startsWith("•")) {
                    const lines = para.split("\n");
                    return (
                      <div key={i}>
                        {lines.map((line, j) =>
                          line.startsWith("•") ? (
                            <p key={j} className="flex items-start gap-2 text-gray-700 mb-2">
                              <span className="text-brand-orange mt-1">•</span>
                              <span>{line.slice(2)}</span>
                            </p>
                          ) : (
                            <p key={j} className="font-semibold text-brand-navy mb-2">
                              {line}
                            </p>
                          )
                        )}
                      </div>
                    );
                  }
                  return (
                    <p key={i} className="text-gray-700 leading-relaxed mb-4">
                      {para}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Tags */}
            {event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full"
                  >
                    <Tag size={11} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* RSVP Card */}
            {!past && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-20">
                <h3 className="font-display text-lg font-bold text-brand-navy mb-4">
                  Reserve Your Spot
                </h3>
                <div className="space-y-3 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-brand-orange" />
                    {formatEventDate(event.date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-brand-orange" />
                    {formatTime(event.startTime)} · {event.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-brand-orange" />
                    {event.location}
                  </div>
                </div>

                <div className="bg-brand-cream rounded-xl p-4 mb-5 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Entry
                  </p>
                  <p className="text-2xl font-bold text-brand-navy">
                    {event.price}
                  </p>
                </div>

                <a
                  href={`mailto:${event.rsvpEmail}?subject=${rsvpSubject}&body=${rsvpBody}`}
                  className="flex items-center justify-center gap-2 w-full bg-brand-orange text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-brand-orange-dark transition-colors mb-3"
                >
                  <Mail size={16} />
                  RSVP via Email
                </a>
                <p className="text-xs text-gray-400 text-center">
                  Venue address shared upon RSVP
                </p>
              </div>
            )}

            {/* Organiser */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-3">
                Organised by
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-sm shrink-0">
                  EC
                </div>
                <div>
                  <p className="font-semibold text-brand-navy text-sm">
                    {event.organizer}
                  </p>
                  <a
                    href={`mailto:${event.rsvpEmail}`}
                    className="text-xs text-brand-orange hover:underline"
                  >
                    {event.rsvpEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
