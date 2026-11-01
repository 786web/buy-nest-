import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';
import { BUY_NEST_PHONE_DISPLAY, BUY_NEST_WEBSITE } from '../utils/whatsapp';

interface PolicyModalProps {
  policyKey: string | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyKey, onClose }) => {
  if (!policyKey) return null;

  const contentMap: Record<
    string,
    { title: string; icon: React.FC<{ className?: string }>; body: React.ReactNode }
  > = {
    shipping: {
      title: 'Shipping & Delivery Policy',
      icon: Truck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
          <p>
            Welcome to <strong>BUY NEST</strong> ({BUY_NEST_WEBSITE}). We are dedicated to providing fast and secure doorstep delivery to our valued customers all across Pakistan.
          </p>
          <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-emerald-900 font-medium">
            <p><strong>🚚 Standard Delivery Charges:</strong> Flat Rs. 500 nationwide for any parcel weight.</p>
            <p className="mt-1"><strong>⏱ Delivery Timeline:</strong> 3 to 6 working days from dispatch verification.</p>
          </div>
          <h4 className="font-bold text-zinc-900 text-sm">1. Nationwide Coverage</h4>
          <p>
            We ship to all cities, towns, and postal areas in Pakistan including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, Quetta, Multan, Sialkot, Hyderabad, and remote areas in Gilgit-Baltistan and Azad Kashmir.
          </p>
          <h4 className="font-bold text-zinc-900 text-sm">2. Order Verification on WhatsApp</h4>
          <p>
            Prior to dispatch, our customer support team confirms your shipping address and recipient mobile number on WhatsApp ({BUY_NEST_PHONE_DISPLAY}) to ensure seamless delivery without courier returns.
          </p>
          <h4 className="font-bold text-zinc-900 text-sm">3. Tracking & Cash on Delivery</h4>
          <p>
            Once dispatched with our courier partners (TCS, Leopards, Trax, PostEx), you will receive a tracking ID via WhatsApp. Payment is collected upon delivery (COD).
          </p>
        </div>
      ),
    },
    return: {
      title: 'Return & Refund Policy',
      icon: RotateCcw,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
          <p>
            At BUY NEST, your satisfaction is our priority. We offer a transparent <strong>7-day replacement guarantee</strong> for defective, damaged, or mismatched items.
          </p>
          <h4 className="font-bold text-zinc-900 text-sm">1. Eligibility Criteria</h4>
          <p>
            The item must be unused, in its original packaging with all accompanying tags, cables, seals, and accessories intact.
          </p>
          <h4 className="font-bold text-zinc-900 text-sm">2. How to Claim a Replacement</h4>
          <p>
            Simply record a short unpacking video or photo of the issue and share it with our WhatsApp team at <strong>{BUY_NEST_PHONE_DISPLAY}</strong> within 7 days of receiving the parcel.
          </p>
          <h4 className="font-bold text-zinc-900 text-sm">3. Resolution & Processing</h4>
          <p>
            Once reviewed, we arrange a pickup or reverse parcel exchange at zero extra cost to you, or initiate an immediate replacement dispatch.
          </p>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy',
      icon: ShieldCheck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
          <p>
            BUY NEST respects your privacy. We collect minimal customer information strictly needed to process and deliver your orders.
          </p>
          <h4 className="font-bold text-zinc-900 text-sm">Information We Collect</h4>
          <p>
            Your name, contact telephone number, shipping street address, and city for courier consignment note generation.
          </p>
          <h4 className="font-bold text-zinc-900 text-sm">No Third-Party Sharing</h4>
          <p>
            We never sell, rent, or lease your private personal contact details to external marketing agencies or brokers. Your data is strictly between you and BUY NEST.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
          <p>
            By browsing buynest.com and placing an order via our WhatsApp ordering gateway, you agree to these fair terms of service.
          </p>
          <h4 className="font-bold text-zinc-900 text-sm">Order Acceptance</h4>
          <p>
            Orders are confirmed once verified through WhatsApp correspondence with {BUY_NEST_PHONE_DISPLAY}. Prices are listed in Pakistani Rupees (PKR / Rs.) inclusive of applicable local product taxes.
          </p>
          <h4 className="font-bold text-zinc-900 text-sm">Discounts & Codes</h4>
          <p>
            Promotional codes like <strong>MALIK</strong> (Rs. 100 OFF) are applied at checkout and honored on valid customer orders.
          </p>
        </div>
      ),
    },
  };

  const current = contentMap[policyKey] || contentMap.shipping;
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-zinc-100 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-950 text-base sm:text-lg">{current.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto flex-1">{current.body}</div>

        <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
