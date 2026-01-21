import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function ProfitMarginCalculator() {
  const [costPrice, setCostPrice] = useState("1000");
  const [sellingPrice, setSellingPrice] = useState("1500");

  const results = useMemo(() => {
    const cp = parseFloat(costPrice) || 0;
    const sp = parseFloat(sellingPrice) || 0;
    
    if (cp <= 0 || sp <= 0) return null;

    const profit = sp - cp;
    const profitPercentage = (profit / cp) * 100;
    const grossMargin = (profit / sp) * 100;

    return {
      costPrice: cp,
      sellingPrice: sp,
      profit: profit,
      profitPercentage: profitPercentage,
      grossMargin: grossMargin,
    };
  }, [costPrice, sellingPrice]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Profit Margin" showBack backPath="/category/tax-business" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Cost Price" value={costPrice} onChange={setCostPrice} prefix="₹" />
          <CalculatorInput label="Selling Price" value={sellingPrice} onChange={setSellingPrice} prefix="₹" />
        </div>
        {results && (
          <ResultCard
            title="Profit Analysis"
            results={[
              { label: "Profit/Loss", value: formatCurrency(results.profit) },
              { label: "Markup %", value: `${results.profitPercentage.toFixed(2)}%` },
              { label: "Gross Margin", value: `${results.grossMargin.toFixed(2)}%`, highlight: true },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
