import { Label, Pie, PieChart } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { LegendItem } from "@/components/molecules/LegendItem";

interface CategoryItem {
	name: string;
	value: number;
	displayValue: string;
	color: string;
}

interface CategorySpendingCardProps {
	title: string;
	centerValue: string;
	centerLabel: string;
	categories: CategoryItem[];
	subtitle?: string;
}

export const CategorySpendingCard = ({
	title,
	centerValue,
	centerLabel,
	categories,
	subtitle,
}: CategorySpendingCardProps) => {
	const chartConfig = categories.reduce<ChartConfig>((acc, cat) => {
		acc[cat.name] = { label: cat.name, color: cat.color };
		return acc;
	}, {});

	const chartData = categories.map((cat) => ({
		name: cat.name,
		value: cat.value,
		fill: cat.color,
	}));

	return (
		<div className="flex flex-col gap-4 p-4 bg-card rounded-xl border border-border w-full">
			<span className="text-title font-semibold text-primary">
				{title}
			</span>

			<div className="flex items-center gap-6">
				<ChartContainer
					config={chartConfig}
					className="size-40 shrink-0"
				>
					<PieChart>
						<Pie
							data={chartData}
							dataKey="value"
							nameKey="name"
							innerRadius={52}
							outerRadius={72}
							strokeWidth={0}
						>
							<Label
								content={({ viewBox }) => {
									if (
										viewBox &&
										"cx" in viewBox &&
										"cy" in viewBox
									) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
											>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy ?? 0) - 4}
													className="fill-primary text-[28px] font-bold"
												>
													{centerValue}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy ?? 0) + 14}
													className="fill-secondary text-[10px]"
												>
													{centerLabel}
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>

				<div className="flex flex-col gap-3 flex-1">
					{categories.map((cat) => (
						<LegendItem
							key={cat.name}
							color={cat.color}
							label={cat.name}
							value={cat.displayValue}
						/>
					))}
				</div>
			</div>

			{subtitle && (
				<span className="text-xs text-muted-foreground">
					{subtitle}
				</span>
			)}
		</div>
	);
};
