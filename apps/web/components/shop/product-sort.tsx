'use client';

interface ProductSortProps {
  value: string;
  onChange: (sort: string) => void;
}

export function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Sort by:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-reno-primary min-w-[180px]"
      >
        <option value="created_at_desc">Newest</option>
        <option value="name_asc">Name: A to Z</option>
      </select>
    </div>
  );
}
