'use client';

import { useState, useCallback, useRef } from 'react';
import { Upload, FileText, Loader2, CheckCircle2, XCircle, Trash2 } from 'lucide-react';

interface UploadedDoc {
  id: string;
  filename: string;
  status: 'processing' | 'ready' | 'failed';
  error_message?: string;
  chunk_count?: number;
}

interface DocumentUploadProps {
  documents: UploadedDoc[];
  onUpload: (file: File) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  variant?: 'light' | 'dark';
}

export function DocumentUpload({ documents, onUpload, onDelete, variant = 'light' }: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDark = variant === 'dark';

  const handleFile = useCallback(
    async (file: File) => {
      if (file.type !== 'application/pdf') return;
      setUploading(true);
      try {
        await onUpload(file);
      } finally {
        setUploading(false);
      }
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const statusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-amber-400" />;
      case 'ready':
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 transition-colors ${
          isDragging
            ? 'border-emerald-500 bg-emerald-500/10'
            : isDark
              ? 'border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}
      >
        {uploading ? (
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        ) : (
          <Upload className={`h-8 w-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
        )}
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {uploading ? 'Processing...' : 'Drop a PDF here or click to upload'}
        </p>
        <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
          Max 10MB per file
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = '';
          }}
        />
      </div>

      {/* Document list */}
      {documents.length > 0 && (
        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                isDark ? 'bg-white/[0.04]' : 'bg-gray-50'
              }`}
            >
              <FileText className={`h-4 w-4 shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <div className="min-w-0 flex-1">
                <p className={`truncate text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {doc.filename}
                </p>
                {doc.status === 'ready' && doc.chunk_count && (
                  <p className="text-xs text-gray-500">{doc.chunk_count} chunks indexed</p>
                )}
                {doc.status === 'failed' && doc.error_message && (
                  <p className="text-xs text-red-400">{doc.error_message}</p>
                )}
              </div>
              {statusIcon(doc.status)}
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(doc.id); }}
                className="shrink-0 rounded p-1 text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
