// import { AppRouteQueryImplementation } from "@ts-rest/express";
// import { productContract } from "../../contract/products/product.contract";
// import productRepository from "../../repository/mangodb/product/product.repository";

// export const getProductDetailsByID: AppRouteQueryImplementation<
//   typeof productContract.getProductDetailsByID
// > = async ({ req }) => {
//   try {
//     const { productID } = req.params;
//     if (!productID) {
//       return {
//         status: 400,
//         body: {
//           success: false,
//           error: "Product ID is required",
//         },
//       };
//     }
//     const product = await productRepository.getByID(productID);
//     if (!product) {
//       return {
//         status: 404,
//         body: {
//           success: false,
//           error: "Product not found",
//         },
//       };
//     }

//     return {
//       status: 200,
//       body: {
//         success: true,

//         _id: product._id.toString(),
//         name: product.name,
//         image: product.images, // or image depending on your model
//         price: product.price,
//         originalPrice: product.originalPrice,
//         brand: product.technicalSpecification.performance.brand,
//         details: product.description,
//         badge: product.badge,
//         badgeColor: product.badgeColor,
//         category: product.categoryID.toString(),
//         produtInStock: product.quantity > 0,
//         stockAlert: product.stockAlert,
//         specifications: product.specifications ?? {},
//       },
//     };
//   } catch (error) {
//     return {
//       status: 500,
//       body: {
//         success: false,
//         error: "failed to get the product details",
//       },
//     };
//   }
// };

// export const productQueryHandler = {
//   getProductDetailsByID,
// };

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
        image: product.images ?? [],
        price: product.price,
        originalPrice: product.originalPrice,
        brand: product.technicalSpecification?.performance?.brand ?? "",
        details: product.description ?? "",
        badge: product.badge ?? "",
        badgeColor: product.badgeColor ?? "",
        // category: product.categoryID?._id.toString() ?? "",
        category: product.categoryID ?? "",
        produtInStock: product.quantity > 0,
        stockAlert: product.stockAlert ?? 0,
        specifications: product.specifications ?? {},
      },
    };
  } catch (error) {
    console.error("Error in getProductDetailsByID:", error);
    return {
      status: 500,
      body: {
        success: false,
        error: "failed to get the product details",
      },
    };
  }
};

// const getALLProduct: AppRouteQueryImplementation<
//   typeof productContract.getAllProduct
// > = async ({ req, res }) => {

// };
// const getALLProduct: AppRouteQueryImplementation<
//   typeof productContract.getAllProduct
// > = async ({ req, res }) => {
//   try {
//     const products = await productRepository.getAllProducts();

//     // Map products to match your schema
//     const formattedProducts = products.map((p) => ({
//       success: true,
//       message: "Products fetched successfully",
//       _id: p._id.toString(),
//       name: p.name,
//       image: p.images,
//       price: p.price,
//       originalPrice: p.originalPrice || 0,
//       brand: p.technicalSpecification?.performance?.brand || "",
//       details: p.description,
//       badge: p.badge || "",
//       BadgeColor: p.badgeColor || "",
//       category: p.category || "",
//       produtInStock: p.quantity > 0,
//       stockAlert: p.stockAlert || 0,
//       specifications: p.specifications || {},
//     }));

//     return {
//       status: 200,
//       body: {
//         success: true,
//         formattedProducts,
//       },
//     };
//   } catch (error) {
//     return {
//       status: 500,
//       body: {
//         success: false,
//         error: "Failed to get all products",
//       },
//     };
//   }
// };

const getALLProduct: AppRouteQueryImplementation<
  typeof productContract.getAllProduct
> = async ({ req, res }) => {
  try {
    const products = await productRepository.getAllProducts();

    // Map products to match your schema directly
    const formattedProducts = products.map((p) => ({
      success: true,
      message: "Product fetched successfully",
      _id: p._id.toString(),
      name: p.name,
      image: p.images,
      price: p.price,
      originalPrice: p.originalPrice || 0,
      brand: p.technicalSpecification?.performance?.brand || "",
      details: p.description,
      badge: p.badge || "",
      BadgeColor: p.badgeColor || "",
      category: p.category || "",
      produtInStock: p.quantity > 0,
      stockAlert: p.stockAlert || 0,
      specifications: p.specifications || {},
    }));

    return {
      status: 200,
      body: formattedProducts, // <-- return the array directly
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
