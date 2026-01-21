import { Link } from "react-router-dom";
import { Category } from "@/data/calculators";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;
  const path = category.id === "simple-calculator" 
    ? "/simple-calculator" 
    : `/category/${category.id}`;

  return (
    <Link to={path} className={`${category.colorClass} block p-3 rounded-xl bg-card border border-border`}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <span className="font-medium text-sm text-foreground">{category.name}</span>
      </div>
    </Link>
  );
}
