import {
  Shield,
  Lock,
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  Camera,
} from 'lucide-react';
import { DARK_SURFACE, CARD_PAD, SCROLL_OFFSET } from '@/lib/ui/tokens';
import { TRUST_TITLE, TRUST_SUBTITLE } from '@/lib/ui/copy';

const protections = [
  {
    icon: Lock,
    label: 'Payment Hold',
    description: 'Funds released only after your confirmation',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    icon: CreditCard,
    label: 'Pay As You Go',
    description: 'Milestone-based payments tied to progress',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    icon: ShieldCheck,
    label: 'Verified Contractor',
    description: 'Licensed, insured, and quality-checked at every stage',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
  },
];

const discoverySteps = [
  'Contractor documents the finding with photos',
  'You receive options with cost impact before any changes',
  'Work pauses until you approve the path forward',
];

// Sample daily update calendar — swap with real data when wired to RPC
const sampleDays = [
  {
    day: 'Mon',
    date: 'Mar 10',
    hasPhotos: true,
    photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
    alt: 'Foundation wall cleaning in progress',
    note: 'Wall cleaning complete. Cracks patched with hydraulic cement.',
  },
  {
    day: 'Tue',
    date: 'Mar 11',
    hasPhotos: true,
    photo: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
    alt: 'Waterproof membrane fully applied',
    note: 'Membrane applied — full coverage footing to grade. Inspector tomorrow.',
  },
  {
    day: 'Wed',
    date: 'Mar 12',
    hasPhotos: true,
    photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    alt: 'Drainage board installation over membrane',
    note: 'Inspection passed. Drainage board going up now.',
  },
  {
    day: 'Thu',
    date: 'Mar 13',
    hasPhotos: false,
    photo: null,
    alt: '',
    note: null,
  },
  {
    day: 'Fri',
    date: 'Mar 14',
    hasPhotos: false,
    photo: null,
    alt: '',
    note: null,
  },
];

export function TrustGuarantees() {
  return (
    <div
      id="protection"
      className={`${DARK_SURFACE} ${SCROLL_OFFSET} rounded-2xl ${CARD_PAD} py-10`}
    >
      {/* Header */}
      <div className="text-center">
        <Shield className="mx-auto h-8 w-8 text-emerald-400" />
        <h2 className="mt-3 text-2xl font-bold text-white">{TRUST_TITLE}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{TRUST_SUBTITLE}</p>
      </div>

      {/* Content — single-column vertical flow */}
      <div className="mx-auto mt-10 max-w-lg space-y-8">
        {/* Core protections */}
        <div className="space-y-3">
          {protections.map((p) => (
            <div
              key={p.label}
              className="flex items-start gap-4 rounded-xl bg-white/5 p-4"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${p.bg}`}>
                <p.icon className={`h-5 w-5 ${p.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{p.label}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{p.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Unexpected discoveries */}
        <div className="rounded-xl bg-white/5 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">If Something Unexpected Comes Up</h3>
          </div>
          <div className="mt-3 space-y-3">
            {discoverySteps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Updates — calendar strip + photo tiles */}
        <div className="rounded-xl bg-white/5 p-4">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Daily Updates</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Photos, notes, and progress — delivered every working day
          </p>

          {/* Calendar day strip */}
          <div className="mt-4 grid grid-cols-5 gap-1.5">
            {sampleDays.map((d) => (
              <div
                key={d.date}
                className={`rounded-lg p-2 text-center ${
                  d.hasPhotos ? 'bg-white/10' : 'bg-white/5'
                }`}
              >
                <p className="text-[10px] font-medium text-muted-foreground">{d.day}</p>
                <p className="text-xs font-bold text-white">{d.date.split(' ')[1]}</p>
                {d.hasPhotos && (
                  <div className="mx-auto mt-1 h-1 w-1 rounded-full bg-blue-400" />
                )}
              </div>
            ))}
          </div>

          {/* Photo tiles — iPhone-style large cards with day labels */}
          <div className="mt-4 space-y-3">
            {sampleDays
              .filter((d) => d.hasPhotos && d.photo)
              .map((d) => (
                <div key={d.date} className="overflow-hidden rounded-xl">
                  <div className="relative">
                    <img
                      src={d.photo!}
                      alt={d.alt}
                      className="aspect-[16/10] w-full object-cover"
                      loading="lazy"
                    />
                    {/* Day label overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
                      <p className="text-xs font-bold text-white">{d.date}</p>
                    </div>
                  </div>
                  {d.note && (
                    <div className="bg-white/5 px-3 py-2">
                      <p className="text-xs text-muted-foreground">{d.note}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
