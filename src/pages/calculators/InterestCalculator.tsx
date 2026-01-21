import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("8");
  const [time, setTime] = useState("5");
  const [interestType, setInterestType] = useState<"simple" | "compound">("compound");

  const results = useMemo(() => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(time) || 0;

    if (P <= 0 || r <= 0 || t <= 0) return null;

    const simpleInterest = P * r * t;
    const simpleTotal = P + simpleInterest;

    const compoundTotal = P * Math.pow(1 + r, t);
    const compoundInterest = compoundTotal - P;

    return {
      simpleInterest: Math.round(simpleInterest),
      simpleTotal: Math.round(simpleTotal),
      compoundInterest: Math.round(compoundInterest),
      compoundTotal: Math.round(compoundTotal),
    };
  }, [principal, rate, time]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Interest Calculator" showBack backPath="/category/loans" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Principal Amount" value={principal} onChange={setPrincipal} prefix="₹" />
          <CalculatorInput label="Interest Rate" value={rate} onChange={setRate} suffix="% p.a." />
          <CalculatorInput label="Time Period" value={time} onChange={setTime} suffix="years" />
          
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setInterestType("simple")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${interestType === "simple" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              Simple
            </button>
            <button
              onClick={() => setInterestType("compound")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${interestType === "compound" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              Compound
            </button>
          </div>
        </div>
        {results && (
          <ResultCard
            title={interestType === "simple" ? "Simple Interest" : "Compound Interest"}
            results={[
              { 
                label: "Interest Earned", 
                value: formatCurrency(interestType === "simple" ? results.simpleInterest : results.compoundInterest) 
              },
              { 
                label: "Total Amount", 
                value: formatCurrency(interestType === "simple" ? results.simpleTotal : results.compoundTotal), 
                highlight: true 
              },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
