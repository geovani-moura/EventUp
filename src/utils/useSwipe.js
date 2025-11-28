import { useEffect } from "react";

// Minimal swipe hook: detect left/right swipe and call handlers
const useSwipe = ({ onSwipeLeft, onSwipeRight, threshold = 50 } = {}) => {
  useEffect(() => {
    let touchStartX = null;
    let touchStartY = null;

    const handleTouchStart = (e) => {
      const t = e.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartX === null) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;

      // ignore mostly vertical swipes
      if (Math.abs(dy) > Math.abs(dx)) {
        touchStartX = null;
        touchStartY = null;
        return;
      }

      if (dx > threshold && typeof onSwipeRight === "function") onSwipeRight();
      if (dx < -threshold && typeof onSwipeLeft === "function") onSwipeLeft();

      touchStartX = null;
      touchStartY = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, threshold]);
};

export default useSwipe;
