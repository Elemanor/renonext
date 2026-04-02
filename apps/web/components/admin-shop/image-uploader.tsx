'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { getProductImageUrl } from '@/lib/shop/helpers';
import Image from 'next/image';

interface ImageUploaderProps {
  productId: string;
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export function ImageUploader({
  productId,
  images,
  onImagesChange,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `/api/admin/shop/products/${productId}/images`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const { path } = await response.json();
      onImagesChange([...images, path]);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (path: string) => {
    if (!confirm('Delete this image?')) return;

    try {
      const response = await fetch(
        `/api/admin/shop/products/${productId}/images`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path }),
        }
      );

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      onImagesChange(images.filter((img) => img !== path));
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete image');
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center transition-colors
          ${dragActive ? 'border-[#0fbabd] bg-teal-50' : 'border-slate-300'}
          ${uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        `}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          disabled={uploading}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-5xl text-slate-400">
              cloud_upload
            </span>
            <p className="text-lg font-medium text-slate-700">
              {uploading ? 'Uploading...' : 'Drop images here or click to browse'}
            </p>
            <p className="text-sm text-slate-500">PNG, JPG, WEBP up to 10MB</p>
          </div>
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((path, index) => (
            <div
              key={path}
              className="relative group aspect-square rounded-lg overflow-hidden bg-slate-100 border"
            >
              <Image
                src={getProductImageUrl(path)}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(path)}
                >
                  <span className="material-symbols-outlined mr-2 text-lg">
                    delete
                  </span>
                  Delete
                </Button>
              </div>
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-[#0fbabd] text-white px-2 py-1 rounded text-xs font-medium">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
