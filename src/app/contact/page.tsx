"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, Instagram, Facebook, CheckCircle, Send } from "lucide-react";
import { siteSettings } from "@/data/site";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || "Message from website");
    const body = encodeURIComponent(
      `Hi,\n\nMy name is ${form.name}.\n\n${form.message}\n\nBest regards,\n${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${siteSettings.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-navy to-brand-navy-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-orange mb-4">
            Get in Touch
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Have a question, want to collaborate, or just want to say hello?
            We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h2 className="font-display font-bold text-lg text-brand-navy mb-5">
                Find Us
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-cream flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-brand-navy">Location</p>
                    <p className="text-gray-500 text-sm">Amsterdam, Netherlands</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-cream flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-brand-navy">Email</p>
                    <a
                      href={`mailto:${siteSettings.email}`}
                      className="text-brand-orange text-sm hover:underline"
                    >
                      {siteSettings.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-cream flex items-center justify-center shrink-0">
                    <MessageCircle size={18} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-brand-navy">WhatsApp</p>
                    <a
                      href={siteSettings.socialLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-orange text-sm hover:underline"
                    >
                      Join our WhatsApp group
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h2 className="font-display font-bold text-lg text-brand-navy mb-5">
                Follow Us
              </h2>
              <div className="space-y-3">
                {[
                  { icon: Instagram, label: "Instagram", href: siteSettings.socialLinks.instagram, handle: "@expatsconnectnl" },
                  { icon: Facebook, label: "Facebook", href: siteSettings.socialLinks.facebook, handle: "Expats Connect NL" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-cream transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-brand-cream group-hover:bg-brand-orange flex items-center justify-center transition-colors">
                      <s.icon size={16} className="text-brand-orange group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-brand-navy">{s.label}</p>
                      <p className="text-gray-400 text-xs">{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Next event reminder */}
            <div className="bg-gradient-to-br from-brand-orange to-brand-orange-dark rounded-2xl p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-2">
                Next Event
              </p>
              <p className="font-display font-bold text-xl">Sip &amp; Pray</p>
              <p className="text-white/80 text-sm mt-1">
                Saturday, 6 June 2026 · 12:00 noon
              </p>
              <p className="text-white/70 text-sm">Amsterdam, Netherlands</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={52} className="text-green-500 mb-4" />
                  <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500">
                    Your email client should have opened. We&apos;ll get back to you
                    soon.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold text-brand-navy mb-7">
                    Send a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-brand-navy mb-1.5">
                          Your Name <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-navy placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-navy mb-1.5">
                          Email Address <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jane@example.com"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-navy placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-navy mb-1.5">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="RSVP: Sip & Pray – 6 June 2026">RSVP for Sip &amp; Pray</option>
                        <option value="General enquiry">General Enquiry</option>
                        <option value="Event partnership">Event Partnership</option>
                        <option value="Volunteer">I want to Volunteer</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-navy mb-1.5">
                        Message <span className="text-brand-orange">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-navy placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white py-4 rounded-xl font-semibold hover:bg-brand-orange-dark transition-colors"
                    >
                      <Send size={16} />
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
