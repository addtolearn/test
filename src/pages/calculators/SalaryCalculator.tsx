import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function SalaryCalculator() {
  const [ctc, setCtc] = useState("1200000");
  const [bonus, setBonus] = useState("100000");

  const results = useMemo(() => {
    const annual = parseFloat(ctc) || 0;
    const bonusAmt = parseFloat(bonus) || 0;
    if (annual <= 0) return null;

    const basic = annual * 0.4;
    const hra = basic * 0.5;
    const pf = Math.min(basic * 0.12, 21600);
    const professionalTax = 2400;
    const gratuity = basic * 0.0481;
    
    const grossMonthly = (annual - bonusAmt) / 12;
    const deductions = pf + professionalTax / 12;
    const netMonthly = grossMonthly - deductions;

    return {
      netMonthly: Math.round(netMonthly),
      grossMonthly: Math.round(grossMonthly),
      annualDeductions: Math.round(pf * 12 + professionalTax),
    };
  }, [ctc, bonus]);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Salary Calculator" showBack backPath="/category/tax-business" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Annual CTC" value={ctc} onChange={setCtc} prefix="₹" />
          <CalculatorInput label="Annual Bonus" value={bonus} onChange={setBonus} prefix="₹" />
        </div>
        {results && (
          <ResultCard
            title="Salary Breakdown"
            results={[
              { label: "In-Hand (Monthly)", value: formatCurrency(results.netMonthly), highlight: true },
              { label: "Gross Monthly", value: formatCurrency(results.grossMonthly) },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
