import { CartesianGrid, XAxis, YAxis, BarChart, Bar } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { LegendDot } from "@/components/atoms/LegendDot";
import { Currency } from "@/models/Currency";
import { MonthlyBalance } from "@/models/MonthlyBalance";
import type { MonthlyDataPoint } from "@/models/ExpenseChart";

interface MonthlyBalanceChartProps {
	monthlyData: MonthlyDataPoint[];
}

const config = {
	income: { label: "Receita", color: "#86EFAC" },
	expense: { label: "Despesa", color: "#3B82F6" },
} satisfies ChartConfig;

export const MonthlyBalanceChart = ({
	monthlyData,
}: MonthlyBalanceChartProps) => {
	const summary = new MonthlyBalance(monthlyData);

	return (
		<>
			<div className="flex-1 min-h-0">
				<ChartContainer config={config} className="h-full w-full">
					<BarChart
						data={monthlyData}
						accessibilityLayer
						barCategoryGap="30%"
					>
						<CartesianGrid vertical={false} strokeDasharray="3 3" />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={10}
							tick={{ fontSize: 11, fill: "#9CA3AF" }}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickFormatter={Currency.formatYAxisTick}
							tick={{ fontSize: 10, fill: "#9CA3AF" }}
							width={42}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									formatter={(value) =>
										Currency.format(Number(value))
									}
								/>
							}
						/>
						<Bar
							dataKey="income"
							fill="#86EFAC"
							radius={[4, 4, 0, 0]}
						/>
						<Bar
							dataKey="expense"
							fill="#3B82F6"
							radius={[4, 4, 0, 0]}
						/>
					</BarChart>
				</ChartContainer>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span
						className={`text-subtitle font-semibold ${summary.positive ? "text-success" : "text-danger"}`}
					>
						{summary.positive ? "+" : ""}
						{Currency.format(summary.balance)} de diferença
					</span>
					{summary.positive ? (
						<TrendingUp className="size-4 text-success" />
					) : (
						<TrendingDown className="size-4 text-danger" />
					)}
				</div>
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-1.5">
						<LegendDot color="#86EFAC" />
						<span className="text-xs text-secondary">
							Receita total
						</span>
					</div>
					<div className="flex items-center gap-1.5">
						<LegendDot color="#3B82F6" />
						<span className="text-xs text-secondary">
							Custo total
						</span>
					</div>
				</div>
			</div>
		</>
	);
};
