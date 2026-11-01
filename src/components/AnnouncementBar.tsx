import React, { useState } from 'react';
import { Tag, Check, Copy } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const AnnouncementBar: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { applyCoupon } = useCart();

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('MALIK');
    applyCoupon('MALIK');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-emerald-900 text-white text-xs sm:text-sm py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center text-center gap-2 font-medium">
          <span className="hidden sm:inline">🎁</span>
          <span>
            Use Code <strong className="font-bold underline tracking-wide text-emerald-200">MALIK</strong> & Get Rs. 100 OFF
          </span>
          <span className="text-emerald-400">|</span>
          <span>🚚 Delivery Across Pakistan</span>
        </div>

        <button
          onClick={handleCopyCoupon}
          className="shrink-0 flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 active:scale-95 text-emerald-100 px-2.5 py-1 rounded text-xs font-semibold transition-all border border-emerald-700/60"
          title="Click to apply and copy code MALIK"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Applied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Apply MALIK</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
