import type { ReactNode } from "react";

interface DashboardTemplateProps {
  balanceCard: ReactNode;
  spendingLimit: ReactNode;
  statsRow: ReactNode;
  chartsRow: ReactNode;
  cardSection: ReactNode;
  cardActions: ReactNode;
  transactionHistory: ReactNode;
}

export const DashboardTemplate = ({
  balanceCard,
  spendingLimit,
  statsRow,
  chartsRow,
  cardSection,
  cardActions,
  transactionHistory,
}: DashboardTemplateProps) => (
  <div className="flex gap-5 flex-1 min-h-0 w-full">
    <div className="flex flex-col gap-5 flex-1 min-h-0 min-w-0">
      {balanceCard}
      {spendingLimit}
      {statsRow}
      {chartsRow}
    </div>

    <div className="flex flex-col gap-5 w-[340px] shrink-0 min-h-0">
      {cardSection}
      {cardActions}
      {transactionHistory}
    </div>
  </div>
);
