import { AppRouteQueryImplementation } from "@ts-rest/express";
import { productContract } from "../../contract/products/product.contract";
import productRepository from "../../repository/mangodb/product/product.repository";

export const getProductDetailsByID: AppRouteQueryImplementation<
  typeof productContract.getProductDetailsByID
> = async ({ req }) => {
  try {
    const { productID } = req.params;
    if (!productID) {
      return {
        status: 400,
        body: {
          success: false,
          error: "Product ID is required",
        },
      };
    }
    const product = await productRepository.getByID(productID);
    if (!product) {
      return {
        status: 404,
        body: {
          success: false,
          error: "Product not found",
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,

        _id: product._id.toString(),
        name: product.name,
        image: product.images, // or image depending on your model
        price: product.price,
        originalPrice: product.originalPrice,
        brand: product.technicalSpecification.performance.brand,
        details: product.description,
        badge: product.badge,
        badgeColor: product.badgeColor,
        category: product.categoryID.toString(),
        produtInStock: product.quantity > 0,
        stockAlert: product.stockAlert,
        specifications: product.specifications ?? {},
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        success: false,
        error: "failed to get the product details",
      },
    };
  }
};

export const productQueryHandler = {
  getProductDetailsByID,
};
