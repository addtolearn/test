import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function PPFCalculator() {
  const [yearlyInvestment, setYearlyInvestment] = useState("150000");
  const [timePeriod, setTimePeriod] = useState("15");
  const [interestRate, setInterestRate] = useState("7.1");

  const results = useMemo(() => {
    const P = parseFloat(yearlyInvestment) || 0;
    const years = parseFloat(timePeriod) || 0;
    const r = (parseFloat(interestRate) || 0) / 100;

    if (P <= 0 || years < 15 || r <= 0) return null;

    let balance = 0;
    for (let i = 0; i < years; i++) {
      balance = (balance + P) * (1 + r);
    }

    const totalInvested = P * years;
    const interestEarned = balance - totalInvested;

    return {
      maturityValue: Math.round(balance),
      totalInvested: Math.round(totalInvested),
      interestEarned: Math.round(interestEarned),
    };
  }, [yearlyInvestment, timePeriod, interestRate]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="PPF Calculator" showBack backPath="/category/retirement" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Yearly Investment" value={yearlyInvestment} onChange={setYearlyInvestment} prefix="₹" />
          <CalculatorInput label="Time Period (min 15)" value={timePeriod} onChange={setTimePeriod} suffix="years" />
          <CalculatorInput label="Interest Rate" value={interestRate} onChange={setInterestRate} suffix="% p.a." />
        </div>
        {results && (
          <ResultCard
            title="PPF Returns"
            results={[
              { label: "Maturity Value", value: formatCurrency(results.maturityValue), highlight: true },
              { label: "Total Invested", value: formatCurrency(results.totalInvested) },
              { label: "Interest Earned", value: formatCurrency(results.interestEarned) },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
