import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FinancingResult } from '../types/financing';

interface FinancingResultsProps {
  result: FinancingResult;
}

export function FinancingResults({ result }: FinancingResultsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const chartData = result.installments.map((item, index) => ({
    month: index + 1,
    parcela: item.installment,
    amortizacao: item.amortization,
    juros: item.interest,
    saldo: item.balance
  }));

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-800">Resultados da Simulação</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Parcela Inicial</p>
          <p className="text-2xl font-bold text-blue-900">{formatCurrency(result.monthlyPayment)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Valor Total</p>
          <p className="text-2xl font-bold text-green-900">{formatCurrency(result.totalAmount)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Total de Juros</p>
          <p className="text-2xl font-bold text-purple-900">{formatCurrency(result.totalInterest)}</p>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" label={{ value: 'Mês', position: 'insideBottom', offset: -5 }} />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
            <Line type="monotone" dataKey="parcela" name="Parcela" stroke="#3b82f6" />
            <Line type="monotone" dataKey="amortizacao" name="Amortização" stroke="#10b981" />
            <Line type="monotone" dataKey="juros" name="Juros" stroke="#8b5cf6" />
            <Line type="monotone" dataKey="saldo" name="Saldo Devedor" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mês</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parcela</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amortização</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Juros</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo Devedor</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {result.installments.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.installment)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.amortization)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.interest)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}