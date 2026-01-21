import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function GratuityCalculator() {
  const [basicSalary, setBasicSalary] = useState("50000");
  const [yearsOfService, setYearsOfService] = useState("10");

  const results = useMemo(() => {
    const basic = parseFloat(basicSalary) || 0;
    const years = parseFloat(yearsOfService) || 0;
    if (basic <= 0 || years < 5) return null;

    // Gratuity = (Basic + DA) × 15/26 × Years of service
    const gratuity = (basic * 15 / 26) * years;

    return { gratuity: Math.round(gratuity) };
  }, [basicSalary, yearsOfService]);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Gratuity Calculator" showBack backPath="/category/tax-business" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Last Basic Salary" value={basicSalary} onChange={setBasicSalary} prefix="₹" />
          <CalculatorInput label="Years of Service (min 5)" value={yearsOfService} onChange={setYearsOfService} suffix="years" />
        </div>
        {results && (
          <ResultCard
            title="Gratuity Amount"
            results={[{ label: "Gratuity Payable", value: formatCurrency(results.gratuity), highlight: true }]}
          />
        )}
      </div>
    </AppLayout>
  );
}
