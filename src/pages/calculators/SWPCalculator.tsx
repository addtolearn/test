import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function SWPCalculator() {
  const [totalInvestment, setTotalInvestment] = useState("1000000");
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState("10000");
  const [expectedReturn, setExpectedReturn] = useState("8");
  const [timePeriod, setTimePeriod] = useState("10");
  const [waitingPeriod, setWaitingPeriod] = useState("1");

  const results = useMemo(() => {
    let balance = parseFloat(totalInvestment) || 0;
    const withdrawal = parseFloat(monthlyWithdrawal) || 0;
    const r = (parseFloat(expectedReturn) || 0) / 100 / 12;
    const waitingMonths = (parseFloat(waitingPeriod) || 0) * 12;
    const withdrawalMonths = (parseFloat(timePeriod) || 0) * 12;

    if (balance <= 0 || withdrawal <= 0 || withdrawalMonths <= 0) return null;

    // Waiting period - investment grows without withdrawal
    for (let i = 0; i < waitingMonths; i++) {
      balance = balance * (1 + r);
    }
    const balanceAfterWaiting = balance;

    // Withdrawal period
    let totalWithdrawn = 0;
    for (let i = 0; i < withdrawalMonths && balance > 0; i++) {
      balance = balance * (1 + r) - withdrawal;
      totalWithdrawn += withdrawal;
    }

    return {
      balanceAfterWaiting: Math.round(balanceAfterWaiting),
      totalWithdrawn: Math.round(totalWithdrawn),
      finalBalance: Math.max(0, Math.round(balance)),
      initialInvestment: parseFloat(totalInvestment),
    };
  }, [totalInvestment, monthlyWithdrawal, expectedReturn, timePeriod, waitingPeriod]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="SWP Calculator" showBack backPath="/category/invest-save" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Total Investment" value={totalInvestment} onChange={setTotalInvestment} prefix="₹" />
          <CalculatorInput label="Waiting Period" value={waitingPeriod} onChange={setWaitingPeriod} suffix="years" />
          <CalculatorInput label="Monthly Withdrawal" value={monthlyWithdrawal} onChange={setMonthlyWithdrawal} prefix="₹" />
          <CalculatorInput label="Expected Return" value={expectedReturn} onChange={setExpectedReturn} suffix="% p.a." />
          <CalculatorInput label="Withdrawal Period" value={timePeriod} onChange={setTimePeriod} suffix="years" />
        </div>
        {results && (
          <ResultCard
            title="SWP Summary"
            results={[
              { label: "After Waiting", value: formatCurrency(results.balanceAfterWaiting) },
              { label: "Total Withdrawn", value: formatCurrency(results.totalWithdrawn) },
              { label: "Final Balance", value: formatCurrency(results.finalBalance), highlight: true },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
