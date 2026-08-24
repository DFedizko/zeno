import { Circle } from "lucide-react";
import { Divider } from "@/components/atoms/Divider";
import { AuthFooter } from "@/components/molecules/AuthFooter";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

interface FrameProps {
	children: ReactNode;
	className?: string;
}

const Frame = ({ children, className }: FrameProps) => (
	<div
		className={cn(
			"flex w-full max-w-[440px] flex-col gap-8 rounded-2xl border border-border bg-card p-6 sm:p-12",
			className,
		)}
	>
		{children}
	</div>
);

interface HeaderProps {
	logo?: ReactNode;
	title: string;
	subtitle?: string;
}

const Header = ({ logo = "ZENO", title, subtitle }: HeaderProps) => (
	<div className="flex flex-col items-center gap-2">
		<span className="text-[32px] font-bold text-primary">{logo}</span>
		<span className="text-2xl font-semibold text-primary">{title}</span>
		{subtitle && (
			<span className="text-body text-secondary">{subtitle}</span>
		)}
	</div>
);

interface BodyProps extends ComponentProps<"form"> {
	children: ReactNode;
}

const Body = ({ children, className, ...props }: BodyProps) => (
	<form className={`flex flex-col gap-8 ${className ?? ""}`} {...props}>
		{children}
	</form>
);

const Fields = ({ children }: { children: ReactNode }) => (
	<div className="flex flex-col gap-5 w-full">{children}</div>
);

interface SubmitProps {
	children: ReactNode;
	disabled?: boolean;
}

const Submit = ({ children, disabled }: SubmitProps) => (
	<button
		type="submit"
		disabled={disabled}
		className="flex items-center justify-center h-12 w-full rounded-lg bg-primary text-body font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
	>
		{children}
	</button>
);

interface SocialButtonProps {
	icon?: ReactNode;
	children: ReactNode;
	onClick?: () => void;
}

const SocialButton = ({ icon, children, onClick }: SocialButtonProps) => (
	<button
		type="button"
		onClick={onClick}
		className="flex items-center justify-center gap-2 h-12 w-full rounded-lg bg-card border border-border text-body font-medium text-primary hover:bg-muted transition-colors"
	>
		{icon ?? <Circle className="size-[18px] text-secondary" />}
		{children}
	</button>
);

const Actions = ({ children }: { children: ReactNode }) => (
	<div className="flex flex-col gap-4">{children}</div>
);

const FormDivider = ({ label = "OR" }: { label?: string }) => (
	<Divider label={label} />
);

const Footer = (props: ComponentProps<typeof AuthFooter>) => (
	<AuthFooter {...props} />
);

export const Form = Object.assign(Frame, {
	Header,
	Body,
	Fields,
	Submit,
	SocialButton,
	Actions,
	Divider: FormDivider,
	Footer,
});
