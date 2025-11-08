"use client";
import React from "react";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

export function ProductCard({ id, name, price, category, imageUrl }: ProductCardProps) {
  return (
    <Link
      href={`/inventory/${id}/edit`}
      className="w-full bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] shadow-[0_4px_4px_rgba(0,0,0,0.05)] overflow-hidden active:opacity-90 transition"
    >
      {/* Image */}
      <div className="w-full h-[200px] bg-[#F5F3F1] flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-[#464646]/50 text-[12px]">No Image</div>
        )}
      </div>
      {/* Info */}
      <div className="p-3 flex flex-col gap-2">
        <div className="text-[15px] leading-[22px] font-medium text-black">{name}</div>
        <div className="text-[12px] leading-[18px] text-[#464646]">{category}</div>
        <div className="text-[15px] leading-[22px] font-semibold text-black">${price.toFixed(2)}</div>
      </div>
    </Link>
  );
}

