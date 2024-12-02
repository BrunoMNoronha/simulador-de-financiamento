export type FinancingType = 'price' | 'sac';

export interface FinancingInput {
  amount: number;
  interestRate: number;
  term: number;
  type: FinancingType;
  isAnnualRate?: boolean;
  isAnnualTerm?: boolean;
}

export interface InstallmentDetails {
  installment: number;
  amortization: number;
  interest: number;
  balance: number;
}

export interface FinancingResult {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  installments: InstallmentDetails[];
}