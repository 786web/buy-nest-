import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-bounce-subtle pointer-events-none px-4">
      <div className="bg-zinc-950/95 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-2xl shadow-2xl border border-zinc-700/80 backdrop-blur-md flex items-center gap-2 max-w-md text-center">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
