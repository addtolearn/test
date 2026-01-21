import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function BMICalculator() {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");

  const results = useMemo(() => {
    const w = parseFloat(weight) || 0;
    const h = (parseFloat(height) || 0) / 100;
    if (w <= 0 || h <= 0) return null;

    const bmi = w / (h * h);
    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    return { bmi: bmi.toFixed(1), category };
  }, [weight, height]);

  return (
    <AppLayout>
      <PageHeader title="BMI Calculator" showBack backPath="/category/smart-utility" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Weight" value={weight} onChange={setWeight} suffix="kg" />
          <CalculatorInput label="Height" value={height} onChange={setHeight} suffix="cm" />
        </div>
        {results && (
          <ResultCard
            title="BMI Result"
            results={[
              { label: "BMI", value: results.bmi, highlight: true },
              { label: "Category", value: results.category },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
