import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  fillColor?: string;
  className?: string;
}

export const ProgressBar = ({
  value,
  max,
  fillColor = "#86d66e",
  className,
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("h-8 w-full rounded bg-muted", className)}>
      <div
        className="h-full rounded"
        style={{ width: `${percentage}%`, backgroundColor: fillColor }}
      />
    </div>
  );
};
