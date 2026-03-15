import { Bell, Settings, LogOut } from "lucide-react";
import { SearchBox } from "@/components/molecules/SearchBox";
import { IconButton } from "@/components/atoms/IconButton";

interface HeaderProps {
	onNotifications?: () => void;
	onSettings?: () => void;
	onLogout?: () => void;
	onSearch?: (value: string) => void;
}

export const Header = ({
	onNotifications,
	onSettings,
	onLogout,
	onSearch,
}: HeaderProps) => (
	<header className="flex items-center justify-between h-14 w-full">
		<SearchBox onChange={(e) => onSearch?.(e.target.value)} />
		<div className="flex items-center gap-4">
			<IconButton icon={Bell} onClick={onNotifications} />
			<IconButton icon={Settings} onClick={onSettings} />
			<IconButton icon={LogOut} onClick={onLogout} />
		</div>
	</header>
);
