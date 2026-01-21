import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { ResultCard } from "@/components/calculator/ResultCard";

const questions = [
  {
    question: "What is your age?",
    options: [
      { label: "Under 30", score: 4 },
      { label: "30-45", score: 3 },
      { label: "45-55", score: 2 },
      { label: "Over 55", score: 1 },
    ],
  },
  {
    question: "Investment horizon?",
    options: [
      { label: "10+ years", score: 4 },
      { label: "5-10 years", score: 3 },
      { label: "2-5 years", score: 2 },
      { label: "< 2 years", score: 1 },
    ],
  },
  {
    question: "If markets drop 20%, you would?",
    options: [
      { label: "Invest more", score: 4 },
      { label: "Hold steady", score: 3 },
      { label: "Sell some", score: 2 },
      { label: "Sell all", score: 1 },
    ],
  },
  {
    question: "Emergency fund coverage?",
    options: [
      { label: "6+ months", score: 4 },
      { label: "3-6 months", score: 3 },
      { label: "1-3 months", score: 2 },
      { label: "< 1 month", score: 1 },
    ],
  },
  {
    question: "Income stability?",
    options: [
      { label: "Very stable", score: 4 },
      { label: "Stable", score: 3 },
      { label: "Variable", score: 2 },
      { label: "Uncertain", score: 1 },
    ],
  },
];

export default function RiskProfileCalculator() {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));

  const handleAnswer = (qIndex: number, score: number) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = score;
    setAnswers(newAnswers);
  };

  const results = useMemo(() => {
    if (answers.some(a => a === -1)) return null;

    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    let profile = "Conservative";
    let allocation = "Equity: 20%, Debt: 70%, Gold: 10%";
    if (percentage >= 75) {
      profile = "Aggressive";
      allocation = "Equity: 80%, Debt: 15%, Gold: 5%";
    } else if (percentage >= 55) {
      profile = "Moderate-Aggressive";
      allocation = "Equity: 60%, Debt: 30%, Gold: 10%";
    } else if (percentage >= 40) {
      profile = "Moderate";
      allocation = "Equity: 40%, Debt: 50%, Gold: 10%";
    }

    return {
      score: totalScore,
      maxScore,
      profile,
      allocation,
    };
  }, [answers]);

  return (
    <AppLayout>
      <PageHeader title="Risk Profile" showBack backPath="/category/smart-utility" />
      <div className="px-4 py-3 max-w-md mx-auto space-y-3 pb-20">
        <div className="space-y-3">
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="bg-card rounded-lg p-3 border border-border">
              <p className="text-xs font-medium mb-2">{q.question}</p>
              <div className="grid grid-cols-2 gap-1.5">
                {q.options.map((opt, oIndex) => (
                  <button
                    key={oIndex}
                    onClick={() => handleAnswer(qIndex, opt.score)}
                    className={`text-xs px-2 py-1.5 rounded border transition-colors ${
                      answers[qIndex] === opt.score
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {results && (
          <ResultCard
            title="Your Risk Profile"
            results={[
              { label: "Score", value: `${results.score}/${results.maxScore}` },
              { label: "Profile", value: results.profile, highlight: true },
              { label: "Suggested Allocation", value: results.allocation },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
