interface LegendDotProps {
	color: string;
	className?: string;
}

export const LegendDot = ({ color, className = "" }: LegendDotProps) => (
	<span
		className={`size-2 shrink-0 rounded-full ${className}`}
		style={{ backgroundColor: color }}
	/>
);
