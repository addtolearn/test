import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function GSTCalculator() {
  const [amount, setAmount] = useState("10000");
  const [gstRate, setGstRate] = useState("18");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const results = useMemo(() => {
    const amt = parseFloat(amount) || 0;
    const rate = parseFloat(gstRate) || 0;
    if (amt <= 0 || rate <= 0) return null;

    if (mode === "add") {
      const gst = amt * rate / 100;
      return { baseAmount: amt, gstAmount: Math.round(gst), totalAmount: Math.round(amt + gst) };
    } else {
      const baseAmount = amt / (1 + rate / 100);
      const gst = amt - baseAmount;
      return { baseAmount: Math.round(baseAmount), gstAmount: Math.round(gst), totalAmount: amt };
    }
  }, [amount, gstRate, mode]);

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

  return (
    <AppLayout>
      <PageHeader title="GST Calculator" showBack backPath="/category/tax-business" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label={mode === "add" ? "Amount (Excl. GST)" : "Amount (Incl. GST)"} value={amount} onChange={setAmount} prefix="₹" />
          <CalculatorInput label="GST Rate" value={gstRate} onChange={setGstRate} suffix="%" />
          <div className="flex gap-2 pt-1">
            <button onClick={() => setMode("add")} className={`flex-1 py-2 rounded-lg text-sm font-medium ${mode === "add" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Add GST</button>
            <button onClick={() => setMode("remove")} className={`flex-1 py-2 rounded-lg text-sm font-medium ${mode === "remove" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Remove GST</button>
          </div>
        </div>
        {results && (
          <ResultCard
            title="GST Calculation"
            results={[
              { label: "Base Amount", value: formatCurrency(results.baseAmount) },
              { label: "GST Amount", value: formatCurrency(results.gstAmount) },
              { label: "Total Amount", value: formatCurrency(results.totalAmount), highlight: true },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
