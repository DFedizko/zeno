import { Badge } from "@/components/atoms/Badge";

interface TransactionItemProps {
  badge: string;
  badgeColor: string;
  name: string;
  date: string;
  amount: string;
  positive: boolean;
}

export const TransactionItem = ({
  badge,
  badgeColor,
  name,
  date,
  amount,
  positive,
}: TransactionItemProps) => (
  <div className="flex items-center justify-between h-12 w-full">
    <div className="flex items-center gap-2.5">
      <Badge label={badge} color={badgeColor} />
      <div className="flex flex-col gap-0.5">
        <span className="text-[13px] font-medium text-primary">{name}</span>
        <span className="text-caption text-muted-foreground">{date}</span>
      </div>
    </div>
    <span
      className={`text-[13px] font-semibold ${positive ? "text-success" : "text-danger"}`}
    >
      {amount}
    </span>
  </div>
);
