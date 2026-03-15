export class Currency {
	public static format(value: number): string {
		return `R$ ${value.toLocaleString("pt-BR")}`;
	}

	public static formatYAxisTick(value: number): string {
		return value >= 1000 ? `R$${(value / 1000).toFixed(0)}k` : `R$${value}`;
	}
}
