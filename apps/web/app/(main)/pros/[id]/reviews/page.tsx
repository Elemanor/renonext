import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, ChevronRight, ThumbsUp, MessageSquare, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { WriteReviewDialog } from '@/components/write-review-dialog';
import { StarRatingInput } from '@/components/star-rating-input';
import { fetchProByIdWithDetails } from '@/lib/supabase/queries/profiles';

interface ReviewsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProReviewsPage({ params }: ReviewsPageProps) {
  const resolvedParams = await params;
  const { data } = await fetchProByIdWithDetails(resolvedParams.id);

  if (!data) {
    notFound();
  }

  const pro = {
    id: data.id,
    name: data.profile?.full_name || 'Unknown',
    rating: Number(data.avg_rating) || 0,
    reviewCount: data.total_reviews || 0,
    avatarUrl: data.profile?.avatar_url || '',
  };

  const reviews = (data.reviews || []).map((r: any) => ({
    id: r.id,
    proId: resolvedParams.id,
    reviewerName: r.reviewer?.full_name || 'Anonymous',
    reviewerAvatar: r.reviewer?.avatar_url || '',
    rating: r.rating || 0,
    title: r.title || '',
    comment: r.comment || '',
    createdAt: r.created_at,
    qualityRating: r.quality_rating || r.rating || 0,
    punctualityRating: r.punctuality_rating || r.rating || 0,
    communicationRating: r.communication_rating || r.rating || 0,
    valueRating: r.value_rating || r.rating || 0,
    photos: (r.photos || []) as string[],
    proResponse: r.pro_response || null,
    proName: pro.name,
    helpfulCount: 0,
  }));

  // Calculate star distribution
  const starCounts = [0, 0, 0, 0, 0];
  reviews.forEach((r: any) => {
    if (r.rating >= 1 && r.rating <= 5) {
      starCounts[r.rating - 1]++;
    }
  });

  const starDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = starCounts[stars - 1];
    const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
    return { stars, count, pct };
  });

  // Calculate average sub-ratings
  const subRatings = {
    quality: reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.qualityRating, 0) / reviews.length
      : 0,
    punctuality: reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.punctualityRating, 0) / reviews.length
      : 0,
    communication: reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.communicationRating, 0) / reviews.length
      : 0,
    value: reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.valueRating, 0) / reviews.length
      : 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/pros" className="hover:text-gray-700">Pros</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/pros/${resolvedParams.id}`} className="hover:text-gray-700">{pro.name}</Link>
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
                  <AvatarImage src={pro.avatarUrl} alt={pro.name} className="object-cover" />
                  <AvatarFallback className="bg-reno-green-light font-bold text-reno-green-dark">
                    {pro.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Reviews</h1>
                  <p className="text-sm text-gray-500">{pro.name}</p>
                </div>
              </div>

              {/* Overall Score */}
              <div className="mb-5 flex items-center gap-4 rounded-xl bg-amber-50/70 p-4">
                <span className="text-4xl font-extrabold tracking-tight text-gray-900">
                  {pro.rating.toFixed(1)}
                </span>
                <div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(pro.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {pro.reviewCount} reviews
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
                        {item.value.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Write Review CTA */}
              <WriteReviewDialog proName={pro.name}>
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

            {/* Empty State */}
            {reviews.length === 0 && (
              <Card className="rounded-2xl border-gray-200 bg-white p-12 text-center">
                <p className="text-lg font-semibold text-gray-600">No reviews yet</p>
                <p className="mt-2 text-sm text-gray-400">
                  This contractor hasn't received any reviews yet.
                </p>
              </Card>
            )}

            {/* Reviews */}
            {reviews.map((review: any) => (
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
                    {review.photos.map((photo: string, i: number) => (
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
