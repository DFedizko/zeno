import {
	LayoutDashboard,
	ArrowRightLeft,
	ArrowUpDown,
	Wallet,
} from "lucide-react";
import { NavItem } from "@/components/atoms/NavItem";

export const Sidebar = () => (
	<aside className="flex flex-col gap-2 w-60 bg-card py-6 fixed h-screen z-10">
		<div className="px-6 pb-6">
			<span className="text-lg font-bold text-primary">ZENO</span>
		</div>

		<nav className="flex flex-col gap-1 px-3">
			<NavItem to="/dashboard" icon={LayoutDashboard} label="Painel" />
			<NavItem to="/transactions" icon={ArrowRightLeft} label="Transações" />
			<NavItem to="/cash-flow" icon={ArrowUpDown} label="Fluxo de caixa" />
			<NavItem to="/budget" icon={Wallet} label="Orçamento" />
		</nav>

		<div className="flex-1" />
	</aside>
);
