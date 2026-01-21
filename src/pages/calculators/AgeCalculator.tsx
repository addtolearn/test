import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { ResultCard } from "@/components/calculator/ResultCard";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("1990-01-01");

  const results = useMemo(() => {
    const birth = new Date(birthDate);
    const today = new Date();
    if (isNaN(birth.getTime()) || birth > today) return null;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) { months--; days += 30; }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays };
  }, [birthDate]);

  return (
    <AppLayout>
      <PageHeader title="Age Calculator" showBack backPath="/category/smart-utility" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-foreground">Date of Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3 py-2.5 text-base font-medium bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        {results && (
          <ResultCard
            title="Your Age"
            results={[
              { label: "Age", value: `${results.years}y ${results.months}m ${results.days}d`, highlight: true },
              { label: "Total Days", value: results.totalDays.toLocaleString() },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
