'use client';

import { useState } from 'react';
import {
  User,
  Tag,
  MapPin,
  Calendar,
  Bell,
  CreditCard,
  Camera,
  Save,
  Plus,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function ProSettingsContent() {
  const [activeSection, setActiveSection] = useState('profile');

  const [profile, setProfile] = useState({
    fullName: 'Marcus Johnson',
    email: 'marcus@example.com',
    phone: '(416) 555-9876',
    headline: 'Licensed Electrician - 15 Years Experience',
    bio: 'I am a fully licensed and insured electrician with over 15 years of experience in residential and commercial electrical work.',
  });

  const [categories] = useState([
    { id: '1', name: 'Electrical', rateMin: 65, rateMax: 85 },
    { id: '2', name: 'Smart Home', rateMin: 70, rateMax: 90 },
    { id: '3', name: 'EV Chargers', rateMin: 75, rateMax: 100 },
  ]);

  const [serviceArea, setServiceArea] = useState({
    address: '123 Main St, Toronto',
    radius: 25,
  });

  const [availability, setAvailability] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
    startTime: '08:00',
    endTime: '18:00',
  });

  const sections = [
    { id: 'profile', label: 'Edit Profile', icon: User },
    { id: 'categories', label: 'Categories & Rates', icon: Tag },
    { id: 'area', label: 'Service Area', icon: MapPin },
    { id: 'availability', label: 'Availability', icon: Calendar },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'stripe', label: 'Stripe Connect', icon: CreditCard },
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
        Pro Settings
      </h1>

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
            {/* Profile */}
            <TabsContent value="profile">
              <Card className="rounded-2xl border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Edit Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20 ring-4 ring-primary-50">
                        <AvatarFallback className="bg-gradient-to-br from-reno-green to-reno-green-dark text-2xl font-bold text-white">
                          MJ
                        </AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 rounded-full bg-reno-green-dark p-1.5 text-white shadow-md transition-all duration-200 hover:bg-reno-green-dark hover:shadow-lg">
                        <Camera className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Profile Photo</p>
                      <p className="text-sm text-gray-500">
                        This will be displayed to clients
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
                          Phone
                        </Label>
                        <Input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) =>
                            setProfile({ ...profile, phone: e.target.value })
                          }
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                        Headline
                      </Label>
                      <Input
                        type="text"
                        value={profile.headline}
                        onChange={(e) =>
                          setProfile({ ...profile, headline: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                        Bio
                      </Label>
                      <Textarea
                        value={profile.bio}
                        onChange={(e) =>
                          setProfile({ ...profile, bio: e.target.value })
                        }
                        rows={4}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                      />
                    </div>
                  </div>
                  <Button className="mt-6 rounded-xl bg-reno-green-dark px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light">
                    <Save className="h-4 w-4" />
                    Save Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categories & Rates */}
            <TabsContent value="categories">
              <Card className="rounded-2xl border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Categories & Rates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:bg-gray-50"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">{cat.name}</p>
                          <p className="text-sm text-gray-500">
                            ${cat.rateMin} - ${cat.rateMax}/hr
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50">
                            Edit
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-xl p-1.5 text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-reno-green hover:bg-reno-green-light/30 hover:text-reno-green-dark">
                    <Plus className="h-4 w-4" />
                    Add Category
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Service Area */}
            <TabsContent value="area">
              <Card className="rounded-2xl border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Service Area
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                        Base Address
                      </Label>
                      <Input
                        type="text"
                        value={serviceArea.address}
                        onChange={(e) =>
                          setServiceArea({ ...serviceArea, address: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                        Service Radius: {serviceArea.radius} km
                      </Label>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={serviceArea.radius}
                        onChange={(e) =>
                          setServiceArea({
                            ...serviceArea,
                            radius: parseInt(e.target.value),
                          })
                        }
                        className="w-full accent-reno-green-dark"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>5 km</span>
                        <span>50 km</span>
                        <span>100 km</span>
                      </div>
                    </div>
                    {/* Map placeholder */}
                    <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50">
                      <div className="text-center text-gray-400">
                        <MapPin className="mx-auto mb-2 h-8 w-8" />
                        <p className="text-sm font-medium">Map showing service area</p>
                        <p className="text-xs">{serviceArea.radius} km radius</p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6 rounded-xl bg-reno-green-dark px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light">
                    <Save className="h-4 w-4" />
                    Save Area
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Availability */}
            <TabsContent value="availability">
              <Card className="rounded-2xl border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Availability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                        Start Time
                      </Label>
                      <Input
                        type="time"
                        value={availability.startTime}
                        onChange={(e) =>
                          setAvailability({
                            ...availability,
                            startTime: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                        End Time
                      </Label>
                      <Input
                        type="time"
                        value={availability.endTime}
                        onChange={(e) =>
                          setAvailability({
                            ...availability,
                            endTime: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {days.map((day) => (
                      <label
                        key={day}
                        className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:bg-gray-50"
                      >
                        <span className="text-sm font-medium capitalize text-gray-700">
                          {day}
                        </span>
                        <div
                          className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
                            availability[day]
                              ? 'bg-reno-green-dark'
                              : 'bg-gray-300'
                          }`}
                          onClick={() =>
                            setAvailability({
                              ...availability,
                              [day]: !availability[day],
                            })
                          }
                        >
                          <div
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
                              availability[day]
                                ? 'left-[22px]'
                                : 'left-0.5'
                            }`}
                          />
                        </div>
                      </label>
                    ))}
                  </div>
                  <Button className="mt-6 rounded-xl bg-reno-green-dark px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light">
                    <Save className="h-4 w-4" />
                    Save Availability
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications">
              <Card className="rounded-2xl border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      'New jobs in my area',
                      'New messages from clients',
                      'Bid status updates',
                      'Payment received',
                      'Review received',
                      'Weekly earnings summary',
                    ].map((item) => (
                      <label
                        key={item}
                        className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:bg-gray-50"
                      >
                        <span className="text-sm text-gray-700">{item}</span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 text-reno-green-dark focus:ring-reno-green"
                        />
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Stripe Connect */}
            <TabsContent value="stripe">
              <Card className="rounded-2xl border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Stripe Connect
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-2xl border border-gray-200 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50">
                      <CreditCard className="h-8 w-8 text-purple-500" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900">
                      Connect Your Stripe Account
                    </h3>
                    <p className="mx-auto mb-6 max-w-sm text-sm text-gray-500">
                      Connect your Stripe account to receive payments directly.
                      Payouts are processed weekly.
                    </p>
                    <Button className="rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-md hover:shadow-purple-200">
                      Connect with Stripe
                    </Button>
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
