import type { LucideIcon } from "lucide-react";

interface TableRowProps {
	date: string;
	description: string;
	icon?: LucideIcon;
	card: string;
	category: string;
	categoryColor: string;
	amount: string;
	positive: boolean;
}

export const TableRow = ({
	date,
	description,
	icon: Icon,
	card,
	category,
	categoryColor,
	amount,
	positive,
}: TableRowProps) => (
	<tr className="h-16">
		<td className="px-4">
			<span className="text-subtitle text-secondary">{date}</span>
		</td>
		<td className="px-4">
			<div className="flex items-center gap-3">
				{Icon && <Icon className="size-5 text-muted-foreground" />}
				<span className="text-subtitle font-medium text-primary">
					{description}
				</span>
			</div>
		</td>
		<td className="px-4">
			<span className="text-subtitle text-primary">{card}</span>
		</td>
		<td className="px-4">
			<span
				className="text-xs font-medium px-3 py-1.5 rounded-md"
				style={{ color: categoryColor }}
			>
				{category}
			</span>
		</td>
		<td className="px-4 text-right">
			<span
				className={`text-subtitle font-semibold ${positive ? "text-success" : "text-danger"}`}
			>
				{amount}
			</span>
		</td>
	</tr>
);
