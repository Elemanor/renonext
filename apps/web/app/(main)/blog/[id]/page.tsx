import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Clock, Share2, Bookmark, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { VoteButton } from '@/components/vote-button';
import {
  mockBlogPosts,
  mockBlogComments,
  categoryLabels,
  categoryColors,
  getBlogPostById,
  getCommentsForPost,
} from '@/lib/mock-data/blog';

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPostById(resolvedParams.id);
  return {
    title: post ? `${post.title} | RenoNext Blog` : 'Blog Post | RenoNext',
    description: post?.excerpt || '',
  };
}

function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function renderMarkdownContent(content: string) {
  // Simple markdown-like rendering for mock content
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  const flushTable = () => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="my-4 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                {tableRows[0].map((cell, ci) => (
                  <th key={ci} className="px-4 py-2.5 text-left font-semibold text-gray-700">{cell.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(1).map((row, ri) => (
                <tr key={ri} className="border-b border-gray-100 last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2.5 text-gray-600">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table detection
    if (line.includes('|') && line.trim().startsWith('|')) {
      if (line.replace(/[|\-\s]/g, '') === '') continue; // skip separator row
      const cells = line.split('|').filter(c => c.trim() !== '');
      tableRows.push(cells);
      inTable = true;
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="mb-4 mt-8 text-3xl font-extrabold tracking-tight text-gray-900">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="mb-3 mt-8 text-2xl font-bold text-gray-900">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="mb-2 mt-6 text-lg font-bold text-gray-900">{line.slice(4)}</h3>);
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} className="mb-2 font-semibold text-gray-900">{line.slice(2, -2)}</p>);
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={i} className="ml-5 list-disc text-gray-600">{line.slice(2)}</li>
      );
    } else if (/^\d+\.\s/.test(line)) {
      elements.push(
        <li key={i} className="ml-5 list-decimal text-gray-600">{line.replace(/^\d+\.\s/, '')}</li>
      );
    } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      elements.push(<p key={i} className="mb-4 italic text-gray-500">{line.slice(1, -1)}</p>);
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(<p key={i} className="mb-3 leading-relaxed text-gray-600">{line}</p>);
    }
  }
  flushTable();

  return elements;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = getBlogPostById(resolvedParams.id);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Post not found</p>
      </div>
    );
  }

  const comments = getCommentsForPost(post.id);
  const readingTime = estimateReadingTime(post.content);
  const relatedPosts = mockBlogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 overflow-hidden md:h-80">
        <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute left-0 top-0 w-full">
          <div className="container mx-auto px-4 pt-4">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-white line-clamp-1">{post.title}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex gap-8">
          {/* Vote Sidebar - Desktop */}
          <div className="hidden shrink-0 lg:block">
            <div className="sticky top-24">
              <VoteButton upvotes={post.upvotes} downvotes={post.downvotes} />
            </div>
          </div>

          {/* Main Content */}
          <div className="min-w-0 flex-1">
            <Card className="rounded-2xl border-gray-200 bg-white p-6 md:p-10">
              {/* Category */}
              <Badge className={`mb-4 rounded-full px-3 py-1 text-xs font-semibold ring-1 border-transparent ${categoryColors[post.category]}`}>
                {categoryLabels[post.category]}
              </Badge>

              {/* Title */}
              <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                {post.title}
              </h1>

              {/* Author Card */}
              <div className="mb-6 flex items-center gap-4 rounded-xl bg-gray-50 p-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.authorAvatar} alt={post.authorName} className="object-cover" />
                  <AvatarFallback className="bg-reno-green-light font-bold text-reno-green-dark">
                    {post.authorName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Link href={`/pros/${post.authorId}`} className="font-semibold text-gray-900 hover:text-reno-green">
                    {post.authorName}
                  </Link>
                  <p className="text-xs text-gray-500">{post.authorHeadline}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {readingTime} min read
                  </span>
                  <span>
                    {new Date(post.createdAt).toLocaleDateString('en-CA', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Mobile Vote + Actions */}
              <div className="mb-6 flex items-center justify-between lg:hidden">
                <VoteButton upvotes={post.upvotes} downvotes={post.downvotes} layout="horizontal" size="sm" />
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-lg text-gray-400 hover:text-gray-600">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-lg text-gray-400 hover:text-gray-600">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator className="mb-8" />

              {/* Content */}
              <article className="prose-custom max-w-none">
                {renderMarkdownContent(post.content)}
              </article>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border-transparent hover:bg-gray-200"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Share */}
              <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-6">
                <span className="text-sm font-medium text-gray-500">Share:</span>
                <Button variant="outline" size="sm" className="rounded-lg text-xs">
                  <Share2 className="h-3.5 w-3.5" />
                  Copy Link
                </Button>
              </div>
            </Card>

            {/* Comments Section */}
            <Card className="mt-6 rounded-2xl border-gray-200 bg-white p-6 md:p-8">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                Comments ({comments.length})
              </h2>

              {/* Add Comment */}
              <div className="mb-6 rounded-xl bg-gray-50 p-4">
                <textarea
                  placeholder="Add a comment..."
                  rows={3}
                  className="mb-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none placeholder-gray-400 transition-colors focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                />
                <div className="flex justify-end">
                  <Button className="rounded-xl bg-reno-green px-4 py-2 text-xs font-semibold text-white hover:bg-reno-green-dark h-auto">
                    Post Comment
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <div className="flex gap-3">
                      <VoteButton
                        upvotes={comment.upvotes}
                        downvotes={comment.downvotes}
                        size="sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={comment.authorAvatar} alt={comment.authorName} className="object-cover" />
                            <AvatarFallback className="bg-gray-100 text-[10px]">{comment.authorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-semibold text-gray-700">{comment.authorName}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(comment.createdAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{comment.content}</p>
                        <button className="mt-1 text-xs font-medium text-gray-400 hover:text-gray-600">
                          Reply
                        </button>

                        {/* Replies */}
                        {comment.replies.length > 0 && (
                          <div className="mt-4 space-y-4 border-l-2 border-gray-100 pl-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex gap-3">
                                <VoteButton
                                  upvotes={reply.upvotes}
                                  downvotes={reply.downvotes}
                                  size="sm"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Avatar className="h-5 w-5">
                                      <AvatarImage src={reply.authorAvatar} alt={reply.authorName} className="object-cover" />
                                      <AvatarFallback className="bg-gray-100 text-[9px]">{reply.authorName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-semibold text-gray-700">{reply.authorName}</span>
                                    <Badge className="bg-reno-green-light text-reno-green text-[10px] px-1.5 py-0 border-transparent">
                                      PRO
                                    </Badge>
                                    <span className="text-xs text-gray-400">
                                      {new Date(reply.createdAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600">{reply.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Related Posts */}
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relPost) => (
                  <Card key={relPost.id} className="group overflow-hidden rounded-2xl border-gray-200 bg-white transition-all hover:shadow-md">
                    <Link href={`/blog/${relPost.id}`}>
                      <div className="aspect-[2/1] overflow-hidden">
                        <img src={relPost.coverImage} alt={relPost.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-4">
                        <Badge className={`mb-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 border-transparent ${categoryColors[relPost.category]}`}>
                          {categoryLabels[relPost.category]}
                        </Badge>
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-reno-green">
                          {relPost.title}
                        </h3>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Actions Sidebar */}
          <div className="hidden shrink-0 lg:block">
            <div className="sticky top-24 flex flex-col items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <Bookmark className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
