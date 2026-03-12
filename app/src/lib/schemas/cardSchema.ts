import { z } from "zod";

export const addCardSchema = z.object({
  holderName: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Número do cartão deve ter 16 dígitos")
    .transform((val) => val.replace(/\s/g, "")),
  expiryMonth: z
    .string()
    .regex(/^(0[1-9]|1[0-2])$/, "Mês inválido (01-12)"),
  expiryYear: z
    .string()
    .regex(/^\d{2}$/, "Ano deve ser 2 dígitos")
    .refine((val) => {
      const year = parseInt(val, 10);
      const currentYear = new Date().getFullYear() % 100;
      return year >= currentYear;
    }, "Cartão expirado"),
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, "CVV deve ter 3 ou 4 dígitos"),
  cardholderType: z
    .enum(["debit", "credit"])
    .default("credit"),
});

export type AddCardFormData = z.infer<typeof addCardSchema>;
