import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState("100000");
  const [sellingPrice, setSellingPrice] = useState("500");
  const [variableCost, setVariableCost] = useState("300");

  const results = useMemo(() => {
    const fc = parseFloat(fixedCosts) || 0;
    const sp = parseFloat(sellingPrice) || 0;
    const vc = parseFloat(variableCost) || 0;
    
    if (fc <= 0 || sp <= 0 || sp <= vc) return null;

    const contributionMargin = sp - vc;
    const breakEvenUnits = fc / contributionMargin;
    const breakEvenRevenue = breakEvenUnits * sp;
    const contributionRatio = (contributionMargin / sp) * 100;

    return {
      breakEvenUnits: Math.ceil(breakEvenUnits),
      breakEvenRevenue: Math.round(breakEvenRevenue),
      contributionMargin: contributionMargin,
      contributionRatio: contributionRatio,
    };
  }, [fixedCosts, sellingPrice, variableCost]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Break-Even" showBack backPath="/category/tax-business" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Fixed Costs" value={fixedCosts} onChange={setFixedCosts} prefix="₹" />
          <CalculatorInput label="Selling Price/Unit" value={sellingPrice} onChange={setSellingPrice} prefix="₹" />
          <CalculatorInput label="Variable Cost/Unit" value={variableCost} onChange={setVariableCost} prefix="₹" />
        </div>
        {results && (
          <ResultCard
            title="Break-Even Analysis"
            results={[
              { label: "Break-Even Units", value: results.breakEvenUnits.toLocaleString() },
              { label: "Break-Even Revenue", value: formatCurrency(results.breakEvenRevenue) },
              { label: "Contribution Margin", value: `${results.contributionRatio.toFixed(1)}%`, highlight: true },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
