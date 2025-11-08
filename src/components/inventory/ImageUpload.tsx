"use client";
import React, { useRef, useState } from "react";
import { X, ChevronUp, ChevronDown } from "lucide-react";

type ImageUploadProps = {
  images: string[];
  maxImages?: number;
  onChange: (images: string[]) => void;
};

export function ImageUpload({ images, maxImages = 3, onChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = maxImages - images.length;
    if (remainingSlots <= 0) return;

    const filesToProcess = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, remainingSlots);

    if (filesToProcess.length === 0) return;

    const newImages: string[] = [];
    let processedCount = 0;

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          newImages.push(result);
          processedCount++;
          
          // When all files are processed, update the images
          if (processedCount === filesToProcess.length) {
            onChange([...images, ...newImages]);
          }
        }
      };
      reader.onerror = () => {
        processedCount++;
        // If all files are processed (even with errors), still update
        if (processedCount === filesToProcess.length && newImages.length > 0) {
          onChange([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
    onChange(newImages);
  };

  const handleMoveDown = (index: number) => {
    if (index === images.length - 1) return;
    const newImages = [...images];
    [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    onChange(newImages);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-[15px] leading-[22px] font-medium text-black">Images (max {maxImages})</div>
      <div className="w-full flex flex-col gap-2">
        {images.map((image, index) => (
          <div key={index} className="w-full flex items-center gap-2 p-2 bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px]">
            <div className="w-[60px] h-[60px] bg-[#F5F3F1] rounded-[4px] overflow-hidden flex-shrink-0">
              <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-[12px] leading-[18px] text-[#464646]">Image {index + 1}</div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className="p-1 disabled:opacity-30"
                aria-label="Move up"
              >
                <ChevronUp className="w-4 h-4 text-[#464646]" />
              </button>
              <button
                type="button"
                onClick={() => handleMoveDown(index)}
                disabled={index === images.length - 1}
                className="p-1 disabled:opacity-30"
                aria-label="Move down"
              >
                <ChevronDown className="w-4 h-4 text-[#464646]" />
              </button>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-1"
                aria-label="Remove"
              >
                <X className="w-4 h-4 text-[#464646]" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {images.length < maxImages && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-11 bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] text-[15px] leading-[22px] font-medium text-[#464646] hover:bg-[#F5F3F1] transition"
        >
          Add Image
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}

