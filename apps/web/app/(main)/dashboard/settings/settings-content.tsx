'use client';

import { useState } from 'react';
import { User, Bell, CreditCard, Shield, Camera, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function SettingsContent() {
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({
    fullName: 'John Smith',
    email: 'john@example.com',
    phone: '(416) 555-1234',
    address: '123 Main St',
    city: 'Toronto',
    postalCode: 'M5V 3A8',
  });

  const [notifications, setNotifications] = useState({
    emailBids: true,
    emailMessages: true,
    emailUpdates: false,
    pushBids: true,
    pushMessages: true,
    pushUpdates: false,
  });

  const sections = [
    { id: 'profile', label: 'Edit Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'account', label: 'Account', icon: Shield },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">Settings</h1>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Section Nav */}
        <Tabs
          value={activeSection}
          onValueChange={setActiveSection}
          orientation="vertical"
          className="flex flex-col gap-6 lg:flex-row lg:w-full"
        >
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

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Profile Section */}
            <TabsContent value="profile">
              <Card className="rounded-2xl border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Edit Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Avatar */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20 ring-4 ring-primary-50">
                        <AvatarFallback className="bg-gradient-to-br from-reno-green to-reno-green-dark text-2xl font-bold text-white">
                          JS
                        </AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 rounded-full bg-reno-green-dark p-1.5 text-white shadow-md transition-all duration-200 hover:bg-reno-green-dark hover:shadow-lg">
                        <Camera className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Profile Photo</p>
                      <p className="text-sm text-gray-500">
                        JPG, PNG or WebP. Max 10MB.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                          Full Name
                        </Label>
                        <Input
                          type="text"
                          value={profile.fullName}
                          onChange={(e) =>
                            setProfile({ ...profile, fullName: e.target.value })
                          }
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                        />
                      </div>
                      <div>
                        <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                          Email
                        </Label>
                        <Input
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                        Phone
                      </Label>
                      <Input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light sm:w-1/2"
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                        Address
                      </Label>
                      <Input
                        type="text"
                        value={profile.address}
                        onChange={(e) =>
                          setProfile({ ...profile, address: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                          City
                        </Label>
                        <Input
                          type="text"
                          value={profile.city}
                          onChange={(e) =>
                            setProfile({ ...profile, city: e.target.value })
                          }
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                        />
                      </div>
                      <div>
                        <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                          Postal Code
                        </Label>
                        <Input
                          type="text"
                          value={profile.postalCode}
                          onChange={(e) =>
                            setProfile({ ...profile, postalCode: e.target.value })
                          }
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                        />
                      </div>
                    </div>
                  </div>

                  <Button className="mt-6 rounded-xl bg-reno-green-dark px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Section */}
            <TabsContent value="notifications">
              <Card className="rounded-2xl border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        title: 'Email Notifications',
                        items: [
                          { key: 'emailBids' as const, label: 'New bids on my jobs' },
                          { key: 'emailMessages' as const, label: 'New messages from pros' },
                          { key: 'emailUpdates' as const, label: 'Job status updates' },
                        ],
                      },
                      {
                        title: 'Push Notifications',
                        items: [
                          { key: 'pushBids' as const, label: 'New bids on my jobs' },
                          { key: 'pushMessages' as const, label: 'New messages from pros' },
                          { key: 'pushUpdates' as const, label: 'Job status updates' },
                        ],
                      },
                    ].map((group) => (
                      <div key={group.title}>
                        <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-gray-400">
                          {group.title}
                        </h3>
                        <div className="space-y-2">
                          {group.items.map((item) => (
                            <label
                              key={item.key}
                              className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:bg-gray-50"
                            >
                              <span className="text-sm text-gray-700">
                                {item.label}
                              </span>
                              <div
                                className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
                                  notifications[item.key]
                                    ? 'bg-reno-green-dark'
                                    : 'bg-gray-300'
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
                                    notifications[item.key]
                                      ? 'left-[22px]'
                                      : 'left-0.5'
                                  }`}
                                />
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Section */}
            <TabsContent value="payment">
              <Card className="rounded-2xl border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                          VISA
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Visa ending in 4242
                          </p>
                          <p className="text-xs text-gray-500">Expires 12/2025</p>
                        </div>
                      </div>
                      <Badge className="rounded-full bg-green-100 text-xs font-semibold text-green-700 border-transparent hover:bg-green-100">
                        Default
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-reno-green hover:bg-reno-green-light/30 hover:text-reno-green-dark">
                    + Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Section */}
            <TabsContent value="account">
              <Card className="rounded-2xl border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Card className="rounded-xl border border-gray-200 shadow-none">
                      <CardContent className="p-5">
                        <CardTitle className="mb-1 text-base font-semibold text-gray-900">
                          Change Password
                        </CardTitle>
                        <CardDescription className="mb-4 text-sm text-gray-500">
                          Update your password regularly for security
                        </CardDescription>
                        <Button variant="outline" className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50">
                          Update Password
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="rounded-xl border border-red-200 bg-red-50/50 shadow-none">
                      <CardContent className="p-5">
                        <CardTitle className="mb-1 text-base font-semibold text-red-900">
                          Delete Account
                        </CardTitle>
                        <CardDescription className="mb-4 text-sm text-red-600">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </CardDescription>
                        <Button variant="destructive" className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-700">
                          Delete Account
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
