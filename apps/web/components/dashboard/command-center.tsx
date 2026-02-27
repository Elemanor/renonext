'use client';

import { MobileHeader } from './mobile-header';
import { SiteBriefing } from './site-briefing';
import { WeatherHub } from './weather-hub';
import { ProgressPhotos } from './progress-photos';
import { EscrowStatus } from './escrow-status';
import { NoiseForecast } from './noise-forecast';
import { WarningAlert } from './warning-alert';
import { HealthHazard } from './health-hazard';
import { QuickActionFAB } from './quick-action-fab';

export function CommandCenter() {
  return (
    <div className="flex h-full flex-col">
      {/* Mobile header (hidden on desktop) */}
      <MobileHeader />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 lg:px-6 lg:py-5 lg:pb-6">
        <div className="mx-auto max-w-6xl space-y-4">
          {/* Row 1: Site Briefing — full width */}
          <SiteBriefing />

          {/* Row 2: Weather Hub (2/3) + Photos & Escrow (1/3) */}
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="lg:flex-[2]">
              <WeatherHub />
            </div>
            <div className="flex flex-col gap-4 lg:flex-1">
              <ProgressPhotos />
              <EscrowStatus />
            </div>
          </div>

          {/* Row 3: Noise + Warning + Health (equal thirds) */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <NoiseForecast />
            <WarningAlert />
            <HealthHazard />
          </div>
        </div>
      </div>

      {/* FAB (mobile only) */}
      <QuickActionFAB />
    </div>
  );
}
