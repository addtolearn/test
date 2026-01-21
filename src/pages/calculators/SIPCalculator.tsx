import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("10000");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");

  const results = useMemo(() => {
    const P = parseFloat(monthlyInvestment) || 0;
    const r = (parseFloat(expectedReturn) || 0) / 100 / 12;
    const n = (parseFloat(timePeriod) || 0) * 12;

    if (P <= 0 || r <= 0 || n <= 0) {
      return null;
    }

    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvested = P * n;
    const wealthGained = futureValue - totalInvested;

    return {
      futureValue: Math.round(futureValue),
      totalInvested: Math.round(totalInvested),
      wealthGained: Math.round(wealthGained),
    };
  }, [monthlyInvestment, expectedReturn, timePeriod]);

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
        title="SIP Calculator" 
        showBack 
        backPath="/category/invest-save" 
      />

      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2.5">
          <CalculatorInput
            label="Monthly Investment"
            value={monthlyInvestment}
            onChange={setMonthlyInvestment}
            prefix="₹"
            placeholder="10000"
          />

          <CalculatorInput
            label="Expected Return Rate"
            value={expectedReturn}
            onChange={setExpectedReturn}
            suffix="% p.a."
            placeholder="12"
          />

          <CalculatorInput
            label="Time Period"
            value={timePeriod}
            onChange={setTimePeriod}
            suffix="years"
            placeholder="10"
          />
        </div>

        {results && (
          <ResultCard
            title="SIP Returns"
            results={[
              {
                label: "Total Investment",
                value: formatCurrency(results.totalInvested),
              },
              {
                label: "Wealth Gained",
                value: formatCurrency(results.wealthGained),
              },
              {
                label: "Maturity Value",
                value: formatCurrency(results.futureValue),
                highlight: true,
              },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
