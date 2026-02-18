import { BaseError } from "./BaseError";

export class PasswordNotSetError extends BaseError {
	constructor(message: string = "User has no password.") {
		super(message, 401);
	}
}
