import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function FinancialHealthCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState("100000");
  const [monthlyExpenses, setMonthlyExpenses] = useState("60000");
  const [emi, setEmi] = useState("20000");
  const [savings, setSavings] = useState("500000");
  const [investments, setInvestments] = useState("300000");

  const results = useMemo(() => {
    const income = parseFloat(monthlyIncome) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const emiVal = parseFloat(emi) || 0;
    const savingsVal = parseFloat(savings) || 0;
    const investVal = parseFloat(investments) || 0;

    if (income <= 0) return null;

    const savingsRate = ((income - expenses - emiVal) / income) * 100;
    const debtToIncomeRatio = (emiVal / income) * 100;
    const emergencyFundMonths = (savingsVal + investVal) / (expenses + emiVal);
    
    // Calculate score (0-100)
    let score = 0;
    score += Math.min(30, savingsRate * 1.5); // Max 30 points for savings rate
    score += Math.min(25, (50 - debtToIncomeRatio)); // Max 25 points for low debt
    score += Math.min(25, emergencyFundMonths * 4); // Max 25 points for emergency fund
    score += Math.min(20, (investVal / income) * 2); // Max 20 points for investments
    score = Math.max(0, Math.min(100, score));

    let rating = "Poor";
    if (score >= 80) rating = "Excellent";
    else if (score >= 60) rating = "Good";
    else if (score >= 40) rating = "Fair";

    return {
      savingsRate: Math.max(0, savingsRate),
      debtToIncomeRatio,
      emergencyFundMonths,
      score: Math.round(score),
      rating,
    };
  }, [monthlyIncome, monthlyExpenses, emi, savings, investments]);

  return (
    <AppLayout>
      <PageHeader title="Financial Health" showBack backPath="/category/smart-utility" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Monthly Income" value={monthlyIncome} onChange={setMonthlyIncome} prefix="₹" />
          <CalculatorInput label="Monthly Expenses" value={monthlyExpenses} onChange={setMonthlyExpenses} prefix="₹" />
          <CalculatorInput label="Total EMIs" value={emi} onChange={setEmi} prefix="₹" />
          <CalculatorInput label="Savings" value={savings} onChange={setSavings} prefix="₹" />
          <CalculatorInput label="Investments" value={investments} onChange={setInvestments} prefix="₹" />
        </div>
        {results && (
          <ResultCard
            title="Health Score"
            results={[
              { label: "Savings Rate", value: `${results.savingsRate.toFixed(1)}%` },
              { label: "Debt Ratio", value: `${results.debtToIncomeRatio.toFixed(1)}%` },
              { label: "Emergency Fund", value: `${results.emergencyFundMonths.toFixed(1)} months` },
              { label: "Score", value: `${results.score}/100 (${results.rating})`, highlight: true },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
