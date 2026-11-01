import React from 'react';
import {
  Shirt,
  Smartphone,
  Sparkles,
  Home,
  Footprints,
  Briefcase,
  Droplet,
  ShoppingBag,
  Gamepad2,
  Dumbbell,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { Category } from '../types';

interface CategorySectionProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategoryId?: string;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Shirt,
  Smartphone,
  Sparkles,
  Home,
  Footprints,
  Briefcase,
  Droplet,
  ShoppingBag,
  Gamepad2,
  Dumbbell,
};

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  selectedCategoryId,
}) => {
  return (
    <section id="categories" className="py-14 bg-zinc-50/70 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Explore Department</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-sm text-zinc-600 mt-1 max-w-xl">
              Browse across 10 handpicked collections for every lifestyle and household need.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors group cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 10 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {CATEGORIES.map((cat: Category) => {
            const IconComponent = iconMap[cat.iconName] || ShoppingBag;
            const isSelected = selectedCategoryId === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative overflow-hidden rounded-2xl bg-white p-3.5 sm:p-4 text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer hover:-translate-y-2 hover:shadow-xl ${
                  isSelected
                    ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-md'
                    : 'border-zinc-200/80 hover:border-emerald-500/50'
                }`}
              >
                {/* Image Aspect ratio container with overlay */}
                <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-zinc-100 mb-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300" />

                  {/* Icon floating badge with smooth animated transition */}
                  <div className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/90 backdrop-blur-xs text-emerald-800 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:rotate-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                {/* Category Content */}
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-zinc-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-zinc-500 line-clamp-1 mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
