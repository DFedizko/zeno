import { createLink } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavItemBaseProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: LucideIcon;
  label: string;
}

const NavItemBase = forwardRef<HTMLAnchorElement, NavItemBaseProps>(
  ({ icon: Icon, label, className, ...props }, ref) => (
    <a
      ref={ref}
      {...props}
      className={cn(
        "flex items-center gap-3 h-11 px-3 rounded-lg text-body font-medium text-secondary [&>svg]:text-secondary",
        "data-[status=active]:bg-muted data-[status=active]:text-primary data-[status=active]:[&>svg]:text-primary",
        className,
      )}
    >
      <Icon className="size-5" />
      <span>{label}</span>
    </a>
  ),
);

export const NavItem = createLink(NavItemBase);
