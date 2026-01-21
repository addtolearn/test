import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function InflationCalculator() {
  const [currentCost, setCurrentCost] = useState("100000");
  const [inflationRate, setInflationRate] = useState("6");
  const [timePeriod, setTimePeriod] = useState("10");

  const results = useMemo(() => {
    const cost = parseFloat(currentCost) || 0;
    const rate = (parseFloat(inflationRate) || 0) / 100;
    const years = parseFloat(timePeriod) || 0;

    if (cost <= 0 || rate <= 0 || years <= 0) return null;

    const futureCost = cost * Math.pow(1 + rate, years);
    const purchasingPowerLoss = cost - (cost / Math.pow(1 + rate, years));

    return {
      futureCost: Math.round(futureCost),
      costIncrease: Math.round(futureCost - cost),
      purchasingPowerLoss: Math.round(purchasingPowerLoss),
    };
  }, [currentCost, inflationRate, timePeriod]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Inflation Calculator" showBack backPath="/category/invest-save" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Current Cost" value={currentCost} onChange={setCurrentCost} prefix="₹" />
          <CalculatorInput label="Inflation Rate" value={inflationRate} onChange={setInflationRate} suffix="% p.a." />
          <CalculatorInput label="Time Period" value={timePeriod} onChange={setTimePeriod} suffix="years" />
        </div>
        {results && (
          <ResultCard
            title="Inflation Impact"
            results={[
              { label: "Future Cost", value: formatCurrency(results.futureCost), highlight: true },
              { label: "Cost Increase", value: formatCurrency(results.costIncrease) },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
