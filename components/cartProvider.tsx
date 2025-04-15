"use client";

import { createContext, useState, useContext } from "react";
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
    if (cartProducts.some((item) => item.id === product.id)) {
      cartProducts = cartProducts.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      cartProducts.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cartProducts));

    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product: Product) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.product.id !== product.id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const moreQuantity = (productId: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const lessQuantity = (productId: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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
