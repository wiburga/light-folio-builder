import { useEffect, useRef, useState, ReactNode, memo } from "react";
import { useScrollVelocity, getPreloadMargin } from "@/hooks/useScrollVelocity";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  fallback?: ReactNode;
}

const LazySection = memo(({
  children,
  className = "",
  threshold = 0.1,
  fallback = null
}: LazySectionProps) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { velocity, direction } = useScrollVelocity();

  useEffect(() => {
    const element = ref.current;
    if (!element || hasLoaded) return;

    // Calculate margin based on scroll velocity and direction
    const baseMargin = getPreloadMargin(velocity);
    const margin = direction === "down" 
      ? `0px 0px ${baseMargin} 0px`  // Preload below
      : direction === "up"
      ? `${baseMargin} 0px 0px 0px`  // Preload above
      : baseMargin;                   // Preload all directions

    // Disconnect previous observer if margin changed
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasLoaded(true);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin: margin, threshold }
    );

    observerRef.current.observe(element);

    return () => observerRef.current?.disconnect();
  }, [velocity, direction, threshold, hasLoaded]);

  return (
    <div ref={ref} className={className}>
      {hasLoaded ? children : (
        <div className="min-h-[50vh] flex items-center justify-center">
          {fallback || (
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
});

LazySection.displayName = "LazySection";

export default LazySection;
