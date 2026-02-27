'use client';

import type { SequenceStep } from '@renonext/shared/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShieldCheck,
  Flag,
  Users,
  BookOpen,
  AlertTriangle,
} from 'lucide-react';
import { SOFT_SURFACE, BODY, LABEL, FOCUS_RING, SCROLL_OFFSET } from '@/lib/ui/tokens';
import { JOURNEY_CAPTION } from '@/lib/ui/copy';

interface JourneyStepperProps {
  steps: SequenceStep[];
}

// Stock photos per step — swap for real project photos when wired to RPC
const stepImages: Record<number, { src: string; alt: string }> = {
  1: {
    src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=340&fit=crop',
    alt: 'Utility marking and site survey before excavation',
  },
  2: {
    src: 'https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=600&h=340&fit=crop',
    alt: 'Excavator digging along foundation wall',
  },
  3: {
    src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=340&fit=crop',
    alt: 'Foundation wall cleaning and crack repair',
  },
  4: {
    src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=340&fit=crop',
    alt: 'Waterproof membrane being applied to foundation',
  },
  5: {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=340&fit=crop',
    alt: 'Drainage board installation over membrane',
  },
  6: {
    src: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=600&h=340&fit=crop',
    alt: 'Weeping tile pipe installation at footing level',
  },
  7: {
    src: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=340&fit=crop',
    alt: 'Clear gravel being placed around drainage pipe',
  },
  8: {
    src: 'https://images.unsplash.com/photo-1632863753771-3004eea79e47?w=600&h=340&fit=crop',
    alt: 'Building inspector reviewing waterproofing work',
  },
  9: {
    src: 'https://images.unsplash.com/photo-1583024011790-a1e4e8de9a7e?w=600&h=340&fit=crop',
    alt: 'Backfill and compaction of excavation trench',
  },
  10: {
    src: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&h=340&fit=crop',
    alt: 'Restored landscape with fresh grading and seeding',
  },
};

export function JourneyStepper({ steps }: JourneyStepperProps) {
  const totalDays = steps.reduce((sum, s) => sum + (s.expected_duration_days || 0), 0);
  const inspections = steps.filter((s) => s.requires_inspection).length;
  const milestones = steps.filter((s) => s.is_milestone).length;

  return (
    <Card id="journey" className={SCROLL_OFFSET}>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold">Your Project Journey</CardTitle>
        <p className="text-sm text-muted-foreground">
          {totalDays} days &middot; {inspections} inspection{inspections !== 1 ? 's' : ''} &middot; {milestones} milestone{milestones !== 1 ? 's' : ''}
        </p>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-xs text-muted-foreground/70">{JOURNEY_CAPTION}</p>

        <Accordion type="single" collapsible>
          {steps.map((step) => {
            const isInspection = step.requires_inspection;
            const isMilestone = step.is_milestone;
            const image = stepImages[step.step_number];

            return (
              <AccordionItem key={step.id} value={step.id}>
                <AccordionTrigger className={`${FOCUS_RING} hover:no-underline`}>
                  <div className="flex flex-1 items-center gap-3 text-left">
                    {/* Step number */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                      {step.step_number}
                    </div>

                    {/* Title + duration */}
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-foreground">
                        {step.title}
                      </span>
                      {step.expected_duration_days && (
                        <span className="ml-2 text-xs text-muted-foreground tabular-nums">
                          {step.expected_duration_days}d
                        </span>
                      )}
                    </div>

                    {/* Tags as muted icon+text */}
                    <div className="hidden shrink-0 items-center gap-3 sm:flex">
                      {isInspection && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          Inspection
                        </span>
                      )}
                      {isMilestone && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Flag className="h-3.5 w-3.5" />
                          Milestone
                        </span>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="space-y-3 pl-11">
                    {/* Step photo */}
                    {image && (
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="aspect-[16/9] w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {step.plain_language_summary && (
                      <p className={BODY}>{step.plain_language_summary}</p>
                    )}

                    {step.what_to_expect && (
                      <div className={`rounded-lg ${SOFT_SURFACE} p-3`}>
                        <p className={LABEL}>What to expect</p>
                        <p className="mt-1 text-sm text-foreground">{step.what_to_expect}</p>
                      </div>
                    )}

                    {step.skip_risk_description && (
                      <div className="rounded-lg border-amber-200 bg-amber-50 p-3 ring-1 ring-amber-200">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                              Risk if skipped
                            </p>
                            <p className="mt-0.5 text-sm text-amber-700">{step.skip_risk_description}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-3 pt-1 text-xs text-muted-foreground">
                      {step.code_reference && (
                        <span className="inline-flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {step.code_reference}
                        </span>
                      )}
                      {step.industry_standard && (
                        <span className="inline-flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" />
                          Industry Standard
                        </span>
                      )}
                      {step.min_crew_size && (
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {step.min_crew_size} crew
                        </span>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
