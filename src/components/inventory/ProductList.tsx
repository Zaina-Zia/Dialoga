"use client";
import React from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "../../types";

type ProductListProps = {
  products: Product[];
};

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 px-3">
        <div className="text-[15px] leading-[22px] text-[#464646] text-center">
          No products yet. Create your first product!
        </div>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
          imageUrl={product.images[0]}
        />
      ))}
    </div>
  );
}

