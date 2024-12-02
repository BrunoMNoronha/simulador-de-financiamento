import { FinancingInput, FinancingResult, InstallmentDetails } from '../types/financing';

const convertToMonthlyRate = (rate: number, isAnnual: boolean): number => {
  if (isAnnual) {
    return Math.pow(1 + rate / 100, 1 / 12) - 1;
  }
  return rate / 100;
};

const convertToMonths = (term: number, isAnnual: boolean): number => {
  return isAnnual ? term * 12 : term;
};

export const calculatePrice = (input: FinancingInput): FinancingResult => {
  const monthlyRate = convertToMonthlyRate(input.interestRate, input.isAnnualRate || false);
  const months = convertToMonths(input.term, input.isAnnualTerm || false);
  
  const monthlyPayment = input.amount * 
    (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
    (Math.pow(1 + monthlyRate, months) - 1);

  const installments: InstallmentDetails[] = [];
  let balance = input.amount;
  let totalAmount = 0;

  for (let i = 0; i < months; i++) {
    const interest = balance * monthlyRate;
    const amortization = monthlyPayment - interest;
    balance -= amortization;

    installments.push({
      installment: monthlyPayment,
      amortization,
      interest,
      balance: Math.max(0, balance)
    });

    totalAmount += monthlyPayment;
  }

  return {
    monthlyPayment,
    totalAmount,
    totalInterest: totalAmount - input.amount,
    installments
  };
};

export const calculateSAC = (input: FinancingInput): FinancingResult => {
  const monthlyRate = convertToMonthlyRate(input.interestRate, input.isAnnualRate || false);
  const months = convertToMonths(input.term, input.isAnnualTerm || false);
  
  const fixedAmortization = input.amount / months;
  const installments: InstallmentDetails[] = [];
  let balance = input.amount;
  let totalAmount = 0;

  for (let i = 0; i < months; i++) {
    const interest = balance * monthlyRate;
    const installment = fixedAmortization + interest;
    balance -= fixedAmortization;

    installments.push({
      installment,
      amortization: fixedAmortization,
      interest,
      balance: Math.max(0, balance)
    });

    totalAmount += installment;
  }

  return {
    monthlyPayment: installments[0].installment,
    totalAmount,
    totalInterest: totalAmount - input.amount,
    installments
  };
};