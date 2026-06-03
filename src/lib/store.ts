'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface Store {
  cart: CartItem[];
  favorites: string[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleFavorite: (id: string) => void;
  cartTotal: () => number;
  cartCount: () => number;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],
      addToCart: (product, qty = 1) =>
        set((s) => {
          const existing = s.cart.find((i) => i.product.id === product.id);
          if (existing) {
            return { cart: s.cart.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i) };
          }
          return { cart: [...s.cart, { product, quantity: qty }] };
        }),
      removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((i) => i.product.id !== id) })),
      updateQty: (id, qty) =>
        set((s) => ({
          cart: qty <= 0
            ? s.cart.filter((i) => i.product.id !== id)
            : s.cart.map((i) => i.product.id === id ? { ...i, quantity: qty } : i),
        })),
      clearCart: () => set({ cart: [] }),
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [...s.favorites, id],
        })),
      cartTotal: () => get().cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      cartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'toyfactory-store' }
  )
);
