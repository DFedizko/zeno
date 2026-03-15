import {
	LayoutDashboard,
	ArrowRightLeft,
	ArrowUpDown,
	Wallet,
	Building2,
} from "lucide-react";
import { NavItem } from "@/components/atoms/NavItem";
import { Avatar } from "@/components/atoms/Avatar";
import { useUserStore } from "@/stores/useUserStore";

export const Sidebar = () => {
	const { name, email } = useUserStore();

	const initials = (name || "")
		.split(" ")
		.map((w) => w[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<aside className="flex flex-col gap-2 w-60 bg-card py-6 fixed h-screen px-3 z-10">
			<div className="px-3 pb-6">
				<span className="text-lg font-bold text-primary">ZENO</span>
			</div>

			<nav className="flex flex-col gap-1">
				<NavItem to="/dashboard" icon={LayoutDashboard} label="Painel" />
				<NavItem
					to="/transactions"
					icon={ArrowRightLeft}
					label="Transações"
				/>
				<NavItem to="/connections" icon={Building2} label="Conexões" />
			</nav>

			<div className="flex-1" />

			<div className="flex gap-2 items-center border-t border-border pt-6 px-3">
				<Avatar alt={name} fallback={initials} />
				<div className="flex flex-col">
					<span className="text-sm font-semibold text-primary truncate">
						{name}
					</span>
					<span className="text-secondary text-xs ">
						{email}
					</span>
				</div>
			</div>
		</aside>
	);
};
