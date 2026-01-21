import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

const TDS_SECTIONS = [
  { id: "194A", name: "Interest (194A)", rate: 10 },
  { id: "194C", name: "Contractor (194C)", rate: 2 },
  { id: "194H", name: "Commission (194H)", rate: 5 },
  { id: "194I", name: "Rent (194I)", rate: 10 },
  { id: "194J", name: "Professional (194J)", rate: 10 },
  { id: "194Q", name: "Purchase (194Q)", rate: 0.1 },
];

export default function TDSCalculator() {
  const [amount, setAmount] = useState("100000");
  const [selectedSection, setSelectedSection] = useState("194A");
  const [customRate, setCustomRate] = useState("");

  const results = useMemo(() => {
    const amt = parseFloat(amount) || 0;
    const section = TDS_SECTIONS.find(s => s.id === selectedSection);
    const rate = customRate ? parseFloat(customRate) : (section?.rate || 0);
    
    if (amt <= 0) return null;

    const tdsAmount = (amt * rate) / 100;
    const netAmount = amt - tdsAmount;

    return {
      grossAmount: amt,
      tdsRate: rate,
      tdsAmount: Math.round(tdsAmount),
      netAmount: Math.round(netAmount),
    };
  }, [amount, selectedSection, customRate]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="TDS Calculator" showBack backPath="/category/tax-business" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Payment Amount" value={amount} onChange={setAmount} prefix="₹" />
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">TDS Section</label>
            <select 
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background"
            >
              {TDS_SECTIONS.map(section => (
                <option key={section.id} value={section.id}>
                  {section.name} - {section.rate}%
                </option>
              ))}
            </select>
          </div>
          <CalculatorInput label="Custom Rate (optional)" value={customRate} onChange={setCustomRate} suffix="%" />
        </div>
        {results && (
          <ResultCard
            title="TDS Summary"
            results={[
              { label: "Gross Amount", value: formatCurrency(results.grossAmount) },
              { label: `TDS @ ${results.tdsRate}%`, value: formatCurrency(results.tdsAmount) },
              { label: "Net Amount", value: formatCurrency(results.netAmount), highlight: true },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
