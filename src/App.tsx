import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import SimpleCalculator from "./pages/SimpleCalculator";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

// Invest & Save
import SIPCalculator from "./pages/calculators/SIPCalculator";
import StepUpSIPCalculator from "./pages/calculators/StepUpSIPCalculator";
import LumpsumCalculator from "./pages/calculators/LumpsumCalculator";
import SWPCalculator from "./pages/calculators/SWPCalculator";
import GoalCalculator from "./pages/calculators/GoalCalculator";
import CAGRCalculator from "./pages/calculators/CAGRCalculator";
import InflationCalculator from "./pages/calculators/InflationCalculator";

// Retirement
import RetirementCorpusCalculator from "./pages/calculators/RetirementCorpusCalculator";
import NPSCalculator from "./pages/calculators/NPSCalculator";
import PPFCalculator from "./pages/calculators/PPFCalculator";
import EPFCalculator from "./pages/calculators/EPFCalculator";
import SukanyaCalculator from "./pages/calculators/SukanyaCalculator";

// Loans
import EMICalculator from "./pages/calculators/EMICalculator";
import HomeLoanCalculator from "./pages/calculators/HomeLoanCalculator";
import PersonalLoanCalculator from "./pages/calculators/PersonalLoanCalculator";
import CarLoanCalculator from "./pages/calculators/CarLoanCalculator";
import LoanEligibilityCalculator from "./pages/calculators/LoanEligibilityCalculator";
import PrepaymentCalculator from "./pages/calculators/PrepaymentCalculator";
import InterestCalculator from "./pages/calculators/InterestCalculator";

// Tax & Business
import IncomeTaxCalculator from "./pages/calculators/IncomeTaxCalculator";
import SalaryCalculator from "./pages/calculators/SalaryCalculator";
import HRACalculator from "./pages/calculators/HRACalculator";
import GratuityCalculator from "./pages/calculators/GratuityCalculator";
import GSTCalculator from "./pages/calculators/GSTCalculator";
import ROICalculator from "./pages/calculators/ROICalculator";
import TDSCalculator from "./pages/calculators/TDSCalculator";
import ProfitMarginCalculator from "./pages/calculators/ProfitMarginCalculator";
import BreakEvenCalculator from "./pages/calculators/BreakEvenCalculator";
import InvoiceCalculator from "./pages/calculators/InvoiceCalculator";

// Smart & Utility
import BMICalculator from "./pages/calculators/BMICalculator";
import PercentageCalculator from "./pages/calculators/PercentageCalculator";
import AgeCalculator from "./pages/calculators/AgeCalculator";
import NetWorthCalculator from "./pages/calculators/NetWorthCalculator";
import FinancialHealthCalculator from "./pages/calculators/FinancialHealthCalculator";
import RiskProfileCalculator from "./pages/calculators/RiskProfileCalculator";
import EmergencyFundCalculator from "./pages/calculators/EmergencyFundCalculator";
import InsuranceCalculator from "./pages/calculators/InsuranceCalculator";
import DateDiffCalculator from "./pages/calculators/DateDiffCalculator";
import InvestmentCalculator from "./pages/calculators/InvestmentCalculator";
import FinancialPlanningCalculator from "./pages/calculators/FinancialPlanningCalculator";
import UnitConverter from "./pages/calculators/UnitConverter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/simple-calculator" element={<SimpleCalculator />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Invest & Save */}
          <Route path="/calculator/sip" element={<SIPCalculator />} />
          <Route path="/calculator/step-up-sip" element={<StepUpSIPCalculator />} />
          <Route path="/calculator/lumpsum" element={<LumpsumCalculator />} />
          <Route path="/calculator/swp" element={<SWPCalculator />} />
          <Route path="/calculator/goal" element={<GoalCalculator />} />
          <Route path="/calculator/cagr" element={<CAGRCalculator />} />
          <Route path="/calculator/inflation" element={<InflationCalculator />} />
          
          {/* Retirement */}
          <Route path="/calculator/retirement-corpus" element={<RetirementCorpusCalculator />} />
          <Route path="/calculator/nps" element={<NPSCalculator />} />
          <Route path="/calculator/ppf" element={<PPFCalculator />} />
          <Route path="/calculator/epf" element={<EPFCalculator />} />
          <Route path="/calculator/sukanya" element={<SukanyaCalculator />} />
          
          {/* Loans */}
          <Route path="/calculator/emi" element={<EMICalculator />} />
          <Route path="/calculator/home-loan" element={<HomeLoanCalculator />} />
          <Route path="/calculator/personal-loan" element={<PersonalLoanCalculator />} />
          <Route path="/calculator/car-loan" element={<CarLoanCalculator />} />
          <Route path="/calculator/loan-eligibility" element={<LoanEligibilityCalculator />} />
          <Route path="/calculator/prepayment" element={<PrepaymentCalculator />} />
          <Route path="/calculator/interest" element={<InterestCalculator />} />
          
          {/* Tax & Business */}
          <Route path="/calculator/income-tax" element={<IncomeTaxCalculator />} />
          <Route path="/calculator/salary" element={<SalaryCalculator />} />
          <Route path="/calculator/hra" element={<HRACalculator />} />
          <Route path="/calculator/gratuity" element={<GratuityCalculator />} />
          <Route path="/calculator/gst" element={<GSTCalculator />} />
          <Route path="/calculator/roi" element={<ROICalculator />} />
          <Route path="/calculator/tds" element={<TDSCalculator />} />
          <Route path="/calculator/profit-margin" element={<ProfitMarginCalculator />} />
          <Route path="/calculator/break-even" element={<BreakEvenCalculator />} />
          <Route path="/calculator/invoice" element={<InvoiceCalculator />} />
          
          {/* Smart & Utility */}
          <Route path="/calculator/bmi" element={<BMICalculator />} />
          <Route path="/calculator/percentage" element={<PercentageCalculator />} />
          <Route path="/calculator/age" element={<AgeCalculator />} />
          <Route path="/calculator/net-worth" element={<NetWorthCalculator />} />
          <Route path="/calculator/financial-health" element={<FinancialHealthCalculator />} />
          <Route path="/calculator/risk-profile" element={<RiskProfileCalculator />} />
          <Route path="/calculator/emergency-fund" element={<EmergencyFundCalculator />} />
          <Route path="/calculator/insurance" element={<InsuranceCalculator />} />
          <Route path="/calculator/date-diff" element={<DateDiffCalculator />} />
          <Route path="/calculator/investment" element={<InvestmentCalculator />} />
          <Route path="/calculator/unit-converter" element={<UnitConverter />} />
          <Route path="/calculator/financial-planning" element={<FinancialPlanningCalculator />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
