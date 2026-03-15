import { createFileRoute } from "@tanstack/react-router";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

const hourlyDataByDay = {
  "2026-03-05": [
    { x: 8, expense: 45 }, { x: 10, expense: 120 }, { x: 12, expense: 280 },
    { x: 14, expense: 95 }, { x: 17, expense: 180 }, { x: 20, expense: 350 }, { x: 22, expense: 130 },
  ],
  "2026-03-10": [
    { x: 7, expense: 30 }, { x: 9, expense: 210 }, { x: 13, expense: 450 },
    { x: 16, expense: 120 }, { x: 19, expense: 520 }, { x: 21, expense: 200 },
  ],
  "2026-03-15": [
    { x: 8, expense: 60 }, { x: 11, expense: 340 }, { x: 13, expense: 180 },
    { x: 15, expense: 220 }, { x: 18, expense: 610 }, { x: 22, expense: 90 },
  ],
  "2026-03-20": [
    { x: 9, expense: 85 }, { x: 12, expense: 290 }, { x: 14, expense: 420 },
    { x: 16, expense: 160 }, { x: 20, expense: 740 }, { x: 23, expense: 110 },
  ],
  "2026-03-25": [
    { x: 7, expense: 50 }, { x: 10, expense: 175 }, { x: 12, expense: 310 },
    { x: 15, expense: 95 }, { x: 18, expense: 480 }, { x: 21, expense: 290 },
  ],
  "2026-03-28": [
    { x: 8, expense: 40 }, { x: 11, expense: 230 }, { x: 14, expense: 560 },
    { x: 17, expense: 145 }, { x: 19, expense: 410 }, { x: 22, expense: 315 },
  ],
  "2026-02-07": [
    { x: 9, expense: 70 }, { x: 12, expense: 320 }, { x: 15, expense: 190 },
    { x: 18, expense: 550 }, { x: 21, expense: 210 },
  ],
  "2026-02-18": [
    { x: 8, expense: 55 }, { x: 11, expense: 280 }, { x: 14, expense: 430 },
    { x: 19, expense: 670 }, { x: 22, expense: 180 },
  ],
  "2026-01-15": [
    { x: 9, expense: 90 }, { x: 12, expense: 240 }, { x: 16, expense: 380 },
    { x: 20, expense: 490 }, { x: 23, expense: 100 },
  ],
};

const dailyDataByMonth = {
  "2025-10": [
    { x: 1, expense: 120 }, { x: 2, expense: 85 }, { x: 3, expense: 210 }, { x: 4, expense: 0 },
    { x: 5, expense: 340 }, { x: 6, expense: 150 }, { x: 7, expense: 95 }, { x: 8, expense: 420 },
    { x: 9, expense: 180 }, { x: 10, expense: 760 }, { x: 11, expense: 130 }, { x: 12, expense: 0 },
    { x: 13, expense: 290 }, { x: 14, expense: 210 }, { x: 15, expense: 870 }, { x: 16, expense: 145 },
    { x: 17, expense: 320 }, { x: 18, expense: 0 }, { x: 19, expense: 480 }, { x: 20, expense: 220 },
    { x: 21, expense: 640 }, { x: 22, expense: 175 }, { x: 23, expense: 390 }, { x: 24, expense: 0 },
    { x: 25, expense: 510 }, { x: 26, expense: 240 }, { x: 27, expense: 180 }, { x: 28, expense: 730 },
    { x: 29, expense: 160 }, { x: 30, expense: 920 }, { x: 31, expense: 280 },
  ],
  "2025-11": [
    { x: 1, expense: 95 }, { x: 2, expense: 310 }, { x: 3, expense: 180 }, { x: 4, expense: 0 },
    { x: 5, expense: 420 }, { x: 6, expense: 130 }, { x: 7, expense: 580 }, { x: 8, expense: 240 },
    { x: 9, expense: 170 }, { x: 10, expense: 0 }, { x: 11, expense: 390 }, { x: 12, expense: 215 },
    { x: 13, expense: 840 }, { x: 14, expense: 160 }, { x: 15, expense: 490 }, { x: 16, expense: 0 },
    { x: 17, expense: 275 }, { x: 18, expense: 620 }, { x: 19, expense: 185 }, { x: 20, expense: 440 },
    { x: 21, expense: 0 }, { x: 22, expense: 310 }, { x: 23, expense: 750 }, { x: 24, expense: 195 },
    { x: 25, expense: 520 }, { x: 26, expense: 140 }, { x: 27, expense: 380 }, { x: 28, expense: 910 },
    { x: 29, expense: 230 }, { x: 30, expense: 470 },
  ],
  "2025-12": [
    { x: 1, expense: 280 }, { x: 2, expense: 160 }, { x: 3, expense: 590 }, { x: 4, expense: 0 },
    { x: 5, expense: 430 }, { x: 6, expense: 210 }, { x: 7, expense: 780 }, { x: 8, expense: 320 },
    { x: 9, expense: 145 }, { x: 10, expense: 0 }, { x: 11, expense: 510 }, { x: 12, expense: 290 },
    { x: 13, expense: 870 }, { x: 14, expense: 180 }, { x: 15, expense: 640 }, { x: 16, expense: 0 },
    { x: 17, expense: 350 }, { x: 18, expense: 720 }, { x: 19, expense: 420 }, { x: 20, expense: 560 },
    { x: 21, expense: 0 }, { x: 22, expense: 680 }, { x: 23, expense: 290 }, { x: 24, expense: 1200 },
    { x: 25, expense: 0 }, { x: 26, expense: 480 }, { x: 27, expense: 310 }, { x: 28, expense: 750 },
    { x: 29, expense: 195 }, { x: 30, expense: 530 }, { x: 31, expense: 840 },
  ],
  "2026-01": [
    { x: 1, expense: 0 }, { x: 2, expense: 180 }, { x: 3, expense: 95 }, { x: 4, expense: 310 },
    { x: 5, expense: 0 }, { x: 6, expense: 420 }, { x: 7, expense: 265 }, { x: 8, expense: 180 },
    { x: 9, expense: 540 }, { x: 10, expense: 0 }, { x: 11, expense: 310 }, { x: 12, expense: 175 },
    { x: 13, expense: 620 }, { x: 14, expense: 240 }, { x: 15, expense: 480 }, { x: 16, expense: 0 },
    { x: 17, expense: 195 }, { x: 18, expense: 370 }, { x: 19, expense: 580 }, { x: 20, expense: 145 },
    { x: 21, expense: 0 }, { x: 22, expense: 290 }, { x: 23, expense: 430 }, { x: 24, expense: 165 },
    { x: 25, expense: 510 }, { x: 26, expense: 280 }, { x: 27, expense: 0 }, { x: 28, expense: 390 },
    { x: 29, expense: 215 }, { x: 30, expense: 470 }, { x: 31, expense: 320 },
  ],
  "2026-02": [
    { x: 1, expense: 145 }, { x: 2, expense: 380 }, { x: 3, expense: 0 }, { x: 4, expense: 260 },
    { x: 5, expense: 490 }, { x: 6, expense: 175 }, { x: 7, expense: 680 }, { x: 8, expense: 0 },
    { x: 9, expense: 320 }, { x: 10, expense: 215 }, { x: 11, expense: 540 }, { x: 12, expense: 190 },
    { x: 13, expense: 0 }, { x: 14, expense: 720 }, { x: 15, expense: 280 }, { x: 16, expense: 410 },
    { x: 17, expense: 165 }, { x: 18, expense: 850 }, { x: 19, expense: 0 }, { x: 20, expense: 340 },
    { x: 21, expense: 590 }, { x: 22, expense: 230 }, { x: 23, expense: 460 }, { x: 24, expense: 0 },
    { x: 25, expense: 310 }, { x: 26, expense: 175 }, { x: 27, expense: 640 }, { x: 28, expense: 920 },
  ],
  "2026-03": [
    { x: 1, expense: 210 }, { x: 2, expense: 85 }, { x: 3, expense: 0 }, { x: 4, expense: 340 },
    { x: 5, expense: 580 }, { x: 6, expense: 165 }, { x: 7, expense: 420 }, { x: 8, expense: 0 },
    { x: 9, expense: 290 }, { x: 10, expense: 730 }, { x: 11, expense: 180 }, { x: 12, expense: 460 },
    { x: 13, expense: 0 }, { x: 14, expense: 320 }, { x: 15, expense: 890 }, { x: 16, expense: 240 },
    { x: 17, expense: 510 }, { x: 18, expense: 175 }, { x: 19, expense: 0 }, { x: 20, expense: 680 },
    { x: 21, expense: 350 }, { x: 22, expense: 195 }, { x: 23, expense: 540 }, { x: 24, expense: 0 },
    { x: 25, expense: 410 }, { x: 26, expense: 270 }, { x: 27, expense: 760 }, { x: 28, expense: 330 },
    { x: 29, expense: 0 }, { x: 30, expense: 480 }, { x: 31, expense: 620 },
  ],
};

const monthlyDataByYear = {
  "2025": [
    { month: "Jan", income: 8500, expense: 5200 },
    { month: "Fev", income: 9200, expense: 6100 },
    { month: "Mar", income: 10100, expense: 7300 },
    { month: "Abr", income: 9800, expense: 6200 },
    { month: "Mai", income: 10500, expense: 7100 },
    { month: "Jun", income: 11200, expense: 8300 },
    { month: "Jul", income: 10800, expense: 7600 },
    { month: "Ago", income: 12400, expense: 8800 },
    { month: "Set", income: 11600, expense: 7900 },
    { month: "Out", income: 12000, expense: 7500 },
    { month: "Nov", income: 13200, expense: 8900 },
    { month: "Dez", income: 11800, expense: 9100 },
  ],
  "2026": [
    { month: "Jan", income: 8000, expense: 5000 },
    { month: "Fev", income: 8000, expense: 8100 },
    { month: "Mar", income: 15000, expense: 6700 },
  ],
};

const spendingCategories = [
  { name: "Moradia", value: 27, displayValue: "27%", color: "#86EFAC" },
  { name: "Alimentação", value: 18, displayValue: "18%", color: "#FDE68A" },
  { name: "Transporte", value: 12, displayValue: "12%", color: "#FBCFE8" },
  { name: "Saúde", value: 9, displayValue: "9%", color: "#BAE6FD" },
  { name: "Outros", value: 14, displayValue: "14%", color: "#DDD6FE" },
];

const costCategories = [
  { name: "Janeiro", value: 8200, displayValue: "R$ 8.200", color: "#EF4444" },
  { name: "Fevereiro", value: 6450, displayValue: "R$ 6.450", color: "#F87171" },
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
  { id: "1", badge: "TD", badgeColor: "#10B981", name: "Pagamento de dividendos", date: "3 fev 2025", amount: "+R$ 1.100", positive: true },
  { id: "2", badge: "🔄", badgeColor: "#3B82F6", name: "Assinaturas corporativas", date: "1 fev 2025", amount: "-R$ 6.400", positive: false },
  { id: "3", badge: "💼", badgeColor: "#1F2937", name: "Serviços de consultoria", date: "27 jan 2025", amount: "-R$ 2.100", positive: false },
  { id: "4", badge: "🛒", badgeColor: "#1F2937", name: "Compra de equipamentos", date: "26 jan 2025", amount: "-R$ 1.700", positive: false },
  { id: "5", badge: "EH", badgeColor: "#F59E0B", name: "Eli Harper", date: "21 jan 2025", amount: "+R$ 400", positive: true },
  { id: "6", badge: "DR", badgeColor: "#8B5CF6", name: "Davis Rowan", date: "17 jan 2025", amount: "+R$ 800", positive: true },
];

const stats = [
  { label: "Receita total", amount: "R$ 15.000", change: "+1,5% em relação ao mês passado", changePositive: true },
  { label: "Despesas totais", amount: "R$ 6.700", change: "+12,5% em relação ao mês passado", changePositive: false },
  { label: "Saldo economizado", amount: "R$ 8.300", change: "+20,7% em relação ao mês passado", changePositive: true },
];

function DashboardPage() {
  return (
    <DashboardTemplate
      hourlyDataByDay={hourlyDataByDay}
      dailyDataByMonth={dailyDataByMonth}
      monthlyDataByYear={monthlyDataByYear}
      spendingCurrentAmount="R$ 2.000"
      spendingTotalAmount="R$ 5.000"
      spendingValue={2000}
      spendingMax={5000}
      stats={stats}
      spendingCategories={spendingCategories}
      costCategories={costCategories}
      cards={cards}
      onAddCard={() => {}}
      transactions={transactions}
    />
  );
}
