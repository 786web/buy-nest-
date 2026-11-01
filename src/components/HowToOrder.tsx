import React from 'react';
import {
  MousePointerClick,
  Send,
  MapPin,
  CheckCircle,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import { BUY_NEST_PHONE_DISPLAY, getGeneralWhatsAppSupportUrl } from '../utils/whatsapp';

export const HowToOrder: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      titleUrdu: 'Product Choose Karein',
      titleEn: 'Select Your Favorite Product',
      descUrdu: 'Buynest.com se apna favorite product select karein ya product ka screenshot bhejein.',
      descEn: 'Browse our 10 departments or take a quick screenshot of any item you love.',
      icon: MousePointerClick,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      stepNumber: '02',
      titleUrdu: 'WhatsApp Par Order Send Karein',
      titleEn: 'Send Order on WhatsApp',
      descUrdu: 'Product ka screenshot, name, aur quantity WhatsApp par bhejein.',
      descEn: 'Click the green "WhatsApp Order" button to send pre-filled details automatically.',
      icon: Send,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      stepNumber: '03',
      titleUrdu: 'Delivery Details Dein',
      titleEn: 'Provide Delivery Address',
      descUrdu: 'Name, phone number, complete address, aur city provide karein.',
      descEn: 'Share your exact home or office address anywhere across all cities in Pakistan.',
      icon: MapPin,
      color: 'bg-zinc-100 text-zinc-800 border-zinc-200',
    },
    {
      stepNumber: '04',
      titleUrdu: 'Order Confirm Karein',
      titleEn: 'Receive Instant Confirmation',
      descUrdu: 'Order verify hone ke baad WhatsApp par confirmation receive karein.',
      descEn: 'Our team verifies your parcel and provides dispatch details within minutes.',
      icon: CheckCircle,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
  ];

  return (
    <section id="how-to-order" className="py-16 bg-zinc-50/70 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Asan Shopping Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            How to Order on BUY NEST
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2">
            Shopping with us is effortless. Simply pick what you love and place your order directly via WhatsApp in 4 easy steps.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.stepNumber}
                className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-2xs ${item.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-zinc-200 group-hover:text-emerald-300 transition-colors">
                      {item.stepNumber}
                    </span>
                  </div>

                  {/* Urdu Title & English Subtitle */}
                  <h3 className="font-bold text-base sm:text-lg text-zinc-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {item.titleUrdu}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                    {item.titleEn}
                  </p>

                  {/* Urdu Description */}
                  <p className="text-xs text-zinc-700 mt-3 font-medium leading-relaxed bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                    "{item.descUrdu}"
                  </p>

                  {/* English Description */}
                  <p className="text-[11px] text-zinc-500 mt-2 leading-normal">
                    {item.descEn}
                  </p>
                </div>

                {/* Step Indicator footer */}
                <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Step {index + 1} of 4</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Banner at Bottom of How to Order */}
        <div className="mt-10 bg-gradient-to-r from-emerald-900 via-emerald-800 to-zinc-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold">
              Need Help with your order? Koi sawal hai?
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
              Humara support agent WhatsApp par 24/7 available hai. Aap kisi bhi waqt message kar ke guide le sakte hain.
            </p>
          </div>

          <a
            href={getGeneralWhatsAppSupportUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-white text-emerald-900 hover:bg-emerald-50 active:scale-95 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-800 text-emerald-800" />
            <span>Chat on WhatsApp: {BUY_NEST_PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
