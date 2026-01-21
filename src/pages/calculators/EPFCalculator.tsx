import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function EPFCalculator() {
  const [basicSalary, setBasicSalary] = useState("30000");
  const [currentAge, setCurrentAge] = useState("25");
  const [currentEPFBalance, setCurrentEPFBalance] = useState("0");
  const [interestRate, setInterestRate] = useState("8.25");

  const results = useMemo(() => {
    const basic = parseFloat(basicSalary) || 0;
    const age = parseFloat(currentAge) || 0;
    const currentBalance = parseFloat(currentEPFBalance) || 0;
    const r = (parseFloat(interestRate) || 0) / 100 / 12;

    if (basic <= 0 || age >= 58) return null;

    const retirementAge = 58;
    const months = (retirementAge - age) * 12;
    
    // Employee contribution: 12% of basic
    // Employer contribution to EPF: 3.67% of basic (rest goes to EPS)
    const monthlyContribution = basic * 0.12 + basic * 0.0367;
    
    // Future value calculation
    let balance = currentBalance;
    for (let i = 0; i < months; i++) {
      balance = (balance + monthlyContribution) * (1 + r);
    }

    const totalContribution = monthlyContribution * months + currentBalance;
    const interestEarned = balance - totalContribution;

    return {
      maturityValue: Math.round(balance),
      totalContribution: Math.round(totalContribution),
      interestEarned: Math.round(interestEarned),
      monthlyContribution: Math.round(monthlyContribution),
    };
  }, [basicSalary, currentAge, currentEPFBalance, interestRate]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="EPF Calculator" showBack backPath="/category/retirement" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Basic Salary (Monthly)" value={basicSalary} onChange={setBasicSalary} prefix="₹" />
          <CalculatorInput label="Current Age" value={currentAge} onChange={setCurrentAge} suffix="years" />
          <CalculatorInput label="Current EPF Balance" value={currentEPFBalance} onChange={setCurrentEPFBalance} prefix="₹" />
          <CalculatorInput label="Interest Rate" value={interestRate} onChange={setInterestRate} suffix="% p.a." />
        </div>
        {results && (
          <ResultCard
            title="EPF at Retirement (58)"
            results={[
              { label: "Maturity Value", value: formatCurrency(results.maturityValue), highlight: true },
              { label: "Monthly Contribution", value: formatCurrency(results.monthlyContribution) },
              { label: "Interest Earned", value: formatCurrency(results.interestEarned) },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
