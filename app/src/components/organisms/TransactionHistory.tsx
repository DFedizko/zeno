import { TransactionItem } from "@/components/molecules/TransactionItem";

interface Transaction {
  id: string;
  badge: string;
  badgeColor: string;
  name: string;
  date: string;
  amount: string;
  positive: boolean;
}

interface TransactionHistoryProps {
  title?: string;
  transactions: Transaction[];
}

export const TransactionHistory = ({
  title = "Histórico de transações",
  transactions,
}: TransactionHistoryProps) => (
  <div className="flex flex-col gap-3 p-4 bg-card rounded-xl border border-border w-full flex-1">
    <span className="text-subtitle font-semibold text-primary">{title}</span>

    <div className="flex items-center justify-between">
      <span className="text-caption text-muted-foreground">Nome</span>
      <span className="text-caption text-muted-foreground">Valor</span>
    </div>

    <div className="flex flex-col gap-3">
      {transactions.map((tx) => (
        <TransactionItem
          key={tx.id}
          badge={tx.badge}
          badgeColor={tx.badgeColor}
          name={tx.name}
          date={tx.date}
          amount={tx.amount}
          positive={tx.positive}
        />
      ))}
    </div>
  </div>
);
