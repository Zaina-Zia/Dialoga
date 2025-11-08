"use client";
import React from "react";
import CategoryAccordion from "./CategoryAccordion";

export type CategoryItem = {
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  imageSrc?: string;
  color?: string;
  isOpen?: boolean;
};

export type CustomerCategoriesProps = {
  categories: CategoryItem[];
  onToggleCategory?: (id: string, next: boolean) => void;
};

const CustomerCategories: React.FC<CustomerCategoriesProps> = ({
  categories,
  onToggleCategory,
}) => {
  return (
    <section className="w-full flex justify-center items-start bg-[#F5F3F1] py-8 lg:py-0">
      {/* Wrapper for both mobile (390px) and desktop (1130px) */}
      <div className="w-full max-w-[390px] lg:max-w-[1130px] flex flex-col gap-8 lg:gap-10">
        {/* White Card Container */}
        <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FBF9F7] shadow-[0_4px_4px_rgba(0,0,0,0.05)] px-3 py-4 lg:px-8 lg:py-8">
          {/* Section Title */}
          <h2 className="text-[21px] leading-[32px] font-semibold text-black mb-4 lg:mb-6">
            Customer Categories
          </h2>

          {/* Category Accordions */}
          <div className="flex flex-col gap-[14px] lg:gap-6">
            {categories.map((c) => (
              <CategoryAccordion
                key={c.id}
                title={c.title}
                icon={c.icon}
                imageSrc={c.imageSrc}
                color={c.color}
                isOpen={c.isOpen}
                onToggle={(next) => onToggleCategory?.(c.id, next)}
              >
                {/* Product items inside accordion */}
                <div className="flex flex-col gap-2 w-full">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-full h-[59px] bg-[#FDFCFB] border border-[rgba(70,70,70,0.25)] rounded-[8px] shadow-[0_4px_4px_rgba(0,0,0,0.05)] p-1"
                    >
                      <div className="w-full h-[51px] px-2 py-1 flex flex-col gap-1">
                        <div className="w-full flex justify-between items-center">
                          <span className="text-[15px] leading-[22px] font-medium text-black">
                            Name of the product
                          </span>
                          <span className="text-[15px] leading-[22px] font-medium text-black text-right">
                            Qty: 1
                          </span>
                        </div>
                        <div className="text-[12px] leading-[18px] font-normal text-black">
                          Last contact: 15:45, Sep 05, 2025
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CategoryAccordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export const demoCategories: CategoryItem[] = [
  {
    id: 'interesado',
    title: 'Interesado',
    imageSrc: '/images/Dashboard_Home/CustomerCategories/interesado.png',
    color: 'text-emerald-600',
    isOpen: false,
  },
  {
    id: 'delivery',
    title: 'Delivery',
    imageSrc: '/images/Dashboard_Home/envio.png',
    color: 'text-emerald-600',
    isOpen: false,
  },
  {
    id: 'va-en-persona',
    title: 'Va En Persona',
    imageSrc: '/images/Dashboard_Home/visitas.png',
    color: 'text-emerald-600',
    isOpen: false,
  },
  {
    id: 'solo-pide-info',
    title: 'Solo Pide Info',
    imageSrc: '/images/Dashboard_Home/CustomerCategories/soloPriceinfo.png',
    color: 'text-emerald-600',
    isOpen: false,
  },
  {
    id: 'no-interesado',
    title: 'No Interesado',
    imageSrc: '/images/Dashboard_Home/CustomerCategories/noIntersado.png',
    color: 'text-emerald-600',
    isOpen: false,
  },
  {
    id: 'closed',
    title: 'Closed',
    imageSrc: '/images/Dashboard_Home/CustomerCategories/closed.png',
    color: 'text-emerald-600',
    isOpen: false,
  },
];

export default CustomerCategories;
