"use client";
import React from "react";
import { motion } from "framer-motion";
import { Message } from "../../types";

type MessageBubbleProps = {
  message: Message;
  index?: number;
};

export function MessageBubble({ message, index = 0 }: MessageBubbleProps) {
  const isUser = message.sender === "user";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"} px-4`}
    >
      <div className={`max-w-[280px] flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-[8px] px-3 py-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)] ${
            isUser
              ? "bg-[#09B558] text-white"
              : "bg-[#D9D9D9] text-[#464646]"
          }`}
        >
          <p className="text-[15px] leading-[22px] break-words">{message.text}</p>
        </div>
        <span className="text-[10px] leading-[15px] text-[#464646]/50 px-1">
          {message.timestamp}
        </span>
      </div>
    </motion.div>
  );
}

