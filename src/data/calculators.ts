import {
  TrendingUp,
  Umbrella,
  Home,
  Receipt,
  Lightbulb,
  Calculator,
  LucideIcon,
} from "lucide-react";

export interface CalculatorItem {
  id: string;
  name: string;
  description: string;
  path: string;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  colorClass: string;
  calculators: CalculatorItem[];
}

export const categories: Category[] = [
  {
    id: "invest-save",
    name: "Invest & Save",
    icon: TrendingUp,
    description: "Money growth & goal-based investing",
    colorClass: "category-invest",
    calculators: [
      {
        id: "investment",
        name: "Investment Calculator",
        description: "All-in-one simple & compound interest",
        path: "/calculator/investment",
      },
      {
        id: "sip",
        name: "SIP Returns Calculator",
        description: "Calculate returns on systematic investments",
        path: "/calculator/sip",
      },
      {
        id: "step-up-sip",
        name: "Step-Up SIP Calculator",
        description: "SIP with yearly increase",
        path: "/calculator/step-up-sip",
      },
      {
        id: "lumpsum",
        name: "Lumpsum Investment Calculator",
        description: "One-time investment returns",
        path: "/calculator/lumpsum",
      },
      {
        id: "swp",
        name: "SWP Calculator",
        description: "Systematic withdrawal planning",
        path: "/calculator/swp",
      },
      {
        id: "goal",
        name: "Goal-Based Investment Calculator",
        description: "Plan for specific financial goals",
        path: "/calculator/goal",
      },
      {
        id: "cagr",
        name: "CAGR Calculator",
        description: "Compound annual growth rate",
        path: "/calculator/cagr",
      },
      {
        id: "inflation",
        name: "Inflation Impact Calculator",
        description: "See how inflation affects savings",
        path: "/calculator/inflation",
      },
    ],
  },
  {
    id: "retirement",
    name: "Retirement",
    icon: Umbrella,
    description: "Long-term financial security",
    colorClass: "category-retirement",
    calculators: [
      {
        id: "retirement-corpus",
        name: "Retirement Corpus Calculator",
        description: "How much you need to retire",
        path: "/calculator/retirement-corpus",
      },
      {
        id: "nps",
        name: "NPS Calculator",
        description: "National Pension Scheme returns",
        path: "/calculator/nps",
      },
      {
        id: "ppf",
        name: "PPF Calculator",
        description: "Public Provident Fund returns",
        path: "/calculator/ppf",
      },
      {
        id: "epf",
        name: "EPF Calculator",
        description: "Employee Provident Fund",
        path: "/calculator/epf",
      },
      {
        id: "sukanya",
        name: "Sukanya Samriddhi Calculator",
        description: "Girl child savings scheme",
        path: "/calculator/sukanya",
      },
    ],
  },
  {
    id: "loans",
    name: "Loans",
    icon: Home,
    description: "EMI & borrowing decisions",
    colorClass: "category-loans",
    calculators: [
      {
        id: "emi",
        name: "EMI Calculator",
        description: "Universal EMI calculator",
        path: "/calculator/emi",
      },
      {
        id: "home-loan",
        name: "Home Loan EMI Calculator",
        description: "Calculate home loan EMI",
        path: "/calculator/home-loan",
      },
      {
        id: "personal-loan",
        name: "Personal Loan Calculator",
        description: "Personal loan EMI & interest",
        path: "/calculator/personal-loan",
      },
      {
        id: "car-loan",
        name: "Car Loan Calculator",
        description: "Calculate car loan EMI",
        path: "/calculator/car-loan",
      },
      {
        id: "loan-eligibility",
        name: "Loan Eligibility Calculator",
        description: "Check how much you can borrow",
        path: "/calculator/loan-eligibility",
      },
      {
        id: "prepayment",
        name: "Loan Prepayment Calculator",
        description: "Save interest with prepayment",
        path: "/calculator/prepayment",
      },
      {
        id: "interest",
        name: "Interest Calculator",
        description: "Simple & compound interest",
        path: "/calculator/interest",
      },
    ],
  },
  {
    id: "tax-business",
    name: "Tax & Business",
    icon: Receipt,
    description: "For salaried users & MSMEs",
    colorClass: "category-tax",
    calculators: [
      {
        id: "income-tax",
        name: "Income Tax Calculator",
        description: "Old vs New regime comparison",
        path: "/calculator/income-tax",
      },
      {
        id: "salary",
        name: "Salary In-Hand Calculator",
        description: "CTC to net salary",
        path: "/calculator/salary",
      },
      {
        id: "hra",
        name: "HRA Calculator",
        description: "House Rent Allowance exemption",
        path: "/calculator/hra",
      },
      {
        id: "gratuity",
        name: "Gratuity Calculator",
        description: "Calculate gratuity amount",
        path: "/calculator/gratuity",
      },
      {
        id: "tds",
        name: "TDS Calculator",
        description: "Tax deducted at source",
        path: "/calculator/tds",
      },
      {
        id: "gst",
        name: "GST Calculator",
        description: "Add or remove GST",
        path: "/calculator/gst",
      },
      {
        id: "profit-margin",
        name: "Profit Margin Calculator",
        description: "Calculate profit margins",
        path: "/calculator/profit-margin",
      },
      {
        id: "break-even",
        name: "Break-Even Calculator",
        description: "When will you break even?",
        path: "/calculator/break-even",
      },
      {
        id: "roi",
        name: "ROI Calculator",
        description: "Return on investment",
        path: "/calculator/roi",
      },
      {
        id: "invoice",
        name: "Invoice Amount Calculator",
        description: "Calculate invoice totals",
        path: "/calculator/invoice",
      },
    ],
  },
  {
    id: "smart-utility",
    name: "Smart & Utility",
    icon: Lightbulb,
    description: "Awareness & quick insights",
    colorClass: "category-utility",
    calculators: [
      {
        id: "net-worth",
        name: "Net Worth Calculator",
        description: "Calculate your net worth",
        path: "/calculator/net-worth",
      },
      {
        id: "financial-health",
        name: "Financial Health Score",
        description: "Assess your financial health",
        path: "/calculator/financial-health",
      },
      {
        id: "risk-profile",
        name: "Risk Profile Calculator",
        description: "Understand your risk tolerance",
        path: "/calculator/risk-profile",
      },
      {
        id: "emergency-fund",
        name: "Emergency Fund Calculator",
        description: "How much emergency fund needed",
        path: "/calculator/emergency-fund",
      },
      {
        id: "insurance",
        name: "Insurance Coverage Calculator",
        description: "Adequate insurance coverage",
        path: "/calculator/insurance",
      },
      {
        id: "age",
        name: "Age Calculator",
        description: "Calculate exact age",
        path: "/calculator/age",
      },
      {
        id: "bmi",
        name: "BMI Calculator",
        description: "Body Mass Index",
        path: "/calculator/bmi",
      },
      {
        id: "percentage",
        name: "Percentage Calculator",
        description: "Percentage calculations",
        path: "/calculator/percentage",
      },
      {
        id: "date-diff",
        name: "Date Difference Calculator",
        description: "Days between dates",
        path: "/calculator/date-diff",
      },
      {
        id: "unit-converter",
        name: "Unit Converter",
        description: "Convert between any units",
        path: "/calculator/unit-converter",
      },
    ],
  },
  {
    id: "simple-calculator",
    name: "Simple Calculator",
    icon: Calculator,
    description: "Everyday quick calculations",
    colorClass: "category-calculator",
    calculators: [],
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((cat) => cat.id === id);
};

export const getCalculatorById = (id: string): { calculator: CalculatorItem; category: Category } | undefined => {
  for (const category of categories) {
    const calculator = category.calculators.find((calc) => calc.id === id);
    if (calculator) {
      return { calculator, category };
    }
  }
  return undefined;
};
