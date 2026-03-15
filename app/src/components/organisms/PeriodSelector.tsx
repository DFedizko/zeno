import { useState } from "react";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Period, type PeriodGranularity } from "@/models/Period";
import { ExpenseChart } from "@/models/ExpenseChart";

export type { PeriodGranularity };

interface PeriodSelectorProps {
	granularity: PeriodGranularity;
	date: Date;
	availableYears: number[];
	availableGranularities?: PeriodGranularity[];
	onGranularityChange: (g: PeriodGranularity) => void;
	onDateChange: (date: Date) => void;
}

export const PeriodSelector = ({
	granularity,
	date,
	availableYears,
	availableGranularities = ["day", "month", "year"],
	onGranularityChange,
	onDateChange,
}: PeriodSelectorProps) => {
	const [viewYear, setViewYear] = useState(date.getFullYear());

	const handleMonthSelect = (monthIndex: number) => {
		onDateChange(new Date(viewYear, monthIndex, 1));
	};

	const period = new Period(granularity, date);

	return (
		<Popover>
			<PopoverTrigger className="h-auto border-none bg-muted px-3 py-1.5 text-[13px] font-medium text-primary rounded-md flex items-center gap-1.5 cursor-pointer">
				<CalendarIcon className="size-3.5" />
				{period.triggerLabel}
			</PopoverTrigger>

			<PopoverContent align="end" className="w-auto p-0 overflow-hidden">
				<div className="flex border-b border-border">
					{availableGranularities.map((g) => (
						<button
							key={g}
							type="button"
							onClick={() => onGranularityChange(g)}
							className={`flex-1 py-2 text-xs font-medium transition-colors ${
								granularity === g
									? "text-primary border-b-2 border-accent"
									: "text-muted-foreground hover:text-primary"
							}`}
						>
							{Period.GRANULARITY_LABELS[g]}
						</button>
					))}
				</div>

				{granularity === "day" && (
					<Calendar
						mode="single"
						selected={date}
						onSelect={(d) => d && onDateChange(d)}
						locale={ptBR}
					/>
				)}

				{granularity === "month" && (
					<div className="p-3 w-56">
						<div className="flex items-center justify-between mb-3">
							<button
								type="button"
								onClick={() => setViewYear((y) => y - 1)}
								className="p-1 rounded hover:bg-muted"
							>
								<ChevronLeft className="size-4 text-muted-foreground" />
							</button>
							<span className="text-sm font-medium">
								{viewYear}
							</span>
							<button
								type="button"
								onClick={() => setViewYear((y) => y + 1)}
								className="p-1 rounded hover:bg-muted"
							>
								<ChevronRight className="size-4 text-muted-foreground" />
							</button>
						</div>
						<div className="grid grid-cols-3 gap-1">
							{ExpenseChart.MONTHS_SHORT.map((label, i) => {
								const isSelected =
									date.getMonth() === i &&
									date.getFullYear() === viewYear;
								return (
									<button
										key={label}
										type="button"
										onClick={() => handleMonthSelect(i)}
										className={`py-1.5 rounded text-sm transition-colors ${
											isSelected
												? "bg-primary text-white"
												: "hover:bg-muted text-foreground"
										}`}
									>
										{label}
									</button>
								);
							})}
						</div>
					</div>
				)}

				{granularity === "year" && (
					<div className="p-2 w-36">
						{availableYears.map((year) => {
							const isSelected = date.getFullYear() === year;
							return (
								<button
									key={year}
									type="button"
									onClick={() =>
										onDateChange(
											new Date(
												year,
												date.getMonth(),
												date.getDate(),
											),
										)
									}
									className={`w-full py-2 rounded text-sm font-medium transition-colors ${
										isSelected
											? "bg-primary text-white"
											: "hover:bg-muted text-foreground"
									}`}
								>
									{year}
								</button>
							);
						})}
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
};
