import type { ReactNode } from "react";

interface PageTitleProps {
	title: string;
	children?: ReactNode;
}

export const PageTitle = ({ title, children }: PageTitleProps) => (
	<div className="flex items-center justify-between pb-2 w-full">
		<h1 className="text-2xl font-bold text-primary">{title}</h1>
		{children && <div className="flex items-center gap-2">{children}</div>}
	</div>
);
