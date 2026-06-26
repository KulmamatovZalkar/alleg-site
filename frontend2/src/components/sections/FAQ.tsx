"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

import type { FAQDTO } from "@/lib/api";

export default function FAQ({ items }: { items: FAQDTO[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((f, i) => {
        const isOpen = open === f.id;
        return (
          <motion.div
            key={f.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.4,
              delay: Math.min(i * 0.04, 0.15),
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`overflow-hidden rounded-[1.5rem] shadow-soft transition-all duration-300 ${
              isOpen
                ? "bg-gold-50 ring-1 ring-gold-300/40"
                : "border border-ink-700 bg-white hover:border-gold-300/40"
            }`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 p-6 text-left text-base font-medium text-body sm:p-7 sm:text-lg"
              onClick={() => setOpen(isOpen ? null : f.id)}
            >
              <span>{f.question}</span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen ? "bg-gold-gradient text-white" : "bg-gold-50 text-gold-500"
                }`}
              >
                <Plus
                  size={18}
                  className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-5 pb-5 text-sm leading-relaxed text-body-muted sm:px-6 sm:pb-6"
                    dangerouslySetInnerHTML={{ __html: f.answer }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
