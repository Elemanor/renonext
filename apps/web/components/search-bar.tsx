'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronDown, Sparkles } from 'lucide-react';

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'painting', label: 'Painting' },
  { value: 'landscaping', label: 'Landscaping' },
  { value: 'carpentry', label: 'Carpentry' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'moving', label: 'Moving' },
  { value: 'general-repair', label: 'General Repair' },
];

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);
    if (location) params.set('location', location);
    router.push(`/pros?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto flex w-full max-w-3xl flex-col gap-2 rounded-2xl border border-white/20 bg-white/95 p-2 shadow-2xl shadow-black/10 backdrop-blur-xl sm:flex-row sm:gap-0 sm:rounded-full"
    >
      <div
        className={`flex flex-1 items-center gap-2.5 rounded-xl px-4 py-3 transition-all duration-200 sm:rounded-l-full ${
          focused === 'query' ? 'bg-gray-50' : ''
        }`}
      >
        <Search className="h-5 w-5 shrink-0 text-gray-400" />
        <input
          type="text"
          placeholder="Describe your problem (e.g., leaky faucet, need to move...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused('query')}
          onBlur={() => setFocused(null)}
          className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="hidden h-8 w-px self-center bg-gray-200 sm:block" />

      <div
        className={`flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all duration-200 ${
          focused === 'location' ? 'bg-gray-50' : ''
        }`}
      >
        <MapPin className="h-5 w-5 shrink-0 text-gray-400" />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setFocused('location')}
          onBlur={() => setFocused(null)}
          className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 outline-none sm:w-32"
        />
      </div>

      <div className="hidden h-8 w-px self-center bg-gray-200 sm:block" />

      <div className="relative flex items-center rounded-xl px-4 py-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-sm font-medium text-gray-700 outline-none sm:w-36"
        >
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-gray-400" />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-reno-green-dark to-reno-green-dark px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-reno-green-dark/25 transition-all duration-200 hover:shadow-md hover:shadow-reno-green-dark/30 hover:brightness-110 sm:rounded-full"
      >
        <Search className="h-4 w-4" />
        Search
      </button>
    </form>
  );
}
