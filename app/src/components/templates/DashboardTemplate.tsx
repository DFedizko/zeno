import { TrendingUp, TrendingDown, Target, Flag } from "lucide-react";
import { BalanceChartPanel } from "@/components/organisms/BalanceChartPanel";
import type {
	HourlyDataPoint,
	DailyDataPoint,
	MonthlyDataPoint,
} from "@/models/ExpenseChart";
import { SpendingLimitCard } from "@/components/organisms/SpendingLimitCard";
import { StatCard } from "@/components/molecules/StatCard";
import { CategorySpendingCard } from "@/components/organisms/CategorySpendingCard";
import { MyCardSection } from "@/components/organisms/MyCardSection";
import { ActionButton } from "@/components/molecules/ActionButton";
import { TransactionHistory } from "@/components/organisms/TransactionHistory";

interface Category {
	name: string;
	value: number;
	displayValue: string;
	color: string;
}

interface Card {
	id: string;
	type: string;
	brand: string;
	lastFourDigits: string;
	holderName: string;
	expiry: string;
	color: string;
	chipColor: string;
}

interface Transaction {
	id: string;
	badge: string;
	badgeColor: string;
	name: string;
	date: string;
	amount: string;
	positive: boolean;
}

interface StatItem {
	label: string;
	amount: string;
	change: string;
	changePositive: boolean;
}

export interface DashboardTemplateProps {
	hourlyDataByDay: Record<string, HourlyDataPoint[]>;
	dailyDataByMonth: Record<string, DailyDataPoint[]>;
	monthlyDataByYear: Record<string, MonthlyDataPoint[]>;
	spendingCurrentAmount: string;
	spendingTotalAmount: string;
	spendingValue: number;
	spendingMax: number;
	stats: StatItem[];
	spendingCategories: Category[];
	costCategories: Category[];
	cards: Card[];
	onAddCard: () => void;
	transactions: Transaction[];
}

export const DashboardTemplate = ({
	hourlyDataByDay,
	dailyDataByMonth,
	monthlyDataByYear,
	spendingCurrentAmount,
	spendingTotalAmount,
	spendingValue,
	spendingMax,
	stats,
	spendingCategories,
	costCategories,
	cards,
	onAddCard,
	transactions,
}: DashboardTemplateProps) => (
	<div className="flex gap-5 flex-1 w-full">
		<div className="flex flex-col gap-5 flex-1">
			<BalanceChartPanel
				hourlyDataByDay={hourlyDataByDay}
				dailyDataByMonth={dailyDataByMonth}
				monthlyDataByYear={monthlyDataByYear}
			/>
			<SpendingLimitCard
				title="Limite de gastos mensais"
				currentAmount={spendingCurrentAmount}
				totalAmount={spendingTotalAmount}
				value={spendingValue}
				max={spendingMax}
			/>
			<div className="flex gap-5 w-full">
				{stats.map((stat) => (
					<StatCard
						key={stat.label}
						label={stat.label}
						amount={stat.amount}
						change={stat.change}
						changePositive={stat.changePositive}
					/>
				))}
			</div>
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
		</div>

		<div className="flex flex-col gap-5 w-85 shrink-0">
			<MyCardSection cards={cards} onAddCard={onAddCard} />
			<div className="flex gap-2 w-full">
				<ActionButton icon={TrendingUp} label="Receita" />
				<ActionButton icon={TrendingDown} label="Despesa" />
				<ActionButton icon={Target} label="Orçamento" />
				<ActionButton icon={Flag} label="Metas" />
			</div>
			<TransactionHistory transactions={transactions} />
		</div>
	</div>
);
