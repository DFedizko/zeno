interface FinanceCardProps {
  type: string;
  brand: string;
  lastFourDigits: string;
  holderName: string;
  expiry: string;
  color: string;
  chipColor: string;
}

export const FinanceCard = ({
  type,
  brand,
  lastFourDigits,
  holderName,
  expiry,
  color,
  chipColor,
}: FinanceCardProps) => (
  <div
    className="flex flex-col justify-between w-[300px] h-[180px] shrink-0 rounded-xl p-5"
    style={{ backgroundColor: color }}
  >
    <div className="flex items-center justify-between">
      <span className="text-[13px] font-medium text-white">{type}</span>
      <span className="text-subtitle font-bold text-white">{brand}</span>
    </div>

    <div
      className="w-10 h-8 rounded"
      style={{ backgroundColor: chipColor }}
    />

    <div className="flex flex-col gap-1">
      <span className="text-subtitle font-semibold tracking-widest text-white">
        **** **** **** {lastFourDigits}
      </span>
      <div className="flex items-center justify-between">
        <span className="text-caption font-normal text-white">{holderName}</span>
        <span className="text-caption font-normal text-white">{expiry}</span>
      </div>
    </div>
  </div>
);
