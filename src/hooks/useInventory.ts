"use client";

import { useEffect, useState } from "react";
import { Product } from "../types";

const STORAGE_KEY = "products";

/**
 * Low-level helper to read all products from localStorage.
 * This mirrors the previous getProducts implementation used in inventory pages.
 */
const readProducts = (): Product[] => {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

/**
 * Hook for inventory listing screens (Inventory page).
 *
 * Responsibilities:
 * - Read the full products array from localStorage on mount.
 * - Expose the products list to the UI.
 * - Provide an optional reload() helper for future use.
 *
 * This keeps the same behavior as the old getProducts + useEffect logic,
 * but moves it into a reusable hook.
 */
export function useInventoryList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(readProducts());
  }, []);

  const reload = () => {
    setProducts(readProducts());
  };

  return { products, reload };
}
