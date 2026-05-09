import type { Metadata } from "next";
import EventCard from "@/components/EventCard";
import { getPublishedEvents, getFeaturedEvent } from "@/data/events";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Discover upcoming events for expats in the Netherlands — from community gatherings to language exchanges and prayer meetups.",
};

export default function EventsPage() {
  const featuredEvent = getFeaturedEvent();
  const allEvents = getPublishedEvents();
  const upcomingEvents = allEvents.filter(
    (e) => new Date(e.date) >= new Date()
  );
  const pastEvents = allEvents.filter((e) => new Date(e.date) < new Date());

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-navy to-brand-navy-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-orange mb-4">
            Community Events
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Events &amp; Gatherings
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Real connections, real community. Join expats from across the
            Netherlands at our regular events — all are welcome.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Event */}
        {featuredEvent && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-brand-orange" size={20} />
              <h2 className="font-display text-2xl font-bold text-brand-navy">
                Featured Event
              </h2>
            </div>
            <EventCard event={featuredEvent} featured />
          </div>
        )}

        {/* Upcoming */}
        {upcomingEvents.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold text-brand-navy mb-6 flex items-center gap-3">
              <span className="w-2 h-6 rounded-full bg-brand-orange block" />
              Upcoming Events
              <span className="text-sm font-normal text-gray-400 ml-1">
                ({upcomingEvents.length})
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-brand-navy mb-6 flex items-center gap-3">
              <span className="w-2 h-6 rounded-full bg-gray-300 block" />
              Past Events
              <span className="text-sm font-normal text-gray-400 ml-1">
                ({pastEvents.length})
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {allEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">
              No events yet
            </h3>
            <p className="text-gray-500">
              Check back soon — more events are coming!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
