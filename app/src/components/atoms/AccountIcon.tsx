import { CreditCard, Landmark, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccountIconProps {
	subtype: string;
	className?: string;
}

export const AccountIcon = ({ subtype, className }: AccountIconProps) => {
	const iconClassName = cn("size-4", className);

	if (subtype === "CREDIT_CARD")
		return <CreditCard className={iconClassName} />;
	if (subtype === "SAVINGS") return <Wallet className={iconClassName} />;
	return <Landmark className={iconClassName} />;
};
