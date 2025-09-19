import { AppRouteQueryImplementation } from "@ts-rest/express";
import { productContract } from "../../contract/products/product.contract";
import productRepository from "../../repository/mongodb/product/product.repository";

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
          images: product.images ?? [],
          price: product.discountedPrice,
          originalPrice: product.originalPrice,
          discountedPrice: product.discountedPrice,
          brand: product.brand ?? "",
          isFeatured: product.isFeatured,
          description: product.description ?? "",
          categoryID: product.categoryID ?? "",
          subCategoryID: product.subCategoryID?? "",
          stock: product.stock ?? 0,
          technicalSpecification: product.technicalSpecification ?? undefined,
          specifications: product.specifications ?? undefined,
          createdAt: product.createdAt,

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
> = async ({ query }) => {
  try {
    const products = await productRepository.getAllProducts({
      searchQuery:query.search,
      filters:{
        brand:query.filter?.brand,
        categoryID:query.filter?.categoryID,
        maxPrice:query.filter?.maxPrice,
        minPrice:query.filter?.minPrice,
        subCategoryID:query.filter?.subCategoryID
      } 
    });
    const formattedProducts = products.map((product) => ({
      _id: product._id.toString(),
      name: product.name,
      images: product.images ?? [],
      discountedPrice: product.discountedPrice,
      originalPrice: product.originalPrice,
      brand: product.brand ?? "",
      isFeatured: product.isFeatured,
      description: product.description ?? "",
      categoryID: product.categoryID,
      subCategoryID: product.subCategoryID,
      stock: product.stock ?? 0,
      specifications: product.specifications ?? [],
      technicalSpecification: product.technicalSpecification ?? undefined,
      createdAt: product.createdAt,
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
