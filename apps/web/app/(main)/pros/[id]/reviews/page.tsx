import Link from 'next/link';
import { Star, ChevronRight, ThumbsUp, MessageSquare, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { mockDetailedReviews, getAverageSubRatings } from '@/lib/mock-data/reviews';
import { WriteReviewDialog } from '@/components/write-review-dialog';
import { StarRatingInput } from '@/components/star-rating-input';

interface ReviewsPageProps {
  params: Promise<{ id: string }>;
}

const mockPro = {
  id: '1',
  name: 'Marcus Johnson',
  rating: 4.9,
  reviewCount: 127,
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
};

const starDistribution = [
  { stars: 5, count: 102, pct: 80 },
  { stars: 4, count: 19, pct: 15 },
  { stars: 3, count: 4, pct: 3 },
  { stars: 2, count: 1, pct: 1 },
  { stars: 1, count: 1, pct: 1 },
];

export default async function ProReviewsPage({ params }: ReviewsPageProps) {
  const resolvedParams = await params;
  const reviews = mockDetailedReviews.filter((r) => r.proId === resolvedParams.id);
  const subRatings = getAverageSubRatings(resolvedParams.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/pros" className="hover:text-gray-700">Pros</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/pros/${resolvedParams.id}`} className="hover:text-gray-700">{mockPro.name}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-gray-900">Reviews</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Review Summary */}
          <div className="space-y-6">
            {/* Rating Overview */}
            <Card className="sticky top-20 rounded-2xl border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mockPro.avatarUrl} alt={mockPro.name} className="object-cover" />
                  <AvatarFallback className="bg-reno-green-light font-bold text-reno-green-dark">
                    {mockPro.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Reviews</h1>
                  <p className="text-sm text-gray-500">{mockPro.name}</p>
                </div>
              </div>

              {/* Overall Score */}
              <div className="mb-5 flex items-center gap-4 rounded-xl bg-amber-50/70 p-4">
                <span className="text-4xl font-extrabold tracking-tight text-gray-900">
                  {mockPro.rating}
                </span>
                <div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(mockPro.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {mockPro.reviewCount} reviews
                  </p>
                </div>
              </div>

              {/* Distribution */}
              <div className="mb-5 space-y-1.5">
                {starDistribution.map((row) => (
                  <div key={row.stars} className="flex items-center gap-2.5">
                    <span className="w-4 text-right text-xs font-semibold text-gray-600">{row.stars}</span>
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-amber-400 transition-all duration-500"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-xs text-gray-400">{row.count}</span>
                  </div>
                ))}
              </div>

              {/* Sub-Ratings */}
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Rating Breakdown
                </h3>
                {[
                  { label: 'Quality', value: subRatings.quality },
                  { label: 'Punctuality', value: subRatings.punctuality },
                  { label: 'Communication', value: subRatings.communication },
                  { label: 'Value', value: subRatings.value },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <StarRatingInput value={item.value} size="sm" readonly />
                      <span className="min-w-[2ch] text-right text-xs font-bold text-gray-700">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Write Review CTA */}
              <WriteReviewDialog proName={mockPro.name}>
                <Button className="mt-5 w-full rounded-xl bg-reno-green py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark h-auto">
                  Write a Review
                </Button>
              </WriteReviewDialog>
            </Card>
          </div>

          {/* Right: Review List */}
          <div className="space-y-4 lg:col-span-2">
            {/* Filter / Sort Bar */}
            <Card className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-gray-200 bg-white p-4">
              <div className="flex flex-wrap gap-2">
                {['All', '5 Star', '4 Star', '3 Star', '2 Star', '1 Star'].map((filter, i) => (
                  <Badge
                    key={filter}
                    className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-colors border-transparent ${
                      i === 0
                        ? 'bg-reno-green-light text-reno-green-dark ring-1 ring-reno-green-light/50'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
              <Button variant="ghost" className="flex items-center gap-1 text-xs font-medium text-gray-500 h-auto px-2 py-1">
                Most Recent <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </Card>

            {/* Reviews */}
            {reviews.map((review) => (
              <Card key={review.id} className="rounded-2xl border-gray-200 bg-white p-6">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.reviewerAvatar} alt={review.reviewerName} className="object-cover" />
                      <AvatarFallback className="bg-gray-100 text-sm font-semibold text-gray-600">
                        {review.reviewerName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{review.reviewerName}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString('en-CA', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Title + Comment */}
                <h3 className="mb-2 font-semibold text-gray-900">{review.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">{review.comment}</p>

                {/* Sub-Ratings (collapsed display) */}
                <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1.5">
                  {[
                    { label: 'Quality', val: review.qualityRating },
                    { label: 'Punctuality', val: review.punctualityRating },
                    { label: 'Communication', val: review.communicationRating },
                    { label: 'Value', val: review.valueRating },
                  ].map((sub) => (
                    <div key={sub.label} className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-400">{sub.label}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < sub.val
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Photos */}
                {review.photos.length > 0 && (
                  <div className="mb-4 flex gap-2">
                    {review.photos.map((photo, i) => (
                      <div key={i} className="h-20 w-20 overflow-hidden rounded-lg">
                        <img
                          src={photo}
                          alt={`Review photo ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Pro Response */}
                {review.proResponse && (
                  <div className="mb-4 rounded-xl bg-reno-green-light/50 p-4">
                    <p className="mb-1 text-xs font-bold text-reno-green-dark">
                      <MessageSquare className="mr-1 inline h-3 w-3" />
                      Response from {review.proName}
                    </p>
                    <p className="text-sm text-gray-600">{review.proResponse}</p>
                  </div>
                )}

                {/* Helpful */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-gray-400 transition-all duration-200 hover:bg-gray-50 hover:text-gray-600 h-auto"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Helpful ({review.helpfulCount})
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
