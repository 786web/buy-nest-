import React from 'react';
import { X, Clock, MessageCircle, Package, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUY_NEST_PHONE_DISPLAY, getWhatsAppUrl } from '../utils/whatsapp';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ isOpen, onClose }) => {
  const { orders } = useCart();

  if (!isOpen) return null;

  const handleInquireOrder = (orderId: string) => {
    const message = `Assalam-o-Alaikum BUY NEST!

I want to inquire about the tracking status of my recent order:
Order ID: #${orderId}
Website: buynest.com

Please update me on the courier dispatch details.`;

    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-zinc-100 max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-zinc-950 text-base sm:text-lg">My Orders</h3>
              <p className="text-xs text-zinc-500">Orders placed on this device</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto mb-3">
                <Package className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-zinc-800 text-sm mb-1">No orders yet</h4>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Once you place an order via our WhatsApp checkout, you will see your order history and receipt here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const dateFormatted = new Date(order.date).toLocaleDateString('en-PK', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={order.id}
                    className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-200/60 pb-2.5">
                      <div>
                        <span className="font-extrabold text-zinc-900 text-sm">
                          Order #{order.id}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          <span>{dateFormatted}</span>
                        </div>
                      </div>

                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {order.status}
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="space-y-1.5 text-xs text-zinc-700">
                      {order.items.map((it, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="truncate max-w-[280px]">
                            {it.product.name} x {it.quantity}
                          </span>
                          <span className="font-medium tabular-nums">
                            Rs. {(it.product.price * it.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Breakdown */}
                    <div className="pt-2 border-t border-zinc-200/60 text-xs space-y-1">
                      <div className="flex justify-between text-zinc-500">
                        <span>Delivery (Nationwide):</span>
                        <span>Rs. {order.deliveryCharges}</span>
                      </div>
                      {order.discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-medium">
                          <span>Discount (Code MALIK):</span>
                          <span>-Rs. {order.discountAmount}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-zinc-950 font-bold text-sm pt-1">
                        <span>Total:</span>
                        <span className="text-emerald-700 tabular-nums">
                          Rs. {order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Destination info */}
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 pt-1">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span className="truncate">
                        {order.customer.name} · {order.customer.city} ({order.customer.phone})
                      </span>
                    </div>

                    {/* WhatsApp Action */}
                    <div className="pt-1 flex gap-2">
                      <button
                        onClick={() => handleInquireOrder(order.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Track Status on WhatsApp</span>
                      </button>

                      <a
                        href={order.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs flex items-center justify-center"
                        title="Reopen order message link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
