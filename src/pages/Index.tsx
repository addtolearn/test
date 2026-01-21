import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CategoryCard } from "@/components/home/CategoryCard";
import { categories } from "@/data/calculators";
import { Link } from "react-router-dom";
import appLogo from "@/assets/app-logo.png";
import {
  TrendingUp,
  PiggyBank,
  Umbrella,
  Briefcase,
  CreditCard,
  Calendar,
  CalendarDays,
  Scale,
  ShieldAlert,
  Percent,
  Sun,
  Moon,
  Layers,
  Ruler,
  ClipboardList,
} from "lucide-react";

const quickTools = [
  { name: "Financial Plan", path: "/calculator/financial-planning", icon: ClipboardList },
  { name: "Unit Converter", path: "/calculator/unit-converter", icon: Ruler },
  { name: "Investment", path: "/calculator/investment", icon: Layers },
  { name: "SIP", path: "/calculator/sip", icon: TrendingUp },
  { name: "Lumpsum", path: "/calculator/lumpsum", icon: PiggyBank },
  { name: "Retirement", path: "/calculator/retirement-corpus", icon: Umbrella },
  { name: "EPF", path: "/calculator/epf", icon: Briefcase },
  { name: "EMI", path: "/calculator/emi", icon: CreditCard },
  { name: "Age", path: "/calculator/age", icon: Calendar },
  { name: "Date Diff", path: "/calculator/date-diff", icon: CalendarDays },
  { name: "BMI", path: "/calculator/bmi", icon: Scale },
  { name: "Risk Profile", path: "/calculator/risk-profile", icon: ShieldAlert },
  { name: "Interest", path: "/calculator/interest", icon: Percent },
];

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <AppLayout>
      <div className="px-4 pt-4 pb-2 max-w-md mx-auto">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <img src={appLogo} alt="Mitra Calculator" className="w-12 h-12 rounded-xl" />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Mitra Calculator</h1>
            <p className="text-xs text-muted-foreground">Your financial companion</p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Quick Tools Section */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">Popular Tools</h2>
          <div className="flex flex-wrap gap-2">
            {quickTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="flex items-center gap-1.5 px-3 py-2 bg-card rounded-full border border-border shadow-sm hover:shadow-md transition-shadow text-xs font-medium text-foreground"
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  {tool.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
