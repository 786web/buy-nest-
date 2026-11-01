import React, { useState } from 'react';
import { X, MessageCircle, Phone, Globe, Clock, Send, MapPin } from 'lucide-react';
import { BUY_NEST_PHONE_DISPLAY, BUY_NEST_WEBSITE, getWhatsAppUrl } from '../utils/whatsapp';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('Order Inquiry');
  const [message, setMessage] = useState('');
  const [customerName, setCustomerName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Assalam-o-Alaikum BUY NEST!

I would like to contact your support team.
Name: ${customerName || 'Customer'}
Subject: ${subject}
Message: ${message || 'I have a question about BUY NEST products.'}

Please guide me.`;

    window.open(getWhatsAppUrl(formatted), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-zinc-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-zinc-950 text-base sm:text-lg">Contact BUY NEST</h3>
              <p className="text-xs text-zinc-500">We respond in minutes on WhatsApp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Quick Contact Info Strip */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-950">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>WhatsApp Official:</strong> {BUY_NEST_PHONE_DISPLAY}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-950">
              <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Website:</strong> {BUY_NEST_WEBSITE}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-950">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Hours:</strong> Mon - Sun (9:00 AM - 11:00 PM PKT)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-950">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Dispatch Centers:</strong> Lahore & Karachi</span>
            </div>
          </div>

          {/* Direct WhatsApp Message Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Send Direct Message to WhatsApp Desk
            </h4>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Muhammad Bilal"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-200 bg-white focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Inquiry Topic
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-200 bg-white focus:outline-hidden focus:border-emerald-600"
              >
                <option value="Order Inquiry">Order Inquiry / Placing an Order</option>
                <option value="Delivery Status">Track My Delivery Status</option>
                <option value="Product Details">Question about Product Specifications</option>
                <option value="Wholesale & Bulk">Bulk / Wholesale Request</option>
                <option value="Return / Exchange">Return or Exchange Request</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Your Message
              </label>
              <textarea
                rows={3}
                placeholder="Kaisay hain? Mujhay is product ke baray me poochna hai..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-200 bg-white focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Send Message on WhatsApp</span>
              <Send className="w-3.5 h-3.5 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
