import Link from "next/link";
import { Clock, Tag, User } from "lucide-react";
import { timeAgo } from "@/lib/utils";
import type { Post } from "@/lib/types";

interface Props {
  post: Post;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: Props) {
  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
        <div className="bg-gradient-to-br from-brand-cream to-brand-cream-dark h-52 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-brand-navy/20" />
          <span className="text-6xl relative z-10">📖</span>
          <div className="absolute top-4 left-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-orange text-white uppercase tracking-wider">
              Featured
            </span>
          </div>
        </div>
        <div className="p-6">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-cream text-brand-orange mb-3 inline-block">
            {post.category}
          </span>
          <h3 className="font-display font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors mb-2 leading-snug">
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <User size={12} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readTime} min read
              </span>
              <span>{timeAgo(post.publishedAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-5 bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:border-brand-orange/20 transition-all duration-200"
    >
      <div className="w-16 h-16 shrink-0 bg-brand-cream rounded-xl flex items-center justify-center text-3xl">
        📝
      </div>
      <div className="min-w-0">
        <span className="text-xs font-medium text-brand-orange">{post.category}</span>
        <h3 className="font-semibold text-sm text-brand-navy group-hover:text-brand-orange transition-colors mt-0.5 leading-snug line-clamp-2">
          {post.title}
        </h3>
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {post.readTime} min
          </span>
          <span>{timeAgo(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
