import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, PiggyBank, Shield, Heart, Wallet } from "lucide-react";

const FinancialPlanningCalculator = () => {
  const [monthlySalary, setMonthlySalary] = useState<string>("50000");
  const [maritalStatus, setMaritalStatus] = useState<string>("single");
  const [dependents, setDependents] = useState<string>("0");

  const results = useMemo(() => {
    const salary = Number(monthlySalary) || 0;
    const deps = Number(dependents) || 0;
    const annualIncome = salary * 12;
    
    // Recommended monthly savings: 25% of salary
    const recommendedSavings = salary * 0.25;
    
    // Estimated monthly expenses (75% of salary for calculation)
    const estimatedMonthlyExpenses = salary * 0.75;
    
    // Emergency fund: 6-12 months of expenses
    let emergencyMonths = 6;
    if (maritalStatus === "married") emergencyMonths = 9;
    if (deps > 0) emergencyMonths = 12;
    const emergencyFund = estimatedMonthlyExpenses * emergencyMonths;
    
    // Life insurance: 5-15x annual income
    let lifeInsuranceMultiplier = 10;
    lifeInsuranceMultiplier += deps * 2;
    lifeInsuranceMultiplier = Math.min(lifeInsuranceMultiplier, 15);
    const lifeInsuranceCover = annualIncome * lifeInsuranceMultiplier;
    
    // Health insurance based on family size
    let healthInsurance = 500000;
    if (maritalStatus === "married") healthInsurance = 1000000;
    healthInsurance += deps * 500000;
    healthInsurance = Math.min(healthInsurance, 5000000);

    return {
      recommendedSavings,
      emergencyFund,
      emergencyMonths,
      lifeInsuranceCover,
      lifeInsuranceMultiplier,
      healthInsurance,
    };
  }, [monthlySalary, maritalStatus, dependents]);

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString("en-IN")}`;
  };

  const resultItems = [
    {
      icon: PiggyBank,
      label: "Monthly Savings (25%)",
      value: formatCurrency(results.recommendedSavings),
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Wallet,
      label: `Emergency Fund (${results.emergencyMonths} months)`,
      value: formatCurrency(results.emergencyFund),
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: Shield,
      label: `Life Insurance (${results.lifeInsuranceMultiplier}× income)`,
      value: formatCurrency(results.lifeInsuranceCover),
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
    {
      icon: Heart,
      label: "Health Insurance Cover",
      value: formatCurrency(results.healthInsurance),
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-500/10",
      iconColor: "text-rose-500",
    },
  ];

  return (
    <AppLayout>
      <PageHeader title="Financial Planning" backPath="/" />
      <div className="p-4 max-w-md mx-auto space-y-4">
        {/* Monthly Salary Input */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-foreground">
            Monthly Salary
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
              ₹
            </span>
            <input
              type="number"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
              placeholder="Enter salary"
              className="w-full px-3 py-2.5 pl-8 text-base font-medium bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Marital Status */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Marital Status</Label>
          <Select value={maritalStatus} onValueChange={setMaritalStatus}>
            <SelectTrigger className="w-full h-12 text-base bg-card border-border">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dependents Input */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-foreground">
            Number of Dependents
          </label>
          <input
            type="number"
            value={dependents}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || (Number(val) >= 0 && Number(val) <= 10)) {
                setDependents(val);
              }
            }}
            placeholder="0"
            className="w-full px-3 py-2.5 text-base font-medium bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Results Section */}
        <div className="space-y-3 pt-2">
          <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            Your Financial Plan
          </h3>
          
          <div className="grid gap-3">
            {resultItems.map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-card border border-border p-4 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${item.bgColor}`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{item.label}</p>
                    <p className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Alert className="bg-muted/50 border-muted">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs text-muted-foreground">
            This is guidance based on standard financial planning rules, not financial advice. 
            Consult a certified financial planner for personalized recommendations.
          </AlertDescription>
        </Alert>
      </div>
    </AppLayout>
  );
};

export default FinancialPlanningCalculator;
