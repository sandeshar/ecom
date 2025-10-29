"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";

export type CartLineItem = {
    product: Product;
    quantity: number;
    license?: string;
};

type CartContextValue = {
    items: CartLineItem[];
    addToCart: (product: Product, quantity?: number, license?: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    subtotal: number;
    totalItems: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "ecom_cart_v1";

type StoredCart = Array<{
    product: Product;
    quantity: number;
    license?: string;
}>;

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartLineItem[]>([]);

    useEffect(() => {
        try {
            const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
            if (stored) {
                const parsed = JSON.parse(stored) as StoredCart;
                if (Array.isArray(parsed)) {
                    setItems(parsed);
                }
            }
        } catch (error) {
            console.warn("Failed to hydrate cart", error);
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addToCart = useCallback((product: Product, quantity = 1, license?: string) => {
        setItems((current) => {
            const existing = current.find((item) => item.product._id === product._id);
            if (existing) {
                return current.map((item) =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + quantity, license: license ?? item.license }
                        : item
                );
            }
            return [...current, { product, quantity, license }];
        });
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((current) => current.filter((item) => item.product._id !== productId));
        } else {
            setItems((current) =>
                current.map((item) =>
                    item.product._id === productId ? { ...item, quantity } : item
                )
            );
        }
    }, []);

    const removeFromCart = useCallback((productId: string) => {
        setItems((current) => current.filter((item) => item.product._id !== productId));
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const subtotal = useMemo(() => items.reduce((total, item) => total + item.product.price * item.quantity, 0), [items]);
    const totalItems = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);

    const value = useMemo(
        () => ({ items, addToCart, updateQuantity, removeFromCart, clearCart, subtotal, totalItems }),
        [items, addToCart, updateQuantity, removeFromCart, clearCart, subtotal, totalItems]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext(): CartContextValue {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
}
