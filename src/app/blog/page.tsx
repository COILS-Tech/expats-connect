import type { Metadata } from "next";
import Link from "next/link";
import { Clock, User, Tag } from "lucide-react";
import { getPublishedPosts, getFeaturedPost } from "@/data/posts";
import { timeAgo } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog & Resources",
  description:
    "Practical guides, expat stories and community insights for internationals living in the Netherlands.",
};

export default function BlogPage() {
  const featuredPost = getFeaturedPost();
  const posts = getPublishedPosts();

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-navy to-brand-navy-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-orange mb-4">
            Expat Insights
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Blog &amp; Resources
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Practical guides, personal stories, and community insights to help
            you build a brilliant life in the Netherlands.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 md:flex"
            >
              <div className="md:w-2/5 bg-gradient-to-br from-brand-orange/20 via-brand-cream to-brand-navy/10 flex items-center justify-center min-h-48 md:min-h-auto relative">
                <span className="text-8xl">📖</span>
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-brand-orange text-white uppercase tracking-wider">
                    Featured
                  </span>
                </div>
              </div>
              <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-cream text-brand-orange mb-4 inline-block">
                  {featuredPost.category}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-navy group-hover:text-brand-orange transition-colors mb-3 leading-snug">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <User size={14} />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {featuredPost.readTime} min read
                  </span>
                  <span>{timeAgo(featuredPost.publishedAt)}</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-44 bg-gradient-to-br from-brand-cream to-brand-cream-dark flex items-center justify-center relative">
                <span className="text-6xl">📝</span>
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white text-brand-orange">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-brand-navy group-hover:text-brand-orange transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full"
                    >
                      <Tag size={9} />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1.5">
                    <User size={12} />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {post.readTime} min
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">✍️</div>
            <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">
              No posts yet
            </h3>
            <p className="text-gray-500">
              Articles and guides are coming soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
