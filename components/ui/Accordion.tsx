"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id?: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  /** @deprecated use allowMultiple instead */
  type?: "single" | "multiple";
  defaultValue?: string;
  className?: string;
}

interface AccordionItemComponentProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItemComponent({
  item,
  isOpen,
  onToggle,
  index,
}: AccordionItemComponentProps) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden transition-colors duration-300",
        isOpen
          ? "border border-[rgba(212,175,55,0.3)]"
          : "border border-[rgba(255,255,255,0.07)] hover:border-[rgba(212,175,55,0.15)]"
      )}
      style={{
        background: isOpen ? "rgba(15, 34, 64, 0.8)" : "rgba(15, 34, 64, 0.4)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
      }}
    >
      {/* Header button */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
        aria-expanded={isOpen}
        aria-controls={`accordion-answer-${index}`}
        id={`accordion-trigger-${index}`}
      >
        <span
          className={cn(
            "text-sm md:text-base font-medium leading-snug transition-colors duration-200",
            isOpen
              ? "text-[#F8FAFC]"
              : "text-[#94A3B8] group-hover:text-[#F8FAFC]"
          )}
        >
          {item.question}
        </span>

        {/* Rotating + → × icon */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cn(
            "shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200",
            isOpen
              ? "bg-[rgba(212,175,55,0.15)] text-[#D4AF37]"
              : "bg-[rgba(255,255,255,0.05)] text-[#475569] group-hover:text-[#94A3B8]"
          )}
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
        </motion.div>
      </button>

      {/* Smooth animated answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-answer-${index}`}
            role="region"
            aria-labelledby={`accordion-trigger-${index}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
              opacity: { duration: 0.2, delay: 0.05 },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5">
              {/* Gold accent line */}
              <div
                className="h-px mb-4"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(212,175,55,0.35) 0%, transparent 100%)",
                }}
              />
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({
  items,
  allowMultiple = false,
  type,
  className,
}: AccordionProps) {
  // support legacy type prop
  const multi = allowMultiple || type === "multiple";
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (multi) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <AccordionItemComponent
          key={item.id ?? index}
          item={item}
          isOpen={openIndexes.includes(index)}
          onToggle={() => handleToggle(index)}
          index={index}
        />
      ))}
    </div>
  );
}

export default Accordion;
