import React from 'react';
import {
  Heart,
  Truck,
  MapPin,
  Info,
  Frown,
  History,
} from 'lucide-react';
import CategoryAccordion from './CategoryAccordion';

export type CategoryItem = {
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
  isOpen?: boolean;
};

export type CustomerCategoriesProps = {
  categories: CategoryItem[];
  onToggleCategory?: (id: string, next: boolean) => void;
};

// CustomerCategories: main section container with title and list of categories.
// Backend hooks:
// - Replace categories data with a fetched list.
// - Wire onToggle to analytics or a state store if needed.
const CustomerCategories: React.FC<CustomerCategoriesProps> = ({ categories, onToggleCategory }) => {
  return (
    <section className="w-full grid place-items-center">
      {/* 390px artboard width */}
      <div className="w-full max-w-[390px]">
        {/* Card 366px with 12px vertical padding per Figma */}
        <div className="mx-auto w-[366px] rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] py-3">
          {/* Title row */}
          <div className="px-[12px]">
            <h2 className="text-[21px] leading-[32px] font-semibold text-black">Customer Categories</h2>
          </div>
          {/* List area */}
          <div className="px-[12px] pt-1 pb-3 space-y-4">
            {categories.map((c) => (
              <CategoryAccordion
                key={c.id}
                title={c.title}
                icon={c.icon}
                color={c.color}
                isOpen={c.isOpen}
                onToggle={(next) => onToggleCategory?.(c.id, next)}
              >
                <div className="flex flex-col gap-2 w-full">
                  {[0,1,2].map((i) => (
                    <div key={i} className="w-full h-[59px] bg-[#FDFCFB] border border-[rgba(70,70,70,0.25)] rounded-[8px] shadow-[0_4px_4px_rgba(0,0,0,0.05)] p-1">
                      <div className="w-full h-[51px] px-1 py-1 flex flex-col gap-0.5">
                        <div className="w-full h-[23px] flex items-start gap-6">
                          <div className="flex-1 h-[23px] text-[15px] leading-[22px] font-medium text-black flex items-center">
                            Name of the product
                          </div>
                          <div className="w-[56px] h-[23px] text-[15px] leading-[22px] font-medium text-black text-right flex items-center justify-end">
                            Qty: 1
                          </div>
                        </div>
                        <div className="h-[18px] text-[12px] leading-[18px] font-normal text-black flex items-center">
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

// Default demo data (mobile-first). Replace with API data.
export const demoCategories: CategoryItem[] = [
  { id: 'interesado', title: 'Interesado', icon: Heart, color: 'text-emerald-600', isOpen: false },
  { id: 'delivery', title: 'Delivery', icon: Truck, color: 'text-emerald-600', isOpen: false },
  { id: 'va-en-persona', title: 'Va En Persona', icon: MapPin, color: 'text-emerald-600', isOpen: false },
  { id: 'solo-pide-info', title: 'Solo Pide Info', icon: Info, color: 'text-emerald-600', isOpen: false },
  { id: 'no-interesado', title: 'No Interesado', icon: Frown, color: 'text-emerald-600', isOpen: false },
  { id: 'closed', title: 'Closed', icon: History, color: 'text-emerald-600', isOpen: false },
];

export default CustomerCategories;
