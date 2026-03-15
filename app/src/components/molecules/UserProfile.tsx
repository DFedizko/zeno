import { Avatar } from "@/components/atoms/Avatar";

interface UserProfileProps {
	name: string;
	email: string;
	avatarSrc?: string;
}

export const UserProfile = ({ name, email, avatarSrc }: UserProfileProps) => {
	const initials = name
		.split(" ")
		.map((w) => w[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<div className="flex items-center gap-2.5 h-10 px-3 bg-card rounded-lg border border-border">
			<Avatar src={avatarSrc} alt={name} fallback={initials} />
			<div className="flex flex-col gap-0.5">
				<span className="text-[13px] font-semibold text-primary leading-none">
					{name}
				</span>
				<span className="text-caption text-secondary leading-none">
					{email}
				</span>
			</div>
		</div>
	);
};
