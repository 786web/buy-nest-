import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  Search,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
  Check,
} from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';

interface ProductCatalogProps {
  products: Product[];
  selectedCategoryId: string;
  setSelectedCategoryId: (catId: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilter?: string; // 'bestseller' | 'newarrival' | 'wishlist' | undefined
  setActiveFilter: (filter?: string) => void;
  onOpenDetails: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategoryId,
  setSelectedCategoryId,
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  onOpenDetails,
}) => {
  const { wishlist } = useCart();
  const [sortBy, setSortBy] = useState<string>('popular');
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Highest product price in data for slider limit
  const maxAvailablePrice = useMemo(() => {
    return Math.max(...products.map((p) => p.price), 15000);
  }, [products]);

  // Filtered & sorted product list
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategoryId && selectedCategoryId !== 'all') {
      result = result.filter((p) => p.categoryId === selectedCategoryId);
    }

    // Special Tab Filter (bestseller, newarrival, wishlist)
    if (activeFilter === 'bestseller') {
      result = result.filter((p) => p.isBestSeller);
    } else if (activeFilter === 'newarrival') {
      result = result.filter((p) => p.isNewArrival);
    } else if (activeFilter === 'wishlist') {
      result = result.filter((p) => wishlist.includes(p.id));
    }

    // Search Query (by name, categoryName, or description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    // Price Filter
    result = result.filter((p) => p.price <= maxPrice);

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
    }

    return result;
  }, [products, selectedCategoryId, activeFilter, searchQuery, maxPrice, sortBy, wishlist]);

  const handleResetFilters = () => {
    setSelectedCategoryId('all');
    setActiveFilter(undefined);
    setSearchQuery('');
    setMaxPrice(maxAvailablePrice);
    setSortBy('popular');
  };

  const hasActiveFilters =
    (selectedCategoryId && selectedCategoryId !== 'all') ||
    activeFilter ||
    searchQuery.trim() !== '' ||
    maxPrice < maxAvailablePrice;

  return (
    <section id="shop" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Full Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
              {activeFilter === 'wishlist'
                ? 'Your Saved Wishlist'
                : activeFilter === 'bestseller'
                ? 'Best Selling Products'
                : activeFilter === 'newarrival'
                ? 'Fresh New Arrivals'
                : selectedCategoryId !== 'all'
                ? `${CATEGORIES.find((c) => c.id === selectedCategoryId)?.name || 'Category'} Catalog`
                : 'All Products'}
            </h2>
            <p className="text-sm text-zinc-600 mt-1">
              Showing <span className="font-semibold text-zinc-900">{filteredProducts.length}</span> verified items available for delivery across Pakistan.
            </p>
          </div>

          {/* Quick Filter Pill Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 rounded-xl w-fit">
            <button
              onClick={() => setActiveFilter(undefined)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                !activeFilter ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('bestseller')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'bestseller' ? 'bg-white text-emerald-700 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              🔥 Best Sellers
            </button>
            <button
              onClick={() => setActiveFilter('newarrival')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'newarrival' ? 'bg-white text-emerald-700 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              ✨ New Arrivals
            </button>
          </div>
        </div>

        {/* Categories Horizontal Scroll Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <button
            onClick={() => setSelectedCategoryId('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
              selectedCategoryId === 'all'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            All Categories ({products.length})
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            const count = products.filter((p) => p.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] ${isSelected ? 'text-emerald-200' : 'text-zinc-400'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter & Sort Bar */}
        <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by title, specs, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-zinc-200 bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-700 text-xs font-bold"
              >
                ×
              </button>
            )}
          </div>

          {/* Controls: Price Slider & Sorting */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Price Filter Summary */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 whitespace-nowrap">Up to:</span>
              <span className="text-xs font-bold text-zinc-900 tabular-nums">
                Rs. {maxPrice.toLocaleString()}
              </span>
              <input
                type="range"
                min="1000"
                max={maxAvailablePrice}
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 sm:w-32 accent-emerald-600 cursor-pointer"
                title={`Filter up to Rs. ${maxPrice.toLocaleString()}`}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-zinc-200 text-xs font-medium text-zinc-800 rounded-xl py-2 px-3 focus:outline-hidden focus:border-emerald-600 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            {/* Reset Filter Button */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1">No products found</h3>
            <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
              We couldn't find any products matching your active filters. Try adjusting the price range or search terms.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
