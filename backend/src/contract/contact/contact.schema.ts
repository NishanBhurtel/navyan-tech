import z from "zod";

export const createContactSchema = z.object({
  firstName: z.string().min(1, "First Name is required").max(50),
  lastName: z.string().min(1, "Last Name is required").max(50),
  email: z.string().email("Valid email is required"),
  phoneNumber: z.number(),
  subject: z.enum([
    "Product Inquiry",
    "Technical Support",
    "Order Status",
    "Warranty Claim",
    "Bulk Order",
    "Partnership",
    "Other",
  ]),
  message: z.string(),
  subscribeToNewsLatter: z.boolean().optional().default(false),
});

export const contactSuccessSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  id: z.string(),
});
