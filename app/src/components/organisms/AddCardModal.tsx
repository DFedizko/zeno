import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/organisms/Form";
import { InputGroup } from "@/components/molecules/InputGroup";
import { CreditCard, LockKeyhole, UserRound } from "lucide-react";
import { addCardSchema, type AddCardFormData } from "@/lib/schemas/cardSchema";

interface AddCardModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onAddCard?: (data: AddCardFormData) => void;
}

export const AddCardModal = ({
	isOpen,
	onOpenChange,
	onAddCard,
}: AddCardModalProps) => {
	const [cardType, setCardType] = useState<"debit" | "credit">("credit");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AddCardFormData>({
		resolver: zodResolver(addCardSchema),
		defaultValues: {
			cardholderType: cardType,
		},
	});

	const onSubmit = handleSubmit(async (data) => {
		onAddCard?.({ ...data, cardholderType: cardType });
		reset();
		onOpenChange(false);
	});

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			reset();
		}
		onOpenChange(open);
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent className="max-w-md p-0">
				<DialogHeader className="sr-only">
					<DialogTitle>Adicionar Cartão</DialogTitle>
				</DialogHeader>
				<Form className="w-[440px]">
					<Form.Header
						title="Adicionar Cartão"
						logo={<CreditCard className="size-6" />}
					/>

					<Form.Body onSubmit={onSubmit}>
						<Form.Fields>
							<div className="flex gap-3">
								<label className="flex items-center gap-2 flex-1 cursor-pointer">
									<input
										type="radio"
										value="debit"
										checked={cardType === "debit"}
										onChange={() => setCardType("debit")}
										className="w-4 h-4"
									/>
									<span className="text-sm text-secondary">
										Débito
									</span>
								</label>
								<label className="flex items-center gap-2 flex-1 cursor-pointer">
									<input
										type="radio"
										value="credit"
										checked={cardType === "credit"}
										onChange={() => setCardType("credit")}
										className="w-4 h-4"
									/>
									<span className="text-sm text-secondary">
										Crédito
									</span>
								</label>
							</div>

							<InputGroup
								icon={UserRound}
								label="Nome do Titular"
								placeholder="Seu nome completo"
								{...register("holderName")}
							/>
							{errors.holderName && (
								<p className="text-xs text-destructive -mt-3">
									{errors.holderName.message}
								</p>
							)}

							<InputGroup
								icon={CreditCard}
								label="Número do Cartão"
								placeholder="0000 0000 0000 0000"
								{...register("cardNumber")}
							/>
							{errors.cardNumber && (
								<p className="text-xs text-destructive -mt-3">
									{errors.cardNumber.message}
								</p>
							)}

							<div className="flex gap-3">
								<div className="flex-1">
									<label className="block text-xs font-medium text-secondary mb-1.5">
										Validade
									</label>
									<div className="flex gap-1">
										<input
											type="text"
											placeholder="MM"
											maxLength={2}
											{...register("expiryMonth")}
											className="flex-1 h-10 px-3 rounded-lg bg-muted border border-border text-sm placeholder-muted-foreground"
										/>
										<span className="flex items-center text-secondary">
											/
										</span>
										<input
											type="text"
											placeholder="AA"
											maxLength={2}
											{...register("expiryYear")}
											className="flex-1 h-10 px-3 rounded-lg bg-muted border border-border text-sm placeholder-muted-foreground"
										/>
									</div>
									{(errors.expiryMonth ||
										errors.expiryYear) && (
										<p className="text-xs text-destructive mt-1">
											{errors.expiryMonth?.message ||
												errors.expiryYear?.message}
										</p>
									)}
								</div>

								<div className="flex-1">
									<InputGroup
										icon={LockKeyhole}
										label="CVV"
										placeholder="000"
										maxLength={4}
										{...register("cvv")}
									/>
									{errors.cvv && (
										<p className="text-xs text-destructive -mt-3">
											{errors.cvv.message}
										</p>
									)}
								</div>
							</div>
						</Form.Fields>

						<Form.Actions>
							<Form.Submit>Adicionar Cartão</Form.Submit>
						</Form.Actions>
					</Form.Body>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
