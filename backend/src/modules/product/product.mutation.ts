import { AppRouteMutationImplementation } from "@ts-rest/express";

import { productContract } from "../../contract/products/product.contract";

import productRepository from "../../repository/mongodb/product/product.repository";

export const createProduct: AppRouteMutationImplementation<
  typeof productContract.createProduct
> = async ({ req, res }) => {
  try {
    const {
      name,
      images,
      discountedPrice,
      originalPrice,
      brand,
      isFeatured,
      isActive,
      categoryID,
      subCategoryID,
      description,
      stock,
      specifications,
      technicalSpecification,
    } = req.body;

    const {
      performance: {
        series = "",
        cpu = "",
        graphics = "",
        display = "",
        operatingSystem = "",
      } = {},
      memoryAndStorage: {
        mainMemory = "",
        storage = "",
        connectivity = "",
        camera = "",
        audio = "",
        battery = "",
        weight = "",
        warranty = "",
      } = {},
    } = technicalSpecification || {};

    const newProduct = await productRepository.save({
      name,
      originalPrice,
      discountedPrice,
      stock,
      description: description,
      categoryID: categoryID,
      subCategoryID: subCategoryID,
      brand: brand,
      isFeatured: !!isFeatured,
      isActive: !!isActive,
      images: images,
      technicalSpecification: {
        performance: {
          series,
          cpu,
          graphics,
          display,
          operatingSystem,
        },
        memoryAndStorage: {
          mainMemory,
          storage,
          connectivity,
          camera,
          audio,
          battery,
          weight,
          warranty,
        },
      },
      specifications:specifications || []
    });

    return {
      status: 201,
      body: {
        success: true,
        message: "Product created successfully",
        data: newProduct,
      },
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      status: 500,
      body: {
        success: false,
        message: "Failed to create product",
        error: (error as Error).message,
      },
    };
  }
};

export const updateProductStatus: AppRouteMutationImplementation<
  typeof productContract.updateProductStatus
> = async ({ req }) => {
  try {
    const { productID } = req.params;
    const { isActive } = req.body;
    const productExist = await productRepository.getByID(productID);
    if (!productExist) {
      return {
        status: 404,
        body: {
          success: false,
          error: "Product not found",
        },
      };
    }
  await productRepository.updateProduct(productID, {isActive});

    return {
      status: 200,
      body: {
        success: true,
        message: "Successfully updated product status",

      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        success: false,
        message: "Failed to update product status",
        error: (error as Error).message,
      },
    };
  }
};

      

export const updateProductDetails: AppRouteMutationImplementation<
  typeof productContract.updateProductDetails
> = async ({ req }) => {
  try {
    const { productID } = req.params;

    const {
      name,
      images,
      discountedPrice,
      originalPrice,
      brand,
      isFeatured,
      isActive,
      stock,
      description,
      categoryID,
      specifications,
      technicalSpecification, // ✅ expect nested object
    } = req.body;

    // ✅ safely destructure nested fields
    const {
      performance: {
        series = "",
        cpu = "",
        graphics = "",
        display = "",
        operatingSystem = "",
      } = {},
      memoryAndStorage: {
        mainMemory = "",
        storage = "",
        connectivity = "",
        camera = "",
        audio = "",
        battery = "",
        weight = "",
        warranty = "",
      } = {},
    } = technicalSpecification || {};

    const updatedProduct = await productRepository.updateProduct(productID, {
      name,
      originalPrice,
      discountedPrice,
      stock,
      description: description,
      brand,
      isFeatured,
      isActive,
      images: images,
      technicalSpecification: {
        performance: {
          series,
          cpu,
          graphics,
          display,
          operatingSystem,
        },
        memoryAndStorage: {
          mainMemory,
          storage,
          connectivity,
          camera,
          audio,
          battery,
          weight,
          warranty,
        },
      },
      specifications: specifications,
      categoryID,
    });

    if (!updatedProduct) {
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
        message: "Successfully updated product details",
        data: updatedProduct,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        success: false,
        message: "Failed to update product details",
        error: (error as Error).message,
      },
    };
  }
};

export const removeProduct: AppRouteMutationImplementation<
  typeof productContract.removeProduct
> = async ({ req }) => {
  try {
    const { productID } = req.params;

    const deletedProduct = await productRepository.delete(productID);

    if (!deletedProduct) {
      return {
        status: 404,
        body: {
          success: false,
          message: "Product not found",
          error: "Product with this ID does not exist",
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        message: "Product deleted successfully",
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        success: false,
        message: "Failed to delete product",
        error: (error as Error).message,
      },
    };
  }
};

export const productMutationHandler = {
  createProduct,
  updateProductDetails,
  removeProduct,
  updateProductStatus,
};
