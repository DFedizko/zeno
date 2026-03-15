import type { ComponentProps } from "react";

type SearchInputProps = Omit<ComponentProps<"input">, "type">;

export const SearchInput = ({ className = "", ...props }: SearchInputProps) => (
	<input
		type="text"
		className={`flex-1 bg-transparent text-[13px] text-primary placeholder:text-tertiary outline-none ${className}`}
		{...props}
	/>
);
