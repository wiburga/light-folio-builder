import { useEffect, useRef, useState, ReactNode, memo } from "react";
import { useScrollVelocity, getPreloadMargin } from "@/hooks/useScrollVelocity";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  fallback?: ReactNode;
  onApproaching?: () => void;
  approachMargin?: string;
}

const LazySection = memo(({
  children,
  className = "",
  threshold = 0.1,
  fallback = null,
  onApproaching,
  approachMargin = "500px"
}: LazySectionProps) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasTriggeredApproach, setHasTriggeredApproach] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const approachObserverRef = useRef<IntersectionObserver | null>(null);
  const { velocity, direction } = useScrollVelocity();

  // Approach observer for prefetching
  useEffect(() => {
    const element = ref.current;
    if (!element || !onApproaching || hasTriggeredApproach) return;

    approachObserverRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onApproaching();
          setHasTriggeredApproach(true);
          approachObserverRef.current?.disconnect();
        }
      },
      { rootMargin: approachMargin, threshold: 0 }
    );

    approachObserverRef.current.observe(element);

    return () => approachObserverRef.current?.disconnect();
  }, [onApproaching, approachMargin, hasTriggeredApproach]);

  // Main visibility observer
  useEffect(() => {
    const element = ref.current;
    if (!element || hasLoaded) return;

    const baseMargin = getPreloadMargin(velocity);
    const margin = direction === "down" 
      ? `0px 0px ${baseMargin} 0px`
      : direction === "up"
      ? `${baseMargin} 0px 0px 0px`
      : baseMargin;

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
