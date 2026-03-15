import { BaseError } from "@/shared/errors/BaseError";

export class BillNotFound extends BaseError {
	constructor(message = "Credit card bill not found.") {
		super(message, 404);
	}
}
