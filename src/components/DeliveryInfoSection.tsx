import React from 'react';
import { Truck, Clock, MapPin, PackageCheck, ShieldAlert, BadgeCheck } from 'lucide-react';

export const DeliveryInfoSection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div
            className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-600/20 blur-[100px] rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-3xl mb-10 relative">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full mb-3">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Doorstep Nationwide Logistics</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
              Fast, Reliable Delivery Across Pakistan
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              "<strong>BUY NEST</strong> delivers your favorite products directly to your doorstep anywhere in Pakistan."
            </p>
          </div>

          {/* 3 Major Delivery Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* 1. Charges */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mb-4">
                  <span className="text-lg font-black">Rs.</span>
                </div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Flat Shipping Rate
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tabular-nums">
                  Rs. 500
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Clear, transparent pricing. No hidden fuel surcharges or weight penalties regardless of package size.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-zinc-800 text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                <BadgeCheck className="w-3.5 h-3.5" />
                <span>Single flat rate for all orders</span>
              </div>
            </div>

            {/* 2. Timeline */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Estimated Transit Time
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  3–6 Days
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Major metropolitan hubs (Karachi, Lahore, Rawalpindi/Islamabad) receive expedited delivery in 3–4 days.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-zinc-800 text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                <BadgeCheck className="w-3.5 h-3.5" />
                <span>Dispatch within 24 hours</span>
              </div>
            </div>

            {/* 3. Coverage */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Coverage Scope
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  All Pakistan
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  From Karachi to Gilgit, Peshawar to Gwadar, our partnered courier fleet reaches urban sectors and rural tehsils alike.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-zinc-800 text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                <BadgeCheck className="w-3.5 h-3.5" />
                <span>Nationwide postal coverage</span>
              </div>
            </div>
          </div>

          {/* Courier logos & safety note */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Multi-layer tamper-proof packaging for every single order dispatched.</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400 text-xs font-semibold">
              <span>Partnered with:</span>
              <span className="text-zinc-300">TCS</span>
              <span>·</span>
              <span className="text-zinc-300">Leopards</span>
              <span>·</span>
              <span className="text-zinc-300">Trax</span>
              <span>·</span>
              <span className="text-zinc-300">PostEx</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
