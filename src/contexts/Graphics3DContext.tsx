import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Graphics3DContextType {
  is3DEnabled: boolean;
  toggle3D: () => void;
}

const Graphics3DContext = createContext<Graphics3DContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio-3d-enabled";

export function Graphics3DProvider({ children }: { children: ReactNode }) {
  const [is3DEnabled, setIs3DEnabled] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored !== null ? stored === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(is3DEnabled));
  }, [is3DEnabled]);

  const toggle3D = () => setIs3DEnabled((prev) => !prev);

  return (
    <Graphics3DContext.Provider value={{ is3DEnabled, toggle3D }}>
      {children}
    </Graphics3DContext.Provider>
  );
}

export function use3DGraphics() {
  const context = useContext(Graphics3DContext);
  if (context === undefined) {
    throw new Error("use3DGraphics must be used within a Graphics3DProvider");
  }
  return context;
}
