import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useGetApiAuthMe } from "@/gen/hooks/useGetApiAuthMe";
import { StatCard } from "@/components/molecules/StatCard";
import { CategorySpendingCard } from "@/components/organisms/CategorySpendingCard";
import { BalanceCard } from "@/components/organisms/BalanceCard";
import { useState } from "react";
import { SearchBox } from "@/components/molecules/SearchBox";
import { IconButton } from "@/components/atoms/IconButton";
import {
	Bell,
	Flag,
	Settings,
	Target,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import { UserProfile } from "@/components/molecules/UserProfile";
import { ActionButton } from "@/components/molecules/ActionButton";
import { SpendingLimitCard } from "@/components/organisms/SpendingLimitCard";
import { TransactionHistory } from "@/components/organisms/TransactionHistory";
import { MyCardSection } from "@/components/organisms/MyCardSection";

export const Route = createFileRoute("/_authenticated/design-system")({
	component: DashboardPage,
});

function DashboardPage() {
	const [period, setPeriod] = useState("2026-02");

	return (
		<div className="p-8">
			<div className="flex flex-col items-center justify-between">
				<div className="flex justify-between w-full mb-3">
					<h1 className="text-xl font-semibold">Dashboard</h1>
					<button
						type="button"
						// onClick={handleLogout}
						className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
					>
						Sair
					</button>
					<SearchBox />
				</div>
				<div className="w-full flex flex-col">
					<StatCard
						amount="10"
						label="Card"
						change="some content"
						changePositive={true}
					/>
					<CategorySpendingCard
						title="Gastos por categoria"
						centerValue="68%"
						centerLabel="do orçamento"
						categories={[
							{
								name: "Moradia",
								value: 27,
								displayValue: "27%",
								color: "#86EFAC",
							},
							{
								name: "Alimentação",
								value: 18,
								displayValue: "18%",
								color: "#FDE68A",
							},
							{
								name: "Transporte",
								value: 12,
								displayValue: "12%",
								color: "#FBCFE8",
							},
							{ name: "Saúde", value: 9, displayValue: "9%", color: "#BAE6FD" },
							{
								name: "Outros",
								value: 14,
								displayValue: "14%",
								color: "#DDD6FE",
							},
						]}
						subtitle="Baseado nos padrões de gastos dos últimos 30 dias"
					/>
					<BalanceCard
						amount="R$ 8.300"
						periodLabel="Fevereiro 2026"
						selectedPeriod={period}
						onPeriodChange={setPeriod}
						periods={[
							{ value: "2026-01", label: "Jan 2026" },
							{ value: "2026-02", label: "Fev 2026" },
							{ value: "2026-03", label: "Mar 2026" },
						]}
						data={[
							{ day: "05", income: 3000, expense: 1200 },
							{ day: "10", income: 5500, expense: 2800 },
							{ day: "15", income: 8000, expense: 4100 },
							{ day: "20", income: 11000, expense: 5500 },
							{ day: "25", income: 13500, expense: 6200 },
							{ day: "28", income: 15000, expense: 6700 },
						]}
						difference="Diferença: +R$ 8.300 este mês"
						differencePositive
					/>
					<div className="flex">
						<IconButton icon={Bell} />
						<IconButton icon={Settings} />
						<UserProfile
							name="Michael Johnson"
							email="m.johnson@rise.com"
							avatarSrc="/avatar.jpg"
						/>

						<div className="flex gap-2">
							<ActionButton icon={TrendingUp} label="Receita" />
							<ActionButton icon={TrendingDown} label="Despesa" />
							<ActionButton icon={Target} label="Orçamento" />
							<ActionButton icon={Flag} label="Metas" />
						</div>
					</div>
					<SpendingLimitCard
						title="Limite de gastos mensais"
						currentAmount="R$ 2.000"
						totalAmount="R$ 5.000"
						value={2000}
						max={5000}
						// onEdit={() => openEditModal()}
					/>
					<SpendingLimitCard
						title="Limite de cartão"
						currentAmount="R$ 4.800"
						totalAmount="R$ 5.000"
						value={4800}
						max={5000}
						fillColor="#EF4444"
						// onEdit={() => openEditModal()}
					/>
					<TransactionHistory
						transactions={[
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
								badge: "EH",
								badgeColor: "#F59E0B",
								name: "Eli Harper",
								date: "21 jan 2025",
								amount: "+R$ 400",
								positive: true,
							},
						]}
					/>
					<MyCardSection
						onAddCard={() => {}}
						cards={[
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
							{
								id: "3",
								type: "Cartão de crédito",
								brand: "ELO",
								lastFourDigits: "1234",
								holderName: "Michael Johnson",
								expiry: "12/27",
								color: "#1F2937",
								chipColor: "#374151",
							},
						]}
					/>
				</div>
			</div>
			<p className="mt-2 text-gray-600">
				{/* Bem-vindo, {user?.name ?? user?.email} */}
			</p>
		</div>
	)
}
