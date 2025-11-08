"use client";
import React from "react";
import { TaskStatCard } from "./TaskStatCard";

export type TaskStat = {
  iconSrc: string;
  iconAlt?: string;
  label: string;
  count: number | string;
  href?: string;
};

type Props = {
  tasks: TaskStat[];
};

// Matches Figma
// Frame 61: 359x135 outer card
//   - Inner Frame 23: padding 12, gap 16
//   - Title box: 335x25, font 21, leading 32
//   - Frame 5: 335x70, gap 12, three cards 110x70
export function YourTasksSection({ tasks }: Props) {
  return (
    <section className="w-[359px] h-[135px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px]">
      <div className="w-full h-full p-3 flex flex-col gap-4">
        <div className="w-[335px] h-[25px] flex items-center text-[21px] leading-[32px] font-semibold text-black">Your Tasks</div>
        <div className="w-[335px] h-[70px] flex items-center justify-between" style={{ filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.05))" }}>
          {tasks.slice(0, 3).map((t, i) => (
            <TaskStatCard
              key={i}
              iconSrc={t.iconSrc}
              iconAlt={t.iconAlt}
              label={t.label}
              count={t.count}
              variant={i === 2 ? "wide" : "narrow"}
              href={t.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
