'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ImportWizardProps {
  onComplete: () => void;
}

interface ProductToImport {
  name: string;
  category_slug: string;
  price_cents: number;
  description?: string;
  tags?: string[];
  status?: string;
  [key: string]: unknown;
}

interface ImportResult {
  imported: number;
  errors: Array<{ name: string; error: string }>;
}

export function ImportWizard({ onComplete }: ImportWizardProps) {
  const [step, setStep] = useState(1);
  const [jsonInput, setJsonInput] = useState('');
  const [products, setProducts] = useState<ProductToImport[]>([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const handleParseJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const productsArray = Array.isArray(parsed) ? parsed : parsed.products;

      if (!Array.isArray(productsArray)) {
        throw new Error('Expected an array of products');
      }

      setProducts(productsArray);
      setStep(2);
    } catch (error) {
      alert(
        `Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  const handleImport = async () => {
    setImporting(true);
    try {
      const response = await fetch('/api/admin/shop/products/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products }),
      });

      if (!response.ok) {
        throw new Error('Import failed');
      }

      const data = await response.json();
      setResult(data);
      setStep(3);
    } catch (error) {
      console.error('Import error:', error);
      alert('Failed to import products');
    } finally {
      setImporting(false);
    }
  };

  const sampleJson = `[
  {
    "name": "Milwaukee M18 FUEL Hammer Drill",
    "category_slug": "power-tools",
    "price_cents": 29999,
    "compare_at_cents": 34999,
    "description": "Powerful cordless drill for professionals",
    "tags": ["milwaukee", "cordless", "drill"],
    "alibaba_url": "https://www.alibaba.com/...",
    "stock_status": "in_stock",
    "status": "active"
  }
]`;

  if (step === 1) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Step 1: Paste or Upload JSON
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Provide a JSON array of products to import. Each product must have name,
            category_slug, and price_cents.
          </p>
        </div>

        <Card className="p-4 bg-slate-50">
          <p className="text-sm font-medium text-slate-700 mb-2">Sample Format:</p>
          <pre className="text-xs bg-white p-4 rounded overflow-x-auto">
            {sampleJson}
          </pre>
        </Card>

        <div>
          <Textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste JSON here..."
            rows={12}
            className="font-mono text-sm"
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleParseJson} disabled={!jsonInput.trim()}>
            Next: Preview
          </Button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Step 2: Preview Products
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Review {products.length} products before importing. Check that categories
            exist in your database.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border bg-white shadow-float max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category_slug}</Badge>
                  </TableCell>
                  <TableCell>
                    ${(product.price_cents / 100).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                      {product.status || 'draft'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button onClick={handleImport} disabled={importing}>
            {importing ? 'Importing...' : `Import ${products.length} Products`}
          </Button>
        </div>
      </div>
    );
  }

  if (step === 3 && result) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Step 3: Import Complete
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-6 bg-green-50 border-green-200">
            <p className="text-sm text-green-700 mb-1">Imported</p>
            <p className="text-3xl font-bold text-green-900">{result.imported}</p>
          </Card>
          <Card className="p-6 bg-red-50 border-red-200">
            <p className="text-sm text-red-700 mb-1">Errors</p>
            <p className="text-3xl font-bold text-red-900">{result.errors.length}</p>
          </Card>
        </div>

        {result.errors.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Errors:</h4>
            <div className="space-y-2">
              {result.errors.map((error, index) => (
                <Card key={index} className="p-4 bg-red-50 border-red-200">
                  <p className="font-medium text-red-900">{error.name}</p>
                  <p className="text-sm text-red-700">{error.error}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setStep(1);
              setJsonInput('');
              setProducts([]);
              setResult(null);
            }}
          >
            Import More
          </Button>
          <Button onClick={onComplete}>Done</Button>
        </div>
      </div>
    );
  }

  return null;
}
