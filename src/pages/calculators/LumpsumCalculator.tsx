import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function LumpsumCalculator() {
  const [investment, setInvestment] = useState("100000");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");

  const results = useMemo(() => {
    const P = parseFloat(investment) || 0;
    const r = (parseFloat(expectedReturn) || 0) / 100;
    const n = parseFloat(timePeriod) || 0;

    if (P <= 0 || r <= 0 || n <= 0) return null;

    const futureValue = P * Math.pow(1 + r, n);
    return {
      futureValue: Math.round(futureValue),
      totalInvested: P,
      wealthGained: Math.round(futureValue - P),
    };
  }, [investment, expectedReturn, timePeriod]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Lumpsum Calculator" showBack backPath="/category/invest-save" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Investment Amount" value={investment} onChange={setInvestment} prefix="₹" />
          <CalculatorInput label="Expected Return" value={expectedReturn} onChange={setExpectedReturn} suffix="% p.a." />
          <CalculatorInput label="Time Period" value={timePeriod} onChange={setTimePeriod} suffix="years" />
        </div>
        {results && (
          <ResultCard
            title="Lumpsum Returns"
            results={[
              { label: "Total Investment", value: formatCurrency(results.totalInvested) },
              { label: "Wealth Gained", value: formatCurrency(results.wealthGained) },
              { label: "Maturity Value", value: formatCurrency(results.futureValue), highlight: true },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
