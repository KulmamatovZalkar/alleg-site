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
            className={`rounded-2xl border transition-colors ${
              isOpen
                ? "border-gold-300/30 bg-white/[0.03]"
                : "border-white/[0.06] bg-white/[0.015]"
            }`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm text-white sm:p-6 sm:text-base"
              onClick={() => setOpen(isOpen ? null : f.id)}
            >
              <span className="font-medium">{f.question}</span>
              <Plus
                size={18}
                className={`shrink-0 text-gold-300 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              />
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
                    className="px-5 pb-5 text-sm leading-relaxed text-white/70 sm:px-6 sm:pb-6"
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
