import { BaseError } from "@/shared/errors/BaseError";

export class TransactionNotFound extends BaseError {
	constructor(message = "Transaction not found.") {
		super(message, 404);
	}
}
