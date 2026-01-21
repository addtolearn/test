import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function InsuranceCalculator() {
  const [annualIncome, setAnnualIncome] = useState("1200000");
  const [age, setAge] = useState("30");
  const [existingCover, setExistingCover] = useState("2500000");
  const [loans, setLoans] = useState("3000000");
  const [dependents, setDependents] = useState("3");

  const results = useMemo(() => {
    const income = parseFloat(annualIncome) || 0;
    const ageVal = parseFloat(age) || 30;
    const existing = parseFloat(existingCover) || 0;
    const loansVal = parseFloat(loans) || 0;
    const deps = parseFloat(dependents) || 1;

    // Income replacement method
    const yearsToRetirement = Math.max(0, 60 - ageVal);
    const incomeMultiplier = Math.min(15, Math.max(10, yearsToRetirement / 2));
    
    const incomeReplacement = income * incomeMultiplier;
    const loanCoverage = loansVal;
    const dependentsFactor = deps * 500000; // 5L per dependent
    
    const recommendedCover = incomeReplacement + loanCoverage + dependentsFactor;
    const gap = Math.max(0, recommendedCover - existing);
    const coverageRatio = existing / recommendedCover * 100;

    return {
      incomeReplacement: Math.round(incomeReplacement),
      loanCoverage: Math.round(loanCoverage),
      recommendedCover: Math.round(recommendedCover),
      existingCover: existing,
      gap: Math.round(gap),
      coverageRatio: Math.min(100, coverageRatio),
      status: gap <= 0 ? "Adequate" : "Under-insured",
    };
  }, [annualIncome, age, existingCover, loans, dependents]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Insurance Coverage" showBack backPath="/category/smart-utility" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Annual Income" value={annualIncome} onChange={setAnnualIncome} prefix="₹" />
          <CalculatorInput label="Your Age" value={age} onChange={setAge} suffix="years" />
          <CalculatorInput label="Existing Cover" value={existingCover} onChange={setExistingCover} prefix="₹" />
          <CalculatorInput label="Total Loans" value={loans} onChange={setLoans} prefix="₹" />
          <CalculatorInput label="Dependents" value={dependents} onChange={setDependents} />
        </div>
        {results && (
          <ResultCard
            title="Insurance Analysis"
            results={[
              { label: "Recommended Cover", value: formatCurrency(results.recommendedCover) },
              { label: "Existing Cover", value: formatCurrency(results.existingCover) },
              { label: "Coverage Gap", value: formatCurrency(results.gap), highlight: true },
              { label: "Status", value: results.status },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
