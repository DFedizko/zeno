export class Category {
	private constructor(
		private readonly _name: string,
		private readonly _icon?: string,
		private readonly _color?: string,
	) {}

	public static create(name: string, icon?: string, color?: string) {
		return new Category(name, icon, color);
	}

	public static toOutput(row: {
		id: string;
		name: string;
		icon: string | null;
		color: string | null;
	}) {
		return {
			id: row.id,
			name: row.name,
			icon: row.icon,
			color: row.color,
		};
	}

	public get name() {
		return this._name;
	}

	public get icon() {
		return this._icon;
	}

	public get color() {
		return this._color;
	}
}
