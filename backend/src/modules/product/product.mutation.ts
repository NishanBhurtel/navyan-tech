import { AppRouteMutationImplementation } from "@ts-rest/express";

import { productContract } from "../../contract/products/product.contract";

import productRepository from "../../repository/mangodb/product/product.repository";

export const createProduct: AppRouteMutationImplementation<
  typeof productContract.createProduct
> = async ({ req, res }) => {
  try {
    const {
      name,
      image,
      price,
      originalPrice,
      brand,
      details,
      badge,
      badgeColor,
      category,
      productInStock,
      stockAlert,
      specifications,
    } = req.body;

    // Map schema fields to repository fields
    const newProduct = await productRepository.save({
      name,
      price,
      quantity: productInStock ? 1 : 0, // mapping productInStock to quantity
      description: details,
      images: image,
      technicalSpecification: {
        performance: {
          brand,
          series: "",
          cpu: "",
          graphics: "",
          display: "",
          operatingSystem: "",
        },
        memoryAndStorage: {
          audio: "",
          mainMemory: "",
          storage: "",
          connectivity: "",
          camera: "",
          battery: "",
          weight: "",
          warrenty: "",
        },
      },
      specifications: specifications ?? {},
      categoryID: category,
    });

    // ✅ Return the correct shape
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

export const updateProductDetails: AppRouteMutationImplementation<
  typeof productContract.updateProductDetails
> = async ({ req, res }) => {
  try {
    const { productID } = req.params;
    const {
      name,
      image,
      price,
      originalPrice,
      brand,
      details,
      badge,
      category,
      produtInStock,
      stockAlert,
      specifications,
    } = req.body;

    const updatedProduct = await productRepository.update(productID, {
      name,
      price,
      quantity: produtInStock ? 1 : 0, // map productInStock to quantity
      description: details,
      images: image,
      technicalSpecification: {
        performance: {
          brand,
          series: "",
          cpu: "",
          graphics: "",
          display: "",
          operatingSystem: "",
        },
        memoryAndStorage: {
          audio: "",
          mainMemory: "",
          storage: "",
          connectivity: "",
          camera: "",
          battery: "",
          weight: "",
          warrenty: "",
        },
      },
      specifications: specifications ?? {},
      categoryID: category,
    });

    return {
      status: 200,
      body: {
        success: true,
        message: "successfully updated product details",
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
};
