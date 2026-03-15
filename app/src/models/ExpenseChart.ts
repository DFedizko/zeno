import { format, getDaysInMonth } from "date-fns";
import type { PeriodGranularity } from "./Period";

export interface HourlyDataPoint {
	x: number;
	expense: number;
}

export interface DailyDataPoint {
	x: number;
	expense: number;
}

export interface MonthlyDataPoint {
	month: string;
	income: number;
	expense: number;
}

export interface LineChartConfig {
	data: { x: number; expense: number }[];
	xDomain: [number, number];
	xTicks: number[];
	xTickFormatter: (v: number) => string;
	tooltipLabelFormatter: (v: number) => string;
	totalLabel: string;
}

export class ExpenseChart {
	public static readonly MONTHS_SHORT = [
		"Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
		"Jul", "Ago", "Set", "Out", "Nov", "Dez",
	];

	public static readonly CHART_TITLES: Record<"line" | "bar", string> = {
		line: "Gastos Diários",
		bar: "Receita Total vs Custo Total",
	};

	private readonly hourlyDataByDay: Record<string, HourlyDataPoint[]>;
	private readonly dailyDataByMonth: Record<string, DailyDataPoint[]>;
	private readonly monthlyDataByYear: Record<string, MonthlyDataPoint[]>;

	public constructor(
		hourlyDataByDay: Record<string, HourlyDataPoint[]>,
		dailyDataByMonth: Record<string, DailyDataPoint[]>,
		monthlyDataByYear: Record<string, MonthlyDataPoint[]>,
	) {
		this.hourlyDataByDay = hourlyDataByDay;
		this.dailyDataByMonth = dailyDataByMonth;
		this.monthlyDataByYear = monthlyDataByYear;
	}

	public static calculateExpenseTotal(data: { expense: number }[]): number {
		return data.reduce((sum, d) => sum + d.expense, 0);
	}

	public getAvailableYears(): number[] {
		return Object.keys(this.monthlyDataByYear).map(Number).sort();
	}

	public buildLineChartConfig(granularity: PeriodGranularity, date: Date): LineChartConfig {
		if (granularity === "day") {
			const dayKey = format(date, "yyyy-MM-dd");
			return {
				data: this.hourlyDataByDay[dayKey] ?? [],
				xDomain: [0, 23],
				xTicks: [0, 6, 12, 18, 23],
				xTickFormatter: (v) => `${v}h`,
				tooltipLabelFormatter: (v) => `${v}:00`,
				totalLabel: "Total do dia",
			};
		}

		if (granularity === "month") {
			const monthKey = format(date, "yyyy-MM");
			const lastDay = getDaysInMonth(date);
			const sparseMap = new Map(
				(this.dailyDataByMonth[monthKey] ?? []).map((d) => [d.x, d.expense]),
			);
			const fullData = Array.from({ length: lastDay }, (_, i) => ({
				x: i + 1,
				expense: sparseMap.get(i + 1) ?? 0,
			}));
			return {
				data: fullData,
				xDomain: [1, lastDay],
				xTicks: Array.from({ length: lastDay }, (_, i) => i + 1),
				xTickFormatter: (v) => String(v),
				tooltipLabelFormatter: (v) => `Dia ${v}`,
				totalLabel: "Total de gastos",
			};
		}

		const yearKey = format(date, "yyyy");
		const monthlyData = this.monthlyDataByYear[yearKey] ?? [];
		return {
			data: monthlyData.map((m, i) => ({ x: i + 1, expense: m.expense })),
			xDomain: [1, 12],
			xTicks: monthlyData.map((_, i) => i + 1),
			xTickFormatter: (v) => ExpenseChart.MONTHS_SHORT[v - 1] ?? "",
			tooltipLabelFormatter: (v) => ExpenseChart.MONTHS_SHORT[v - 1] ?? "",
			totalLabel: "Total anual",
		};
	}

	public buildBarChartData(granularity: PeriodGranularity, date: Date): MonthlyDataPoint[] {
		const yearKey = format(date, "yyyy");
		const monthlyData = this.monthlyDataByYear[yearKey] ?? [];
		if (granularity === "year") return monthlyData;
		return monthlyData.filter(
			(m) => m.month === ExpenseChart.MONTHS_SHORT[date.getMonth()],
		);
	}
}
