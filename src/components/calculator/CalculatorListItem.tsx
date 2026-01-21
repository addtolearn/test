import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CalculatorItem } from "@/data/calculators";

interface CalculatorListItemProps {
  calculator: CalculatorItem;
}

export function CalculatorListItem({ calculator }: CalculatorListItemProps) {
  return (
    <Link
      to={calculator.path}
      className="flex items-center justify-between p-4 bg-card rounded-xl shadow-card hover:shadow-elevated transition-shadow"
    >
      <div className="min-w-0 flex-1">
        <h3 className="font-medium text-foreground truncate">
          {calculator.name}
        </h3>
        <p className="text-sm text-muted-foreground truncate">
          {calculator.description}
        </p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-3" />
    </Link>
  );
}
