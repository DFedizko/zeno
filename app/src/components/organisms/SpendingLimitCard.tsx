import { Pencil } from "lucide-react";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { IconButton } from "@/components/atoms/IconButton";

interface SpendingLimitCardProps {
	title: string;
	currentAmount: string;
	totalAmount: string;
	value: number;
	max: number;
	fillColor?: string;
	onEdit?: () => void;
}

export const SpendingLimitCard = ({
	title,
	currentAmount,
	totalAmount,
	value,
	max,
	fillColor,
	onEdit,
}: SpendingLimitCardProps) => (
	<div className="flex flex-col gap-3 p-4 bg-card rounded-xl border border-border w-full">
		<div className="flex items-center justify-between">
			<span className="text-title font-semibold text-primary">
				{title}
			</span>
			{onEdit && (
				<IconButton
					icon={Pencil}
					onClick={onEdit}
					className="size-auto border-none bg-transparent p-0 hover:bg-transparent text-secondary"
				/>
			)}
		</div>

		<ProgressBar value={value} max={max} fillColor={fillColor} />

		<div className="flex items-center justify-between">
			<span className="text-[15px] font-semibold text-primary">
				{currentAmount}
			</span>
			<span className="text-[13px] text-muted-foreground">
				{totalAmount}
			</span>
		</div>
	</div>
);
