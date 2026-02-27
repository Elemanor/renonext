'use client';

import { useState } from 'react';
import { Settings, DollarSign, Bell, Shield, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function AdminSettingsPage() {
  const [general, setGeneral] = useState({
    platformName: 'RenoNext',
    supportEmail: 'support@renonext.com',
    tagline: 'Find trusted local pros for any job',
  });

  const [fees, setFees] = useState({
    commissionPercent: '12',
    escrowHoldDays: '3',
  });

  const [notifications, setNotifications] = useState({
    emailDigest: true,
    signupAlerts: true,
    disputeAlerts: true,
  });

  const [security, setSecurity] = useState({
    enforce2FA: false,
    sessionTimeoutMinutes: '60',
  });

  const sections = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'fees', label: 'Fees', icon: DollarSign },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
        Platform Settings
      </h1>

      <Tabs defaultValue="general" className="flex flex-col gap-6 lg:flex-row lg:w-full">
        <TabsList className="flex gap-1 rounded-xl bg-gray-100 p-1 lg:w-52 lg:flex-col lg:bg-transparent lg:p-0 lg:h-auto lg:justify-start">
          {sections.map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 data-[state=active]:bg-reno-green-light data-[state=active]:text-reno-green-dark data-[state=active]:shadow-sm data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-50 data-[state=inactive]:hover:text-gray-900 justify-start"
            >
              <section.icon className="h-4 w-4" />
              <span className="hidden lg:inline">{section.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="min-w-0 flex-1">
          {/* General */}
          <TabsContent value="general">
            <Card className="rounded-2xl border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                    Platform Name
                  </Label>
                  <Input
                    value={general.platformName}
                    onChange={(e) => setGeneral({ ...general, platformName: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light sm:w-1/2"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                    Support Email
                  </Label>
                  <Input
                    type="email"
                    value={general.supportEmail}
                    onChange={(e) => setGeneral({ ...general, supportEmail: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light sm:w-1/2"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                    Tagline
                  </Label>
                  <Input
                    value={general.tagline}
                    onChange={(e) => setGeneral({ ...general, tagline: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                  />
                </div>
                <Button className="mt-2 rounded-xl bg-reno-green-dark px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fees */}
          <TabsContent value="fees">
            <Card className="rounded-2xl border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">
                  Fee Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                    Commission Rate (%)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={fees.commissionPercent}
                    onChange={(e) => setFees({ ...fees, commissionPercent: e.target.value })}
                    className="w-40 rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                  />
                  <p className="mt-1.5 text-xs text-gray-400">
                    Percentage charged on each completed transaction
                  </p>
                </div>
                <div>
                  <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                    Escrow Hold (days)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={fees.escrowHoldDays}
                    onChange={(e) => setFees({ ...fees, escrowHoldDays: e.target.value })}
                    className="w-40 rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                  />
                  <p className="mt-1.5 text-xs text-gray-400">
                    Days funds are held in escrow after job completion
                  </p>
                </div>
                <Button className="mt-2 rounded-xl bg-reno-green-dark px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card className="rounded-2xl border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">
                  Admin Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {([
                    { key: 'emailDigest', label: 'Daily email digest' },
                    { key: 'signupAlerts', label: 'New user signup alerts' },
                    { key: 'disputeAlerts', label: 'Dispute & report alerts' },
                  ] as const).map((item) => (
                    <label
                      key={item.key}
                      className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:bg-gray-50"
                    >
                      <span className="text-sm text-gray-700">{item.label}</span>
                      <div
                        className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
                          notifications[item.key] ? 'bg-reno-green-dark' : 'bg-gray-300'
                        }`}
                        onClick={() =>
                          setNotifications({
                            ...notifications,
                            [item.key]: !notifications[item.key],
                          })
                        }
                      >
                        <div
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
                            notifications[item.key] ? 'left-[22px]' : 'left-0.5'
                          }`}
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <Card className="rounded-2xl border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:bg-gray-50">
                  <div>
                    <span className="block text-sm font-semibold text-gray-900">
                      Enforce 2FA for all admins
                    </span>
                    <span className="text-xs text-gray-500">
                      Require two-factor authentication for admin accounts
                    </span>
                  </div>
                  <div
                    className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
                      security.enforce2FA ? 'bg-reno-green-dark' : 'bg-gray-300'
                    }`}
                    onClick={() => setSecurity({ ...security, enforce2FA: !security.enforce2FA })}
                  >
                    <div
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
                        security.enforce2FA ? 'left-[22px]' : 'left-0.5'
                      }`}
                    />
                  </div>
                </label>
                <div>
                  <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    type="number"
                    min="5"
                    value={security.sessionTimeoutMinutes}
                    onChange={(e) =>
                      setSecurity({ ...security, sessionTimeoutMinutes: e.target.value })
                    }
                    className="w-40 rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                  />
                  <p className="mt-1.5 text-xs text-gray-400">
                    Inactive sessions will expire after this period
                  </p>
                </div>
                <Button className="mt-2 rounded-xl bg-reno-green-dark px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
