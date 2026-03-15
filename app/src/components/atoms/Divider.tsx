interface DividerProps {
	label?: string;
}

export const Divider = ({ label }: DividerProps) => (
	<div className="flex items-center gap-4 w-full">
		<div className="flex-1 h-px bg-border" />
		{label && (
			<span className="text-xs text-muted-foreground shrink-0">
				{label}
			</span>
		)}
		<div className="flex-1 h-px bg-border" />
	</div>
);
