
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image?: string;
  category: string;
  inStock: number;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  shippingMethod: 'standard' | 'express' | 'overnight';
}

export interface OrderConfirmation {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingInfo: ShippingInfo;
  paymentMethod: string;
  orderDate: Date;
}

interface CartContextType {
  cartItems: CartItem[];
  shippingInfo: ShippingInfo | null;
  lastOrder: OrderConfirmation | null;
  isGuestCheckout: boolean;
  totalItems: number;
  addToCart: (product: any) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  setShippingInfo: (info: ShippingInfo) => void;
  setGuestCheckout: (isGuest: boolean) => void;
  createOrder: (paymentMethod: string) => OrderConfirmation;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingInfo, setShippingInfoState] = useState<ShippingInfo | null>(null);
  const [lastOrder, setLastOrder] = useState<OrderConfirmation | null>(null);
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: 1,
          image: product.image,
          category: product.category,
          inStock: product.inStock
        }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const setShippingInfo = (info: ShippingInfo) => {
    setShippingInfoState(info);
  };

  const setGuestCheckout = (isGuest: boolean) => {
    setIsGuestCheckout(isGuest);
  };

  const createOrder = (paymentMethod: string): OrderConfirmation => {
    const subtotal = getTotalPrice();
    const shippingCost = subtotal > 0 ? (shippingInfo?.shippingMethod === 'express' ? 19.99 : shippingInfo?.shippingMethod === 'overnight' ? 39.99 : 9.99) : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shippingCost + tax;
    
    const order: OrderConfirmation = {
      orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      items: [...cartItems],
      subtotal,
      shipping: shippingCost,
      tax,
      total,
      shippingInfo: shippingInfo!,
      paymentMethod,
      orderDate: new Date()
    };
    
    setLastOrder(order);
    return order;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      shippingInfo,
      lastOrder,
      isGuestCheckout,
      totalItems: getTotalItems(),
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      setShippingInfo,
      setGuestCheckout,
      createOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
