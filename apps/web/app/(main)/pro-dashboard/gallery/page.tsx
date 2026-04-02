'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Star,
  Image as ImageIcon,
  Share2,
  CheckCircle,
  Upload,
  Trash2,
  Loader2,
  X,
  ImagePlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth/auth-context';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

interface GalleryEntry {
  id: string;
  pro_profile_id: string;
  image_url: string;
  thumbnail_url: string | null;
  caption: string | null;
  is_before: boolean;
  is_featured: boolean;
  created_at: string;
}

export default function PortfolioPage() {
  const { user } = useAuth();
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [gallery, setGallery] = useState<GalleryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [caption, setCaption] = useState('');
  const [proStats, setProStats] = useState({ avgRating: 0, totalReviews: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchGallery = useCallback(async () => {
    const res = await fetch('/api/contractor/gallery');
    if (res.ok) {
      const data = await res.json();
      setGallery(data.gallery);
    }
    setLoading(false);
  }, []);

  const fetchStats = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('pro_profiles')
      .select('avg_rating, total_reviews')
      .eq('user_id', user.id)
      .single();
    if (data) {
      setProStats({
        avgRating: data.avg_rating || 0,
        totalReviews: data.total_reviews || 0,
      });
    }
  }, [user, supabase]);

  useEffect(() => {
    fetchGallery();
    fetchStats();
  }, [fetchGallery, fetchStats]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    if (caption) formData.append('caption', caption);

    const res = await fetch('/api/contractor/gallery', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setGallery((prev) => [data.entry, ...prev]);
      setCaption('');
      setShowUpload(false);
    } else {
      const err = await res.json();
      alert(err.error || 'Upload failed');
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    setDeleting(id);

    const res = await fetch(`/api/contractor/gallery?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setGallery((prev) => prev.filter((e) => e.id !== id));
    } else {
      const err = await res.json();
      alert(err.error || 'Delete failed');
    }
    setDeleting(null);
  };

  const handleSharePortfolio = () => {
    const portfolioUrl = window.location.origin + '/pros';
    navigator.clipboard.writeText(portfolioUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const featuredImages = gallery.filter((e) => e.is_featured);
  const totalPhotos = gallery.length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-reno-green-dark" />
        <p className="text-sm text-slate-400 mt-3">Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Portfolio</h1>
              <p className="mt-2 text-lg text-slate-600">
                Showcase your verified work to attract new clients
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowUpload(true)}
                className="bg-reno-green hover:bg-reno-green/90 text-white px-6 rounded-xl"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              <Button
                onClick={handleSharePortfolio}
                variant="outline"
                className="px-6 rounded-xl border-slate-300"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {copiedLink ? 'Link Copied!' : 'Share'}
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <Card className="p-6 rounded-2xl border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Photos</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{totalPhotos}</p>
                </div>
                <div className="h-12 w-12 bg-reno-purple-50 rounded-xl flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-reno-purple-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Featured</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{featuredImages.length}</p>
                </div>
                <div className="h-12 w-12 bg-reno-green/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-reno-green" />
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg Rating</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {proStats.avgRating > 0 ? proStats.avgRating.toFixed(1) : '--'}
                  </p>
                </div>
                <div className="h-12 w-12 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Reviews</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{proStats.totalReviews}</p>
                </div>
                <div className="h-12 w-12 bg-reno-green-50 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-reno-green-600" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md mx-4 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Upload Photo</h3>
              <button onClick={() => setShowUpload(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="mb-1.5 block text-sm font-semibold text-slate-900">
                  Caption (optional)
                </Label>
                <Input
                  type="text"
                  placeholder="Describe this work..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                }}
              />

              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full rounded-xl bg-reno-green hover:bg-reno-green/90 text-white py-6"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </>
                )}
              </Button>

              <p className="text-xs text-slate-400 text-center">
                JPEG, PNG, or WebP. Max 5MB.
              </p>
            </div>
          </Card>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery Grid */}
        {gallery.length === 0 ? (
          <Card className="rounded-2xl border-slate-200 p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <ImagePlus className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              No photos yet
            </h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
              Upload photos of your completed work to build your portfolio and attract new clients.
            </p>
            <Button
              onClick={() => setShowUpload(true)}
              className="rounded-xl bg-reno-green hover:bg-reno-green/90 text-white px-6"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Your First Photo
            </Button>
          </Card>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">All Photos</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((entry) => (
                <Card key={entry.id} className="rounded-2xl border-slate-200 overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={entry.image_url}
                      alt={entry.caption || 'Gallery photo'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {entry.is_featured && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 bg-reno-green/90 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                          <CheckCircle className="w-3 h-3" />
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleDelete(entry.id)}
                        disabled={deleting === entry.id}
                        className={cn(
                          'p-2 rounded-xl bg-white/90 backdrop-blur-sm text-red-600 hover:bg-red-50 transition-colors shadow-sm',
                          deleting === entry.id && 'opacity-50'
                        )}
                      >
                        {deleting === entry.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {entry.caption && (
                    <div className="p-4">
                      <p className="text-sm text-slate-700">{entry.caption}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(entry.created_at).toLocaleDateString('en-CA', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
