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
				"flex items-center gap-3 h-12 px-4 bg-card rounded-lg border border-border w-full",
				className,
			)}
		>
			<Icon className="size-[18px] shrink-0 text-tertiary" />
			<input
				ref={ref}
				className="flex-1 bg-transparent text-body text-primary placeholder:text-tertiary outline-none"
				{...props}
			/>
		</div>
	),
);
