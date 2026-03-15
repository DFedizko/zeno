import { cn } from "@/lib/utils";

interface AvatarProps {
	src?: string;
	alt?: string;
	fallback?: string;
	className?: string;
}

export const Avatar = ({ src, alt = "", fallback, className }: AvatarProps) => (
	<div
		className={cn(
			"size-8 rounded-full bg-border shrink-0 overflow-hidden flex items-center justify-center",
			className,
		)}
	>
		{src ? (
			<img src={src} alt={alt} className="size-full object-cover" />
		) : (
			<span className="text-[11px] font-semibold text-secondary">
				{fallback}
			</span>
		)}
	</div>
);
