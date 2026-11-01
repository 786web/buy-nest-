export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  image: string;
  featured?: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  stock: number;
  sku: string;
  images: string[];
  description: string;
  shortDescription: string;
  features: string[];
  specifications: Record<string, string>;
  colors?: ProductColor[];
  sizes?: string[];
  deliveryInfo?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  customer: CustomerDetails;
  subtotal: number;
  deliveryCharges: number;
  discountCode?: string;
  discountAmount: number;
  total: number;
  status: 'Pending WhatsApp Confirmation' | 'Confirmed' | 'Shipped' | 'Delivered';
  whatsappUrl: string;
}
