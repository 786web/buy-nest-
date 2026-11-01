import React, { useState } from 'react';
import {
  X,
  MessageCircle,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  Tag,
} from 'lucide-react';
import { useCart, VALID_COUPON_CODE } from '../context/CartContext';
import { CustomerDetails, Order } from '../types';
import { BUY_NEST_PHONE_DISPLAY, buildWhatsAppCartOrderMessage } from '../utils/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_PAKISTANI_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Sukkur',
  'Mardan',
  'Gilgit',
  'Skardu',
  'Other City',
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    subtotal,
    deliveryCharges,
    isCouponApplied,
    couponDiscount,
    finalTotal,
    savedCustomer,
    createAndSendOrder,
    clearCart,
    showToast,
  } = useCart();

  const [customer, setCustomer] = useState<CustomerDetails>(savedCustomer);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customer.name.trim()) errors.name = 'Please enter your full name';
    if (!customer.phone.trim()) {
      errors.phone = 'Please enter your phone number (e.g. 0331-9807245)';
    } else if (customer.phone.replace(/[^0-9]/g, '').length < 10) {
      errors.phone = 'Please enter a valid 11-digit mobile number';
    }
    if (!customer.address.trim()) errors.address = 'Please enter your complete doorstep delivery address';
    if (!customer.city.trim()) errors.city = 'Please specify your city';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmAndSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { order, whatsappUrl } = createAndSendOrder(customer);
    setPlacedOrder(order);

    // Open WhatsApp pre-filled
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFinishAndClear = () => {
    clearCart();
    setPlacedOrder(null);
    onClose();
    showToast('Your order has been recorded. Check WhatsApp for confirmation!');
  };

  const copyOrderMessage = () => {
    if (placedOrder) {
      const msg = buildWhatsAppCartOrderMessage({
        items: placedOrder.items,
        customer: placedOrder.customer,
        subtotal: placedOrder.subtotal,
        deliveryCharges: placedOrder.deliveryCharges,
        discountCode: placedOrder.discountCode,
        discountAmount: placedOrder.discountAmount,
        total: placedOrder.total,
      });
      navigator.clipboard.writeText(msg);
      showToast('Order details copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-zinc-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-zinc-950 text-lg">
                {placedOrder ? 'Order Recorded Successfully!' : 'WhatsApp Direct Checkout'}
              </h3>
              <p className="text-xs text-zinc-500">
                Official BUY NEST Desk: <strong>{BUY_NEST_PHONE_DISPLAY}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-6">
          {placedOrder ? (
            /* Order Success State */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Order Ref: #{placedOrder.id}
                </span>
                <h4 className="text-xl font-extrabold text-zinc-900 mt-3">
                  Shukriya! Order Request Sent
                </h4>
                <p className="text-sm text-zinc-600 mt-1 max-w-md mx-auto">
                  Aapka order WhatsApp par pre-fill ho chuka hai. Agar WhatsApp window open nahi hui to neeche diye gaye button par click karein.
                </p>
              </div>

              {/* Order summary pill */}
              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 text-left text-xs space-y-2">
                <div className="flex justify-between font-semibold text-zinc-900">
                  <span>Customer Name:</span>
                  <span>{placedOrder.customer.name}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Destination:</span>
                  <span>{placedOrder.customer.city}, Pakistan</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Items Count:</span>
                  <span>{placedOrder.items.reduce((s, i) => s + i.quantity, 0)} items</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Delivery Charges:</span>
                  <span>Rs. {placedOrder.deliveryCharges}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-emerald-800 pt-2 border-t border-zinc-200">
                  <span>Final Total Amount:</span>
                  <span>Rs. {placedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Action buttons on success */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={placedOrder.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp Again</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={copyOrderMessage}
                  className="flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold py-3.5 px-4 rounded-xl text-sm transition-all"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Message Text</span>
                </button>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleFinishAndClear}
                  className="text-xs text-zinc-500 hover:text-zinc-900 underline"
                >
                  Close & Clear Shopping Bag
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleConfirmAndSend} className="space-y-5">
              {/* Order quick summary box */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                    Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
                  </span>
                  <span className="text-xs font-extrabold text-emerald-900">
                    Rs. {finalTotal.toLocaleString()}
                  </span>
                </div>

                <div className="text-xs text-emerald-800 space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal: Rs. {subtotal.toLocaleString()}</span>
                    <span>Delivery: Rs. {deliveryCharges}</span>
                  </div>
                  {isCouponApplied && (
                    <div className="flex items-center gap-1 font-semibold text-emerald-700">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code MALIK applied: -Rs. {couponDiscount}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Customer Delivery Details (Pakistan)
                </h4>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Muhammad Ali Khan"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-hidden focus:ring-1 ${
                      formErrors.name
                        ? 'border-rose-400 focus:ring-rose-400'
                        : 'border-zinc-200 focus:border-emerald-600 focus:ring-emerald-600'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-[11px] text-rose-500 mt-1">{formErrors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    WhatsApp Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 0331-9807245 or 03001234567"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-hidden focus:ring-1 ${
                      formErrors.phone
                        ? 'border-rose-400 focus:ring-rose-400'
                        : 'border-zinc-200 focus:border-emerald-600 focus:ring-emerald-600'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-rose-500 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                {/* City Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      City <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className={`w-full px-3 py-2.5 text-sm rounded-xl border bg-white focus:outline-hidden focus:ring-1 ${
                        formErrors.city
                          ? 'border-rose-400 focus:ring-rose-400'
                          : 'border-zinc-200 focus:border-emerald-600 focus:ring-emerald-600'
                      }`}
                    >
                      <option value="">Select your city</option>
                      {POPULAR_PAKISTANI_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {formErrors.city && (
                      <p className="text-[11px] text-rose-500 mt-1">{formErrors.city}</p>
                    )}
                  </div>

                  {/* Manual City entry if "Other City" */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Specific District / Tehsil
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cantt / Gulberg / DHA"
                      value={customer.city === 'Other City' ? '' : ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          setCustomer({ ...customer, city: e.target.value });
                        }
                      }}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                {/* Complete Address */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Complete Street Address <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="House/Apartment #, Street, Sector/Block, Landmark..."
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-white focus:outline-hidden focus:ring-1 ${
                      formErrors.address
                        ? 'border-rose-400 focus:ring-rose-400'
                        : 'border-zinc-200 focus:border-emerald-600 focus:ring-emerald-600'
                    }`}
                  />
                  {formErrors.address && (
                    <p className="text-[11px] text-rose-500 mt-1">{formErrors.address}</p>
                  )}
                </div>

                {/* Courier Notes */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Special Courier Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Please call before arrival, deliver after 2 PM..."
                    value={customer.notes || ''}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-200 bg-white focus:outline-hidden focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Trust Callout */}
              <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl text-xs text-zinc-600 border border-zinc-200/70">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  No online card needed! Your order is placed directly via WhatsApp with Cash on Delivery across Pakistan.
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-base shadow-lg shadow-emerald-700/25 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Confirm & Send Order on WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
