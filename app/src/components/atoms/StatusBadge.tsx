import { cn } from "@/lib/utils";

interface StatusBadgeProps {
	status: string;
	className?: string;
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
	UPDATED: { label: "Sincronizado", className: "bg-success/10 text-success" },
	UPDATING: { label: "Atualizando", className: "bg-warning/10 text-warning" },
	ERROR: { label: "Erro", className: "bg-danger/10 text-danger" },
	WAITING_USER_INPUT: {
		label: "Ação necessária",
		className: "bg-warning/10 text-warning",
	},
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
	const { label, className: statusClassName } = STATUS_CONFIG[status] ?? {
		label: status,
		className: "bg-tertiary/10 text-tertiary",
	};

	return (
		<span
			className={cn(
				"inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium",
				statusClassName,
				className,
			)}
		>
			{label}
		</span>
	);
};
