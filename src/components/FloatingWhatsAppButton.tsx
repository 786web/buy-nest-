import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUY_NEST_PHONE_DISPLAY, getGeneralWhatsAppSupportUrl } from '../utils/whatsapp';

export const FloatingWhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside aria-label="Customer Support" className="fixed bottom-6 right-6 z-40 flex items-end gap-3 group">
      {/* Tooltip banner */}
      {showTooltip && (
        <div className="relative bg-white border border-zinc-200/90 shadow-xl rounded-2xl py-2 px-3.5 max-w-[220px] text-xs text-zinc-800 animate-fadeIn hidden sm:flex items-center justify-between gap-2">
          <div>
            <p className="font-bold text-emerald-800">Order on WhatsApp!</p>
            <p className="text-[11px] text-zinc-500">{BUY_NEST_PHONE_DISPLAY}</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-zinc-400 hover:text-zinc-600 p-0.5"
            title="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Emerald Button */}
      <a
        href={getGeneralWhatsAppSupportUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white shadow-xl shadow-emerald-700/30 flex items-center justify-center transition-all duration-300"
        aria-label="Chat and Order on WhatsApp"
        title="Direct WhatsApp Order Desk"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </aside>
  );
};
