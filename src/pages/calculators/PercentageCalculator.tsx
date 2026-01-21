import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function PercentageCalculator() {
  const [value, setValue] = useState("500");
  const [percentage, setPercentage] = useState("20");

  const results = useMemo(() => {
    const v = parseFloat(value) || 0;
    const p = parseFloat(percentage) || 0;
    if (v <= 0) return null;

    return {
      percentageOf: (v * p / 100).toFixed(2),
      increase: (v * (1 + p / 100)).toFixed(2),
      decrease: (v * (1 - p / 100)).toFixed(2),
    };
  }, [value, percentage]);

  return (
    <AppLayout>
      <PageHeader title="Percentage Calculator" showBack backPath="/category/smart-utility" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Value" value={value} onChange={setValue} />
          <CalculatorInput label="Percentage" value={percentage} onChange={setPercentage} suffix="%" />
        </div>
        {results && (
          <ResultCard
            title="Percentage Results"
            results={[
              { label: `${percentage}% of ${value}`, value: results.percentageOf, highlight: true },
              { label: `${value} + ${percentage}%`, value: results.increase },
              { label: `${value} - ${percentage}%`, value: results.decrease },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
