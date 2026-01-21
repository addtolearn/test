import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState("50000");
  const [emi, setEmi] = useState("20000");
  const [insurance, setInsurance] = useState("5000");
  const [currentSavings, setCurrentSavings] = useState("100000");
  const [dependents, setDependents] = useState("2");

  const results = useMemo(() => {
    const expenses = parseFloat(monthlyExpenses) || 0;
    const emiVal = parseFloat(emi) || 0;
    const insuranceVal = parseFloat(insurance) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const deps = parseFloat(dependents) || 0;

    const monthlyTotal = expenses + emiVal + insuranceVal;
    
    // Recommended months based on dependents
    let recommendedMonths = 3;
    if (deps >= 3) recommendedMonths = 6;
    else if (deps >= 1) recommendedMonths = 4;

    const recommendedFund = monthlyTotal * recommendedMonths;
    const shortfall = Math.max(0, recommendedFund - savings);
    const coverageMonths = monthlyTotal > 0 ? savings / monthlyTotal : 0;

    return {
      monthlyTotal,
      recommendedMonths,
      recommendedFund: Math.round(recommendedFund),
      currentCoverage: coverageMonths,
      shortfall: Math.round(shortfall),
      status: coverageMonths >= recommendedMonths ? "Adequate" : "Build More",
    };
  }, [monthlyExpenses, emi, insurance, currentSavings, dependents]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Emergency Fund" showBack backPath="/category/smart-utility" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Monthly Expenses" value={monthlyExpenses} onChange={setMonthlyExpenses} prefix="₹" />
          <CalculatorInput label="Monthly EMIs" value={emi} onChange={setEmi} prefix="₹" />
          <CalculatorInput label="Insurance Premiums" value={insurance} onChange={setInsurance} prefix="₹" />
          <CalculatorInput label="Current Savings" value={currentSavings} onChange={setCurrentSavings} prefix="₹" />
          <CalculatorInput label="Dependents" value={dependents} onChange={setDependents} />
        </div>
        {results && (
          <ResultCard
            title="Emergency Fund Analysis"
            results={[
              { label: "Current Coverage", value: `${results.currentCoverage.toFixed(1)} months` },
              { label: "Recommended", value: `${results.recommendedMonths} months` },
              { label: "Target Fund", value: formatCurrency(results.recommendedFund) },
              { label: "Shortfall", value: formatCurrency(results.shortfall), highlight: true },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
