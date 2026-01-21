import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function SukanyaCalculator() {
  const [yearlyInvestment, setYearlyInvestment] = useState("150000");
  const [girlAge, setGirlAge] = useState("5");
  const [interestRate, setInterestRate] = useState("8.2");

  const results = useMemo(() => {
    const P = parseFloat(yearlyInvestment) || 0;
    const age = parseFloat(girlAge) || 0;
    const r = (parseFloat(interestRate) || 0) / 100;

    if (P <= 0 || age >= 10 || r <= 0) return null;

    // Deposit allowed for 15 years, account matures when girl is 21
    const depositYears = 15;
    const maturityAge = 21;
    const totalYears = maturityAge - age;
    
    let balance = 0;
    for (let year = 1; year <= totalYears; year++) {
      if (year <= depositYears) {
        balance += P;
      }
      balance *= (1 + r);
    }

    const totalInvested = P * depositYears;
    const interestEarned = balance - totalInvested;

    return {
      maturityValue: Math.round(balance),
      totalInvested: Math.round(totalInvested),
      interestEarned: Math.round(interestEarned),
      maturityAge: maturityAge,
    };
  }, [yearlyInvestment, girlAge, interestRate]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Sukanya Samriddhi" showBack backPath="/category/retirement" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Yearly Investment" value={yearlyInvestment} onChange={setYearlyInvestment} prefix="₹" />
          <CalculatorInput label="Girl's Current Age" value={girlAge} onChange={setGirlAge} suffix="years" />
          <CalculatorInput label="Interest Rate" value={interestRate} onChange={setInterestRate} suffix="% p.a." />
        </div>
        {results && (
          <ResultCard
            title={`Maturity at Age ${results.maturityAge}`}
            results={[
              { label: "Maturity Value", value: formatCurrency(results.maturityValue), highlight: true },
              { label: "Total Invested", value: formatCurrency(results.totalInvested) },
              { label: "Interest Earned", value: formatCurrency(results.interestEarned) },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
