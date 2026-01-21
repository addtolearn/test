import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Delete } from "lucide-react";

export default function SimpleCalculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operator) {
      const currentValue = parseFloat(previousValue);
      let result = 0;

      switch (operator) {
        case "+":
          result = currentValue + inputValue;
          break;
        case "-":
          result = currentValue - inputValue;
          break;
        case "×":
          result = currentValue * inputValue;
          break;
        case "÷":
          result = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        case "%":
          result = currentValue * (inputValue / 100);
          break;
      }

      const resultString = parseFloat(result.toFixed(10)).toString();
      setDisplay(resultString);
      setPreviousValue(resultString);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    if (!operator || previousValue === null) return;

    const inputValue = parseFloat(display);
    const currentValue = parseFloat(previousValue);
    let result = 0;

    switch (operator) {
      case "+":
        result = currentValue + inputValue;
        break;
      case "-":
        result = currentValue - inputValue;
        break;
      case "×":
        result = currentValue * inputValue;
        break;
      case "÷":
        result = inputValue !== 0 ? currentValue / inputValue : 0;
        break;
      case "%":
        result = currentValue * (inputValue / 100);
        break;
    }

    const resultString = parseFloat(result.toFixed(10)).toString();
    setDisplay(resultString);
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const formatDisplay = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "0";
    if (value.endsWith(".")) return value;
    if (value.includes(".")) {
      const [int, dec] = value.split(".");
      return parseFloat(int).toLocaleString("en-IN") + "." + dec;
    }
    return num.toLocaleString("en-IN");
  };

  const buttons = [
    ["C", "⌫", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["00", "0", ".", "="],
  ];

  const getButtonClass = (btn: string) => {
    if (btn === "C") return "calc-button calc-button-clear";
    if (btn === "⌫") return "calc-button calc-button-clear";
    if (btn === "=") return "calc-button calc-button-equals";
    if (["÷", "×", "-", "+", "%"].includes(btn)) {
      const isActive = operator === btn && waitingForOperand;
      return `calc-button calc-button-operator ${isActive ? "ring-2 ring-primary" : ""}`;
    }
    return "calc-button calc-button-number";
  };

  const handleButtonClick = (btn: string) => {
    switch (btn) {
      case "C":
        clear();
        break;
      case "⌫":
        backspace();
        break;
      case "=":
        calculate();
        break;
      case ".":
        inputDecimal();
        break;
      case "÷":
      case "×":
      case "-":
      case "+":
      case "%":
        performOperation(btn);
        break;
      default:
        inputDigit(btn);
    }
  };

  return (
    <AppLayout>
      <PageHeader title="Simple Calculator" showBack backPath="/" />

      <div className="px-4 py-6 max-w-md mx-auto">
        {/* Display */}
        <div className="bg-card rounded-2xl p-6 shadow-card mb-6 h-28 flex flex-col justify-end">
          <div className="h-6 flex items-center justify-end">
            {previousValue && operator && (
              <span className="text-sm text-muted-foreground">
                {formatDisplay(previousValue)} {operator}
              </span>
            )}
          </div>
          <div className="text-right text-4xl font-semibold text-foreground overflow-x-auto">
            {formatDisplay(display)}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.flat().map((btn, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(btn)}
              className={getButtonClass(btn)}
            >
              {btn === "⌫" ? <Delete className="w-6 h-6" /> : btn}
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
