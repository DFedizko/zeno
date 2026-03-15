import { BaseError } from "@/shared/errors/BaseError";

export class CategoryNotFound extends BaseError {
	constructor(message = "Category not found.") {
		super(message, 404);
	}
}
