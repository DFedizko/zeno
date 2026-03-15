import { BaseError } from "@/shared/errors/BaseError";

export class AccountNotFound extends BaseError {
	constructor(message = "Financial account not found.") {
		super(message, 404);
	}
}
