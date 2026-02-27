import Link from 'next/link';
import { Search, PenLine, TrendingUp, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { BlogCard } from '@/components/blog-card';
import { mockBlogPosts, categoryLabels, categoryColors } from '@/lib/mock-data/blog';
import type { BlogCategory } from '@/lib/mock-data/blog';

export const metadata = {
  title: 'Blog - Pro Knowledge Hub | RenoNext',
  description: 'Learn from verified pros. Tips, how-to guides, case studies, and industry news from Toronto\'s top home service professionals.',
};

const categories: { key: BlogCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All Posts' },
  { key: 'tips', label: 'Tips & Tricks' },
  { key: 'how-to', label: 'How-To Guides' },
  { key: 'case-study', label: 'Case Studies' },
  { key: 'industry-news', label: 'Industry News' },
];

// Top contributors based on mock data
const topContributors = [
  { name: 'Marcus Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', posts: 2 },
  { name: 'Tom Chen', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', posts: 1 },
  { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face', posts: 1 },
  { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', posts: 1 },
  { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face', posts: 1 },
];

const popularTags = [
  'electrical', 'plumbing', 'renovation', 'hvac', 'toronto',
  'home-safety', 'winter', 'budgeting', 'ev-charger', 'energy-efficiency',
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-reno-green-dark via-reno-green-dark to-secondary-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm border-white/20">
            Community Knowledge
          </Badge>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Pro Knowledge Hub
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Learn from Toronto&apos;s verified professionals. Practical tips, detailed guides,
            and real-world insights from the experts who know your home best.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm ring-1 ring-white/20 transition-all duration-200 focus-within:bg-white/20 focus-within:ring-white/40">
              <Search className="h-5 w-5 text-white/60" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full bg-transparent text-sm text-white placeholder-white/50 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Category Tabs */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <Badge
                key={cat.key}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors border-transparent ${
                  i === 0
                    ? 'bg-reno-green-dark text-white hover:bg-reno-green-dark'
                    : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </Badge>
            ))}
          </div>
          <Button asChild className="rounded-xl bg-reno-green-dark px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-lg hover:shadow-reno-green-light">
            <Link href="/blog/write">
              <PenLine className="h-4 w-4" />
              Write a Post
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Blog Posts Grid */}
          <div className="space-y-6 lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              {mockBlogPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <Card className="rounded-2xl border-gray-200 bg-white p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400">
                <TrendingUp className="h-4 w-4" />
                Top Contributors
              </h3>
              <div className="space-y-3">
                {topContributors.map((contributor) => (
                  <div key={contributor.name} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contributor.avatar} alt={contributor.name} className="object-cover" />
                      <AvatarFallback className="bg-gray-100 text-xs">{contributor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-700 truncate">{contributor.name}</p>
                    </div>
                    <span className="text-xs text-gray-400">{contributor.posts} posts</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Popular Tags */}
            <Card className="rounded-2xl border-gray-200 bg-white p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400">
                <Hash className="h-4 w-4" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge
                    key={tag}
                    className="cursor-pointer rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-reno-green-light hover:text-reno-green-dark border-transparent"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Write CTA */}
            <Card className="rounded-2xl border-reno-green-light bg-gradient-to-br from-reno-green-light to-secondary-50/50 p-6 text-center">
              <h3 className="mb-2 text-lg font-bold text-gray-900">Share Your Expertise</h3>
              <p className="mb-4 text-sm text-gray-600">
                Are you a verified pro? Write articles to build your reputation and help homeowners.
              </p>
              <Button asChild className="w-full rounded-xl bg-reno-green-dark py-2.5 text-sm font-semibold text-white hover:bg-reno-green-dark h-auto">
                <Link href="/blog/write">
                  <PenLine className="h-4 w-4" />
                  Start Writing
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
