import type { MonthlyDataPoint } from "./ExpenseChart";

export class MonthlyBalance {
	public readonly totalIncome: number;
	public readonly totalExpense: number;
	public readonly balance: number;
	public readonly positive: boolean;

	public constructor(monthlyData: MonthlyDataPoint[]) {
		this.totalIncome = monthlyData.reduce((sum, m) => sum + m.income, 0);
		this.totalExpense = monthlyData.reduce((sum, m) => sum + m.expense, 0);
		this.balance = this.totalIncome - this.totalExpense;
		this.positive = this.balance >= 0;
	}
}
