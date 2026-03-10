import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TrendingUp, TrendingDown, Target, Flag } from "lucide-react";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { BalanceCard } from "@/components/organisms/BalanceCard";
import { SpendingLimitCard } from "@/components/organisms/SpendingLimitCard";
import { StatCard } from "@/components/molecules/StatCard";
import { CategorySpendingCard } from "@/components/organisms/CategorySpendingCard";
import { MyCardSection } from "@/components/organisms/MyCardSection";
import { ActionButton } from "@/components/molecules/ActionButton";
import { TransactionHistory } from "@/components/organisms/TransactionHistory";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

const balanceData = [
  { day: "05", income: 3000, expense: 1200 },
  { day: "10", income: 5500, expense: 2800 },
  { day: "15", income: 8000, expense: 4100 },
  { day: "20", income: 11000, expense: 5500 },
  { day: "25", income: 13500, expense: 6200 },
  { day: "28", income: 15000, expense: 6700 },
];

const periods = [
  { value: "2025-12", label: "Dez 2025" },
  { value: "2026-01", label: "Jan 2026" },
  { value: "2026-02", label: "Fev 2026" },
  { value: "2026-03", label: "Mar 2026" },
];

const spendingCategories = [
  { name: "Moradia", value: 27, displayValue: "27%", color: "#86EFAC" },
  { name: "Alimentação", value: 18, displayValue: "18%", color: "#FDE68A" },
  { name: "Transporte", value: 12, displayValue: "12%", color: "#FBCFE8" },
  { name: "Saúde", value: 9, displayValue: "9%", color: "#BAE6FD" },
  { name: "Outros", value: 14, displayValue: "14%", color: "#DDD6FE" },
];

const costCategories = [
  { name: "Janeiro", value: 8200, displayValue: "R$ 8.200", color: "#EF4444" },
  {
    name: "Fevereiro",
    value: 6450,
    displayValue: "R$ 6.450",
    color: "#F87171",
  },
  { name: "Março", value: 9100, displayValue: "R$ 9.100", color: "#FCA5A5" },
];

const cards = [
  {
    id: "1",
    type: "Cartão de débito",
    brand: "VISA",
    lastFourDigits: "7850",
    holderName: "Michael Johnson",
    expiry: "03/30",
    color: "#86D66E",
    chipColor: "#9DE382",
  },
  {
    id: "2",
    type: "Cartão de crédito",
    brand: "MC",
    lastFourDigits: "3892",
    holderName: "Michael Johnson",
    expiry: "05/28",
    color: "#6366F1",
    chipColor: "#818CF8",
  },
];

const transactions = [
  {
    id: "1",
    badge: "TD",
    badgeColor: "#10B981",
    name: "Pagamento de dividendos",
    date: "3 fev 2025",
    amount: "+R$ 1.100",
    positive: true,
  },
  {
    id: "2",
    badge: "🔄",
    badgeColor: "#3B82F6",
    name: "Assinaturas corporativas",
    date: "1 fev 2025",
    amount: "-R$ 6.400",
    positive: false,
  },
  {
    id: "3",
    badge: "💼",
    badgeColor: "#1F2937",
    name: "Serviços de consultoria",
    date: "27 jan 2025",
    amount: "-R$ 2.100",
    positive: false,
  },
  {
    id: "4",
    badge: "🛒",
    badgeColor: "#1F2937",
    name: "Compra de equipamentos",
    date: "26 jan 2025",
    amount: "-R$ 1.700",
    positive: false,
  },
  {
    id: "5",
    badge: "EH",
    badgeColor: "#F59E0B",
    name: "Eli Harper",
    date: "21 jan 2025",
    amount: "+R$ 400",
    positive: true,
  },
  {
    id: "6",
    badge: "DR",
    badgeColor: "#8B5CF6",
    name: "Davis Rowan",
    date: "17 jan 2025",
    amount: "+R$ 800",
    positive: true,
  },
];

function DashboardPage() {
  const [period, setPeriod] = useState("2026-02");

  return (
    <DashboardTemplate
      balanceCard={
        <BalanceCard
          amount="R$ 8.300"
          periodLabel="Fevereiro 2026"
          selectedPeriod={period}
          periods={periods}
          onPeriodChange={setPeriod}
          data={balanceData}
          difference="Diferença: +R$ 8.300 este mês"
          differencePositive
        />
      }
      spendingLimit={
        <SpendingLimitCard
          title="Limite de gastos mensais"
          currentAmount="R$ 2.000"
          totalAmount="R$ 5.000"
          value={2000}
          max={5000}
        />
      }
      statsRow={
        <div className="flex gap-5 w-full">
          <StatCard
            label="Receita total"
            amount="R$ 15.000"
            change="+1,5% em relação ao mês passado"
            changePositive
          />
          <StatCard
            label="Despesas totais"
            amount="R$ 6.700"
            change="+12,5% em relação ao mês passado"
            changePositive={false}
          />
          <StatCard
            label="Saldo economizado"
            amount="R$ 8.300"
            change="+20,7% em relação ao mês passado"
            changePositive
          />
        </div>
      }
      chartsRow={
        <div className="flex gap-5 w-full">
          <CategorySpendingCard
            title="Gastos por categoria"
            centerValue="68%"
            centerLabel="do orçamento"
            categories={spendingCategories}
            subtitle="Baseado nos padrões de gastos dos últimos 30 dias"
          />
          <CategorySpendingCard
            title="Meses com maiores custos"
            centerValue="R$ 9.100"
            centerLabel="maior custo"
            categories={costCategories}
            subtitle="Análise dos últimos 3 meses"
          />
        </div>
      }
      cardSection={<MyCardSection cards={cards} onAddCard={() => {}} />}
      cardActions={
        <div className="flex gap-2 w-full">
          <ActionButton icon={TrendingUp} label="Receita" />
          <ActionButton icon={TrendingDown} label="Despesa" />
          <ActionButton icon={Target} label="Orçamento" />
          <ActionButton icon={Flag} label="Metas" />
        </div>
      }
      transactionHistory={<TransactionHistory transactions={transactions} />}
    />
  );
}
