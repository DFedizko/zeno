import { BaseError } from "@/shared/errors/BaseError";

export class ConnectionNotFound extends BaseError {
	constructor(message = "Connection not found.") {
		super(message, 404);
	}
}
