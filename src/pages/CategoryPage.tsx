import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorListItem } from "@/components/calculator/CalculatorListItem";
import { getCategoryById } from "@/data/calculators";

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getCategoryById(categoryId || "");

  if (!category) {
    return (
      <AppLayout>
        <PageHeader title="Not Found" showBack />
        <div className="px-4 py-8 text-center">
          <p className="text-muted-foreground">Category not found</p>
        </div>
      </AppLayout>
    );
  }

  const Icon = category.icon;

  return (
    <AppLayout>
      <PageHeader title={category.name} subtitle={category.description} showBack backPath="/" />
      
      <div className="px-4 py-6 max-w-md mx-auto">
        {/* Category Header */}
        <div className={`category-card ${category.colorClass} mb-6`}>
          <div className="flex items-center gap-4">
            <div className="category-icon w-14 h-14 rounded-xl flex items-center justify-center">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-foreground">{category.name}</h2>
              <p className="text-sm text-muted-foreground">
                {category.calculators.length} calculators
              </p>
            </div>
          </div>
        </div>

        {/* Calculator List */}
        <div className="space-y-3">
          {category.calculators.map((calculator) => (
            <CalculatorListItem key={calculator.id} calculator={calculator} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
