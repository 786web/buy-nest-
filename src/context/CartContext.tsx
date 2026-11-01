import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, CustomerDetails, Order, Product } from '../types';
import { buildWhatsAppCartOrderMessage, getWhatsAppUrl } from '../utils/whatsapp';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  deliveryCharges: number;
  couponCode: string;
  isCouponApplied: boolean;
  couponDiscount: number;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  finalTotal: number;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Saved Customer Info
  savedCustomer: CustomerDetails;
  updateCustomerDetails: (details: Partial<CustomerDetails>) => void;

  // Order Placement & History
  orders: Order[];
  createAndSendOrder: (customer: CustomerDetails) => { order: Order; whatsappUrl: string };

  // UI state triggers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'buynest_cart_v1';
const WISHLIST_STORAGE_KEY = 'buynest_wishlist_v1';
const ORDERS_STORAGE_KEY = 'buynest_orders_v1';
const CUSTOMER_STORAGE_KEY = 'buynest_customer_v1';
const COUPON_STORAGE_KEY = 'buynest_coupon_v1';

export const VALID_COUPON_CODE = 'MALIK';
export const COUPON_DISCOUNT_AMOUNT = 100;
export const FLAT_DELIVERY_CHARGES = 500;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [savedCustomer, setSavedCustomer] = useState<CustomerDetails>(() => {
    try {
      const stored = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return stored
        ? JSON.parse(stored)
        : {
            name: '',
            phone: '',
            address: '',
            city: '',
            notes: '',
          };
    } catch {
      return { name: '', phone: '', address: '', city: '', notes: '' };
    }
  });

  const [couponCode, setCouponCode] = useState<string>(() => {
    try {
      return localStorage.getItem(COUPON_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(savedCustomer));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [savedCustomer]);

  useEffect(() => {
    try {
      if (couponCode) {
        localStorage.setItem(COUPON_STORAGE_KEY, couponCode);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [couponCode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const totalItemsCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const isCouponApplied = couponCode.trim().toUpperCase() === VALID_COUPON_CODE;
  const couponDiscount = isCouponApplied && subtotal > 0 ? COUPON_DISCOUNT_AMOUNT : 0;
  const deliveryCharges = cart.length > 0 ? FLAT_DELIVERY_CHARGES : 0;
  const finalTotal = Math.max(0, subtotal + deliveryCharges - couponDiscount);

  const applyCoupon = (rawCode: string): boolean => {
    const cleaned = rawCode.trim().toUpperCase();
    if (cleaned === VALID_COUPON_CODE) {
      setCouponCode(VALID_COUPON_CODE);
      setCouponError(null);
      showToast('🎉 Congratulations! Rs. 100 discount applied.');
      return true;
    } else {
      setCouponError('Invalid promo code. Please check and try again.');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponError(null);
    showToast('Coupon removed.');
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    color?: string,
    size?: string
  ) => {
    const selectedColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
    const selectedSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor, selectedSize }];
      }
    });

    showToast(`Added ${quantity}x "${product.name}" to cart`);
  };

  const removeFromCart = (productId: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    color?: string,
    size?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === color &&
          item.selectedSize === size
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const updateCustomerDetails = (details: Partial<CustomerDetails>) => {
    setSavedCustomer((prev) => ({ ...prev, ...details }));
  };

  const createAndSendOrder = (customer: CustomerDetails) => {
    const message = buildWhatsAppCartOrderMessage({
      items: cart,
      customer,
      subtotal,
      deliveryCharges,
      discountCode: isCouponApplied ? VALID_COUPON_CODE : undefined,
      discountAmount: couponDiscount,
      total: finalTotal,
    });

    const whatsappUrl = getWhatsAppUrl(message);

    const newOrder: Order = {
      id: `BN-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      items: [...cart],
      customer,
      subtotal,
      deliveryCharges,
      discountCode: isCouponApplied ? VALID_COUPON_CODE : undefined,
      discountAmount: couponDiscount,
      total: finalTotal,
      status: 'Pending WhatsApp Confirmation',
      whatsappUrl,
    };

    setOrders((prev) => [newOrder, ...prev]);
    updateCustomerDetails(customer);

    return { order: newOrder, whatsappUrl };
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        deliveryCharges,
        couponCode,
        isCouponApplied,
        couponDiscount,
        couponError,
        applyCoupon,
        removeCoupon,
        finalTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        savedCustomer,
        updateCustomerDetails,
        orders,
        createAndSendOrder,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
