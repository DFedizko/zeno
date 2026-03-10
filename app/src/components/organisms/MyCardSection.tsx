import { Plus } from "lucide-react";
import { FinanceCard } from "@/components/molecules/FinanceCard";

interface Card {
  id: string;
  type: string;
  brand: string;
  lastFourDigits: string;
  holderName: string;
  expiry: string;
  color: string;
  chipColor: string;
}

interface MyCardSectionProps {
  cards: Card[];
  onAddCard?: () => void;
}

export const MyCardSection = ({ cards, onAddCard }: MyCardSectionProps) => (
  <div className="flex flex-col gap-3 w-full">
    <div className="flex items-center justify-between">
      <span className="text-title font-semibold text-primary">
        Meus cartões
      </span>
      {onAddCard && (
        <button
          type="button"
          onClick={onAddCard}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-border text-xs font-medium text-secondary hover:bg-muted transition-colors"
        >
          <Plus className="size-3.5" />
          Adicionar cartão
        </button>
      )}
    </div>

    <div className="flex gap-3 overflow-x-auto pb-1">
      {cards.map((card) => (
        <FinanceCard
          key={card.id}
          type={card.type}
          brand={card.brand}
          lastFourDigits={card.lastFourDigits}
          holderName={card.holderName}
          expiry={card.expiry}
          color={card.color}
          chipColor={card.chipColor}
        />
      ))}
    </div>
  </div>
);
