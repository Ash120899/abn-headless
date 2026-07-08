"use client";

import { useCallback, useRef } from "react";

export default function useDragScroll(ref) {
  const state = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: 0 });

  const endDrag = useCallback(() => {
    const el = ref.current;
    state.current.isDown = false;
    if (el) el.classList.remove("dragging");
  }, [ref]);

  const onMouseDown = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      state.current.isDown = true;
      state.current.moved = 0;
      state.current.startX = e.pageX - el.offsetLeft;
      state.current.scrollLeft = el.scrollLeft;
      el.classList.add("dragging");
    },
    [ref]
  );

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!state.current.isDown || !el) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = x - state.current.startX;
      state.current.moved = Math.max(state.current.moved, Math.abs(walk));
      el.scrollLeft = state.current.scrollLeft - walk;
    },
    [ref]
  );

  const onClickCapture = useCallback((e) => {
    if (state.current.moved > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp: endDrag,
    onMouseLeave: endDrag,
    onClickCapture,
  };
}
