import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function StepUpSIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("10000");
  const [stepUpPercent, setStepUpPercent] = useState("10");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");

  const results = useMemo(() => {
    const P = parseFloat(monthlyInvestment) || 0;
    const stepUp = (parseFloat(stepUpPercent) || 0) / 100;
    const r = (parseFloat(expectedReturn) || 0) / 100 / 12;
    const years = parseFloat(timePeriod) || 0;

    if (P <= 0 || r <= 0 || years <= 0) return null;

    let totalInvested = 0;
    let futureValue = 0;
    let currentMonthly = P;

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        const monthsRemaining = (years - year) * 12 + (12 - month) + 1;
        futureValue += currentMonthly * Math.pow(1 + r, monthsRemaining);
        totalInvested += currentMonthly;
      }
      currentMonthly *= (1 + stepUp);
    }

    return {
      futureValue: Math.round(futureValue),
      totalInvested: Math.round(totalInvested),
      wealthGained: Math.round(futureValue - totalInvested),
    };
  }, [monthlyInvestment, stepUpPercent, expectedReturn, timePeriod]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Step-Up SIP" showBack backPath="/category/invest-save" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Monthly Investment" value={monthlyInvestment} onChange={setMonthlyInvestment} prefix="₹" />
          <CalculatorInput label="Yearly Step-Up" value={stepUpPercent} onChange={setStepUpPercent} suffix="%" />
          <CalculatorInput label="Expected Return" value={expectedReturn} onChange={setExpectedReturn} suffix="% p.a." />
          <CalculatorInput label="Time Period" value={timePeriod} onChange={setTimePeriod} suffix="years" />
        </div>
        {results && (
          <ResultCard
            title="Step-Up SIP Returns"
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
