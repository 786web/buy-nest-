import { CartItem, CustomerDetails, Product } from '../types';

export const BUY_NEST_PHONE_DISPLAY = '0331-9807245';
export const BUY_NEST_PHONE_INTL = '923319807245';
export const BUY_NEST_WEBSITE = 'buynest.com';

/**
 * Builds the WhatsApp checkout message as strictly specified:
 *
 * Assalam-o-Alaikum BUY NEST!
 *
 * I want to place an order.
 *
 * Product: [Product Name]
 * Quantity: [Quantity]
 * Price: Rs. [Price]
 * Discount Code: MALIK
 * Delivery Charges: Rs. 500
 * Total: Rs. [Final Total]
 *
 * Customer Details:
 * Name: [Customer Name]
 * Phone: [Customer Phone]
 * Address: [Complete Address]
 * City: [City]
 *
 * Please confirm my order.
 */
export function buildWhatsAppCartOrderMessage(params: {
  items: CartItem[];
  customer: CustomerDetails;
  subtotal: number;
  deliveryCharges: number;
  discountCode?: string;
  discountAmount: number;
  total: number;
}): string {
  const { items, customer, discountCode, deliveryCharges, total } = params;

  // Format product names & quantities
  const productSummary = items
    .map((item) => {
      const variantParts: string[] = [];
      if (item.selectedColor) variantParts.push(`Color: ${item.selectedColor}`);
      if (item.selectedSize) variantParts.push(`Size: ${item.selectedSize}`);
      const variantStr = variantParts.length > 0 ? ` (${variantParts.join(', ')})` : '';
      return `${item.product.name}${variantStr} x ${item.quantity} [Rs. ${item.product.price.toLocaleString()} each]`;
    })
    .join('\n- ');

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const discountLine = discountCode ? `Discount Code: ${discountCode}` : 'Discount Code: None';

  return `Assalam-o-Alaikum BUY NEST!

I want to place an order.

Product:
- ${productSummary}
Quantity: ${totalQuantity}
Price: Rs. ${params.subtotal.toLocaleString()}
${discountLine}
Delivery Charges: Rs. ${deliveryCharges}
Total: Rs. ${total.toLocaleString()}

Customer Details:
Name: ${customer.name || '[Customer Name]'}
Phone: ${customer.phone || '[Customer Phone]'}
Address: ${customer.address || '[Complete Address]'}
City: ${customer.city || '[City]'}
${customer.notes ? `Special Notes: ${customer.notes}\n` : ''}
Please confirm my order.`;
}

/**
 * Single product direct WhatsApp order
 */
export function buildWhatsAppSingleProductOrderMessage(params: {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  customer?: Partial<CustomerDetails>;
}): string {
  const { product, quantity, selectedColor, selectedSize, customer } = params;
  const unitPrice = product.price;
  const subtotal = unitPrice * quantity;
  const deliveryCharges = 500;
  const total = subtotal + deliveryCharges;

  const variantDetails: string[] = [];
  if (selectedColor) variantDetails.push(`Color: ${selectedColor}`);
  if (selectedSize) variantDetails.push(`Size: ${selectedSize}`);
  const variantStr = variantDetails.length > 0 ? ` (${variantDetails.join(', ')})` : '';

  return `Assalam-o-Alaikum BUY NEST!

I want to place an order.

Product: ${product.name}${variantStr}
Quantity: ${quantity}
Price: Rs. ${subtotal.toLocaleString()}
Discount Code: MALIK
Delivery Charges: Rs. ${deliveryCharges}
Total: Rs. ${total.toLocaleString()}

Customer Details:
Name: ${customer?.name || '[Please specify your name]'}
Phone: ${customer?.phone || '[Please specify phone number]'}
Address: ${customer?.address || '[Please specify address]'}
City: ${customer?.city || '[Please specify city]'}

Please confirm my order.`;
}

/**
 * Creates the encoded wa.me link
 */
export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUY_NEST_PHONE_INTL}?text=${encodeURIComponent(message)}`;
}

/**
 * Quick general customer service chat link
 */
export function getGeneralWhatsAppSupportUrl(): string {
  const greeting = `Assalam-o-Alaikum BUY NEST!
I have an inquiry regarding your products and delivery across Pakistan.`;
  return getWhatsAppUrl(greeting);
}
