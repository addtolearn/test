import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function HRACalculator() {
  const [basicSalary, setBasicSalary] = useState("50000");
  const [hraReceived, setHraReceived] = useState("20000");
  const [rentPaid, setRentPaid] = useState("25000");
  const [isMetro, setIsMetro] = useState(true);

  const results = useMemo(() => {
    const basic = parseFloat(basicSalary) || 0;
    const hra = parseFloat(hraReceived) || 0;
    const rent = parseFloat(rentPaid) || 0;
    if (basic <= 0 || hra <= 0) return null;

    const metroPercent = isMetro ? 0.5 : 0.4;
    const exemption1 = hra;
    const exemption2 = basic * metroPercent;
    const exemption3 = Math.max(0, rent - basic * 0.1);
    
    const hraExemption = Math.min(exemption1, exemption2, exemption3);
    const taxableHra = hra - hraExemption;

    return {
      hraExemption: Math.round(hraExemption * 12),
      taxableHra: Math.round(taxableHra * 12),
      monthlyExemption: Math.round(hraExemption),
    };
  }, [basicSalary, hraReceived, rentPaid, isMetro]);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="HRA Calculator" showBack backPath="/category/tax-business" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Basic Salary (Monthly)" value={basicSalary} onChange={setBasicSalary} prefix="₹" />
          <CalculatorInput label="HRA Received (Monthly)" value={hraReceived} onChange={setHraReceived} prefix="₹" />
          <CalculatorInput label="Rent Paid (Monthly)" value={rentPaid} onChange={setRentPaid} prefix="₹" />
          <div className="flex gap-2 pt-1">
            <button onClick={() => setIsMetro(true)} className={`flex-1 py-2 rounded-lg text-sm font-medium ${isMetro ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Metro</button>
            <button onClick={() => setIsMetro(false)} className={`flex-1 py-2 rounded-lg text-sm font-medium ${!isMetro ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Non-Metro</button>
          </div>
        </div>
        {results && (
          <ResultCard
            title="HRA Exemption"
            results={[
              { label: "Annual Exemption", value: formatCurrency(results.hraExemption), highlight: true },
              { label: "Taxable HRA", value: formatCurrency(results.taxableHra) },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
