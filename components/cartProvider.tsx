"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { Product } from "@/lib/interfaces";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
  moreQuantity: (productId: number) => void;
  lessQuantity: (productId: number) => void;
  cartTotal: number;
  cartCount: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = typeof localStorage !== 'undefined' ? localStorage.getItem("cart") : null;
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartProducts = JSON.parse(cart);
      setCartItems(cartProducts);
    }
  }, []);

  const addToCart = (product: Product) => {
    const cart = localStorage.getItem("cart");
    let cartProducts;
    if (cart) {
      cartProducts = JSON.parse(cart);
      if (!Array.isArray(cartProducts)) {
        cartProducts = [];
      }
    } else {
      cartProducts = [];
    }
    if (cartProducts.some((item) => item.product.id === product.id)) {
      cartProducts = cartProducts.map((item) => {
        if (item.product.id === product.id) {
          return { product, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      cartProducts.push({ product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cartProducts));
    setCartItems(cartProducts);
  };

  const removeFromCart = (product: Product) => {
    const newCartItems = cartItems.filter((item) => item.product.id !== product.id);
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    setCartCount(0);
  };

  const moreQuantity = (productId: number) => {
    const updatedCartItems = cartItems.map((item: CartItem) =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };
  
  const lessQuantity = (productId: number) => {
    const updatedCartItems = cartItems.map((item: CartItem) =>
      item.product.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.product?.price || 0) * item.quantity,
    0
  );
  const [cartCount, setCartCount] = useState(0);

useEffect(() => {
  setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
}, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        moreQuantity,
        lessQuantity,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
