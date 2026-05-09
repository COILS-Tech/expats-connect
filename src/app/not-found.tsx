import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🌷</div>
        <h1 className="font-display text-6xl font-bold text-brand-navy mb-3">404</h1>
        <p className="text-xl text-gray-500 mb-8">
          Oops! This page seems to have cycled away.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-orange text-white px-7 py-3.5 rounded-full font-semibold hover:bg-brand-orange-dark transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
