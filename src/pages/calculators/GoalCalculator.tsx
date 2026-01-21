import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function GoalCalculator() {
  const [goalAmount, setGoalAmount] = useState("1000000");
  const [currentSavings, setCurrentSavings] = useState("0");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [timePeriod, setTimePeriod] = useState("5");

  const results = useMemo(() => {
    const goal = parseFloat(goalAmount) || 0;
    const current = parseFloat(currentSavings) || 0;
    const r = (parseFloat(expectedReturn) || 0) / 100 / 12;
    const months = (parseFloat(timePeriod) || 0) * 12;

    if (goal <= 0 || r <= 0 || months <= 0) return null;

    const futureValueOfCurrent = current * Math.pow(1 + r, months);
    const remainingGoal = goal - futureValueOfCurrent;
    
    if (remainingGoal <= 0) {
      return { monthlySIP: 0, totalInvestment: current, goalAmount: goal };
    }

    const monthlySIP = remainingGoal * r / (Math.pow(1 + r, months) - 1);

    return {
      monthlySIP: Math.round(monthlySIP),
      totalInvestment: Math.round(current + monthlySIP * months),
      goalAmount: goal,
    };
  }, [goalAmount, currentSavings, expectedReturn, timePeriod]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Goal Calculator" showBack backPath="/category/invest-save" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Goal Amount" value={goalAmount} onChange={setGoalAmount} prefix="₹" />
          <CalculatorInput label="Current Savings" value={currentSavings} onChange={setCurrentSavings} prefix="₹" />
          <CalculatorInput label="Expected Return" value={expectedReturn} onChange={setExpectedReturn} suffix="% p.a." />
          <CalculatorInput label="Time to Goal" value={timePeriod} onChange={setTimePeriod} suffix="years" />
        </div>
        {results && (
          <ResultCard
            title="Goal Planning"
            results={[
              { label: "Monthly SIP Needed", value: formatCurrency(results.monthlySIP), highlight: true },
              { label: "Total Investment", value: formatCurrency(results.totalInvestment) },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
