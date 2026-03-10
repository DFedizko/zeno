import { LegendDot } from "@/components/atoms/LegendDot";

interface LegendItemProps {
  color: string;
  label: string;
  value: string;
}

export const LegendItem = ({ color, label, value }: LegendItemProps) => (
  <div className="flex items-center justify-between w-full">
    <div className="flex items-center gap-2">
      <LegendDot color={color} />
      <span className="text-[13px] text-primary">{label}</span>
    </div>
    <span className="text-[13px] font-semibold text-secondary">{value}</span>
  </div>
);
