import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function NPSCalculator() {
  const [monthlyContribution, setMonthlyContribution] = useState("5000");
  const [currentAge, setCurrentAge] = useState("30");
  const [expectedReturn, setExpectedReturn] = useState("10");

  const results = useMemo(() => {
    const P = parseFloat(monthlyContribution) || 0;
    const age = parseFloat(currentAge) || 0;
    const r = (parseFloat(expectedReturn) || 0) / 100 / 12;
    const retirementAge = 60;
    const years = retirementAge - age;
    const n = years * 12;

    if (P <= 0 || age >= 60 || r <= 0) return null;

    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvested = P * n;
    
    // 40% must be used to buy annuity, 60% is lump sum
    const lumpSum = futureValue * 0.6;
    const annuityCorpus = futureValue * 0.4;
    const monthlyPension = annuityCorpus * 0.06 / 12; // Assuming 6% annuity rate

    return {
      totalCorpus: Math.round(futureValue),
      totalInvested: Math.round(totalInvested),
      lumpSum: Math.round(lumpSum),
      monthlyPension: Math.round(monthlyPension),
    };
  }, [monthlyContribution, currentAge, expectedReturn]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="NPS Calculator" showBack backPath="/category/retirement" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Monthly Contribution" value={monthlyContribution} onChange={setMonthlyContribution} prefix="₹" />
          <CalculatorInput label="Current Age" value={currentAge} onChange={setCurrentAge} suffix="years" />
          <CalculatorInput label="Expected Return" value={expectedReturn} onChange={setExpectedReturn} suffix="% p.a." />
        </div>
        {results && (
          <ResultCard
            title="NPS Returns (at 60)"
            results={[
              { label: "Total Corpus", value: formatCurrency(results.totalCorpus), highlight: true },
              { label: "Lump Sum (60%)", value: formatCurrency(results.lumpSum) },
              { label: "Monthly Pension", value: formatCurrency(results.monthlyPension) },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
