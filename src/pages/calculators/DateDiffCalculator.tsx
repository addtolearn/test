import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { ResultCard } from "@/components/calculator/ResultCard";
import { differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears, parseISO, isValid } from "date-fns";

export default function DateDiffCalculator() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

  const results = useMemo(() => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    if (!isValid(start) || !isValid(end)) return null;

    const days = Math.abs(differenceInDays(end, start));
    const weeks = Math.abs(differenceInWeeks(end, start));
    const months = Math.abs(differenceInMonths(end, start));
    const years = Math.abs(differenceInYears(end, start));
    
    const remainingMonths = months % 12;
    const remainingDays = days - (years * 365) - (remainingMonths * 30);

    return {
      totalDays: days,
      totalWeeks: weeks,
      totalMonths: months,
      years,
      remainingMonths,
      remainingDays: Math.max(0, remainingDays),
    };
  }, [startDate, endDate]);

  return (
    <AppLayout>
      <PageHeader title="Date Difference" showBack backPath="/category/smart-utility" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background"
            />
          </div>
        </div>
        {results && (
          <ResultCard
            title="Date Difference"
            results={[
              { label: "Total Days", value: results.totalDays.toLocaleString() },
              { label: "Total Weeks", value: results.totalWeeks.toLocaleString() },
              { label: "Total Months", value: results.totalMonths.toLocaleString() },
              { label: "Duration", value: `${results.years}y ${results.remainingMonths}m ${results.remainingDays}d`, highlight: true },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
