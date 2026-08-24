import type { LucideIcon } from "lucide-react";
import { forwardRef, type ComponentProps } from "react";
import { FormInput } from "@/components/atoms/FormInput";

interface InputGroupProps extends Omit<ComponentProps<"input">, "icon"> {
	label: string;
	icon: LucideIcon;
}

export const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
	({ label, icon, ...props }, ref) => (
		<div className="flex min-w-0 w-full flex-col gap-2">
			<label className="text-body font-medium text-primary">
				{label}
			</label>
			<FormInput ref={ref} icon={icon} {...props} />
		</div>
	),
);
