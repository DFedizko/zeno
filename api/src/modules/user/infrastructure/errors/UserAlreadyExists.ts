import { BaseError } from "@/shared/errors/BaseError";

export class UserAlreadyExists extends BaseError {
    constructor(message: string = "User already exists.") {
        super(message, 409);
    }
}
