'use client';

import {
  Shield,
  HardHat,
  ArrowUpFromDot,
  AlertTriangle,
  Cross,
  CheckCircle,
  BadgeCheck,
} from 'lucide-react';
import type { ProCertification, ProTraining } from '@/lib/mock-data/jobs';

const trainingIcons: Record<string, React.ElementType> = {
  WHMIS: AlertTriangle,
  'Confined Spaces': HardHat,
  'Working at Heights': ArrowUpFromDot,
  'Fall Protection': Shield,
  'First Aid & CPR': Cross,
};

interface CertificationBadgesProps {
  certifications: ProCertification[];
  trainings: ProTraining[];
}

export function CertificationBadges({
  certifications,
  trainings,
}: CertificationBadgesProps) {
  const isExpired = (date: string) => new Date(date) < new Date();

  return (
    <div className="space-y-4">
      {/* Certifications */}
      <div>
        <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
          Certifications
        </h4>
        <div className="space-y-2">
          {certifications.map((cert) => {
            const expired = isExpired(cert.expiryDate);
            return (
              <div
                key={cert.name}
                className={`flex items-center justify-between rounded-xl border p-3 ${
                  expired
                    ? 'border-red-200 bg-red-50'
                    : 'border-reno-green-200 bg-reno-green-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {cert.verified && !expired ? (
                    <CheckCircle className="h-4 w-4 shrink-0 text-reno-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {cert.name}
                    </p>
                    <p className="text-xs text-slate-500">{cert.issuer}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium ${
                    expired ? 'text-red-600' : 'text-reno-green-700'
                  }`}
                >
                  {expired
                    ? 'Expired'
                    : `Exp ${new Date(cert.expiryDate).toLocaleDateString('en-CA', { month: 'short', year: 'numeric' })}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Training Badges */}
      <div>
        <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
          Safety Training
        </h4>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {trainings.map((training) => {
            const expired = isExpired(training.expiryDate);
            const Icon = trainingIcons[training.name] || BadgeCheck;
            return (
              <div
                key={training.name}
                className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center ${
                  expired
                    ? 'border-red-200 bg-red-50'
                    : 'border-reno-green-200 bg-reno-green-50'
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    expired ? 'text-red-500' : 'text-reno-green-600'
                  }`}
                />
                <span className="text-xs font-semibold text-slate-900 leading-tight">
                  {training.name}
                </span>
                <span
                  className={`text-[10px] font-medium ${
                    expired ? 'text-red-600' : 'text-reno-green-700'
                  }`}
                >
                  {expired ? 'Expired' : 'Valid'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
