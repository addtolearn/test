import { Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ResultCardProps {
  title: string;
  results: ResultItem[];
  explanation?: string;
}

export function ResultCard({ title, results, explanation }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const formatShareText = () => {
    let text = `📊 ${title}\n\n`;
    results.forEach((result) => {
      text += `${result.label}: ${result.value}\n`;
    });
    if (explanation) {
      text += `\n${explanation}`;
    }
    text += "\n\n✨ Calculated using Mitra Calculator App\n📱 Download: https://mitradigital.in/apps";
    return text;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatShareText());
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleShare = async () => {
    const text = formatShareText();
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 border border-primary/20 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm text-foreground">{title}</h3>
        <div className="flex gap-1">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
            aria-label="Copy result"
          >
            {copied ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
            aria-label="Share result"
          >
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        {results.map((result, index) => (
          <div
            key={index}
            className={`flex items-center justify-between ${
              result.highlight ? "py-1" : ""
            }`}
          >
            <span className="text-xs text-muted-foreground">{result.label}</span>
            <span
              className={`font-semibold ${
                result.highlight ? "text-lg text-primary" : "text-sm text-foreground"
              }`}
            >
              {result.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
