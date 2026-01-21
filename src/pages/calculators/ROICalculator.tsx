import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function ROICalculator() {
  const [investment, setInvestment] = useState("100000");
  const [returns, setReturns] = useState("150000");

  const results = useMemo(() => {
    const invested = parseFloat(investment) || 0;
    const returned = parseFloat(returns) || 0;
    if (invested <= 0) return null;

    const roi = ((returned - invested) / invested) * 100;
    const profit = returned - invested;

    return { roi: roi.toFixed(2), profit: Math.round(profit) };
  }, [investment, returns]);

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

  return (
    <AppLayout>
      <PageHeader title="ROI Calculator" showBack backPath="/category/tax-business" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Amount Invested" value={investment} onChange={setInvestment} prefix="₹" />
          <CalculatorInput label="Amount Returned" value={returns} onChange={setReturns} prefix="₹" />
        </div>
        {results && (
          <ResultCard
            title="Return on Investment"
            results={[
              { label: "ROI", value: `${results.roi}%`, highlight: true },
              { label: "Net Profit", value: formatCurrency(results.profit) },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
