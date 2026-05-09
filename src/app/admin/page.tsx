"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Calendar, FileText, Settings, Plus,
  Edit3, Trash2, Eye, EyeOff, Lock, LogOut, ChevronRight,
  Users, Star, Globe, Heart, Save, X, CheckCircle,
} from "lucide-react";
import { events as initialEvents } from "@/data/events";
import { posts as initialPosts } from "@/data/posts";
import { siteSettings } from "@/data/site";
import type { Event, Post } from "@/lib/types";
import { formatEventDate, formatTime, slugify, generateId } from "@/lib/utils";

type Tab = "dashboard" | "events" | "posts" | "settings";

const ADMIN_PASSWORD = siteSettings.adminPassword;

function emptyEvent(): Omit<Event, "id" | "createdAt" | "updatedAt"> {
  return {
    slug: "",
    title: "",
    subtitle: "",
    description: "",
    longDescription: "",
    date: "",
    startTime: "12:00",
    endTime: "13:30",
    duration: "90 minutes",
    location: "Amsterdam, Netherlands",
    address: "",
    category: "Community",
    tags: [],
    image: "",
    isFeatured: false,
    isPublished: true,
    price: "Free",
    maxAttendees: 40,
    rsvpEmail: siteSettings.email,
    organizer: siteSettings.siteName,
  };
}

function emptyPost(): Omit<Post, "id" | "createdAt" | "updatedAt"> {
  return {
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    author: "",
    authorBio: "",
    category: "Expat Life",
    tags: [],
    image: "",
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date().toISOString(),
    readTime: 5,
  };
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [events, setEvents] = useState<Event[]>([...initialEvents]);
  const [posts, setPosts] = useState<Post[]>([...initialPosts]);

  // Event form state
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventForm, setEventForm] = useState<Omit<Event, "id" | "createdAt" | "updatedAt">>(emptyEvent());

  // Post form state
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [postForm, setPostForm] = useState<Omit<Post, "id" | "createdAt" | "updatedAt">>(emptyPost());

  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  // Persist session
  useEffect(() => {
    const saved = sessionStorage.getItem("ecn_admin");
    if (saved === "true") setAuthed(true);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem("ecn_admin", "true");
    } else {
      setAuthError("Incorrect password. Please try again.");
    }
  }

  function handleLogout() {
    setAuthed(false);
    sessionStorage.removeItem("ecn_admin");
  }

  // ── EVENT CRUD ──────────────────────────────────────────────────
  function openNewEvent() {
    setEditingEvent(null);
    setEventForm(emptyEvent());
    setShowEventForm(true);
  }

  function openEditEvent(event: Event) {
    setEditingEvent(event);
    const { id, createdAt, updatedAt, ...rest } = event;
    setEventForm(rest);
    setShowEventForm(true);
  }

  function saveEvent(e: React.FormEvent) {
    e.preventDefault();
    const slug = eventForm.slug || slugify(eventForm.title);
    const now = new Date().toISOString();
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEvent.id
            ? { ...ev, ...eventForm, slug, updatedAt: now }
            : ev
        )
      );
      showToast("Event updated successfully");
    } else {
      const newEvent: Event = {
        ...eventForm,
        slug,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      setEvents((prev) => [...prev, newEvent]);
      showToast("Event created successfully");
    }
    setShowEventForm(false);
  }

  function toggleEventPublished(id: string) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, isPublished: !e.isPublished } : e
      )
    );
  }

  function deleteEvent(id: string) {
    if (confirm("Delete this event? This cannot be undone.")) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
      showToast("Event deleted");
    }
  }

  // ── POST CRUD ────────────────────────────────────────────────────
  function openNewPost() {
    setEditingPost(null);
    setPostForm(emptyPost());
    setShowPostForm(true);
  }

  function openEditPost(post: Post) {
    setEditingPost(post);
    const { id, createdAt, updatedAt, ...rest } = post;
    setPostForm(rest);
    setShowPostForm(true);
  }

  function savePost(e: React.FormEvent) {
    e.preventDefault();
    const slug = postForm.slug || slugify(postForm.title);
    const now = new Date().toISOString();
    if (editingPost) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id
            ? { ...p, ...postForm, slug, updatedAt: now }
            : p
        )
      );
      showToast("Post updated successfully");
    } else {
      const newPost: Post = {
        ...postForm,
        slug,
        id: generateId(),
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
      };
      setPosts((prev) => [...prev, newPost]);
      showToast("Post created successfully");
    }
    setShowPostForm(false);
  }

  function togglePostPublished(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isPublished: !p.isPublished } : p
      )
    );
  }

  function deletePost(id: string) {
    if (confirm("Delete this post? This cannot be undone.")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showToast("Post deleted");
    }
  }

  // ── LOGIN SCREEN ─────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-orange flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              EC
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold text-brand-navy text-center mb-1">
            Admin Panel
          </h1>
          <p className="text-gray-400 text-sm text-center mb-8">
            Expats Connect Netherlands CMS
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                />
              </div>
              {authError && (
                <p className="text-red-500 text-xs mt-1.5">{authError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-brand-orange text-white py-3 rounded-xl font-semibold text-sm hover:bg-brand-orange-dark transition-colors"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-6">
            Default password:{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded">admin2026</code>
            <br />
            <span className="text-orange-500">Change in src/data/site.ts before deploying</span>
          </p>
        </div>
      </div>
    );
  }

  // ── ADMIN SHELL ───────────────────────────────────────────────────
  const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "events", label: "Events", icon: Calendar },
    { id: "posts", label: "Blog Posts", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-brand-navy text-white flex flex-col shrink-0 fixed top-16 bottom-0 left-0 z-40">
        <div className="px-5 py-5 border-b border-white/10">
          <p className="text-xs text-white/50 uppercase tracking-widest">CMS Admin</p>
          <p className="font-semibold text-sm mt-0.5">{siteSettings.siteName}</p>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  tab === item.id
                    ? "bg-brand-orange text-white"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/10 transition-all"
          >
            <Globe size={17} />
            View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-all"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-60 flex-1 min-h-screen">
        {/* Toast */}
        {toast && (
          <div className="fixed top-20 right-6 z-50 flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in">
            <CheckCircle size={16} />
            {toast}
          </div>
        )}

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* ── DASHBOARD ─────────────────────────────── */}
          {tab === "dashboard" && (
            <div>
              <h1 className="font-display text-2xl font-bold text-brand-navy mb-7">Dashboard</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {[
                  { label: "Total Events", value: events.length, sub: `${events.filter((e) => e.isPublished).length} published`, icon: Calendar, color: "text-brand-orange" },
                  { label: "Blog Posts", value: posts.length, sub: `${posts.filter((p) => p.isPublished).length} published`, icon: FileText, color: "text-blue-500" },
                  { label: "Community Members", value: siteSettings.stats.members, sub: "& growing", icon: Users, color: "text-green-500" },
                  { label: "Nationalities", value: siteSettings.stats.nationalities, sub: "represented", icon: Globe, color: "text-purple-500" },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                      <Icon size={20} className={`${s.color} mb-3`} />
                      <div className="font-display text-3xl font-bold text-brand-navy">{s.value}</div>
                      <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
                      <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-brand-navy">Recent Events</h2>
                    <button onClick={() => setTab("events")} className="text-xs text-brand-orange hover:underline flex items-center gap-1">
                      View all <ChevronRight size={12} />
                    </button>
                  </div>
                  {events.slice(0, 4).map((e) => (
                    <div key={e.id} className="flex items-center justify-between px-6 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-medium text-sm text-brand-navy">{e.title}</p>
                        <p className="text-xs text-gray-400">{formatEventDate(e.date)}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${e.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {e.isPublished ? "Live" : "Draft"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-brand-navy">Recent Posts</h2>
                    <button onClick={() => setTab("posts")} className="text-xs text-brand-orange hover:underline flex items-center gap-1">
                      View all <ChevronRight size={12} />
                    </button>
                  </div>
                  {posts.slice(0, 4).map((p) => (
                    <div key={p.id} className="flex items-center justify-between px-6 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-medium text-sm text-brand-navy line-clamp-1">{p.title}</p>
                        <p className="text-xs text-gray-400">{p.author} · {p.readTime} min</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {p.isPublished ? "Live" : "Draft"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <p className="text-sm font-semibold text-amber-800 mb-1">📌 About CMS Persistence</p>
                <p className="text-sm text-amber-700">
                  Changes made here are live in your browser session. To make them permanent, update{" "}
                  <code className="bg-amber-100 px-1 rounded">src/data/events.ts</code> and{" "}
                  <code className="bg-amber-100 px-1 rounded">src/data/posts.ts</code> then redeploy.
                  For a fully persistent CMS, connect{" "}
                  <strong>Vercel KV</strong> or a database like <strong>Supabase</strong>.
                </p>
              </div>
            </div>
          )}

          {/* ── EVENTS ────────────────────────────────── */}
          {tab === "events" && !showEventForm && (
            <div>
              <div className="flex items-center justify-between mb-7">
                <h1 className="font-display text-2xl font-bold text-brand-navy">Events</h1>
                <button
                  onClick={openNewEvent}
                  className="flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-orange-dark transition-colors"
                >
                  <Plus size={16} />
                  New Event
                </button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Event</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden lg:table-cell">Category</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                      <th className="text-right px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-semibold text-brand-navy">{event.title}</p>
                            <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{event.subtitle}</p>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-500 hidden md:table-cell">
                          {formatEventDate(event.date)}
                          <br />
                          <span className="text-xs">{formatTime(event.startTime)}</span>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <span className="text-xs bg-brand-cream text-brand-orange px-2.5 py-1 rounded-full font-medium">
                            {event.category}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${event.isPublished ? "bg-green-500" : "bg-gray-300"}`} />
                            <span className="text-xs text-gray-500">{event.isPublished ? "Live" : "Draft"}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 justify-end">
                            <Link
                              href={`/events/${event.slug}`}
                              target="_blank"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-brand-navy hover:bg-gray-100 transition-colors"
                              title="View"
                            >
                              <Eye size={15} />
                            </Link>
                            <button
                              onClick={() => toggleEventPublished(event.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title={event.isPublished ? "Unpublish" : "Publish"}
                            >
                              {event.isPublished ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                            <button
                              onClick={() => openEditEvent(event)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-brand-orange hover:bg-orange-50 transition-colors"
                              title="Edit"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => deleteEvent(event.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {events.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <Calendar size={32} className="mx-auto mb-3 opacity-40" />
                    <p>No events yet. Create your first event!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── EVENT FORM ────────────────────────────── */}
          {tab === "events" && showEventForm && (
            <div>
              <div className="flex items-center gap-3 mb-7">
                <button
                  onClick={() => setShowEventForm(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X size={18} />
                </button>
                <h1 className="font-display text-2xl font-bold text-brand-navy">
                  {editingEvent ? "Edit Event" : "New Event"}
                </h1>
              </div>
              <form onSubmit={saveEvent} className="space-y-6 max-w-3xl">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                  <h2 className="font-semibold text-brand-navy">Basic Info</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Title *">
                      <input
                        required
                        className={inputCls}
                        value={eventForm.title}
                        onChange={(e) => setEventForm((f) => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))}
                        placeholder="Sip & Pray"
                      />
                    </FormField>
                    <FormField label="Subtitle">
                      <input
                        className={inputCls}
                        value={eventForm.subtitle}
                        onChange={(e) => setEventForm((f) => ({ ...f, subtitle: e.target.value }))}
                        placeholder="A morning of connection & coffee"
                      />
                    </FormField>
                  </div>
                  <FormField label="Short Description *">
                    <textarea
                      required
                      rows={2}
                      className={inputCls + " resize-none"}
                      value={eventForm.description}
                      onChange={(e) => setEventForm((f) => ({ ...f, description: e.target.value }))}
                      placeholder="Brief description shown on cards"
                    />
                  </FormField>
                  <FormField label="Full Description">
                    <textarea
                      rows={8}
                      className={inputCls + " resize-y"}
                      value={eventForm.longDescription}
                      onChange={(e) => setEventForm((f) => ({ ...f, longDescription: e.target.value }))}
                      placeholder="Detailed event description..."
                    />
                  </FormField>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                  <h2 className="font-semibold text-brand-navy">Date &amp; Time</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <FormField label="Date *">
                      <input
                        type="date"
                        required
                        className={inputCls}
                        value={eventForm.date}
                        onChange={(e) => setEventForm((f) => ({ ...f, date: e.target.value }))}
                      />
                    </FormField>
                    <FormField label="Start Time">
                      <input
                        type="time"
                        className={inputCls}
                        value={eventForm.startTime}
                        onChange={(e) => setEventForm((f) => ({ ...f, startTime: e.target.value }))}
                      />
                    </FormField>
                    <FormField label="End Time">
                      <input
                        type="time"
                        className={inputCls}
                        value={eventForm.endTime}
                        onChange={(e) => setEventForm((f) => ({ ...f, endTime: e.target.value }))}
                      />
                    </FormField>
                    <FormField label="Duration">
                      <input
                        className={inputCls}
                        value={eventForm.duration}
                        onChange={(e) => setEventForm((f) => ({ ...f, duration: e.target.value }))}
                        placeholder="90 minutes"
                      />
                    </FormField>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                  <h2 className="font-semibold text-brand-navy">Location &amp; Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Location">
                      <input
                        className={inputCls}
                        value={eventForm.location}
                        onChange={(e) => setEventForm((f) => ({ ...f, location: e.target.value }))}
                        placeholder="Amsterdam, Netherlands"
                      />
                    </FormField>
                    <FormField label="Address / Venue">
                      <input
                        className={inputCls}
                        value={eventForm.address}
                        onChange={(e) => setEventForm((f) => ({ ...f, address: e.target.value }))}
                        placeholder="Shared on RSVP"
                      />
                    </FormField>
                    <FormField label="Category">
                      <select
                        className={inputCls}
                        value={eventForm.category}
                        onChange={(e) => setEventForm((f) => ({ ...f, category: e.target.value }))}
                      >
                        {["Community", "Social", "Learning", "Faith", "Sports", "Culture", "Networking"].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </FormField>
                    <FormField label="Max Attendees">
                      <input
                        type="number"
                        className={inputCls}
                        value={eventForm.maxAttendees}
                        onChange={(e) => setEventForm((f) => ({ ...f, maxAttendees: Number(e.target.value) }))}
                      />
                    </FormField>
                    <FormField label="Price">
                      <input
                        className={inputCls}
                        value={eventForm.price}
                        onChange={(e) => setEventForm((f) => ({ ...f, price: e.target.value }))}
                        placeholder="Free"
                      />
                    </FormField>
                    <FormField label="RSVP Email">
                      <input
                        type="email"
                        className={inputCls}
                        value={eventForm.rsvpEmail}
                        onChange={(e) => setEventForm((f) => ({ ...f, rsvpEmail: e.target.value }))}
                      />
                    </FormField>
                  </div>
                  <FormField label="Tags (comma separated)">
                    <input
                      className={inputCls}
                      value={eventForm.tags.join(", ")}
                      onChange={(e) =>
                        setEventForm((f) => ({
                          ...f,
                          tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                        }))
                      }
                      placeholder="prayer, coffee, community"
                    />
                  </FormField>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={eventForm.isPublished}
                        onChange={(e) => setEventForm((f) => ({ ...f, isPublished: e.target.checked }))}
                        className="w-4 h-4 accent-brand-orange rounded"
                      />
                      <span className="font-medium text-brand-navy">Published</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={eventForm.isFeatured}
                        onChange={(e) => setEventForm((f) => ({ ...f, isFeatured: e.target.checked }))}
                        className="w-4 h-4 accent-brand-orange rounded"
                      />
                      <span className="font-medium text-brand-navy">Featured on homepage</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-brand-orange text-white px-7 py-3 rounded-xl font-semibold text-sm hover:bg-brand-orange-dark transition-colors"
                  >
                    <Save size={16} />
                    {editingEvent ? "Update Event" : "Create Event"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEventForm(false)}
                    className="px-7 py-3 rounded-xl font-semibold text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── POSTS ─────────────────────────────────── */}
          {tab === "posts" && !showPostForm && (
            <div>
              <div className="flex items-center justify-between mb-7">
                <h1 className="font-display text-2xl font-bold text-brand-navy">Blog Posts</h1>
                <button
                  onClick={openNewPost}
                  className="flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-orange-dark transition-colors"
                >
                  <Plus size={16} />
                  New Post
                </button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Title</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">Author</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden lg:table-cell">Category</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                      <th className="text-right px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-semibold text-brand-navy line-clamp-1">{post.title}</p>
                            <p className="text-gray-400 text-xs mt-0.5">{post.readTime} min read</p>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{post.author}</td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <span className="text-xs bg-brand-cream text-brand-orange px-2.5 py-1 rounded-full font-medium">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${post.isPublished ? "bg-green-500" : "bg-gray-300"}`} />
                            <span className="text-xs text-gray-500">{post.isPublished ? "Live" : "Draft"}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 justify-end">
                            <Link
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-brand-navy hover:bg-gray-100 transition-colors"
                              title="View"
                            >
                              <Eye size={15} />
                            </Link>
                            <button
                              onClick={() => togglePostPublished(post.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title={post.isPublished ? "Unpublish" : "Publish"}
                            >
                              {post.isPublished ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                            <button
                              onClick={() => openEditPost(post)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-brand-orange hover:bg-orange-50 transition-colors"
                              title="Edit"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => deletePost(post.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {posts.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <FileText size={32} className="mx-auto mb-3 opacity-40" />
                    <p>No posts yet. Write your first article!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── POST FORM ──────────────────────────────── */}
          {tab === "posts" && showPostForm && (
            <div>
              <div className="flex items-center gap-3 mb-7">
                <button
                  onClick={() => setShowPostForm(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X size={18} />
                </button>
                <h1 className="font-display text-2xl font-bold text-brand-navy">
                  {editingPost ? "Edit Post" : "New Post"}
                </h1>
              </div>
              <form onSubmit={savePost} className="space-y-6 max-w-3xl">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                  <h2 className="font-semibold text-brand-navy">Post Details</h2>
                  <FormField label="Title *">
                    <input
                      required
                      className={inputCls}
                      value={postForm.title}
                      onChange={(e) => setPostForm((f) => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))}
                      placeholder="Surviving your first winter in the Netherlands"
                    />
                  </FormField>
                  <FormField label="Excerpt *">
                    <textarea
                      required
                      rows={3}
                      className={inputCls + " resize-none"}
                      value={postForm.excerpt}
                      onChange={(e) => setPostForm((f) => ({ ...f, excerpt: e.target.value }))}
                      placeholder="Brief summary shown in listings"
                    />
                  </FormField>
                  <FormField label="Content *">
                    <textarea
                      required
                      rows={14}
                      className={inputCls + " resize-y font-mono text-xs"}
                      value={postForm.content}
                      onChange={(e) => setPostForm((f) => ({ ...f, content: e.target.value }))}
                      placeholder="Write your article here... Use ## for headings, **bold** for bold text."
                    />
                  </FormField>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Author *">
                      <input
                        required
                        className={inputCls}
                        value={postForm.author}
                        onChange={(e) => setPostForm((f) => ({ ...f, author: e.target.value }))}
                        placeholder="Sarah Mitchell"
                      />
                    </FormField>
                    <FormField label="Author Bio">
                      <input
                        className={inputCls}
                        value={postForm.authorBio}
                        onChange={(e) => setPostForm((f) => ({ ...f, authorBio: e.target.value }))}
                        placeholder="Short bio about the author"
                      />
                    </FormField>
                    <FormField label="Category">
                      <select
                        className={inputCls}
                        value={postForm.category}
                        onChange={(e) => setPostForm((f) => ({ ...f, category: e.target.value }))}
                      >
                        {["Expat Life", "Community", "Practical Guide", "Culture", "Faith", "Events"].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </FormField>
                    <FormField label="Read Time (minutes)">
                      <input
                        type="number"
                        className={inputCls}
                        value={postForm.readTime}
                        onChange={(e) => setPostForm((f) => ({ ...f, readTime: Number(e.target.value) }))}
                      />
                    </FormField>
                  </div>
                  <FormField label="Tags (comma separated)">
                    <input
                      className={inputCls}
                      value={postForm.tags.join(", ")}
                      onChange={(e) =>
                        setPostForm((f) => ({
                          ...f,
                          tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                        }))
                      }
                      placeholder="expat life, tips, community"
                    />
                  </FormField>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={postForm.isPublished}
                        onChange={(e) => setPostForm((f) => ({ ...f, isPublished: e.target.checked }))}
                        className="w-4 h-4 accent-brand-orange rounded"
                      />
                      <span className="font-medium text-brand-navy">Published</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={postForm.isFeatured}
                        onChange={(e) => setPostForm((f) => ({ ...f, isFeatured: e.target.checked }))}
                        className="w-4 h-4 accent-brand-orange rounded"
                      />
                      <span className="font-medium text-brand-navy">Featured</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-brand-orange text-white px-7 py-3 rounded-xl font-semibold text-sm hover:bg-brand-orange-dark transition-colors"
                  >
                    <Save size={16} />
                    {editingPost ? "Update Post" : "Create Post"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPostForm(false)}
                    className="px-7 py-3 rounded-xl font-semibold text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── SETTINGS ──────────────────────────────── */}
          {tab === "settings" && (
            <div className="max-w-2xl">
              <h1 className="font-display text-2xl font-bold text-brand-navy mb-7">Settings</h1>
              <div className="space-y-5">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-semibold text-brand-navy mb-5">Site Information</h2>
                  <div className="space-y-4 text-sm">
                    {[
                      { label: "Site Name", value: siteSettings.siteName },
                      { label: "Tagline", value: siteSettings.tagline },
                      { label: "Email", value: siteSettings.email },
                      { label: "Instagram", value: siteSettings.socialLinks.instagram },
                      { label: "Facebook", value: siteSettings.socialLinks.facebook },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center gap-4">
                        <span className="w-28 text-gray-400 shrink-0">{s.label}</span>
                        <span className="text-brand-navy font-medium">{s.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-xs text-gray-400">
                    To update site settings, edit{" "}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded">src/data/site.ts</code>
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-semibold text-brand-navy mb-3">Security</h2>
                  <p className="text-sm text-gray-500 mb-3">
                    The admin password is set in{" "}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded">src/data/site.ts</code>.
                    Change <code className="bg-gray-100 px-1 py-0.5 rounded">adminPassword</code> before deploying to production.
                  </p>
                  <p className="text-xs text-amber-600 bg-amber-50 px-4 py-3 rounded-xl">
                    ⚠️ Current password: <strong>admin2026</strong> — please change before going live!
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-semibold text-brand-navy mb-3">Deployment</h2>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>✅ <strong>Vercel deployment</strong> is pre-configured via <code className="bg-gray-100 px-1 py-0.5 rounded">next.config.js</code></p>
                    <p>✅ Run <code className="bg-gray-100 px-1.5 py-0.5 rounded">npm run build</code> locally to verify before deploying</p>
                    <p>✅ Push to GitHub and connect your repo in the Vercel dashboard</p>
                    <p>💡 For persistent CMS editing in production, add <strong>Vercel KV</strong> from the Vercel dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-navy mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-brand-navy placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors bg-white";
