import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function RetirementCorpusCalculator() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("60");
  const [monthlyExpenses, setMonthlyExpenses] = useState("50000");
  const [inflationRate, setInflationRate] = useState("6");

  const results = useMemo(() => {
    const current = parseFloat(currentAge) || 0;
    const retirement = parseFloat(retirementAge) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const inflation = (parseFloat(inflationRate) || 0) / 100;

    if (current >= retirement || expenses <= 0) return null;

    const yearsToRetirement = retirement - current;
    const yearsAfterRetirement = 25; // Assuming 25 years post-retirement
    
    const futureMonthlyExpense = expenses * Math.pow(1 + inflation, yearsToRetirement);
    const annualExpenseAtRetirement = futureMonthlyExpense * 12;
    
    // Corpus needed (using 4% withdrawal rule adjusted for inflation)
    const corpusNeeded = annualExpenseAtRetirement * yearsAfterRetirement;
    
    // Monthly SIP needed (assuming 12% returns)
    const r = 0.12 / 12;
    const n = yearsToRetirement * 12;
    const monthlySIP = corpusNeeded / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

    return {
      corpusNeeded: Math.round(corpusNeeded),
      futureMonthlyExpense: Math.round(futureMonthlyExpense),
      monthlySIP: Math.round(monthlySIP),
    };
  }, [currentAge, retirementAge, monthlyExpenses, inflationRate]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Retirement Corpus" showBack backPath="/category/retirement" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Current Age" value={currentAge} onChange={setCurrentAge} suffix="years" />
          <CalculatorInput label="Retirement Age" value={retirementAge} onChange={setRetirementAge} suffix="years" />
          <CalculatorInput label="Monthly Expenses" value={monthlyExpenses} onChange={setMonthlyExpenses} prefix="₹" />
          <CalculatorInput label="Inflation Rate" value={inflationRate} onChange={setInflationRate} suffix="%" />
        </div>
        {results && (
          <ResultCard
            title="Retirement Planning"
            results={[
              { label: "Corpus Needed", value: formatCurrency(results.corpusNeeded), highlight: true },
              { label: "Future Monthly Expense", value: formatCurrency(results.futureMonthlyExpense) },
              { label: "Monthly SIP Required", value: formatCurrency(results.monthlySIP) },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
