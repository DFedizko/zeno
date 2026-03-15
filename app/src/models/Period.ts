import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export type PeriodGranularity = "day" | "month" | "year";

export class Period {
	public static readonly GRANULARITY_LABELS: Record<
		PeriodGranularity,
		string
	> = {
		day: "Dia",
		month: "Mês",
		year: "Ano",
	};

	public readonly granularity: PeriodGranularity;
	public readonly date: Date;

	public constructor(granularity: PeriodGranularity, date: Date) {
		this.granularity = granularity;
		this.date = date;
	}

	public get subtitle(): string {
		if (this.granularity === "day")
			return this.capitalize(
				format(this.date, "d 'de' MMMM 'de' yyyy", { locale: ptBR }),
			);
		if (this.granularity === "month")
			return this.capitalize(
				format(this.date, "MMMM 'de' yyyy", { locale: ptBR }),
			);
		return format(this.date, "yyyy");
	}

	public get triggerLabel(): string {
		if (this.granularity === "day")
			return format(this.date, "d MMM yyyy", { locale: ptBR });
		if (this.granularity === "month") {
			const raw = format(this.date, "MMMM yyyy", { locale: ptBR });
			return raw.charAt(0).toUpperCase() + raw.slice(1);
		}
		return format(this.date, "yyyy");
	}

	private capitalize(s: string): string {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}
}
