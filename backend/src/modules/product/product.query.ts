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
          subCategoryID: product.subCategoryID ?? "",
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
    console.log("Query received in getALLProduct:", query);

    // Extract pagination params (default page=1, limit=10)
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    // Get products from repo with filters + pagination
    const productResponse = await productRepository.getAllProducts({
      searchQuery: query.search,
      filters: {
        brand: query.filter?.brand,
        categoryID: query.filter?.categoryID,
        maxPrice: query.filter?.maxPrice,
        minPrice: query.filter?.minPrice,
        subCategoryID: query.filter?.subCategoryID,
      },
      skip, // pass to DB query
      limit, // pass to DB query
    });

    // Count total for pagination metadata

    const formattedProducts = productResponse.products.map((product) => ({
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
      body: {
        data: formattedProducts,
        pagination: {
          total: productResponse.total,
          page,
          limit,
          totalPages: Math.ceil(productResponse.total / limit),
        },
      },
    };
  } catch (error) {
    console.error("❌ Error in getALLProduct:", error);
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
