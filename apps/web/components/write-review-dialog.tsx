'use client';

import { useState } from 'react';
import { Camera, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { StarRatingInput } from '@/components/star-rating-input';

interface WriteReviewDialogProps {
  proName: string;
  children: React.ReactNode;
}

export function WriteReviewDialog({ proName, children }: WriteReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [punctualityRating, setPunctualityRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      // Reset after close animation
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setQualityRating(0);
        setPunctualityRating(0);
        setCommunicationRating(0);
        setValueRating(0);
        setTitle('');
        setComment('');
      }, 300);
    }, 2000);
  };

  const canSubmit = rating > 0 && title.trim() !== '' && comment.trim() !== '';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Review {proName}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Share your experience to help other homeowners
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Review Submitted!</h3>
            <p className="mt-1 text-sm text-gray-500">
              Thank you for your feedback. Your review will be visible shortly.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Overall Rating */}
            <div>
              <Label className="mb-2 block text-sm font-semibold text-gray-900">
                Overall Rating *
              </Label>
              <StarRatingInput value={rating} onChange={setRating} size="lg" />
            </div>

            {/* Sub Ratings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Quality of Work
                </Label>
                <StarRatingInput value={qualityRating} onChange={setQualityRating} size="sm" />
              </div>
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Punctuality
                </Label>
                <StarRatingInput value={punctualityRating} onChange={setPunctualityRating} size="sm" />
              </div>
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Communication
                </Label>
                <StarRatingInput value={communicationRating} onChange={setCommunicationRating} size="sm" />
              </div>
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Value for Money
                </Label>
                <StarRatingInput value={valueRating} onChange={setValueRating} size="sm" />
              </div>
            </div>

            {/* Title */}
            <div>
              <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                Review Title *
              </Label>
              <Input
                placeholder="Summarize your experience"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-xl border-gray-200"
              />
            </div>

            {/* Comment */}
            <div>
              <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                Your Review *
              </Label>
              <Textarea
                placeholder="Tell others about your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="rounded-xl border-gray-200"
              />
            </div>

            {/* Photo Upload Placeholder */}
            <div>
              <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                Photos (optional)
              </Label>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 px-4 py-6 text-sm text-gray-400 transition-colors hover:border-reno-green hover:text-reno-green"
              >
                <Camera className="h-5 w-5" />
                Click to add photos
              </button>
            </div>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full rounded-xl bg-reno-green-dark py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark disabled:opacity-50 h-auto"
            >
              <Send className="h-4 w-4" />
              Submit Review
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
