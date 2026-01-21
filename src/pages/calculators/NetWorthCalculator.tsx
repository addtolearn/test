import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function NetWorthCalculator() {
  const [cash, setCash] = useState("100000");
  const [investments, setInvestments] = useState("500000");
  const [property, setProperty] = useState("3000000");
  const [loans, setLoans] = useState("2000000");
  const [creditCard, setCreditCard] = useState("50000");

  const results = useMemo(() => {
    const cashVal = parseFloat(cash) || 0;
    const investVal = parseFloat(investments) || 0;
    const propVal = parseFloat(property) || 0;
    const loansVal = parseFloat(loans) || 0;
    const ccVal = parseFloat(creditCard) || 0;

    const totalAssets = cashVal + investVal + propVal;
    const totalLiabilities = loansVal + ccVal;
    const netWorth = totalAssets - totalLiabilities;
    const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      debtToAssetRatio,
    };
  }, [cash, investments, property, loans, creditCard]);

  const formatCurrency = (amount: number) => {
    const absAmount = Math.abs(amount);
    const sign = amount < 0 ? "-" : "";
    if (absAmount >= 10000000) return `${sign}₹${(absAmount / 10000000).toFixed(2)} Cr`;
    if (absAmount >= 100000) return `${sign}₹${(absAmount / 100000).toFixed(2)} L`;
    return `${sign}₹${absAmount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Net Worth" showBack backPath="/category/smart-utility" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Assets</p>
          <CalculatorInput label="Cash & Bank" value={cash} onChange={setCash} prefix="₹" />
          <CalculatorInput label="Investments" value={investments} onChange={setInvestments} prefix="₹" />
          <CalculatorInput label="Property Value" value={property} onChange={setProperty} prefix="₹" />
          <p className="text-xs font-medium text-muted-foreground pt-2">Liabilities</p>
          <CalculatorInput label="Loans" value={loans} onChange={setLoans} prefix="₹" />
          <CalculatorInput label="Credit Card Dues" value={creditCard} onChange={setCreditCard} prefix="₹" />
        </div>
        {results && (
          <ResultCard
            title="Net Worth Summary"
            results={[
              { label: "Total Assets", value: formatCurrency(results.totalAssets) },
              { label: "Total Liabilities", value: formatCurrency(results.totalLiabilities) },
              { label: "Debt Ratio", value: `${results.debtToAssetRatio.toFixed(1)}%` },
              { label: "Net Worth", value: formatCurrency(results.netWorth), highlight: true },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
