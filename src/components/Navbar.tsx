import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  ShoppingCart,
  MessageCircle,
  Menu,
  X,
  Heart,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUY_NEST_PHONE_DISPLAY, getGeneralWhatsAppSupportUrl } from '../utils/whatsapp';

interface NavbarProps {
  onNavigate: (sectionId: string, filterOption?: string) => void;
  activeSection: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenOrderHistory: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSection,
  searchQuery,
  setSearchQuery,
  onOpenOrderHistory,
  onOpenContact,
}) => {
  const { totalItemsCount, setIsCartOpen, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Shop', id: 'shop' },
    { label: 'Categories', id: 'categories' },
    { label: 'Best Sellers', id: 'shop', filter: 'bestseller' },
    { label: 'New Arrivals', id: 'shop', filter: 'newarrival' },
    { label: 'How to Order', id: 'how-to-order' },
    { label: 'Contact Us', id: 'contact', action: onOpenContact },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.action) {
      link.action();
    } else {
      onNavigate(link.id, link.filter);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:bg-emerald-700 transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950 flex items-center gap-1">
                BUY <span className="text-emerald-600">NEST</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-600 -mt-1 hidden sm:block">
                buynest.com
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id && !link.filter;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-emerald-700 font-semibold'
                      : 'text-zinc-600 hover:text-emerald-700'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & WhatsApp Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input on Desktop */}
            <div className="relative hidden md:block w-48 xl:w-60">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => onNavigate('shop')}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-zinc-200 bg-zinc-50/60 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-zinc-400"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-700 text-xs"
                >
                  ×
                </button>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-zinc-700 hover:text-emerald-600 rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Order History Button */}
            <button
              onClick={onOpenOrderHistory}
              title="My Orders"
              className="hidden sm:flex items-center justify-center p-2 text-zinc-700 hover:text-emerald-600 rounded-lg hover:bg-zinc-100 transition-colors relative"
              aria-label="Orders history"
            >
              <Clock className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => onNavigate('shop', 'wishlist')}
              title="Wishlist"
              className="flex items-center justify-center p-2 text-zinc-700 hover:text-emerald-600 rounded-lg hover:bg-zinc-100 transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-xl transition-all relative font-medium text-xs sm:text-sm"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-emerald-800" />
              <span className="hidden sm:inline font-semibold">Cart</span>
              {totalItemsCount > 0 && (
                <span className="bg-emerald-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center shadow-xs">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* WhatsApp Direct Order Button */}
            <a
              href={getGeneralWhatsAppSupportUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl shadow-xs shadow-emerald-700/20 transition-all shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-800 hover:text-emerald-600 rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {searchOpen && (
          <div className="md:hidden py-3 border-t border-zinc-100 animate-fadeIn">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products across Pakistan..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onNavigate('shop');
                }}
                className="w-full pl-10 pr-8 py-2.5 text-sm rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-zinc-400 text-sm font-bold"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu Slide-down */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-zinc-100 space-y-2 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 pb-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className="text-left px-3 py-2 text-sm font-medium text-zinc-700 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onOpenOrderHistory();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 text-sm font-medium text-zinc-700 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>My Orders</span>
              </button>
            </div>

            <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2">
              <a
                href={getGeneralWhatsAppSupportUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-xs text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {BUY_NEST_PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
