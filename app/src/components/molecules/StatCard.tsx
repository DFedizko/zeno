interface StatCardProps {
	label: string;
	amount: string;
	change?: string;
	changePositive?: boolean;
}

export const StatCard = ({
	label,
	amount,
	change,
	changePositive = true,
}: StatCardProps) => (
	<div className="flex flex-col gap-2 p-5 bg-card rounded-xl border border-border w-full">
		<span className="text-secondary text-[13px]">{label}</span>
		<span className="text-primary text-[28px] font-bold leading-none">
			{amount}
		</span>
		{change && (
			<span
				className={`text-xs ${changePositive ? "text-success" : "text-danger"}`}
			>
				{change}
			</span>
		)}
	</div>
);
