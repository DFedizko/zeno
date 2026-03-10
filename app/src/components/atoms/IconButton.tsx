import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
}

export const IconButton = ({
  icon: Icon,
  className,
  ...props
}: IconButtonProps) => (
  <button
    type="button"
    className={cn(
      "flex items-center justify-center size-10 rounded-lg bg-card border border-border text-secondary hover:bg-muted transition-colors",
      className,
    )}
    {...props}
  >
    <Icon className="size-5" />
  </button>
);
