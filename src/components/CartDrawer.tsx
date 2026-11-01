import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Check,
  Truck,
  MessageCircle,
} from 'lucide-react';
import { useCart, VALID_COUPON_CODE, COUPON_DISCOUNT_AMOUNT } from '../context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout,
}) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryCharges,
    couponCode,
    isCouponApplied,
    couponDiscount,
    couponError,
    applyCoupon,
    removeCoupon,
    finalTotal,
    totalItemsCount,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slideLeft border-l border-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-zinc-950 text-base">Shopping Bag</h3>
              <p className="text-xs text-zinc-500">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
            title="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body: Cart Items or Empty State */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-zinc-900 text-base mb-1">Your bag is empty</h4>
              <p className="text-xs text-zinc-500 max-w-xs mb-6">
                Explore our collection of electronics, fashion, beauty, perfumes, and more.
              </p>
              <button
                onClick={onClose}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedColor || ''}-${item.selectedSize || ''}-${index}`}
                  className="flex gap-3 p-3 bg-zinc-50 rounded-2xl border border-zinc-100 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-200 shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-zinc-900 text-xs sm:text-sm line-clamp-1">
                      {item.product.name}
                    </h5>

                    {/* Variant tags */}
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-500">
                      {item.selectedColor && (
                        <span>Color: <strong className="text-zinc-700">{item.selectedColor}</strong></span>
                      )}
                      {item.selectedSize && (
                        <span>Size: <strong className="text-zinc-700">{item.selectedSize}</strong></span>
                      )}
                    </div>

                    {/* Price and Quantity Adjuster */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-xs sm:text-sm text-zinc-950 tabular-nums">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Stepper */}
                      <div className="flex items-center border border-zinc-200 rounded-lg bg-white shadow-2xs">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="p-1 text-zinc-600 hover:text-zinc-900"
                          title="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="p-1 text-zinc-600 hover:text-zinc-900"
                          title="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      removeFromCart(
                        item.product.id,
                        item.selectedColor,
                        item.selectedSize
                      )
                    }
                    className="text-zinc-400 hover:text-rose-500 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Coupon Code Section */}
          {cart.length > 0 && (
            <div className="pt-3 border-t border-zinc-100">
              <label className="text-xs font-bold text-zinc-900 mb-1.5 flex items-center justify-between">
                <span>Discount Coupon</span>
                <span className="text-[11px] font-normal text-zinc-500">Have a promo code?</span>
              </label>

              {isCouponApplied ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-emerald-950">Promo Code Applied</p>
                      <p className="text-[11px] text-emerald-700">Congratulations! You received your discount.</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                      className="w-full pl-8 pr-3 py-2 text-xs uppercase tracking-wider rounded-xl border border-zinc-200 bg-white focus:outline-hidden focus:border-emerald-600"
                    />
                    <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponError && (
                <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer: Totals and Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-zinc-100 bg-zinc-50/70 space-y-3">
            {/* Delivery banner note */}
            <div className="flex items-center gap-2 text-xs text-zinc-600 bg-white p-2.5 rounded-xl border border-zinc-100">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Doorstep Delivery Across Pakistan: <strong>Rs. 500</strong></span>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-zinc-900 tabular-nums">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges:</span>
                <span className="font-semibold text-zinc-900 tabular-nums">
                  Rs. {deliveryCharges}
                </span>
              </div>
              {isCouponApplied && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount:</span>
                  <span className="tabular-nums">-Rs. {couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-zinc-950 pt-2 border-t border-zinc-200">
                <span>Final Total:</span>
                <span className="text-emerald-700 tabular-nums">
                  Rs. {finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Primary Proceed CTA */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Proceed to WhatsApp Checkout</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 text-center text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
