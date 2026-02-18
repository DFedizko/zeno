import { BaseError } from "@/shared/errors/BaseError";

export class UserNotFound extends BaseError {
	constructor(message: string = "User not found.") {
		super(message, 404);
	}
}
