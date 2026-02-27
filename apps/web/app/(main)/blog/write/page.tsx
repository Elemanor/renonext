'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Image, Eye, EyeOff, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const categories = [
  { value: 'tips', label: 'Tips & Tricks' },
  { value: 'how-to', label: 'How-To Guide' },
  { value: 'case-study', label: 'Case Study' },
  { value: 'industry-news', label: 'Industry News' },
];

export default function BlogWritePage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase().replace(/\s+/g, '-');
    if (tag && !tags.includes(tag) && tags.length < 8) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const canSubmit = title.trim() !== '' && category !== '' && content.trim().length > 50;

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="max-w-md rounded-2xl border-gray-200 bg-white p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-900">Post Published!</h2>
          <p className="mb-6 text-sm text-gray-500">
            Your blog post has been published and is now visible to the community.
          </p>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1 rounded-xl">
              <Link href="/blog">View Blog</Link>
            </Button>
            <Button
              onClick={() => {
                setSubmitted(false);
                setTitle('');
                setCategory('');
                setTags([]);
                setContent('');
              }}
              className="flex-1 rounded-xl bg-reno-green-dark text-white hover:bg-reno-green-dark"
            >
              Write Another
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/blog" className="hover:text-gray-700">Blog</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-gray-900">Write a Post</span>
        </div>

        <Card className="rounded-2xl border-gray-200 bg-white p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Write a Post</h1>
            <Button
              variant="ghost"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>

          {showPreview ? (
            /* Preview Mode */
            <div className="prose-custom max-w-none">
              <h1 className="mb-4 text-3xl font-extrabold text-gray-900">
                {title || 'Untitled Post'}
              </h1>
              {tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 border-transparent">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="whitespace-pre-wrap text-gray-600">
                {content || 'Start writing your content...'}
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <div className="space-y-5">
              {/* Title */}
              <div>
                <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  Title *
                </Label>
                <Input
                  placeholder="Write an engaging title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl border-gray-200 text-lg font-semibold"
                />
              </div>

              {/* Category */}
              <div>
                <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  Category *
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="rounded-xl border-gray-200">
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags */}
              <div>
                <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  Tags
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    className="rounded-xl border-gray-200"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTag}
                    className="shrink-0 rounded-xl"
                  >
                    Add
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="flex items-center gap-1 rounded-full bg-reno-green-light px-3 py-1 text-xs font-medium text-reno-green-dark border-transparent"
                      >
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-0.5 rounded-full hover:text-reno-green-dark"
                        >
                          &times;
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Cover Image */}
              <div>
                <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  Cover Image
                </Label>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 px-4 py-10 text-sm text-gray-400 transition-colors hover:border-reno-green hover:text-reno-green"
                >
                  <Image className="h-6 w-6" />
                  Click to upload a cover image
                </button>
              </div>

              {/* Content */}
              <div>
                <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  Content *
                </Label>
                <Textarea
                  placeholder="Share your expertise... Use markdown formatting for headers (##), lists (-), bold (**text**), etc."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={16}
                  className="rounded-xl border-gray-200 font-mono text-sm"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Supports basic formatting. Minimum 50 characters.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                <Button asChild variant="ghost" className="text-sm text-gray-500 hover:text-gray-700">
                  <Link href="/blog">Cancel</Link>
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="rounded-xl bg-reno-green-dark px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark disabled:opacity-50 h-auto"
                >
                  <Send className="h-4 w-4" />
                  Publish Post
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
