interface TableDividerProps {
	colSpan: number;
	muted?: boolean;
}

export const TableDivider = ({ colSpan, muted }: TableDividerProps) => (
	<tr aria-hidden="true">
		<td colSpan={colSpan} className="p-0">
			<div
				className={`h-px w-full ${muted ? "bg-muted" : "bg-border"}`}
			/>
		</td>
	</tr>
);
