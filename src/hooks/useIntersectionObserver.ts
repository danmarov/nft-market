// hooks/useIntersectionObserver.ts
import { useCallback, useRef } from "react";

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
}

export const useIntersectionObserver = ({
  onIntersect,
  enabled = true,
  rootMargin = "50px",
}: UseIntersectionObserverProps) => {
  const observer = useRef<IntersectionObserver>();

  return useCallback(
    (node: HTMLDivElement | null) => {
      if (!enabled) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onIntersect();
          }
        },
        { rootMargin }
      );

      if (node) observer.current.observe(node);
    },
    [enabled, onIntersect, rootMargin]
  );
};
