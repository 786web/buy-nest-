import React from 'react';
import {
  Truck,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  Headphones,
} from 'lucide-react';
import { BUY_NEST_PHONE_DISPLAY, getGeneralWhatsAppSupportUrl } from '../utils/whatsapp';

export const CustomerTrustSection: React.FC = () => {
  const trustPillars = [
    {
      title: 'Delivery Across Pakistan',
      desc: 'Prompt doorstep delivery to all provinces: Punjab, Sindh, KPK, Balochistan, and Gilgit-Baltistan with flat Rs. 500 shipping.',
      icon: Truck,
    },
    {
      title: 'Secure Shopping Experience',
      desc: 'Transparent, reliable transactions with cash on delivery and real-time WhatsApp verification before parcel dispatch.',
      icon: ShieldCheck,
    },
    {
      title: 'Easy WhatsApp Ordering',
      desc: 'Place orders directly from your phone in seconds without tedious account signups or password forms.',
      icon: MessageCircle,
    },
    {
      title: 'Quality Products',
      desc: 'Every item is individually inspected and securely packaged to meet premium e-commerce standards before delivery.',
      icon: Sparkles,
    },
    {
      title: 'Dedicated Customer Support',
      desc: `Direct human support team reachable at ${BUY_NEST_PHONE_DISPLAY} to answer inquiries and help you choose products.`,
      icon: Headphones,
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Why Shop With BUY NEST</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
            Our Commitments to You
          </h2>
          <p className="text-sm text-zinc-600 mt-2">
            Built on trust, speed, and dedicated service for shoppers throughout Pakistan.
          </p>
        </div>

        {/* 5 Authentic Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-zinc-50/80 hover:bg-white rounded-2xl p-5 border border-zinc-200/80 hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-zinc-900 leading-snug mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-zinc-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Guaranteed by BUY NEST</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
