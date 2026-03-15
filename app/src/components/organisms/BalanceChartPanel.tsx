import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { MetricHeader } from "@/components/molecules/MetricHeader";
import { DailyExpenseChart } from "@/components/organisms/DailyExpenseChart";
import { MonthlyBalanceChart } from "@/components/organisms/MonthlyBalanceChart";
import { PeriodSelector } from "@/components/organisms/PeriodSelector";
import { Period, type PeriodGranularity } from "@/models/Period";
import { ExpenseChart } from "@/models/ExpenseChart";
import type { HourlyDataPoint, DailyDataPoint, MonthlyDataPoint } from "@/models/ExpenseChart";

export type { HourlyDataPoint, DailyDataPoint, MonthlyDataPoint };

interface BalanceChartPanelProps {
	hourlyDataByDay: Record<string, HourlyDataPoint[]>;
	dailyDataByMonth: Record<string, DailyDataPoint[]>;
	monthlyDataByYear: Record<string, MonthlyDataPoint[]>;
}

export const BalanceChartPanel = ({
	hourlyDataByDay,
	dailyDataByMonth,
	monthlyDataByYear,
}: BalanceChartPanelProps) => {
	const [chartType, setChartType] = useState<"line" | "bar">("line");
	const [granularity, setGranularity] = useState<PeriodGranularity>("month");
	const [selectedDate, setSelectedDate] = useState(() => new Date());

	const handleChartTypeChange = (v: "line" | "bar") => {
		setChartType(v);
		if (v === "bar" && granularity === "day") setGranularity("month");
	};

	const chart = new ExpenseChart(hourlyDataByDay, dailyDataByMonth, monthlyDataByYear);
	const period = new Period(granularity, selectedDate);

	return (
		<div className="flex flex-col gap-4 p-6 bg-card rounded-xl border border-border w-full flex-1 max-h-80">
			<div className="flex items-center justify-between">
				<MetricHeader
					title={ExpenseChart.CHART_TITLES[chartType]}
					subtitle={period.subtitle}
				/>
				<div className="flex items-center gap-2">
					<Select
						value={chartType}
						onValueChange={(v) => handleChartTypeChange(v as "line" | "bar")}
					>
						<SelectTrigger className="h-auto border-none bg-muted px-3 py-1.5 text-[13px] font-medium text-primary rounded-md">
							{ExpenseChart.CHART_TITLES[chartType]}
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="line">{ExpenseChart.CHART_TITLES.line}</SelectItem>
							<SelectItem value="bar">{ExpenseChart.CHART_TITLES.bar}</SelectItem>
						</SelectContent>
					</Select>
					<PeriodSelector
						granularity={granularity}
						date={selectedDate}
						availableYears={chart.getAvailableYears()}
						availableGranularities={
							chartType === "bar" ? ["month", "year"] : ["day", "month", "year"]
						}
						onGranularityChange={setGranularity}
						onDateChange={setSelectedDate}
					/>
				</div>
			</div>
			{chartType === "line" ? (
				<DailyExpenseChart {...chart.buildLineChartConfig(granularity, selectedDate)} />
			) : (
				<MonthlyBalanceChart monthlyData={chart.buildBarChartData(granularity, selectedDate)} />
			)}
		</div>
	);
};
