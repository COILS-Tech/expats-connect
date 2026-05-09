import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, Tag, Calendar } from "lucide-react";
import { getPostBySlug, getPublishedPosts } from "@/data/posts";
import { timeAgo } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getPublishedPosts().filter((p) => p.slug !== slug);
  const related = allPosts
    .filter((p) => p.category === post.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-navy to-brand-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-brand-orange text-white mb-5 uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            {post.title}
          </h1>
          <p className="text-white/70 text-lg mb-8">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {timeAgo(post.publishedAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Content */}
          <article className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
              <div className="prose max-w-none">
                {post.content.split("\n\n").map((block, i) => {
                  if (block.startsWith("## ")) {
                    return (
                      <h2 key={i} className="font-display text-2xl font-bold text-brand-navy mt-8 mb-4">
                        {block.slice(3)}
                      </h2>
                    );
                  }
                  if (block.startsWith("### ")) {
                    return (
                      <h3 key={i} className="font-semibold text-xl text-brand-navy mt-6 mb-3">
                        {block.slice(4)}
                      </h3>
                    );
                  }
                  const lines = block.split("\n");
                  return (
                    <div key={i}>
                      {lines.map((line, j) => {
                        const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                        const italic = bold.replace(/\*(.*?)\*/g, "<em>$1</em>");
                        return (
                          <p
                            key={j}
                            className="text-gray-700 leading-relaxed mb-4"
                            dangerouslySetInnerHTML={{ __html: italic }}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Author */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-400 mb-4">
                About the Author
              </h3>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-brand-gold flex items-center justify-center text-white font-bold shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-brand-navy text-sm">{post.author}</p>
                  <p className="text-gray-500 text-xs leading-relaxed mt-1">{post.authorBio}</p>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-400 mb-4">
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      href={`/blog/${r.slug}`}
                      className="group block"
                    >
                      <p className="font-semibold text-sm text-brand-navy group-hover:text-brand-orange transition-colors leading-snug">
                        {r.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <Clock size={10} />
                        {r.readTime} min read
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-brand-navy to-brand-navy-light rounded-2xl p-6 text-white">
              <p className="font-semibold mb-2">Join our community</p>
              <p className="text-white/70 text-sm mb-4">
                Come to one of our events and connect in person.
              </p>
              <Link
                href="/events"
                className="block text-center bg-brand-orange text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-orange-dark transition-colors"
              >
                View Events →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
