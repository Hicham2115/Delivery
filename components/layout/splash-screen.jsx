"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { LoadingIndicator } from "@/components/loading-indicator";

const SPLASH_DURATION_MS = 1800;

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-linear-to-br from-stone-900 via-neutral-900 to-stone-800"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute size-[420px] rounded-full bg-gold/10 blur-3xl"
          />
          <LoadingIndicator />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
