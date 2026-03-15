interface Column {
	label: string;
	width: string;
	align?: "left" | "right";
}

interface TableHeaderProps {
	columns: Column[];
}

export const TableHeader = ({ columns }: TableHeaderProps) => (
	<thead>
		<tr className="h-12">
			{columns.map((col) => (
				<th
					key={col.label}
					style={{ width: col.width }}
					className={`px-4 text-xs font-semibold text-muted-foreground ${col.align === "right" ? "text-right" : "text-left"}`}
				>
					{col.label}
				</th>
			))}
		</tr>
	</thead>
);
