import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { FinancingInput } from '../types/financing';

interface FinancingFormProps {
  onCalculate: (input: FinancingInput) => void;
}

export function FinancingForm({ onCalculate }: FinancingFormProps) {
  const [input, setInput] = useState<FinancingInput>({
    amount: 100000,
    interestRate: 12,
    term: 24,
    type: 'price',
    isAnnualRate: true,
    isAnnualTerm: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(input);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Simulador de Financiamento</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Valor do Financiamento
          </label>
          <div className="mt-1">
            <input
              type="number"
              value={input.amount}
              onChange={(e) => setInput({ ...input, amount: Number(e.target.value) })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Taxa de Juros
          </label>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="number"
              step="0.01"
              value={input.interestRate}
              onChange={(e) => setInput({ ...input, interestRate: Number(e.target.value) })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <select
              value={input.isAnnualRate ? "annual" : "monthly"}
              onChange={(e) => setInput({ ...input, isAnnualRate: e.target.value === "annual" })}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="annual">Anual</option>
              <option value="monthly">Mensal</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prazo
          </label>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="number"
              value={input.term}
              onChange={(e) => setInput({ ...input, term: Number(e.target.value) })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <select
              value={input.isAnnualTerm ? "annual" : "monthly"}
              onChange={(e) => setInput({ ...input, isAnnualTerm: e.target.value === "annual" })}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="monthly">Meses</option>
              <option value="annual">Anos</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sistema de Amortização
          </label>
          <select
            value={input.type}
            onChange={(e) => setInput({ ...input, type: e.target.value as 'price' | 'sac' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="price">Tabela Price</option>
            <option value="sac">SAC</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calcular
        </button>
      </div>
    </form>
  );
}