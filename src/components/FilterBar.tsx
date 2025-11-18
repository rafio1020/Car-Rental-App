import { Filter } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterBar({ selectedCategory, onCategoryChange }: FilterBarProps) {
  const categories = ['All', 'Sedan', 'SUV', 'Luxury', 'Sports', 'Electric'];

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 text-slate-700 font-medium whitespace-nowrap">
            <Filter className="w-5 h-5" />
            <span>Filter:</span>
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
