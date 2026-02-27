import Link from 'next/link';
import { MessageSquare, ArrowBigUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { BlogPost } from '@/lib/mock-data/blog';
import { categoryLabels, categoryColors } from '@/lib/mock-data/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const netScore = post.upvotes - post.downvotes;

  return (
    <Card className="group overflow-hidden rounded-2xl border-gray-200 bg-white transition-all duration-200 hover:shadow-lg hover:shadow-gray-200/50">
      <Link href={`/blog/${post.id}`}>
        {/* Cover Image */}
        <div className="relative aspect-[2/1] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <Badge
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 border-transparent ${categoryColors[post.category]}`}
            >
              {categoryLabels[post.category]}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="mb-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-reno-green-dark line-clamp-2">
            {post.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-500 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Author + Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-7 w-7">
                <AvatarImage
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gray-100 text-xs font-semibold text-gray-600">
                  {post.authorName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-semibold text-gray-700">
                  {post.authorName}
                </p>
                <p className="text-[11px] text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString('en-CA', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <ArrowBigUp className="h-4 w-4" />
                {netScore}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {post.commentCount}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
