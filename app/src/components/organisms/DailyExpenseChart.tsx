import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { TrendingDown } from "lucide-react";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { LegendDot } from "@/components/atoms/LegendDot";
import { Currency } from "@/models/Currency";
import { ExpenseChart } from "@/models/ExpenseChart";

interface DailyExpenseChartProps {
	data: { x: number; expense: number }[];
	xDomain: [number, number];
	xTicks?: number[];
	xTickFormatter: (v: number) => string;
	tooltipLabelFormatter: (v: number) => string;
	totalLabel: string;
}

const config = {
	expense: { label: "Despesa", color: "#3B82F6" },
} satisfies ChartConfig;

export const DailyExpenseChart = ({
	data,
	xDomain,
	xTicks,
	xTickFormatter,
	tooltipLabelFormatter,
	totalLabel,
}: DailyExpenseChartProps) => {
	const total = ExpenseChart.calculateExpenseTotal(data);

	return (
		<>
			<div className="flex-1 min-h-0">
				<ChartContainer config={config} className="h-full w-full">
					<LineChart data={data} accessibilityLayer>
						<CartesianGrid vertical={false} strokeDasharray="3 3" />
						<YAxis
							tickLine={false}
							axisLine={false}
							tickFormatter={Currency.formatYAxisTick}
							tick={{ fontSize: 10, fill: "#9CA3AF" }}
							width={42}
						/>
						<XAxis
							dataKey="x"
							type="number"
							domain={xDomain}
							ticks={xTicks}
							tickFormatter={xTickFormatter}
							tickLine={false}
							axisLine={false}
							tickMargin={10}
							tick={{ fontSize: 11, fill: "#9CA3AF" }}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									labelFormatter={(v) => {
										const n = Number(v);
										return Number.isFinite(n) ? tooltipLabelFormatter(n) : "";
									}}
									formatter={(value) => Currency.format(Number(value))}
								/>
							}
						/>
						<Line
							dataKey="expense"
							type="monotone"
							stroke="#3B82F6"
							strokeWidth={3}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="text-subtitle font-semibold text-primary">
						{totalLabel}: {Currency.format(total)}
					</span>
					<TrendingDown className="size-4 text-danger" />
				</div>
				<div className="flex items-center gap-1.5">
					<LegendDot color="#3B82F6" />
					<span className="text-xs text-secondary">Custo total</span>
				</div>
			</div>
		</>
	);
};
