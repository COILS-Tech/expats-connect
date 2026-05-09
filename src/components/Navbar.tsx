"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteSettings } from "@/data/site";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
              EC
            </div>
            <span className="font-display font-bold text-brand-navy text-lg leading-tight">
              Expats Connect
              <span className="block text-xs font-sans font-normal text-brand-orange tracking-widest uppercase leading-none">
                Netherlands
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  pathname === link.href
                    ? "bg-brand-orange text-white"
                    : "text-brand-navy hover:bg-brand-cream hover:text-brand-orange"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/events"
              className="hidden md:inline-flex items-center gap-2 bg-brand-orange text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-brand-orange-dark transition-colors"
            >
              Join an Event
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-brand-navy hover:bg-brand-cream transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={clsx(
                "block px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === link.href
                  ? "bg-brand-orange text-white"
                  : "text-brand-navy hover:bg-brand-cream"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/events"
            onClick={() => setIsOpen(false)}
            className="block mt-3 text-center bg-brand-orange text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-brand-orange-dark transition-colors"
          >
            Join an Event
          </Link>
        </div>
      )}
    </nav>
  );
}
