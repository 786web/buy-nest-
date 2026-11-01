import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { ProductCatalog } from './components/ProductCatalog';
import { HowToOrder } from './components/HowToOrder';
import { DeliveryInfoSection } from './components/DeliveryInfoSection';
import { CustomerTrustSection } from './components/CustomerTrustSection';
import { Footer } from './components/Footer';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PolicyModal } from './components/PolicyModal';
import { ContactModal } from './components/ContactModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { Toast } from './components/Toast';
import { PRODUCTS } from './data/products';
import { Product } from './types';

const AppContent: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    addToCart,
  } = useCart();

  // Navigation & Filtering State
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCatalogFilter, setActiveCatalogFilter] = useState<string | undefined>(undefined);

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activePolicyKey, setActivePolicyKey] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);

  // Smooth Navigation handler
  const handleNavigate = (sectionId: string, filterOption?: string) => {
    setActiveSection(sectionId);
    if (filterOption) {
      setActiveCatalogFilter(filterOption);
    } else {
      setActiveCatalogFilter(undefined);
    }

    if (sectionId === 'categories') {
      const el = document.getElementById('categories');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'shop') {
      const el = document.getElementById('shop');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'how-to-order') {
      const el = document.getElementById('how-to-order');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    setActiveCatalogFilter(undefined);
    const shopEl = document.getElementById('shop');
    if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShopNowClick = () => {
    const shopEl = document.getElementById('shop');
    if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBuyNow = (
    product: Product,
    quantity: number,
    color?: string,
    size?: string
  ) => {
    addToCart(product, quantity, color, size);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Header / Navigation */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenOrderHistory={() => setIsOrderHistoryOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero
          onShopClick={handleShopNowClick}
          onExploreCategory={handleSelectCategory}
        />

        {/* 4. 10 Product Categories */}
        <CategorySection
          onSelectCategory={handleSelectCategory}
          selectedCategoryId={selectedCategoryId}
        />

        {/* 5. Product Catalog Listing with Filters & Sorting */}
        <ProductCatalog
          products={PRODUCTS}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeCatalogFilter}
          setActiveFilter={setActiveCatalogFilter}
          onOpenDetails={(p) => setSelectedProduct(p)}
        />

        {/* 7. How to Order Section (4 Roman Urdu & English steps) */}
        <HowToOrder />

        {/* 8. Delivery Information Section (Rs. 500 flat, 3-6 days, All Pakistan) */}
        <DeliveryInfoSection />

        {/* 9. Customer Trust Section (Authentic pillars) */}
        <CustomerTrustSection />
      </main>

      {/* 10. Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPolicy={(key) => setActivePolicyKey(key)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modals & Drawers */}
      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBuyNow={handleBuyNow}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* WhatsApp Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Policy Modal (Shipping, Return, Privacy, Terms) */}
      <PolicyModal
        policyKey={activePolicyKey}
        onClose={() => setActivePolicyKey(null)}
      />

      {/* Contact Us Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Order History Modal */}
      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
      />

      {/* Persistent Floating WhatsApp Action Button */}
      <FloatingWhatsAppButton />

      {/* Toast Notification */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
