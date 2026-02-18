import { BaseError } from "./BaseError";

export class InvalidCredentialsError extends BaseError {
	constructor(message: string = "Invalid credentials.") {
		super(message, 401);
	}
}
