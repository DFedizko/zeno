import { Checkbox } from "@/components/ui/checkbox";

interface RememberRowProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onForgotPassword?: () => void;
}

export const RememberRow = ({
  checked,
  onCheckedChange,
  onForgotPassword,
}: RememberRowProps) => (
  <div className="flex items-center justify-between w-full">
    <label className="flex items-center gap-2 cursor-pointer">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <span className="text-body text-secondary">Remember me</span>
    </label>
    {onForgotPassword && (
      <button
        type="button"
        onClick={onForgotPassword}
        className="text-body text-secondary hover:text-primary transition-colors"
      >
        Forgot password?
      </button>
    )}
  </div>
);
