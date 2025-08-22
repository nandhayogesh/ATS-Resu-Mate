import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";

interface HomeNavbarProps {
  analysis?: any;
  resetAnalysis?: () => void;
}

const HomeNavbar: React.FC<HomeNavbarProps> = ({ analysis, resetAnalysis }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 shadow-medium">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center justify-center h-12 w-12 md:h-16 md:w-16 bg-transparent">
              <img src="/logo.png" alt="Talent Lens Logo" className="object-contain h-12 w-12 md:h-16 md:w-16 scale-125 bg-transparent" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-primary">Talent Lens</h1>
              <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">Professional Resume Analyser</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 lg:gap-8">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-semibold bg-card px-4 py-2 rounded-xl" : "text-foreground hover:text-primary px-4 py-2 rounded-xl transition-colors"}>Home</NavLink>
            <NavLink to="/analyzer" className={({ isActive }) => isActive ? "text-primary font-semibold bg-card px-4 py-2 rounded-xl" : "text-foreground hover:text-primary px-4 py-2 rounded-xl transition-colors"}>Analyzer</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "text-primary font-semibold bg-card px-4 py-2 rounded-xl" : "text-foreground hover:text-primary px-4 py-2 rounded-xl transition-colors"}>About</NavLink>
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-3">
            <Badge variant="secondary" className="bg-gradient-card shadow-soft">
              <Zap className="h-3 w-3 mr-1 text-primary" />
              Free Analysis
            </Badge>
            {analysis && resetAnalysis && (
              <button
                onClick={resetAnalysis}
                className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors duration-200"
              >
                New Analysis
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/30">
            <nav className="flex flex-col space-y-2 pt-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => `block px-4 py-3 rounded-xl transition-colors ${isActive ? "text-primary font-semibold bg-card" : "text-foreground hover:text-primary hover:bg-muted/50"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to="/analyzer" 
                className={({ isActive }) => `block px-4 py-3 rounded-xl transition-colors ${isActive ? "text-primary font-semibold bg-card" : "text-foreground hover:text-primary hover:bg-muted/50"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Analyzer
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `block px-4 py-3 rounded-xl transition-colors ${isActive ? "text-primary font-semibold bg-card" : "text-foreground hover:text-primary hover:bg-muted/50"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </NavLink>
              
              {/* Mobile Badge and Actions */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-border/30 mt-4">
                <Badge variant="secondary" className="bg-gradient-card shadow-soft w-fit">
                  <Zap className="h-3 w-3 mr-1 text-primary" />
                  Free Analysis
                </Badge>
                {analysis && resetAnalysis && (
                  <button
                    onClick={() => {
                      resetAnalysis();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors duration-200 text-left w-fit"
                  >
                    New Analysis
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default HomeNavbar;
