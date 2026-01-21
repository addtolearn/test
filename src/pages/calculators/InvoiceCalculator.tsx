import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function InvoiceCalculator() {
  const [baseAmount, setBaseAmount] = useState("10000");
  const [discount, setDiscount] = useState("5");
  const [gstRate, setGstRate] = useState("18");
  const [quantity, setQuantity] = useState("1");

  const results = useMemo(() => {
    const base = parseFloat(baseAmount) || 0;
    const disc = parseFloat(discount) || 0;
    const gst = parseFloat(gstRate) || 0;
    const qty = parseFloat(quantity) || 1;
    
    if (base <= 0) return null;

    const subtotal = base * qty;
    const discountAmount = (subtotal * disc) / 100;
    const taxableAmount = subtotal - discountAmount;
    const cgst = (taxableAmount * gst) / 200;
    const sgst = cgst;
    const totalGst = cgst + sgst;
    const totalAmount = taxableAmount + totalGst;

    return {
      subtotal: Math.round(subtotal),
      discountAmount: Math.round(discountAmount),
      taxableAmount: Math.round(taxableAmount),
      cgst: Math.round(cgst),
      sgst: Math.round(sgst),
      totalGst: Math.round(totalGst),
      totalAmount: Math.round(totalAmount),
    };
  }, [baseAmount, discount, gstRate, quantity]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Invoice Calculator" showBack backPath="/category/tax-business" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Unit Price" value={baseAmount} onChange={setBaseAmount} prefix="₹" />
          <CalculatorInput label="Quantity" value={quantity} onChange={setQuantity} />
          <CalculatorInput label="Discount" value={discount} onChange={setDiscount} suffix="%" />
          <CalculatorInput label="GST Rate" value={gstRate} onChange={setGstRate} suffix="%" />
        </div>
        {results && (
          <ResultCard
            title="Invoice Summary"
            results={[
              { label: "Subtotal", value: formatCurrency(results.subtotal) },
              { label: "Discount", value: `-${formatCurrency(results.discountAmount)}` },
              { label: `CGST (${parseFloat(gstRate)/2}%)`, value: formatCurrency(results.cgst) },
              { label: `SGST (${parseFloat(gstRate)/2}%)`, value: formatCurrency(results.sgst) },
              { label: "Total", value: formatCurrency(results.totalAmount), highlight: true },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
