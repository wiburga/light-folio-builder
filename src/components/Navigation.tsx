import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, SparklesIcon } from "lucide-react";
import { use3DGraphics } from "@/contexts/Graphics3DContext";
import Logo3D from "@/components/3d/Logo3D";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { is3DEnabled, toggle3D } = use3DGraphics();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Inicio", id: "home" },
    { label: "Sobre Mí", id: "about" },
    { label: "Habilidades", id: "skills" },
    { label: "Experiencia", id: "experience" },
    { label: "Proyectos", id: "projects" },
    { label: "Contacto", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection("home")}
            className="hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <div className="w-12 h-12">
              {is3DEnabled ? <Logo3D /> : <span className="text-2xl font-bold text-primary">IB</span>}
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-[var(--transition-smooth)]"
              >
                {item.label}
              </Button>
            ))}
            
            {/* 3D Toggle Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggle3D}
                  className={`ml-2 ${is3DEnabled ? "text-primary" : "text-muted-foreground"}`}
                >
                  {is3DEnabled ? <Sparkles className="h-5 w-5" /> : <SparklesIcon className="h-5 w-5 opacity-50" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{is3DEnabled ? "Desactivar efectos 3D" : "Activar efectos 3D"}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggle3D}
                  className={is3DEnabled ? "text-primary" : "text-muted-foreground"}
                >
                  {is3DEnabled ? <Sparkles className="h-5 w-5" /> : <SparklesIcon className="h-5 w-5 opacity-50" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{is3DEnabled ? "Desactivar 3D" : "Activar 3D"}</p>
              </TooltipContent>
            </Tooltip>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10 justify-start transition-[var(--transition-smooth)]"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;