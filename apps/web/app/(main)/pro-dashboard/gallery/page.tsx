'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  MapPin,
  Image as ImageIcon,
  Eye,
  Share2,
  CheckCircle,
  ArrowRight,
  Calendar,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  address: string;
  category: string;
  photoCount: number;
  rating: number;
  value: number;
  completedDate: string;
  heroImage: string;
  description: string;
  isFeatured?: boolean;
}

interface Testimonial {
  id: string;
  content: string;
  author: string;
  rating: number;
  projectTitle: string;
}

const FEATURED_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Kitchen Renovation',
    address: '456 Oak Ave',
    category: 'Kitchen',
    photoCount: 8,
    rating: 4.9,
    value: 12500,
    completedDate: 'Dec 2025',
    heroImage: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800&h=600&fit=crop',
    description: 'Complete kitchen transformation with modern appliances and custom cabinetry',
    isFeatured: true
  },
  {
    id: '2',
    title: 'Bathroom Remodel',
    address: '789 Elm St',
    category: 'Bathroom',
    photoCount: 12,
    rating: 5.0,
    value: 18200,
    completedDate: 'Jan 2026',
    heroImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',
    description: 'Luxury bathroom renovation with heated floors and rainfall shower',
    isFeatured: true
  },
  {
    id: '3',
    title: 'Basement Waterproofing',
    address: '321 Yonge St',
    category: 'Basement',
    photoCount: 6,
    rating: 4.8,
    value: 8400,
    completedDate: 'Feb 2026',
    heroImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop',
    description: 'Professional waterproofing and foundation repair with warranty',
    isFeatured: true
  }
];

const ALL_PROJECTS: Project[] = [
  ...FEATURED_PROJECTS,
  {
    id: '4',
    title: 'Electrical Panel Upgrade',
    address: '555 Main St',
    category: 'Electrical',
    photoCount: 5,
    rating: 4.9,
    value: 4200,
    completedDate: 'Nov 2025',
    heroImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop',
    description: '200A panel upgrade with modern safety features'
  },
  {
    id: '5',
    title: 'Deck Construction',
    address: '888 Pine Rd',
    category: 'Outdoor',
    photoCount: 10,
    rating: 4.7,
    value: 15600,
    completedDate: 'Oct 2025',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    description: 'Custom cedar deck with built-in seating and lighting'
  },
  {
    id: '6',
    title: 'Plumbing Repair',
    address: '222 Maple Ave',
    category: 'Plumbing',
    photoCount: 4,
    rating: 4.8,
    value: 3200,
    completedDate: 'Sep 2025',
    heroImage: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop',
    description: 'Emergency pipe burst repair with upgraded fixtures'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    content: 'Marcus did an amazing job on our kitchen. Professional, detail-oriented, and the result exceeded our expectations. Would highly recommend!',
    author: 'Jennifer S.',
    rating: 5.0,
    projectTitle: 'Kitchen Renovation'
  },
  {
    id: '2',
    content: 'Professional, punctual, and thorough. The bathroom remodel was completed on time and looks absolutely stunning. Best contractor we\'ve worked with.',
    author: 'Robert K.',
    rating: 5.0,
    projectTitle: 'Bathroom Remodel'
  },
  {
    id: '3',
    content: 'Fixed our emergency pipe burst same day and prevented major damage. Quick response, fair pricing, and quality work. Very grateful!',
    author: 'Alex T.',
    rating: 4.8,
    projectTitle: 'Plumbing Repair'
  }
];

const CATEGORIES = ['All', 'Kitchen', 'Bathroom', 'Basement', 'Electrical', 'Outdoor'];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredProjects = selectedCategory === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(project => project.category === selectedCategory);

  const handleSharePortfolio = () => {
    const portfolioUrl = window.location.origin + '/pro/marcus-johnson/portfolio';
    navigator.clipboard.writeText(portfolioUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              'w-4 h-4',
              star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
              <p className="mt-2 text-lg text-gray-600">
                Showcase your verified work to attract new clients
              </p>
            </div>
            <Button
              onClick={handleSharePortfolio}
              className="bg-reno-green hover:bg-reno-green/90 text-white px-6 rounded-xl"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {copiedLink ? 'Link Copied!' : 'Share Portfolio'}
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <Card className="p-6 rounded-2xl border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Projects</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
                </div>
                <div className="h-12 w-12 bg-reno-green/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-reno-green" />
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Photos</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">47</p>
                </div>
                <div className="h-12 w-12 bg-violet-50 rounded-xl flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-violet-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">4.9</p>
                </div>
                <div className="h-12 w-12 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profile Views</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">2.4K</p>
                </div>
                <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Projects */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_PROJECTS.map((project) => (
              <Card key={project.id} className="rounded-2xl border-gray-200 overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-reno-green/90 text-white border-reno-green backdrop-blur-sm">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      HouseFax Verified
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(project.rating)}
                      <span className="text-sm font-medium text-gray-700 ml-1">{project.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <ImageIcon className="w-4 h-4" />
                      {project.photoCount} photos
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Value</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${project.value.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Completed</p>
                      <p className="text-sm font-semibold text-gray-900">{project.completedDate}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-gray-300 hover:bg-gray-50"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Projects</h2>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap',
                    selectedCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="rounded-2xl border-gray-200 overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-reno-green/90 text-white border-reno-green backdrop-blur-sm text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    {project.address}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {renderStars(project.rating)}
                      <span className="text-sm font-medium text-gray-700 ml-1">{project.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <ImageIcon className="w-4 h-4" />
                      {project.photoCount}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials Strip */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Client Testimonials</h2>
            <p className="text-gray-600 mt-1">What homeowners are saying about my work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.id} className="rounded-2xl border-gray-200 p-6">
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                  <span className="text-sm font-medium text-gray-700 ml-1">{testimonial.rating}</span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  "{testimonial.content}"
                </p>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-xs text-gray-500 mt-1">{testimonial.projectTitle}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
