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
                <ul className="list-disc pl-5">
                  <li>Ejemplo de detalle 1</li>
                  <li>Ejemplo de detalle 2</li>
                </ul>
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
