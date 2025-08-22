import React from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface HomeNavbarProps {
  analysis?: any;
  resetAnalysis?: () => void;
}

const HomeNavbar: React.FC<HomeNavbarProps> = ({ analysis, resetAnalysis }) => (
  <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 shadow-medium">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-20 w-20 bg-transparent">
            <img src="/logo.png" alt="ATS Resu-Mate Logo" className="object-contain h-20 w-20 scale-110 bg-transparent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">ATS Resu-Mate</h1>
            <p className="text-sm text-muted-foreground">Powered by Advanced AI Analysis</p>
          </div>
        </div>
        <nav className="flex gap-8">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-semibold bg-card px-4 py-2 rounded-xl" : "text-foreground hover:text-primary px-4 py-2 rounded-xl transition-colors"}>Home</NavLink>
          <NavLink to="/analyzer" className={({ isActive }) => isActive ? "text-primary font-semibold bg-card px-4 py-2 rounded-xl" : "text-foreground hover:text-primary px-4 py-2 rounded-xl transition-colors"}>Analyzer</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-primary font-semibold bg-card px-4 py-2 rounded-xl" : "text-foreground hover:text-primary px-4 py-2 rounded-xl transition-colors"}>About</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="hidden sm:flex bg-gradient-card shadow-soft">
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
      </div>
    </div>
  </header>
);

export default HomeNavbar;
