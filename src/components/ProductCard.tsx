import React from 'react';
import { Star, ShoppingCart, MessageCircle, Eye, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { buildWhatsAppSingleProductOrderMessage, getWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0].name : undefined;
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
    const message = buildWhatsAppSingleProductOrderMessage({
      product,
      quantity: 1,
      selectedColor: defaultColor,
      selectedSize: defaultSize,
    });
    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative bg-white rounded-2xl border border-zinc-200/80 hover:border-emerald-500/40 p-3 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      {/* Top Media Container */}
      <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-zinc-100 mb-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '0.7';
          }}
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.discountPercent && (
            <span className="bg-emerald-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md shadow-xs">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-zinc-900/90 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-xs">
              Best Seller
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="bg-teal-700 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-xs">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-rose-50 text-rose-500 shadow-md'
              : 'bg-white/80 hover:bg-white text-zinc-600 hover:text-rose-500 shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
          <span className="bg-white/95 backdrop-blur-md text-zinc-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 hover:bg-white">
            <Eye className="w-3.5 h-3.5 text-emerald-700" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Middle Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span className="font-medium text-emerald-700 truncate max-w-[120px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-sm sm:text-base text-zinc-900 group-hover:text-emerald-700 transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Variant Indicators (Colors / Sizes) */}
          <div className="flex items-center gap-2 mt-2 h-5">
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1">
                {product.colors.slice(0, 3).map((col) => (
                  <span
                    key={col.name}
                    className="w-3 h-3 rounded-full border border-zinc-300 shadow-2xs"
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-[10px] text-zinc-500 font-medium">
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <span className="text-[11px] text-zinc-500 truncate">
                {product.sizes.length} sizes
              </span>
            )}
          </div>
        </div>

        {/* Pricing Row */}
        <div className="mt-3 pt-2.5 border-t border-zinc-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-bold text-zinc-950 tabular-nums">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-400 line-through tabular-nums">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-900 text-xs font-semibold transition-all cursor-pointer"
              title="Add to shopping cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-emerald-800" />
              <span>Add</span>
            </button>

            <button
              onClick={handleWhatsAppOrder}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              title="Order directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
