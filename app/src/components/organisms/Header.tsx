import { Bell, Settings } from "lucide-react";
import { SearchBox } from "@/components/molecules/SearchBox";
import { IconButton } from "@/components/atoms/IconButton";
import { UserProfile } from "@/components/molecules/UserProfile";

interface HeaderProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  onNotifications?: () => void;
  onSettings?: () => void;
  onSearch?: (value: string) => void;
}

export const Header = ({
  userName,
  userEmail,
  userAvatar,
  onNotifications,
  onSettings,
  onSearch,
}: HeaderProps) => (
  <header className="flex items-center justify-between h-14 w-full">
    <SearchBox
      onChange={(e) => onSearch?.(e.target.value)}
    />
    <div className="flex items-center gap-4">
      <IconButton icon={Bell} onClick={onNotifications} />
      <IconButton icon={Settings} onClick={onSettings} />
      <UserProfile
        name={userName}
        email={userEmail}
        avatarSrc={userAvatar}
      />
    </div>
  </header>
);
