import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { BarChart3, List, TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LegendDot } from "@/components/atoms/LegendDot";

interface BalanceDataPoint {
  day: string;
  income: number;
  expense: number;
}

interface PeriodOption {
  value: string;
  label: string;
}

interface BalanceCardProps {
  amount: string;
  periodLabel: string;
  selectedPeriod: string;
  periods: PeriodOption[];
  onPeriodChange: (value: string) => void;
  data: BalanceDataPoint[];
  difference: string;
  differencePositive?: boolean;
}

const chartConfig = {
  income: { label: "Receita total", color: "#86EFAC" },
  expense: { label: "Custo total", color: "#3B82F6" },
} satisfies ChartConfig;

export const BalanceCard = ({
  amount,
  periodLabel,
  selectedPeriod,
  periods,
  onPeriodChange,
  data,
  difference,
  differencePositive = true,
}: BalanceCardProps) => (
  <div className="flex flex-col gap-4 p-6 bg-card rounded-xl border border-border w-full h-[320px]">
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-display font-bold text-primary">{amount}</span>
        <span className="text-[13px] text-secondary">{periodLabel}</span>
      </div>
      <div className="flex items-center gap-3">
        <Select value={selectedPeriod} onValueChange={onPeriodChange}>
          <SelectTrigger className="h-auto border-none bg-muted px-3 py-1.5 text-[13px] font-medium text-primary rounded-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {periods.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <BarChart3 className="size-[18px] text-secondary" />
        <List className="size-[18px] text-secondary" />
      </div>
    </div>

    <div className="flex-1 min-h-0">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <LineChart data={data} accessibilityLayer>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => `Dia ${value}`}
              />
            }
          />
          <Line
            dataKey="income"
            type="monotone"
            stroke="#86EFAC"
            strokeWidth={3}
            dot={false}
          />
          <Line
            dataKey="expense"
            type="monotone"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-subtitle font-semibold text-primary">
          {difference}
        </span>
        <TrendingUp
          className={`size-4 ${differencePositive ? "text-success" : "text-danger"}`}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <LegendDot color="#86EFAC" />
          <span className="text-xs text-secondary">Receita total</span>
        </div>
        <div className="flex items-center gap-1.5">
          <LegendDot color="#3B82F6" />
          <span className="text-xs text-secondary">Custo total</span>
        </div>
      </div>
    </div>
  </div>
);
