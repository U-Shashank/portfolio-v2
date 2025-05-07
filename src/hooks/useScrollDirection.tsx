"use client";

import { useState, useEffect } from "react";

interface ScrollDirection {
  isScrollingDown: boolean;
  hasScrolled: boolean;
  scrollY: number;
}

export function useScrollDirection(threshold = 10): ScrollDirection {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>({
    isScrollingDown: false,
    hasScrolled: false,
    scrollY: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const hasScrolled = currentScrollY > threshold;
      const isScrollingDown = currentScrollY > lastScrollY && hasScrolled;

      setScrollDirection({
        isScrollingDown,
        hasScrolled,
        scrollY: currentScrollY,
      });

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        // Use requestAnimationFrame for better performance
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    // Set up initial values
    updateScrollDirection();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrollDirection;
}