import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type InterestType = "simple" | "compound";
type Frequency = "daily" | "weekly" | "monthly" | "quarterly" | "half-yearly" | "yearly";
type InvestmentMode = "lumpsum" | "recurring";

const frequencyMultipliers: Record<Frequency, number> = {
  daily: 365,
  weekly: 52,
  monthly: 12,
  quarterly: 4,
  "half-yearly": 2,
  yearly: 1,
};

const frequencyLabels: Record<Frequency, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  "half-yearly": "Half-Yearly",
  yearly: "Yearly",
};

export default function InvestmentCalculator() {
  const [interestType, setInterestType] = useState<InterestType>("compound");
  const [investmentMode, setInvestmentMode] = useState<InvestmentMode>("lumpsum");
  const [principal, setPrincipal] = useState(100000);
  const [recurringAmount, setRecurringAmount] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(5);
  const [months, setMonths] = useState(0);
  const [compoundFrequency, setCompoundFrequency] = useState<Frequency>("yearly");
  const [recurringFrequency, setRecurringFrequency] = useState<Frequency>("monthly");

  const results = useMemo(() => {
    const totalMonths = years * 12 + months;
    const totalYears = totalMonths / 12;
    const n = frequencyMultipliers[compoundFrequency];
    const rateDecimal = rate / 100;

    // Edge case: no time period
    if (totalYears <= 0) {
      const invested = investmentMode === "lumpsum" ? principal : 0;
      return {
        totalInvested: invested,
        totalInterest: 0,
        maturityAmount: invested,
        effectiveRate: 0,
      };
    }

    if (investmentMode === "lumpsum") {
      // Edge case: no principal
      if (principal <= 0) {
        return {
          totalInvested: 0,
          totalInterest: 0,
          maturityAmount: 0,
          effectiveRate: 0,
        };
      }

      // Lumpsum calculation
      if (interestType === "simple") {
        const interest = principal * rateDecimal * totalYears;
        const maturityAmount = principal + interest;
        return {
          totalInvested: principal,
          totalInterest: interest,
          maturityAmount,
          effectiveRate: totalYears > 0 ? (interest / principal / totalYears) * 100 : 0,
        };
      } else {
        // Compound interest
        const maturityAmount = principal * Math.pow(1 + rateDecimal / n, n * totalYears);
        const interest = maturityAmount - principal;
        const effectiveRate = (Math.pow(1 + rateDecimal / n, n) - 1) * 100;
        return {
          totalInvested: principal,
          totalInterest: interest,
          maturityAmount,
          effectiveRate,
        };
      }
    } else {
      // Recurring investment calculation
      const periodsPerYear = frequencyMultipliers[recurringFrequency];
      const totalPeriods = Math.floor(totalYears * periodsPerYear);
      const totalInvested = recurringAmount * totalPeriods;

      // Edge case: no recurring amount or periods
      if (recurringAmount <= 0 || totalPeriods <= 0) {
        return {
          totalInvested: 0,
          totalInterest: 0,
          maturityAmount: 0,
          effectiveRate: 0,
        };
      }

      if (interestType === "simple") {
        // Simple interest on recurring deposits
        let totalInterest = 0;
        for (let i = 1; i <= totalPeriods; i++) {
          const remainingPeriods = totalPeriods - i;
          const remainingYears = remainingPeriods / periodsPerYear;
          totalInterest += recurringAmount * rateDecimal * remainingYears;
        }
        const maturityAmount = totalInvested + totalInterest;
        return {
          totalInvested,
          totalInterest,
          maturityAmount,
          effectiveRate: totalInvested > 0 && totalYears > 0 ? (totalInterest / totalInvested / totalYears) * 100 : 0,
        };
      } else {
        // Compound interest on recurring deposits (SIP formula)
        const periodicRate = rateDecimal / periodsPerYear;
        let maturityAmount = 0;
        
        for (let i = 0; i < totalPeriods; i++) {
          const periodsRemaining = totalPeriods - i;
          maturityAmount += recurringAmount * Math.pow(1 + periodicRate, periodsRemaining);
        }
        
        const totalInterest = maturityAmount - totalInvested;
        const effectiveRate = totalInvested > 0 && totalYears > 0
          ? (Math.pow(maturityAmount / totalInvested, 1 / totalYears) - 1) * 100
          : 0;
        
        return {
          totalInvested,
          totalInterest,
          maturityAmount,
          effectiveRate,
        };
      }
    }
  }, [principal, recurringAmount, rate, years, months, interestType, investmentMode, compoundFrequency, recurringFrequency]);

  const formatCurrency = (amount: number): string => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  };

  return (
    <AppLayout>
      <PageHeader title="Investment Calculator" />

      <div className="px-4 py-4 max-w-md mx-auto space-y-4">
        {/* Interest Type Selection */}
        <Tabs value={interestType} onValueChange={(v) => setInterestType(v as InterestType)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simple">Simple Interest</TabsTrigger>
            <TabsTrigger value="compound">Compound Interest</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Investment Mode Selection */}
        <Tabs value={investmentMode} onValueChange={(v) => setInvestmentMode(v as InvestmentMode)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lumpsum">Lumpsum</TabsTrigger>
            <TabsTrigger value="recurring">Recurring</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Input Fields */}
        {investmentMode === "lumpsum" ? (
          <CalculatorInput
            label="Principal Amount"
            value={principal}
            onChange={(v) => setPrincipal(Number(v) || 0)}
            prefix="₹"
          />
        ) : (
          <>
            <CalculatorInput
              label="Investment Amount (per period)"
              value={recurringAmount}
              onChange={(v) => setRecurringAmount(Number(v) || 0)}
              prefix="₹"
            />
            <div className="space-y-2">
              <Label className="text-sm font-medium">Investment Frequency</Label>
              <Select value={recurringFrequency} onValueChange={(v) => setRecurringFrequency(v as Frequency)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(frequencyLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <CalculatorInput
          label="Expected Return Rate"
          value={rate}
          onChange={(v) => setRate(Number(v) || 0)}
          suffix="% p.a."
        />

        {interestType === "compound" && investmentMode === "lumpsum" && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Compounding Frequency</Label>
            <Select value={compoundFrequency} onValueChange={(v) => setCompoundFrequency(v as Frequency)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(frequencyLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Years"
            value={years}
            onChange={(v) => setYears(Number(v) || 0)}
            suffix="yrs"
          />
          <CalculatorInput
            label="Months"
            value={months}
            onChange={(v) => setMonths(Number(v) || 0)}
            suffix="mo"
          />
        </div>

        {/* Results */}
        <ResultCard
          title="Investment Summary"
          results={[
            { label: "Maturity Amount", value: formatCurrency(results.maturityAmount), highlight: true },
            { label: "Total Invested", value: formatCurrency(results.totalInvested) },
            { label: "Total Interest Earned", value: formatCurrency(results.totalInterest) },
            { label: "Effective Annual Rate", value: `${results.effectiveRate.toFixed(2)}%` },
            { label: "Interest Type", value: interestType === "simple" ? "Simple" : "Compound" },
            { label: "Investment Mode", value: investmentMode === "lumpsum" ? "Lumpsum" : `Recurring (${frequencyLabels[recurringFrequency]})` },
          ]}
          explanation={`Your ${investmentMode === "lumpsum" ? "lumpsum" : "recurring"} investment of ${formatCurrency(results.totalInvested)} will grow to ${formatCurrency(results.maturityAmount)} in ${years > 0 ? `${years} year${years > 1 ? "s" : ""}` : ""}${months > 0 ? ` ${months} month${months > 1 ? "s" : ""}` : ""} at ${rate}% p.a. using ${interestType} interest.`}
        />

        {/* Detailed Breakdown */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <h3 className="font-semibold text-sm mb-3">Calculation Details</h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            <p><strong>Interest Type:</strong> {interestType === "simple" ? "Simple Interest" : "Compound Interest"}</p>
            {interestType === "compound" && investmentMode === "lumpsum" && (
              <p><strong>Compounding:</strong> {frequencyLabels[compoundFrequency]} ({frequencyMultipliers[compoundFrequency]} times/year)</p>
            )}
            {investmentMode === "recurring" && (
              <p><strong>Investment Frequency:</strong> {frequencyLabels[recurringFrequency]} ({frequencyMultipliers[recurringFrequency]} deposits/year)</p>
            )}
            <p><strong>Duration:</strong> {years * 12 + months} months ({((years * 12 + months) / 12).toFixed(2)} years)</p>
            <p><strong>Total Deposits:</strong> {investmentMode === "lumpsum" ? "1" : Math.floor((years * 12 + months) / 12 * frequencyMultipliers[recurringFrequency])}</p>
            <p><strong>Wealth Gain:</strong> {((results.maturityAmount / results.totalInvested - 1) * 100).toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
