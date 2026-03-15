import type { LucideIcon } from "lucide-react";
import { Fragment } from "react";
import { TableHeader } from "@/components/atoms/TableHeader";
import { TableDivider } from "@/components/atoms/TableDivider";
import { TableRow } from "@/components/molecules/TableRow";

export interface Transaction {
	id: string;
	date: string;
	description: string;
	icon?: LucideIcon;
	card: string;
	category: string;
	categoryColor: string;
	amount: string;
	positive: boolean;
}

interface HistoryTableProps {
	transactions: Transaction[];
}

const columns = [
	{ label: "Data", width: "100px" },
	{ label: "Descrição", width: "488px" },
	{ label: "Cartão", width: "120px" },
	{ label: "Categoria", width: "100px" },
	{ label: "Valor", width: "120px", align: "right" as const },
];

export const HistoryTable = ({ transactions }: HistoryTableProps) => (
	<div className="bg-card rounded-xl border border-border w-full flex-1 overflow-hidden">
		<table className="w-full border-collapse">
			<TableHeader columns={columns} />
			<tbody>
				<TableDivider colSpan={columns.length} />
				{transactions.map((tx, i) => (
					<Fragment key={tx.id}>
						<TableRow
							date={tx.date}
							description={tx.description}
							icon={tx.icon}
							card={tx.card}
							category={tx.category}
							categoryColor={tx.categoryColor}
							amount={tx.amount}
							positive={tx.positive}
						/>
						{i < transactions.length - 1 && (
							<TableDivider colSpan={columns.length} muted />
						)}
					</Fragment>
				))}
			</tbody>
		</table>
	</div>
);
