import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function PrepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState("3000000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [loanTenure, setLoanTenure] = useState("20");
  const [prepaymentAmount, setPrepaymentAmount] = useState("500000");
  const [prepaymentMonth, setPrepaymentMonth] = useState("12");

  const results = useMemo(() => {
    const P = parseFloat(loanAmount) || 0;
    const r = (parseFloat(interestRate) || 0) / 100 / 12;
    const n = (parseFloat(loanTenure) || 0) * 12;
    const prepay = parseFloat(prepaymentAmount) || 0;
    const prepayMonth = parseInt(prepaymentMonth) || 1;

    if (P <= 0 || r <= 0 || n <= 0) return null;

    // Calculate EMI
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    // Without prepayment
    const totalWithout = emi * n;
    const interestWithout = totalWithout - P;

    // Calculate outstanding principal after prepayment month
    let outstandingPrincipal = P;
    for (let i = 0; i < Math.min(prepayMonth, n); i++) {
      const interestPart = outstandingPrincipal * r;
      const principalPart = emi - interestPart;
      outstandingPrincipal -= principalPart;
    }

    // Apply prepayment
    const newPrincipal = outstandingPrincipal - prepay;
    if (newPrincipal <= 0) {
      // Loan fully paid off
      const monthsPaid = prepayMonth;
      const totalPaidEarly = emi * monthsPaid + prepay;
      const interestPaid = totalPaidEarly - P;
      return {
        emi: Math.round(emi),
        interestSaved: Math.round(interestWithout - Math.max(0, interestPaid)),
        monthsSaved: n - monthsPaid,
        originalTenure: n,
        newTenure: monthsPaid,
        originalInterest: Math.round(interestWithout),
        newInterest: Math.round(Math.max(0, interestPaid)),
        originalTotal: Math.round(totalWithout),
        newTotal: Math.round(totalPaidEarly),
      };
    }
    
    // Calculate remaining tenure with reduced principal (keeping same EMI)
    const remainingMonths = Math.ceil(
      Math.log(emi / (emi - newPrincipal * r)) / Math.log(1 + r)
    );
    
    const newTotalTenure = prepayMonth + remainingMonths;
    const totalPaidBefore = emi * prepayMonth;
    const totalPaidAfter = emi * remainingMonths;
    const newTotalPayment = totalPaidBefore + prepay + totalPaidAfter;
    const newInterest = newTotalPayment - P;

    const interestSaved = interestWithout - newInterest;
    const tenureSaved = n - newTotalTenure;

    return {
      emi: Math.round(emi),
      interestSaved: Math.round(Math.max(0, interestSaved)),
      monthsSaved: Math.max(0, tenureSaved),
      originalTenure: n,
      newTenure: newTotalTenure,
      originalInterest: Math.round(interestWithout),
      newInterest: Math.round(Math.max(0, newInterest)),
      originalTotal: Math.round(totalWithout),
      newTotal: Math.round(newTotalPayment + prepay),
    };
  }, [loanAmount, interestRate, loanTenure, prepaymentAmount, prepaymentMonth]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${months} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years}y ${remainingMonths}m`;
  };

  return (
    <AppLayout>
      <PageHeader title="Prepayment Calculator" showBack backPath="/category/loans" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <CalculatorInput label="Loan Amount" value={loanAmount} onChange={setLoanAmount} prefix="₹" />
          <CalculatorInput label="Interest Rate" value={interestRate} onChange={setInterestRate} suffix="% p.a." />
          <CalculatorInput label="Loan Tenure" value={loanTenure} onChange={setLoanTenure} suffix="years" />
          <CalculatorInput label="Prepayment Amount" value={prepaymentAmount} onChange={setPrepaymentAmount} prefix="₹" />
          <CalculatorInput label="Prepayment After Month" value={prepaymentMonth} onChange={setPrepaymentMonth} suffix="month" />
        </div>
        {results && (
          <>
            <ResultCard
              title="Your EMI"
              results={[
                { label: "Monthly EMI", value: formatCurrency(results.emi), highlight: true },
              ]}
            />
            <ResultCard
              title="Prepayment Benefits"
              results={[
                { label: "Interest Saved", value: formatCurrency(results.interestSaved), highlight: true },
                { label: "Tenure Saved", value: formatMonths(results.monthsSaved) },
                { label: "Original Tenure", value: formatMonths(results.originalTenure) },
                { label: "New Tenure", value: formatMonths(results.newTenure) },
              ]}
            />
            <ResultCard
              title="Interest Comparison"
              results={[
                { label: "Original Total Interest", value: formatCurrency(results.originalInterest) },
                { label: "New Total Interest", value: formatCurrency(results.newInterest) },
              ]}
            />
          </>
        )}
      </div>
    </AppLayout>
  );
}
