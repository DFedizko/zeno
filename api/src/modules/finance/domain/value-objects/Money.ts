export class Money {
	private constructor(
		private readonly _amount: number,
		private readonly _currencyCode: string,
	) {}

	public static create(amount: number, currencyCode = "BRL") {
		return new Money(amount, currencyCode);
	}

	public static zero(currencyCode = "BRL") {
		return new Money(0, currencyCode);
	}

	public static fromDecimal(
		decimal: { toNumber(): number },
		currencyCode = "BRL",
	) {
		return new Money(decimal.toNumber(), currencyCode);
	}

	public get amount() {
		return this._amount;
	}

	public get currencyCode() {
		return this._currencyCode;
	}

	public add(other: Money): Money {
		return new Money(this._amount + other._amount, this._currencyCode);
	}

	public subtract(other: Money): Money {
		return new Money(this._amount - other._amount, this._currencyCode);
	}

	public isPositive(): boolean {
		return this._amount > 0;
	}

	public isNegative(): boolean {
		return this._amount < 0;
	}

	public isZero(): boolean {
		return this._amount === 0;
	}

	public format(): string {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: this._currencyCode,
		}).format(this._amount);
	}
}
