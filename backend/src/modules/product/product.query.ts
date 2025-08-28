import { AppRouteQueryImplementation } from "@ts-rest/express";
import { productContract } from "../../contract/products/product.contract";
import productRepository from "../../repository/mangodb/product/product.repository";

const getProductDetailsByID: AppRouteQueryImplementation<
  typeof productContract.getProductDetailsByID
> = async ({ req }) => {
  try {
    const { productID } = req.params;

    if (!productID) {
      return {
        status: 400,
        body: {
          success: false,
          error: "product id is required",
        },
      };
    }

    const product = await productRepository.getByID(productID);

    if (!product) {
      return {
        status: 404,
        body: {
          success: false,
          error: "product not found",
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        data: {
          _id: product._id.toString(),
          name: product.name,
          image: product.images ?? [],
          price: product.price,
          originalPrice: product.originalPrice,
          brand: product.technicalSpecification?.performance?.brand ?? "",
          details: product.description ?? "",
          badge: product.badge ?? undefined,
          badgeColor: product.badgeColor ?? undefined,
          categoryID: product.categoryID ?? "",
          productInStock: product.quantity > 0,
          stockAlert: product.stockAlert ?? 0,
          technicalSpecification: product.technicalSpecification ?? undefined,
          specifications: product.specifications ?? undefined,
        },
      },
    };
  } catch (error) {
    console.error("Error in getProductDetailsByID:", error);
    return {
      status: 500,
      body: {
        success: false,
        error: "Failed to get the product details",
      },
    };
  }
};

const getALLProduct: AppRouteQueryImplementation<
  typeof productContract.getAllProduct
> = async ({ req, res }) => {
  try {
    const products = await productRepository.getAllProducts();

    const formattedProducts = products.map((p) => ({
      _id: p._id.toString(),
      name: p.name,
      image: p.images,
      price: p.price,
      originalPrice: p.originalPrice || 0,
      brand: p.technicalSpecification?.performance?.brand || "",
      details: p.description || "",
      badge: p.badge || undefined,
      badgeColor: p.badgeColor || undefined,
      categoryID: p.category || "",
      productInStock: p.quantity > 0,
      stockAlert: p.stockAlert || 0,
      specifications: p.specifications || {},
      technicalSpecification: p.technicalSpecification || undefined,
    }));

    return {
      status: 200,
      body: formattedProducts,
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        success: false,
        error: "Failed to get all products",
      },
    };
  }
};

export const productQueryHandler = {
  getProductDetailsByID,
  getALLProduct,
};
