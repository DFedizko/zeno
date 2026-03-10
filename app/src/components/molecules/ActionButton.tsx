import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
}

export const ActionButton = ({
  icon: Icon,
  label,
  className,
  ...props
}: ActionButtonProps) => (
  <button
    type="button"
    className={cn(
      "flex flex-col items-center justify-center gap-1.5 h-[95px] px-2 py-2.5 bg-card rounded-[10px] border border-border w-full hover:bg-muted transition-colors",
      className,
    )}
    {...props}
  >
    <div className="flex items-center justify-center size-12 rounded-lg bg-muted">
      <Icon className="size-6 text-primary" />
    </div>
    <span className="text-xs font-medium text-primary">{label}</span>
  </button>
);
