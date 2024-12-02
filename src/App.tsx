import React, { useState } from 'react';
import { FinancingForm } from './components/FinancingForm';
import { FinancingResults } from './components/FinancingResults';
import { FinancingInput, FinancingResult } from './types/financing';
import { calculatePrice, calculateSAC } from './utils/financingCalculations';

function App() {
  const [result, setResult] = useState<FinancingResult | null>(null);

  const handleCalculate = (input: FinancingInput) => {
    const calculationResult = input.type === 'price' 
      ? calculatePrice(input)
      : calculateSAC(input);
    setResult(calculationResult);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <FinancingForm onCalculate={handleCalculate} />
        {result && <FinancingResults result={result} />}
      </div>
    </div>
  );
}

export default App;