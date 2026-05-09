import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, MapPin, MessageCircle } from "lucide-react";
import { siteSettings } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-sm">
                EC
              </div>
              <span className="font-display font-bold text-lg">
                Expats Connect
                <span className="block text-xs font-sans font-normal text-brand-orange tracking-widest uppercase leading-none">
                  Netherlands
                </span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Building a vibrant expat community in the Netherlands — one
              connection at a time.
            </p>
            <div className="flex gap-3">
              <a
                href={siteSettings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={siteSettings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={siteSettings.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter size={16} />
              </a>
              <a
                href={siteSettings.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-brand-orange mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/events", label: "Events" },
                { href: "/blog", label: "Blog & Resources" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-brand-orange mb-5">
              Community
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/events", label: "Upcoming Events" },
                { href: "/events#sip-and-pray", label: "Sip & Pray" },
                { href: "/blog", label: "Expat Stories" },
                { href: "/about#mission", label: "Our Mission" },
                { href: "/admin", label: "Admin" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-brand-orange mb-5">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-orange mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">
                  Amsterdam, Netherlands
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-brand-orange mt-0.5 shrink-0" />
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {siteSettings.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-gray-300 font-medium mb-1">
                Next Event
              </p>
              <p className="text-white font-semibold text-sm">Sip & Pray</p>
              <p className="text-brand-orange text-xs mt-1">
                6 June 2026 · 12:00 noon
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Expats Connect Netherlands. All rights
            reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Made with ♥ for the expat community
          </p>
        </div>
      </div>
    </footer>
  );
}
