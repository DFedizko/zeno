import { AccountIcon } from "@/components/atoms/AccountIcon";
import { Currency } from "@/models/Currency";

interface AccountItemProps {
	name: string;
	subtype: string;
	number: string | null;
	balance: number;
	creditLimit: number | null;
}

const SUBTYPE_LABELS: Record<string, string> = {
	CREDIT_CARD: "Cartão de crédito",
	SAVINGS: "Poupança",
	CHECKING: "Conta corrente",
};

export const AccountItem = ({
	name,
	subtype,
	number,
	balance,
	creditLimit,
}: AccountItemProps) => (
	<div className="flex items-center justify-between py-2 px-3 rounded-lg bg-background">
		<div className="flex items-center gap-3">
			<AccountIcon subtype={subtype} />
			<div className="flex flex-col">
				<span className="text-sm font-medium text-primary">{name}</span>
				<span className="text-xs text-tertiary">
					{SUBTYPE_LABELS[subtype] ?? subtype}
					{number && ` · ${number}`}
				</span>
			</div>
		</div>
		<div className="flex flex-col items-end">
			<span
				className={`text-sm font-semibold ${balance >= 0 ? "text-primary" : "text-danger"}`}
			>
				{Currency.format(balance)}
			</span>
			{creditLimit && (
				<span className="text-xs text-tertiary">
					Limite: {Currency.format(creditLimit)}
				</span>
			)}
		</div>
	</div>
);
