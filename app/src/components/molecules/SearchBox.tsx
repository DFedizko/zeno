import { Search } from "lucide-react";
import { SearchInput } from "@/components/atoms/SearchInput";
import type { ComponentProps } from "react";

type SearchBoxProps = Omit<ComponentProps<"input">, "type">;

export const SearchBox = ({
  placeholder = "Busca rápida",
  ...props
}: SearchBoxProps) => (
  <div className="flex items-center gap-2 h-10 w-[280px] px-4 bg-card rounded-lg border border-border">
    <Search className="size-4 shrink-0" color="var(--color-tertiary)" />
    <SearchInput placeholder={placeholder} {...props} />
  </div>
);
