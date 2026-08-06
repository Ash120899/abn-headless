"use client";

import { useEffect } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Traps Tab/Shift+Tab focus inside containerRef while isActive, and returns
// focus to returnFocusRef (e.g. the button that opened the panel) on close.
export default function useFocusTrap(containerRef, isActive, { returnFocusRef } = {}) {
  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const opener = returnFocusRef?.current || document.activeElement;

    const focusables = () => [...container.querySelectorAll(FOCUSABLE_SELECTOR)];
    const first = focusables()[0];
    first?.focus();

    function onKeyDown(e) {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    container.addEventListener("keydown", onKeyDown);
    return () => {
      container.removeEventListener("keydown", onKeyDown);
      opener?.focus?.();
    };
  }, [isActive, containerRef, returnFocusRef]);
}
