import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function LoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState("100000");
  const [existingEMI, setExistingEMI] = useState("0");
  const [interestRate, setInterestRate] = useState("9");
  const [loanTenure, setLoanTenure] = useState("20");

  const results = useMemo(() => {
    const income = parseFloat(monthlyIncome) || 0;
    const existing = parseFloat(existingEMI) || 0;
    const r = (parseFloat(interestRate) || 0) / 100 / 12;
    const n = (parseFloat(loanTenure) || 0) * 12;

    if (income <= 0 || r <= 0 || n <= 0) return null;

    // Banks typically allow 50-60% of income for all EMIs
    const maxEMI = income * 0.5 - existing;
    if (maxEMI <= 0) return { eligibleAmount: 0, maxEMI: 0 };

    // Calculate loan amount from EMI
    const eligibleAmount = maxEMI * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));

    return {
      eligibleAmount: Math.round(eligibleAmount),
      maxEMI: Math.round(maxEMI),
    };
  }, [monthlyIncome, existingEMI, interestRate, loanTenure]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Loan Eligibility" showBack backPath="/category/loans" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Monthly Income" value={monthlyIncome} onChange={setMonthlyIncome} prefix="₹" />
          <CalculatorInput label="Existing EMIs" value={existingEMI} onChange={setExistingEMI} prefix="₹" />
          <CalculatorInput label="Interest Rate" value={interestRate} onChange={setInterestRate} suffix="% p.a." />
          <CalculatorInput label="Loan Tenure" value={loanTenure} onChange={setLoanTenure} suffix="years" />
        </div>
        {results && (
          <ResultCard
            title="Loan Eligibility"
            results={[
              { label: "Eligible Loan Amount", value: formatCurrency(results.eligibleAmount), highlight: true },
              { label: "Max EMI Affordable", value: formatCurrency(results.maxEMI) },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
