import type {
	CreditCardBillOutput,
	CreditCardBillInput,
} from "@/routes/finance/financeSchema";

export interface ICreditCardBillRepository {
	findByAccountId(accountId: string): Promise<CreditCardBillOutput[]>;
	findById(id: string): Promise<CreditCardBillOutput>;
	upsertByProviderBillId(
		accountId: string,
		input: CreditCardBillInput,
	): Promise<CreditCardBillOutput>;
}
