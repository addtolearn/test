import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState("1000000");
  const [interestRate, setInterestRate] = useState("10");
  const [loanTenure, setLoanTenure] = useState("20");

  const results = useMemo(() => {
    const P = parseFloat(loanAmount) || 0;
    const r = (parseFloat(interestRate) || 0) / 100 / 12;
    const n = (parseFloat(loanTenure) || 0) * 12;

    if (P <= 0 || r <= 0 || n <= 0) {
      return null;
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principal: P,
    };
  }, [loanAmount, interestRate, loanTenure]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader 
        title="EMI Calculator" 
        showBack 
        backPath="/category/loans" 
      />

      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2.5">
          <CalculatorInput
            label="Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            prefix="₹"
            placeholder="1000000"
          />

          <CalculatorInput
            label="Interest Rate"
            value={interestRate}
            onChange={setInterestRate}
            suffix="% p.a."
            placeholder="10"
          />

          <CalculatorInput
            label="Loan Tenure"
            value={loanTenure}
            onChange={setLoanTenure}
            suffix="years"
            placeholder="20"
          />
        </div>

        {results && (
          <ResultCard
            title="EMI Breakdown"
            results={[
              {
                label: "Monthly EMI",
                value: formatCurrency(results.emi),
                highlight: true,
              },
              {
                label: "Principal",
                value: formatCurrency(results.principal),
              },
              {
                label: "Total Interest",
                value: formatCurrency(results.totalInterest),
              },
              {
                label: "Total Payment",
                value: formatCurrency(results.totalPayment),
              },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
