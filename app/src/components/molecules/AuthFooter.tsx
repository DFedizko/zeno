interface AuthFooterProps {
	text: string;
	linkText: string;
	onLinkClick: () => void;
}

export const AuthFooter = ({
	text,
	linkText,
	onLinkClick,
}: AuthFooterProps) => (
	<div className="flex items-center justify-center gap-1 w-full">
		<span className="text-body text-secondary">{text}</span>
		<button
			type="button"
			onClick={onLinkClick}
			className="text-body font-semibold text-primary hover:underline"
		>
			{linkText}
		</button>
	</div>
);
