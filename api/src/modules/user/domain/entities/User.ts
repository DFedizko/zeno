export class User {
	private constructor(
		public readonly _email: string,
		public readonly _name?: string,
		public readonly _password?: string,
	) {}

	public static create(email: string, name?: string, password?: string) {
		return new User(email, name, password);
	}

	public static toOutput(row: {
		id: string;
		email: string;
		name: string | null;
	}) {
		return {
			id: row.id,
			email: row.email,
			name: row.name,
		};
	}

	public static toWithPasswordOutput(row: {
		id: string;
		email: string;
		name: string | null;
		passwordHash: string;
	}) {
		return {
			id: row.id,
			email: row.email,
			name: row.name,
			passwordHash: row.passwordHash,
		};
	}

	public get email() {
		return this._email;
	}

	public get name() {
		return this._name;
	}

	public get password() {
		return this._password;
	}
}
