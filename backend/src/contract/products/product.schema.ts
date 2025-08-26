import z from "zod";

export const createProductSchema = z.object({
    name: z.string(),
    image: z.string().array(),
    price: z.number(),
    originalPrice: z.number(),
    brand: z.string(),
    details: z.string(),
    badge: z.string(),
    badgeColor: z.string(),
    category: z.string(),
    produtInStock: z.boolean(),
    stockAlert: z.number(),
    specifications: z.object({}).optional(),
});

export const getAllProductSchema = z.object({
    _id: z.string(),
    name: z.string(),
    image: z.string().array(),
    price: z.number(),
    originalPrice: z.number(),
    brand: z.string(),
    details: z.string(),
    badge: z.string(),
    BadgeColor: z.string(),
    category: z.string(),
    produtInStock: z.boolean(),
    stockAlert: z.number(),
    specifications: z.object({}).optional(),
});

export const getProductDetailsByID = z.object({
    _id: z.string(),
    name: z.string(),
    image: z.string().array(),
    price: z.number(),
    originalPrice: z.number(),
    brand: z.string(),
    details: z.string(),
    badge: z.string(),
    BadgeColor: z.string(),
    category: z.string(),
    produtInStock: z.boolean(),
    stockAlert: z.number(),
    specifications: z.object({}).optional(),
});

export const updateProductDetailsSchema = z.object({
    _id: z.string(),
    name: z.string(),
    image: z.string().array(),
    price: z.number(),
    originalPrice: z.number(),
    brand: z.string(),
    details: z.string(),
    badge: z.string(),
    BadgeColor: z.string(),
    category: z.string(),
    produtInStock: z.boolean(),
    stockAlert: z.number(),
    specifications: z.object({}).optional(),
});

export const removeProductSchema = z.object({
    Id: z.string(),
});
