import { createFileRoute } from "@tanstack/react-router";
import { StatCard } from "@/components/molecules/StatCard";
import { CategorySpendingCard } from "@/components/organisms/CategorySpendingCard";
import { BalanceChartPanel } from "@/components/organisms/BalanceChartPanel";
import { SearchBox } from "@/components/molecules/SearchBox";
import { IconButton } from "@/components/atoms/IconButton";
import {
	Bell,
	Download,
	Flag,
	Lock,
	Mail,
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
import { FormSection } from "@/components/organisms/FormSection";
import { useForm } from "react-hook-form";
import { Form } from "@/components/organisms/Form";
import { InputGroup } from "@/components/molecules/InputGroup";
import { RememberRow } from "@/components/molecules/RememberRow";
import { PageTitle } from "@/components/atoms/PageTitle";
import { Button } from "@/components/ui/button";
import { HistoryTable } from "@/components/organisms/HistoryTable";

export const Route = createFileRoute("/_authenticated/design-system")({
	component: DashboardPage,
});

function DashboardPage() {
	const { register, handleSubmit } = useForm<{
		email: string;
		password: string;
	}>();
	const [rememberMe, setRememberMe] = useState(false);

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
							{
								name: "Saúde",
								value: 9,
								displayValue: "9%",
								color: "#BAE6FD",
							},
							{
								name: "Outros",
								value: 14,
								displayValue: "14%",
								color: "#DDD6FE",
							},
						]}
						subtitle="Baseado nos padrões de gastos dos últimos 30 dias"
					/>
					<BalanceChartPanel
						amount="R$ 8.300"
						dailyDataByMonth={{
							"2026-02": [
								{ day: "05", expense: 900 },
								{ day: "10", expense: 2300 },
								{ day: "28", expense: 8100 },
							],
							"2026-03": [
								{ day: "05", expense: 1200 },
								{ day: "10", expense: 2800 },
								{ day: "28", expense: 6700 },
							],
						}}
						monthlyDataByYear={{
							"2026": [
								{ month: "Jan", income: 8000, expense: 5000 },
								{ month: "Fev", income: 8000, expense: 8100 },
								{ month: "Mar", income: 15000, expense: 6700 },
							],
						}}
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
			<FormSection
				register={register}
				rememberMe={rememberMe}
				onRememberChange={setRememberMe}
				onForgotPassword={() => {}}
			/>
			<div className="flex">
				<Form>
					<Form.Header
						title="Welcome back"
						subtitle="Enter your credentials to access your account"
					/>
					<Form.Body onSubmit={() => {}}>
						<Form.Fields>
							<InputGroup
								label="Email"
								placeholder="you@example.com"
								icon={Mail}
								{...register("email")}
							/>
							<InputGroup
								label="Password"
								icon={Lock}
								placeholder="••••••••"
								{...register("password")}
							/>
							<RememberRow
								checked={rememberMe}
								onCheckedChange={setRememberMe}
								onForgotPassword={() => {}}
							/>
						</Form.Fields>
						<Form.Actions>
							<Form.Submit disabled={false}>Sign in</Form.Submit>
							<Form.Divider />
							<Form.SocialButton>
								Continue with Google
							</Form.SocialButton>
						</Form.Actions>
					</Form.Body>
					<Form.Footer
						text="Don't have an account?"
						linkText="Sign up"
						onLinkClick={() => {}}
					/>
				</Form>
			</div>
			<PageTitle title="Histórico de Transações">
				<Button variant="filterActive" size="filter">
					Todos
				</Button>
				<Button variant="filter" size="filter">
					Receitas
				</Button>
				<Button variant="filter" size="filter">
					Despesas
				</Button>
				<Button variant="outline" size="filter">
					<Download className="size-4" />
					Exportar
				</Button>
			</PageTitle>
			<HistoryTable
				transactions={[
					{
						id: "1",
						date: "14 fev, 2026",
						description: "Salário",
						card: "Mercado Pago",
						category: "Receita",
						categoryColor: "#10B981",
						amount: "+R$ 5.200",
						positive: true,
					},
					{
						id: "2",
						date: "13 fev, 2026",
						description: "Compras Online",
						card: "Itaú",
						category: "Compras",
						categoryColor: "#3B82F6",
						amount: "-R$ 324",
						positive: false,
					},
					{
						id: "3",
						date: "12 fev, 2026",
						description: "Restaurante e Gastronomia",
						card: "Nubank",
						category: "Alimentação",
						categoryColor: "#F59E0B",
						amount: "-R$ 87",
						positive: false,
					},
					{
						id: "4",
						date: "11 fev, 2026",
						description: "Conta de Luz",
						card: "Mercado Pago",
						category: "Utilidades",
						categoryColor: "#8B5CF6",
						amount: "-R$ 142",
						positive: false,
					},
					{
						id: "5",
						date: "10 fev, 2026",
						description: "Projeto Freelance",
						card: "Bradesco",
						category: "Receita",
						categoryColor: "#10B981",
						amount: "+R$ 1.500",
						positive: true,
					},
				]}
			/>
		</div>
	);
}
