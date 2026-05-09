import Link from "next/link";
import { Calendar, Clock, MapPin, Tag, Users } from "lucide-react";
import { formatEventDate, formatTime, isEventPast } from "@/lib/utils";
import type { Event } from "@/lib/types";
import clsx from "clsx";

interface Props {
  event: Event;
  featured?: boolean;
}

export default function EventCard({ event, featured = false }: Props) {
  const past = isEventPast(event.date);

  if (featured) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-orange shadow-2xl">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-brand-orange translate-x-[-30%] translate-y-1/3" />
        </div>

        <div className="relative p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-semibold uppercase tracking-wider">
              ✦ Featured Event
            </span>
            {event.price === "Free" && (
              <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium">
                Free Entry
              </span>
            )}
            {past && (
              <span className="px-3 py-1 rounded-full bg-gray-500/50 text-gray-300 text-xs font-medium">
                Past Event
              </span>
            )}
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            {event.title}
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-xl">
            {event.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wider">Date</p>
                <p className="text-sm font-semibold">{formatEventDate(event.date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wider">Time</p>
                <p className="text-sm font-semibold">
                  {formatTime(event.startTime)} · {event.duration}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wider">Location</p>
                <p className="text-sm font-semibold">{event.location}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/events/${event.slug}`}
              className="inline-flex items-center gap-2 bg-white text-brand-navy px-6 py-3 rounded-full font-semibold text-sm hover:bg-brand-cream transition-colors"
            >
              View Details & RSVP →
            </Link>
            <a
              href={`mailto:${event.rsvpEmail}?subject=RSVP: ${event.title}&body=Hi, I would like to RSVP for the ${event.title} event on ${formatEventDate(event.date)}.`}
              className="inline-flex items-center gap-2 border border-white/40 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              RSVP via Email
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
        past && "opacity-70"
      )}
    >
      {/* Colour bar */}
      <div
        className={clsx(
          "h-1.5",
          past ? "bg-gray-300" : "bg-gradient-to-r from-brand-orange to-brand-gold"
        )}
      />

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-cream text-brand-orange">
                {event.category}
              </span>
              {event.price === "Free" && (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-50 text-green-700">
                  Free
                </span>
              )}
              {past && (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                  Past
                </span>
              )}
            </div>
            <h3 className="font-display font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors">
              {event.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{event.subtitle}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <Calendar size={14} className="text-brand-orange shrink-0" />
            <span>{formatEventDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <Clock size={14} className="text-brand-orange shrink-0" />
            <span>
              {formatTime(event.startTime)} – {formatTime(event.endTime)} ({event.duration})
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <MapPin size={14} className="text-brand-orange shrink-0" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <Users size={14} className="text-brand-orange shrink-0" />
            <span>Max {event.maxAttendees} attendees</span>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-5">
          {event.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full"
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/events/${event.slug}`}
          className="block w-full text-center bg-brand-navy text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-orange transition-colors"
        >
          {past ? "View Details" : "View & RSVP"}
        </Link>
      </div>
    </div>
  );
}
