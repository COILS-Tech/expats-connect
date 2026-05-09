"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <section className="bg-gradient-to-br from-brand-navy to-brand-navy-light py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-orange/20 mb-6">
          <Mail className="text-brand-orange" size={24} />
        </div>
        <h2 className="font-display text-3xl font-bold text-white mb-3">
          Stay Connected
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Get updates on upcoming events, expat resources and community news
          delivered to your inbox.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-green-400 bg-green-400/10 border border-green-400/20 rounded-2xl py-5 px-8">
            <CheckCircle size={22} />
            <p className="font-semibold">
              You&apos;re subscribed! Welcome to the community.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-brand-orange focus:bg-white/15 transition-all"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-brand-orange-dark transition-colors whitespace-nowrap"
            >
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        )}
        <p className="text-gray-600 text-xs mt-4">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
