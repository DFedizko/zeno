import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { TransactionTemplate } from "@/components/templates/TransactionTemplate";
import { PageTitle } from "@/components/atoms/PageTitle";
import { Button } from "@/components/ui/button";
import { HistoryTable } from "@/components/organisms/HistoryTable";

export const Route = createFileRoute("/_authenticated/transactions")({
	component: TransactionsPage,
});

const transactions = [
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
	{
		id: "6",
		date: "9 fev, 2026",
		description: "Posto de Gasolina",
		card: "Itaú",
		category: "Transporte",
		categoryColor: "#EF4444",
		amount: "-R$ 65",
		positive: false,
	},
	{
		id: "7",
		date: "8 fev, 2026",
		description: "Assinatura de Internet",
		card: "Nubank",
		category: "Assinaturas",
		categoryColor: "#6366F1",
		amount: "-R$ 89",
		positive: false,
	},
	{
		id: "8",
		date: "7 fev, 2026",
		description: "Taxa de Consultoria",
		card: "Mercado Pago",
		category: "Receita",
		categoryColor: "#10B981",
		amount: "+R$ 2.800",
		positive: true,
	},
	{
		id: "9",
		date: "6 fev, 2026",
		description: "Assistência Médica",
		card: "Santander",
		category: "Saúde",
		categoryColor: "#EC4899",
		amount: "-R$ 250",
		positive: false,
	},
	{
		id: "10",
		date: "5 fev, 2026",
		description: "Pagamento de Aluguel",
		card: "Itaú",
		category: "Moradia",
		categoryColor: "#F97316",
		amount: "-R$ 1.200",
		positive: false,
	},
];

function TransactionsPage() {
	return (
		<TransactionTemplate
			pageTitle={
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
					<Button variant="secondary" size="filter">
						<Download className="size-4" />
						Exportar
					</Button>
				</PageTitle>
			}
			table={<HistoryTable transactions={transactions} />}
		/>
	);
}
