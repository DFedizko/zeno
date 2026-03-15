import { cn } from "@/lib/utils";

interface BadgeProps {
	label: string;
	color: string;
	className?: string;
}

export const Badge = ({ label, color, className }: BadgeProps) => (
	<div
		className={cn(
			"flex items-center justify-center size-9 shrink-0 rounded-lg text-xs font-semibold text-white",
			className,
		)}
		style={{ backgroundColor: color }}
	>
		{label}
	</div>
);
