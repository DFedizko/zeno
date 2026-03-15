import type { ReactNode } from "react";

interface HistoryTemplateProps {
	pageTitle: ReactNode;
	table: ReactNode;
}

export const TransactionTemplate = ({
	pageTitle,
	table,
}: HistoryTemplateProps) => (
	<div className="flex flex-col gap-5 flex-1 min-h-0 w-full">
		{pageTitle}
		{table}
	</div>
);
