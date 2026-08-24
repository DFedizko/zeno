import type { LucideIcon } from "lucide-react";
import { forwardRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends ComponentProps<"input"> {
	icon: LucideIcon;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	({ icon: Icon, className, ...props }, ref) => (
		<div
			className={cn(
				"flex h-12 min-w-0 w-full items-center gap-3 rounded-lg border border-border bg-card px-4",
				className,
			)}
		>
			<Icon className="size-[18px] shrink-0 text-tertiary" />
			<input
				ref={ref}
				className="min-w-0 flex-1 bg-transparent text-body text-primary outline-none placeholder:text-tertiary"
				{...props}
			/>
		</div>
	),
);
