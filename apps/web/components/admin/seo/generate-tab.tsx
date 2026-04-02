'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Wand2, Save, Copy, Check } from 'lucide-react';

type GenerationType = 'meta_description' | 'title' | 'faq' | 'blog_draft' | 'intro' | 'jsonld' | 'full_brief';

const generationTools: { value: GenerationType; label: string; description: string }[] = [
  { value: 'meta_description', label: 'Meta Description', description: 'Generate a 150-160 char description' },
  { value: 'title', label: 'SEO Title', description: 'Generate 3 title alternatives (≤60 chars)' },
  { value: 'faq', label: 'FAQ Generator', description: 'Generate FAQ pairs from page data' },
  { value: 'blog_draft', label: 'Blog Draft', description: 'Generate a full blog article' },
  { value: 'intro', label: 'Intro Rewrite', description: 'Improve an intro paragraph' },
  { value: 'jsonld', label: 'JSON-LD', description: 'Generate structured data markup' },
  { value: 'full_brief', label: 'Full Page Brief', description: 'Title + meta + intro + FAQs + schema' },
];

export function GenerateTab() {
  const [tool, setTool] = useState<GenerationType>('meta_description');
  const [url, setUrl] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [pageType, setPageType] = useState('service');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleGenerate() {
    if (!url) return;
    setLoading(true);
    setError('');
    setResult(null);
    setSaved(false);

    const params: Record<string, unknown> = {
      url,
      pageType,
      serviceName: serviceName || undefined,
    };

    if (tool === 'meta_description') {
      params.currentTitle = currentValue || serviceName;
      params.currentDescription = currentValue || undefined;
    } else if (tool === 'title') {
      params.currentTitle = currentValue || serviceName;
    } else if (tool === 'faq') {
      params.count = 5;
    } else if (tool === 'blog_draft') {
      params.topic = serviceName || currentValue;
      params.targetKeyword = currentValue || serviceName;
    } else if (tool === 'intro') {
      params.currentIntro = currentValue;
    } else if (tool === 'jsonld') {
      params.pageType = pageType === 'blog' ? 'faq' : 'service';
    } else if (tool === 'full_brief') {
      params.currentTitle = currentValue || serviceName;
    }

    try {
      const res = await fetch('/api/admin/seo/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: tool, params }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Generation failed');
      } else {
        const data = await res.json();
        setResult(data.output);
        setSaved(true); // Auto-saved as draft
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    }
    setLoading(false);
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const selectedTool = generationTools.find((t) => t.value === tool);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {generationTools.map((t) => (
          <Card
            key={t.value}
            className={`cursor-pointer transition-all border-slate-200/60 shadow-sm hover:shadow-md ${
              tool === t.value ? 'ring-2 ring-emerald-500 border-reno-green-200' : ''
            }`}
            onClick={() => { setTool(t.value); setResult(null); }}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Wand2 className={`h-4 w-4 ${tool === t.value ? 'text-reno-green-600' : 'text-slate-400'}`} />
                <span className="font-medium text-sm text-slate-900">{t.label}</span>
              </div>
              <p className="text-xs text-slate-500">{t.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200/60 shadow-sm">
        <CardContent className="p-5 space-y-4">
          <h3 className="font-semibold text-slate-900">{selectedTool?.label}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Page URL</label>
              <Input
                placeholder="https://renonext.com/services/underpinning"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Service / Topic</label>
              <Input
                placeholder="Underpinning"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Page Type</label>
              <Select value={pageType} onValueChange={setPageType}>
                <SelectTrigger className="h-9 rounded-lg border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="cost">Cost Guide</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="hub">Hub Page</SelectItem>
                  <SelectItem value="static">Static Page</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">
                Current Value (title, intro, etc.)
              </label>
              <Input
                placeholder="Current title or content..."
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
              />
            </div>
          </div>

          {(tool === 'blog_draft' || tool === 'intro') && (
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">
                {tool === 'blog_draft' ? 'Additional context' : 'Current intro text'}
              </label>
              <Textarea
                placeholder={tool === 'blog_draft' ? 'Optional context, price data, keywords...' : 'Paste the current intro paragraph...'}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                rows={4}
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            <Button onClick={handleGenerate} disabled={loading || !url} className="rounded-lg">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
            {saved && (
              <span className="text-xs text-reno-green-600 flex items-center gap-1">
                <Save className="h-3 w-3" /> Saved as draft
              </span>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>
          )}
        </CardContent>
      </Card>

      {result && (
        <Card className="border-slate-200/60 shadow-sm">
          <div className="h-1 w-full bg-gradient-to-r from-reno-green-400 to-reno-green-600 opacity-60" />
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-900">AI Output</h3>
              <Button variant="outline" size="sm" onClick={handleCopy} className="h-7 text-xs rounded-lg">
                {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <pre className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700 overflow-x-auto whitespace-pre-wrap max-h-[500px] overflow-y-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
