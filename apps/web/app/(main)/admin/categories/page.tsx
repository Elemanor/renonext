'use client';

import { useState } from 'react';
import {
  Plus,
  GripVertical,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Save,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  proCount: number;
  jobCount: number;
}

const initialCategories: AdminCategory[] = [
  { id: '1', name: 'Plumbing', slug: 'plumbing', icon: 'droplets', description: 'Plumbing repairs and installations', isActive: true, sortOrder: 1, proCount: 142, jobCount: 856 },
  { id: '2', name: 'Electrical', slug: 'electrical', icon: 'zap', description: 'Electrical work and installations', isActive: true, sortOrder: 2, proCount: 98, jobCount: 623 },
  { id: '3', name: 'Painting', slug: 'painting', icon: 'paintbrush', description: 'Interior and exterior painting', isActive: true, sortOrder: 3, proCount: 215, jobCount: 1024 },
  { id: '4', name: 'Landscaping', slug: 'landscaping', icon: 'tree-pine', description: 'Lawn care and landscaping', isActive: true, sortOrder: 4, proCount: 176, jobCount: 543 },
  { id: '5', name: 'Carpentry', slug: 'carpentry', icon: 'hammer', description: 'Custom woodworking and carpentry', isActive: true, sortOrder: 5, proCount: 89, jobCount: 321 },
  { id: '6', name: 'Cleaning', slug: 'cleaning', icon: 'sparkles', description: 'Residential and commercial cleaning', isActive: true, sortOrder: 6, proCount: 312, jobCount: 1567 },
  { id: '7', name: 'Moving', slug: 'moving', icon: 'truck', description: 'Moving and relocation services', isActive: true, sortOrder: 7, proCount: 67, jobCount: 234 },
  { id: '8', name: 'General Repair', slug: 'general-repair', icon: 'wrench', description: 'General handyman services', isActive: true, sortOrder: 8, proCount: 254, jobCount: 1245 },
  { id: '9', name: 'Roofing', slug: 'roofing', icon: 'home', description: 'Roof repair and installation', isActive: false, sortOrder: 9, proCount: 0, jobCount: 0 },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: '',
  });

  const toggleActive = (id: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
      )
    );
  };

  const handleAddCategory = () => {
    if (!newCategory.name) return;
    const slug = newCategory.name.toLowerCase().replace(/\s+/g, '-');
    setCategories([
      ...categories,
      {
        id: String(categories.length + 1),
        name: newCategory.name,
        slug,
        icon: newCategory.icon || 'wrench',
        description: newCategory.description,
        isActive: true,
        sortOrder: categories.length + 1,
        proCount: 0,
        jobCount: 0,
      },
    ]);
    setNewCategory({ name: '', description: '', icon: '' });
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Category Management
        </h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="rounded-xl bg-reno-green-dark px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <h3 className="mb-4 font-bold text-gray-900">
              Add New Category
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  Name
                </Label>
                <Input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="Category name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                />
              </div>
              <div>
                <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  Description
                </Label>
                <Input
                  type="text"
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, description: e.target.value })
                  }
                  placeholder="Short description"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                />
              </div>
              <div>
                <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  Icon Name
                </Label>
                <Input
                  type="text"
                  value={newCategory.icon}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, icon: e.target.value })
                  }
                  placeholder="lucide icon name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleAddCategory}
                className="rounded-xl bg-reno-green-dark px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories List */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/50">
              <TableHead className="w-10 px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400"></TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Category</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Slug</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Pros</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Jobs</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Status</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow
                key={cat.id}
                className={`border-b border-gray-100 transition-all duration-200 last:border-0 hover:bg-gray-50/50 ${
                  !cat.isActive ? 'opacity-60' : ''
                }`}
              >
                <TableCell className="px-4 py-3.5">
                  <GripVertical className="h-4 w-4 cursor-move text-gray-300 transition-colors duration-200 hover:text-gray-500" />
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {cat.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {cat.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3.5 font-mono text-sm text-gray-500">
                  {cat.slug}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-sm font-medium text-gray-900">
                  {cat.proCount}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-sm font-medium text-gray-900">
                  {cat.jobCount.toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  <button
                    onClick={() => toggleActive(cat.id)}
                    className="flex items-center gap-1.5 transition-all duration-200"
                  >
                    {cat.isActive ? (
                      <ToggleRight className="h-6 w-6 text-reno-green-dark" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-gray-300" />
                    )}
                    <Badge
                      className={`text-xs font-medium border-transparent ${cat.isActive ? 'bg-transparent text-reno-green-dark hover:bg-transparent' : 'bg-transparent text-gray-400 hover:bg-transparent'}`}
                    >
                      {cat.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </button>
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="rounded-xl p-1.5 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl p-1.5 text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        {categories.length} categories total &middot;{' '}
        {categories.filter((c) => c.isActive).length} active
      </p>
    </div>
  );
}
