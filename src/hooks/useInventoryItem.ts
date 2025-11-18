"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../types";

const STORAGE_KEY = "products";

/**
 * Helper to read all products from localStorage.
 * Matches the behavior previously in the edit page.
 */
const readProducts = (): Product[] => {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

/**
 * Helper to persist products to localStorage.
 */
const writeProducts = (products: Product[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

/**
 * Hook for a single inventory item used on the Edit Product screen.
 *
 * Responsibilities:
 * - Load the product by id from localStorage on mount.
 * - Redirect back to /inventory if the product does not exist.
 * - Provide update/delete/cancel helpers with the same behavior
 *   as the original edit page (including simulated submit delay).
 */
export function useInventoryItem(productId: string) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const products = readProducts();
    const found = products.find((p) => p.id === productId);
    if (found) {
      setProduct(found);
    } else {
      router.push("/inventory");
    }
  }, [productId, router]);

  const updateProduct = (productData: Omit<Product, "id">) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const products = readProducts();
      const index = products.findIndex((p) => p.id === productId);
      if (index !== -1) {
        products[index] = {
          ...products[index],
          ...productData,
          updatedAt: new Date().toISOString(),
        };
        writeProducts(products);
        setIsSubmitting(false);
        router.push("/inventory");
      } else {
        setIsSubmitting(false);
        router.push("/inventory");
      }
    }, 500);
  };

  const deleteProduct = () => {
    const products = readProducts();
    const filtered = products.filter((p) => p.id !== productId);
    writeProducts(filtered);
    router.push("/inventory");
  };

  const cancelEdit = () => {
    router.push("/inventory");
  };

  return {
    product,
    isSubmitting,
    updateProduct,
    deleteProduct,
    cancelEdit,
  };
}
