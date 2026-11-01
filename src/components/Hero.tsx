import React from 'react';
import {
  ArrowRight,
  MessageCircle,
  Truck,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { BUY_NEST_PHONE_DISPLAY, getGeneralWhatsAppSupportUrl } from '../utils/whatsapp';

interface HeroProps {
  onShopClick: () => void;
  onExploreCategory: (categoryId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onExploreCategory }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-zinc-50/60 pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-zinc-100">
      {/* Decorative ambient subtle glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-200/20 blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Editorial brand kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-4 bg-emerald-100/70 py-1 px-3 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pakistan’s Trusted Shopping Destination</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-950 tracking-tight leading-[1.12] mb-6">
              Everything You Love, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700">
                All in One Place!
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mb-8">
              Discover amazing products across fashion, electronics, beauty, home essentials, and more. Shop smart with <strong>BUY NEST</strong> with fast delivery across Pakistan and direct WhatsApp ordering.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <button
                onClick={onShopClick}
                className="flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 active:scale-95 text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getGeneralWhatsAppSupportUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Trust badges strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200/70 max-w-xl">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-zinc-900 font-bold text-sm sm:text-base">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Rs. 500 Flat</span>
                </div>
                <span className="text-xs text-zinc-500 mt-0.5">All Across Pakistan</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-zinc-900 font-bold text-sm sm:text-base">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Verified</span>
                </div>
                <span className="text-xs text-zinc-500 mt-0.5">Quality Assurance</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-zinc-900 font-bold text-sm sm:text-base">
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant Chat</span>
                </div>
                <span className="text-xs text-zinc-500 mt-0.5">{BUY_NEST_PHONE_DISPLAY}</span>
              </div>
            </div>
          </div>

          {/* Right Product Collage & Floating Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Showcase Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-100 aspect-4/3 lg:aspect-1/1 group">
                <img
                  src="/images/hero.jpg"
                  alt="BUY NEST Luxury Showcase - Handbags, Perfumes, Electronics and Essentials"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = '/src/assets/images/hero_shopping_showcase_1793517351310.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-900">BUY NEST Curated Store</p>
                      <p className="text-[11px] text-zinc-500">10 Diverse Premium Categories</p>
                    </div>
                  </div>
                  <button
                    onClick={onShopClick}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline pr-1"
                  >
                    View All
                  </button>
                </div>
              </div>

              {/* Floating Highlight Card 1 (Top Left) */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-2xl p-3 shadow-xl hidden sm:flex items-center gap-3 animate-float-slow">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  🚚
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900">Delivery 3–6 Days</p>
                  <p className="text-[10px] text-zinc-500">Karachi · Lahore · Isb & All Cities</p>
                </div>
              </div>

              {/* Floating Highlight Card 2 (Bottom Right) */}
              <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-2xl p-3 shadow-xl hidden sm:flex items-center gap-3 animate-float-reverse">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900">WhatsApp Checkout</p>
                  <p className="text-[10px] text-zinc-500">Confirm order in seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
