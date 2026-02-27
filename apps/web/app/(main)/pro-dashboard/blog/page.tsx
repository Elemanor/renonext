import Link from 'next/link';
import { PenLine, Eye, ArrowBigUp, MessageSquare, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getBlogPostsByAuthor, categoryLabels, categoryColors } from '@/lib/mock-data/blog';

// Mock: pretend current pro user is author "1" (Marcus Johnson)
const currentProId = '1';

export default function ProBlogDashboard() {
  const posts = getBlogPostsByAuthor(currentProId);

  const totalUpvotes = posts.reduce((sum, p) => sum + p.upvotes, 0);
  const totalComments = posts.reduce((sum, p) => sum + p.commentCount, 0);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Blog Posts</h1>
        <Button asChild className="rounded-xl bg-reno-green-dark px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light h-auto">
          <Link href="/blog/write">
            <PenLine className="h-4 w-4" />
            Write New Post
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <Card className="rounded-2xl border-gray-200 bg-white p-5 text-center">
          <p className="text-3xl font-bold tracking-tight text-gray-900">{posts.length}</p>
          <p className="text-xs font-medium text-gray-500">Total Posts</p>
        </Card>
        <Card className="rounded-2xl border-gray-200 bg-white p-5 text-center">
          <p className="text-3xl font-bold tracking-tight text-orange-600">{totalUpvotes}</p>
          <p className="text-xs font-medium text-gray-500">Total Upvotes</p>
        </Card>
        <Card className="rounded-2xl border-gray-200 bg-white p-5 text-center">
          <p className="text-3xl font-bold tracking-tight text-reno-green-dark">{totalComments}</p>
          <p className="text-xs font-medium text-gray-500">Total Comments</p>
        </Card>
      </div>

      {/* Posts Table */}
      <Card className="rounded-2xl border-gray-200 bg-white">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-bold text-gray-900">Your Posts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {posts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="mb-2 text-gray-500">You haven&apos;t written any posts yet.</p>
              <Button asChild className="rounded-xl bg-reno-green-dark text-white hover:bg-reno-green-dark">
                <Link href="/blog/write">Write Your First Post</Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">
                    <ArrowBigUp className="mx-auto h-4 w-4" />
                  </TableHead>
                  <TableHead className="text-center">
                    <MessageSquare className="mx-auto h-4 w-4" />
                  </TableHead>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="pr-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id} className="group">
                    <TableCell className="pl-6 max-w-[280px]">
                      <Link
                        href={`/blog/${post.id}`}
                        className="font-semibold text-gray-900 hover:text-reno-green-dark line-clamp-1"
                      >
                        {post.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 border-transparent ${categoryColors[post.category]}`}>
                        {categoryLabels[post.category]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700 border-transparent">
                        Published
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm font-semibold text-gray-700">
                        {post.upvotes - post.downvotes}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm text-gray-600">{post.commentCount}</span>
                    </TableCell>
                    <TableCell className="text-center text-xs text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString('en-CA', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-gray-600"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                          <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                            <Link href={`/blog/${post.id}`} className="flex items-center gap-2">
                              <Eye className="h-3.5 w-3.5" />
                              View Post
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-lg">
                            <Edit className="h-3.5 w-3.5" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-lg text-red-600 focus:text-red-600">
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
