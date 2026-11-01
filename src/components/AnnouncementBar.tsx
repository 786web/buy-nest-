import React from 'react';
import { Truck, MessageCircle } from 'lucide-react';
import { BUY_NEST_PHONE_DISPLAY, getGeneralWhatsAppSupportUrl } from '../utils/whatsapp';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-emerald-900 text-white text-xs sm:text-sm py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center text-center gap-2 font-medium">
          <Truck className="w-4 h-4 text-emerald-300 hidden sm:inline" />
          <span>🚚 Fast Doorstep Delivery Across Pakistan (3–6 Days)</span>
          <span className="text-emerald-400 hidden sm:inline">|</span>
          <span className="hidden sm:inline">Everything You Need, All in One Place!</span>
        </div>

        <a
          href={getGeneralWhatsAppSupportUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 active:scale-95 text-emerald-100 px-2.5 py-1 rounded text-xs font-semibold transition-all border border-emerald-700/60"
          title={`Order on WhatsApp ${BUY_NEST_PHONE_DISPLAY}`}
        >
          <MessageCircle className="w-3.5 h-3.5 fill-emerald-300 text-emerald-300" />
          <span>WhatsApp: {BUY_NEST_PHONE_DISPLAY}</span>
        </a>
      </div>
    </div>
  );
};

