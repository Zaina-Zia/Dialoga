"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

export function ProductCard({ id, name, price, category, imageUrl }: ProductCardProps) {
  return (
    <Link href={`/inventory/${id}/edit`} className="block">
      <motion.div
        className="w-full bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] shadow-[0_4px_4px_rgba(0,0,0,0.05)] overflow-hidden"
        whileHover={{ 
          scale: 1.02,
          y: -4,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)"
        }}
        whileTap={{ 
          scale: 0.98,
          y: -2
        }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 17,
          duration: 0.15
        }}
      >
        {/* Image */}
        <div className="w-full h-[200px] bg-[#F5F3F1] flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <motion.img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
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
      </motion.div>
    </Link>
  );
}

