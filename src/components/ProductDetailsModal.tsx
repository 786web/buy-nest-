import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingCart,
  MessageCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  Heart,
  Share2,
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { buildWhatsAppSingleProductOrderMessage, getWhatsAppUrl } from '../utils/whatsapp';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyNow: (product: Product, quantity: number, color?: string, size?: string) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onBuyNow,
}) => {
  if (!product) return null;

  const { addToCart, isInWishlist, toggleWishlist, showToast } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  const handleWhatsAppOrder = () => {
    const message = buildWhatsAppSingleProductOrderMessage({
      product,
      quantity,
      selectedColor,
      selectedSize,
    });
    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNowClick = () => {
    onBuyNow(product, quantity, selectedColor, selectedSize);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on BUY NEST!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-zinc-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close & Action Header */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-zinc-700 shadow-md flex items-center justify-center transition-colors"
            title="Share Product"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-colors ${
              isWishlisted ? 'bg-rose-50 text-rose-500' : 'bg-white/90 hover:bg-white text-zinc-700'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-zinc-950 text-white shadow-md flex items-center justify-center transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Product Images Gallery */}
            <div className="flex flex-col gap-3">
              {/* Main Active Image */}
              <div className="relative aspect-4/3 sm:aspect-1/1 w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.includes('/images/hero.jpg')) {
                      img.src = '/images/hero.jpg';
                    }
                  }}
                />

                {product.discountPercent && (
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails row (if multiple images) */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImageIndex === idx
                          ? 'border-emerald-600 shadow-md ring-2 ring-emerald-600/20'
                          : 'border-zinc-200 hover:border-zinc-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('/images/hero.jpg')) {
                            target.src = '/images/hero.jpg';
                          }
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Delivery info summary box */}
              <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-4 mt-2">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                      Delivery Nationwide across Pakistan
                    </h4>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      Flat Rs. 500 delivery charges. Delivered to your doorstep in 3 to 6 working days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Product Purchase Details */}
            <div className="flex flex-col">
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                <span className="font-semibold text-emerald-700 uppercase tracking-wider">
                  {product.categoryName}
                </span>
                <span className="text-zinc-400">SKU: {product.sku}</span>
              </div>

              {/* Product Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight leading-snug mb-3">
                {product.name}
              </h2>

              {/* Ratings and Reviews */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md text-amber-800 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-zinc-500">
                  {product.reviewsCount} customer ratings
                </span>
                <span className="text-zinc-300">·</span>
                <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
                </span>
              </div>

              {/* Price Banner */}
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 mb-5 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tabular-nums">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm sm:text-base text-zinc-400 line-through tabular-nums">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md ml-auto">
                    Save {(product.originalPrice! - product.price).toLocaleString()} PKR
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-sm text-zinc-600 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Color Selection (if applicable) */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-800 mb-2">
                    <span>Selected Color:</span>
                    <span className="text-emerald-700">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                          selectedColor === color.name
                            ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 ring-1 ring-emerald-600'
                            : 'border-zinc-200 hover:border-zinc-300 bg-white text-zinc-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection (if applicable) */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-800 mb-2">
                    <span>Available Sizes:</span>
                    <span className="text-emerald-700">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedSize === size
                            ? 'border-emerald-600 bg-emerald-700 text-white shadow-xs'
                            : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-semibold text-zinc-800">Quantity:</span>
                <div className="flex items-center border border-zinc-200 rounded-xl bg-white shadow-2xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-zinc-600 hover:text-zinc-900 disabled:opacity-40"
                    title="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-zinc-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="p-2 text-zinc-600 hover:text-zinc-900 disabled:opacity-40"
                    title="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-zinc-500">
                  Subtotal: <strong className="text-zinc-900 font-bold">Rs. {(product.price * quantity).toLocaleString()}</strong>
                </span>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-col gap-2.5 mb-6">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 text-emerald-400" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNowClick}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-sm font-semibold active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Primary WhatsApp Order CTA */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-bold shadow-md shadow-emerald-700/20 active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Order on WhatsApp (Instant)</span>
                </button>
              </div>

              {/* Key Features Bullets */}
              {product.features && product.features.length > 0 && (
                <div className="border-t border-zinc-100 pt-4 mb-4">
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                    Key Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-600">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications Table */}
              {product.specifications && (
                <div className="border-t border-zinc-100 pt-4">
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                    Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                        <span className="text-zinc-500 block text-[11px]">{key}</span>
                        <span className="font-semibold text-zinc-900">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
