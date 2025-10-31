"use client";
import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export type CategoryAccordionProps = {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string; // Tailwind class like 'text-emerald-600'
  imageSrc?: string; // optional image icon path (24x24)
  isOpen?: boolean; // controlled optional
  onToggle?: (next: boolean) => void;
  children?: React.ReactNode;
};

// Reusable accordion for customer categories.
// Backend hooks: control open state via props or load child content when expanded.
const CategoryAccordion: React.FC<CategoryAccordionProps> = ({
  title,
  icon: Icon,
  color = 'text-emerald-600',
  imageSrc,
  isOpen: isOpenProp,
  onToggle,
  children,
}) => {
  const isControlled = typeof isOpenProp === 'boolean';
  const [openInternal, setOpenInternal] = useState(false);
  const isOpen = isControlled ? isOpenProp : openInternal;

  const handleToggle = () => {
    onToggle?.(!isOpen);
    if (!isControlled) setOpenInternal((v) => !v);
  };

  const iconWrapperClass = useMemo(
    () => `flex h-6 w-6 items-center justify-center rounded ${color}`,
    [color]
  );

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between gap-4 py-1.5"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-1.5">
          <div className={iconWrapperClass} aria-hidden>
            {imageSrc ? (
              <img src={imageSrc} alt="" className="h-5 w-5 object-contain" />
            ) : Icon ? (
              <Icon className="h-5 w-5" />
            ) : null}
          </div>
          <span className="text-base font-medium leading-6 text-black">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-black/85" />
        ) : (
          <ChevronDown className="h-4 w-4 text-black/85" />
        )}
      </button>
      <div className={`overflow-hidden transition-all ${isOpen ? 'max-h-[1000px] pt-2' : 'max-h-0'}`}>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CategoryAccordion;
