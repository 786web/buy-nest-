import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles } from 'lucide-react';
import { useCart, VALID_COUPON_CODE } from '../context/CartContext';

export const SpecialDiscountBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { applyCoupon, isCouponApplied } = useCart();

  const handleCopy = () => {
    navigator.clipboard.writeText(VALID_COUPON_CODE);
    applyCoupon(VALID_COUPON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-12 bg-zinc-50 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white p-6 sm:p-10 shadow-xl overflow-hidden">
          {/* Decorative shapes */}
          <div
            className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute left-1/3 -bottom-12 w-48 h-48 bg-emerald-400/10 rounded-full blur-xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Content */}
            <div className="text-center md:text-left space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-200 bg-emerald-900/60 border border-emerald-500/40 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Special Welcome Offer</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Your First Shopping Treat!
              </h3>
              <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl">
                Enjoy <strong>Rs. 100 OFF</strong> on your order with our special discount code. Valid on any product order placed across Pakistan.
              </p>
            </div>

            {/* Right Action: Coupon Code & Copy */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-3 shrink-0 shadow-lg">
              <div className="flex items-center gap-2.5 px-3 py-1.5 bg-black/20 rounded-xl">
                <Tag className="w-4 h-4 text-emerald-300" />
                <span className="font-mono text-lg font-black tracking-widest text-emerald-200">
                  {VALID_COUPON_CODE}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 active:scale-95 text-emerald-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                {copied || isCouponApplied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Coupon Copied & Applied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-emerald-800" />
                    <span>Copy Coupon</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
