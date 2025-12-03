import { lazy, Suspense } from "react";

// Lazy load the heavy 3D component
const Scene3D = lazy(() => import("@/components/Scene3D"));

const LazyScene3D = () => {
  return (
    <Suspense fallback={
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-background/50 to-background" />
    }>
      <Scene3D />
    </Suspense>
  );
};

export default LazyScene3D;
