import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

// FY 2024-25 Tax Slabs
const calculateOldRegimeTax = (income: number, deductions: number) => {
  const taxableIncome = Math.max(0, income - deductions);
  let tax = 0;

  if (taxableIncome > 1000000) {
    tax += (taxableIncome - 1000000) * 0.3;
    tax += 250000 * 0.2;
    tax += 250000 * 0.05;
  } else if (taxableIncome > 500000) {
    tax += (taxableIncome - 500000) * 0.2;
    tax += 250000 * 0.05;
  } else if (taxableIncome > 250000) {
    tax += (taxableIncome - 250000) * 0.05;
  }

  // Rebate under 87A
  if (taxableIncome <= 500000) {
    tax = 0;
  }

  return { tax, taxableIncome };
};

const calculateNewRegimeTax = (income: number) => {
  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, income - standardDeduction);
  let tax = 0;

  // New regime slabs FY 2024-25
  if (taxableIncome > 1500000) {
    tax += (taxableIncome - 1500000) * 0.3;
    tax += 300000 * 0.2;
    tax += 300000 * 0.15;
    tax += 300000 * 0.1;
    tax += 300000 * 0.05;
  } else if (taxableIncome > 1200000) {
    tax += (taxableIncome - 1200000) * 0.2;
    tax += 300000 * 0.15;
    tax += 300000 * 0.1;
    tax += 300000 * 0.05;
  } else if (taxableIncome > 900000) {
    tax += (taxableIncome - 900000) * 0.15;
    tax += 300000 * 0.1;
    tax += 300000 * 0.05;
  } else if (taxableIncome > 600000) {
    tax += (taxableIncome - 600000) * 0.1;
    tax += 300000 * 0.05;
  } else if (taxableIncome > 300000) {
    tax += (taxableIncome - 300000) * 0.05;
  }

  // Rebate under 87A for new regime
  if (taxableIncome <= 700000) {
    tax = 0;
  }

  return { tax, taxableIncome };
};

export default function IncomeTaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState("1200000");
  const [deductions, setDeductions] = useState("150000");

  const results = useMemo(() => {
    const income = parseFloat(annualIncome) || 0;
    const totalDeductions = parseFloat(deductions) || 0;

    if (income <= 0) {
      return null;
    }

    const oldRegime = calculateOldRegimeTax(income, totalDeductions + 50000); // +50k standard deduction
    const newRegime = calculateNewRegimeTax(income);

    const oldTaxWithCess = oldRegime.tax * 1.04;
    const newTaxWithCess = newRegime.tax * 1.04;

    return {
      oldRegime: {
        taxableIncome: oldRegime.taxableIncome,
        tax: Math.round(oldTaxWithCess),
      },
      newRegime: {
        taxableIncome: newRegime.taxableIncome,
        tax: Math.round(newTaxWithCess),
      },
      savings: Math.round(Math.abs(oldTaxWithCess - newTaxWithCess)),
      betterRegime: oldTaxWithCess < newTaxWithCess ? "Old Regime" : "New Regime",
    };
  }, [annualIncome, deductions]);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AppLayout>
      <PageHeader 
        title="Income Tax Calculator" 
        showBack 
        backPath="/category/tax-business" 
      />

      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2.5">
          <CalculatorInput
            label="Annual Income (CTC)"
            value={annualIncome}
            onChange={setAnnualIncome}
            prefix="₹"
            placeholder="1200000"
          />

          <CalculatorInput
            label="Deductions (80C, 80D, etc.)"
            value={deductions}
            onChange={setDeductions}
            prefix="₹"
            placeholder="150000"
          />
        </div>

        {results && (
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-[10px] text-muted-foreground mb-0.5">Old Regime</p>
                <p className="text-base font-bold text-foreground">{formatCurrency(results.oldRegime.tax)}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-[10px] text-muted-foreground mb-0.5">New Regime</p>
                <p className="text-base font-bold text-foreground">{formatCurrency(results.newRegime.tax)}</p>
              </div>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-xl p-3">
              <div className="text-center">
                <p className="text-lg font-bold text-success">{results.betterRegime}</p>
                <p className="text-xs text-muted-foreground">
                  Save {formatCurrency(results.savings)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
