"use client";
import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { ImageUpload } from "./ImageUpload";
import { Product } from "../../types";

type ProductFormProps = {
  product?: Product;
  onSubmit: (product: Omit<Product, "id">) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export function ProductForm({ product, onSubmit, onCancel, isSubmitting = false }: ProductFormProps) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [category, setCategory] = useState(product?.category || "");
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!price.trim()) newErrors.price = "Price is required";
    else if (isNaN(Number(price)) || Number(price) <= 0) newErrors.price = "Price must be a positive number";
    if (images.length === 0) newErrors.images = "At least one image is required";
    if (images.length > 3) newErrors.images = "Maximum 3 images allowed";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category: category.trim() || "Uncategorized",
      images,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-[15px] leading-[22px] font-medium text-black">Name *</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
        />
        {errors.name && <div className="text-[12px] leading-[18px] text-red-600">{errors.name}</div>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[15px] leading-[22px] font-medium text-black">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description"
          rows={4}
          className="h-auto w-full rounded-md border border-[#03121F]/20 bg-[#FDFCFB] px-3 py-2 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10 resize-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[15px] leading-[22px] font-medium text-black">Price *</label>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
        />
        {errors.price && <div className="text-[12px] leading-[18px] text-red-600">{errors.price}</div>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[15px] leading-[22px] font-medium text-black">Category</label>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
      </div>

      <div className="flex flex-col gap-2">
        <ImageUpload images={images} maxImages={3} onChange={setImages} />
        {errors.images && <div className="text-[12px] leading-[18px] text-red-600">{errors.images}</div>}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : product ? "Update" : "Create"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1" disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

