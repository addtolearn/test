import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function CAGRCalculator() {
  const [initialValue, setInitialValue] = useState("100000");
  const [finalValue, setFinalValue] = useState("200000");
  const [timePeriod, setTimePeriod] = useState("5");

  const results = useMemo(() => {
    const initial = parseFloat(initialValue) || 0;
    const final = parseFloat(finalValue) || 0;
    const years = parseFloat(timePeriod) || 0;

    if (initial <= 0 || final <= 0 || years <= 0) return null;

    const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;
    const absoluteReturn = ((final - initial) / initial) * 100;

    return {
      cagr: cagr.toFixed(2),
      absoluteReturn: absoluteReturn.toFixed(2),
      totalGain: final - initial,
    };
  }, [initialValue, finalValue, timePeriod]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="CAGR Calculator" showBack backPath="/category/invest-save" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Initial Value" value={initialValue} onChange={setInitialValue} prefix="₹" />
          <CalculatorInput label="Final Value" value={finalValue} onChange={setFinalValue} prefix="₹" />
          <CalculatorInput label="Time Period" value={timePeriod} onChange={setTimePeriod} suffix="years" />
        </div>
        {results && (
          <ResultCard
            title="CAGR Results"
            results={[
              { label: "CAGR", value: `${results.cagr}%`, highlight: true },
              { label: "Absolute Return", value: `${results.absoluteReturn}%` },
              { label: "Total Gain", value: formatCurrency(results.totalGain) },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
