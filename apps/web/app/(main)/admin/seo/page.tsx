'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GradientIcon } from '@/components/landing/_shared/gradient-icon';
import { ScrollReveal } from '@/components/landing/_animations/scroll-reveal';
import { OverviewTab } from '@/components/admin/seo/overview-tab';
import { AuditTab } from '@/components/admin/seo/audit-tab';
import { GenerateTab } from '@/components/admin/seo/generate-tab';
import { RecommendationsTab } from '@/components/admin/seo/recommendations-tab';
import { PerformanceTab } from '@/components/admin/seo/performance-tab';
import { SearchConsoleTab } from '@/components/admin/seo/search-console-tab';
import { ExperimentsTab } from '@/components/admin/seo/experiments-tab';

export default function AdminSEOPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex items-start gap-4">
          <GradientIcon
            icon={Search}
            gradient="from-reno-purple-500 to-reno-purple-700"
            size="md"
            glow
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">SEO Autopilot</h1>
            <p className="text-slate-500 mt-1">
              Audit pages, generate AI content, track performance, and manage experiments.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start bg-slate-100/80 rounded-xl p-1 h-auto flex-wrap">
            <TabsTrigger value="overview" className="rounded-lg text-sm px-4 py-2">Overview</TabsTrigger>
            <TabsTrigger value="audit" className="rounded-lg text-sm px-4 py-2">Audit</TabsTrigger>
            <TabsTrigger value="generate" className="rounded-lg text-sm px-4 py-2">Generate</TabsTrigger>
            <TabsTrigger value="recommendations" className="rounded-lg text-sm px-4 py-2">Recommendations</TabsTrigger>
            <TabsTrigger value="performance" className="rounded-lg text-sm px-4 py-2">Performance</TabsTrigger>
            <TabsTrigger value="search-console" className="rounded-lg text-sm px-4 py-2">Search Console</TabsTrigger>
            <TabsTrigger value="experiments" className="rounded-lg text-sm px-4 py-2">Experiments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="audit" className="mt-6">
            <AuditTab
              onFixWithAI={(issue) => {
                setActiveTab('generate');
              }}
            />
          </TabsContent>

          <TabsContent value="generate" className="mt-6">
            <GenerateTab />
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6">
            <RecommendationsTab />
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <PerformanceTab />
          </TabsContent>

          <TabsContent value="search-console" className="mt-6">
            <SearchConsoleTab />
          </TabsContent>

          <TabsContent value="experiments" className="mt-6">
            <ExperimentsTab />
          </TabsContent>
        </Tabs>
      </ScrollReveal>
    </div>
  );
}
