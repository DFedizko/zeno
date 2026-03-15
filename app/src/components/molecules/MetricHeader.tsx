interface MetricHeaderProps {
	title: string;
	subtitle: string;
}

export const MetricHeader = ({ title, subtitle }: MetricHeaderProps) => (
	<div className="flex flex-col gap-1">
		<span className="text-display font-bold text-primary">{title}</span>
		<span className="text-[13px] text-secondary">{subtitle}</span>
	</div>
);
