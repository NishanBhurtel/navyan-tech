import { FilterQuery } from "mongoose";
import Product, { IProductModel } from "../../../models/product.model";

class ProductRepository {
  private productModel;

  constructor() {
    this.productModel = Product;
  }

  // ✅ Save new product
  async save(
    productData: Pick<
      IProductModel,
      | "name"
      | "originalPrice"
      | "discountedPrice"
      | "stock"
      | "brand"
      | "description"
      | "images"
      | "technicalSpecification"
      | "specifications"
      | "categoryID"
    >
  ) {
    try {
      const product = new this.productModel({
        name: productData.name || "",
        price: productData.discountedPrice || 0,
        originalPrice: productData.originalPrice || 0,
        stock: productData.stock || 0,
        description: productData.description || "",
        brand: productData.brand || "",
        images: productData.images || [],
        technicalSpecification: {
          performance: {
            series:
              productData.technicalSpecification?.performance?.series || "",
            cpu: productData.technicalSpecification?.performance?.cpu || "",
            graphics:
              productData.technicalSpecification?.performance?.graphics || "",
            display:
              productData.technicalSpecification?.performance?.display || "",
            operatingSystem:
              productData.technicalSpecification?.performance
                ?.operatingSystem || "",
          },
          memoryAndStorage: {
            audio:
              productData.technicalSpecification?.memoryAndStorage?.audio || "",
            mainMemory:
              productData.technicalSpecification?.memoryAndStorage
                ?.mainMemory || "",
            storage:
              productData.technicalSpecification?.memoryAndStorage?.storage ||
              "",
            connectivity:
              productData.technicalSpecification?.memoryAndStorage
                ?.connectivity || "",
            camera:
              productData.technicalSpecification?.memoryAndStorage?.camera ||
              "",
            battery:
              productData.technicalSpecification?.memoryAndStorage?.battery ||
              "",
            weight:
              productData.technicalSpecification?.memoryAndStorage?.weight ||
              "",
            warrenty:
              productData.technicalSpecification?.memoryAndStorage?.warranty ||
              "",
          },
        },
        specifications: productData.specifications || {},
        categoryID: productData.categoryID || "",
      });

      const savedProduct = await product.save();
      return {
        success: true,
        productID: savedProduct._id.toString(),
        message: "Product saved successfully",
        data: savedProduct,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Error saving product",
      };
    }
  }

  // ✅ Get products with optional filters
  async get(
    searchQuery?: Partial<
      Pick<
        IProductModel,
        "name" | "discountedPrice" | "categoryID" | "description"
      >
    >,
    filterQuery?: {
      brand?: string;
      minPrice?: number;
      maxPrice?: number;
      categoryID?: string;
    }
  ) {
    try {
      const query: any = {};

      // 🔎 search by basic fields
      if (searchQuery?.name) {
        query.name = { $regex: searchQuery.name, $options: "i" };
      }
      if (searchQuery?.description) {
        query.description = { $regex: searchQuery.description, $options: "i" };
      }
      if (searchQuery?.discountedPrice) {
        query.price = searchQuery.discountedPrice;
      }
      if (searchQuery?.categoryID) {
        query.categoryID = searchQuery.categoryID;
      }

      // 🎯 apply advanced filters
      if (filterQuery?.brand) {
        query["technicalSpecification.performance.brand"] = {
          $regex: filterQuery.brand,
          $options: "i",
        };
      }
      if (filterQuery?.minPrice || filterQuery?.maxPrice) {
        query.price = {};
        if (filterQuery.minPrice !== undefined) {
          query.price.$gte = filterQuery.minPrice;
        }
        if (filterQuery.maxPrice !== undefined) {
          query.price.$lte = filterQuery.maxPrice;
        }
      }
      if (filterQuery?.categoryID) {
        query.categoryID = filterQuery.categoryID;
      }

      return await this.productModel.find(query).populate("categoryID");
    } catch (error) {
      throw new Error(`Error fetching products: ${error}`);
    }
  }

  // ✅ Get by ID
  async getByID(id: string) {
    try {
      return await this.productModel.findById(id).populate("categoryID");
    } catch (error) {
      throw new Error(`Error fetching product by ID: ${error}`);
    }
  }

  updateProduct = async (
    productId: string,
    productData: Partial<IProductModel>
  ) => {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId,
        { $set: productData },
        { new: true, runValidators: true }
      );
      return updatedProduct;
    } catch (error) {
      throw new Error("Error updating product: " + (error as Error).message);
    }
  };

  async getAllProducts(): Promise<any[]> {
    try {
      const products = await Product.find().populate("categoryID").exec();

      return products.map((product) => ({
        _id: product._id.toString(),
        name: product.name,
        image: product.images ?? [],
        price: product.discountedPrice,
        originalPrice: product.originalPrice,
        brand: product.brand ?? "",
        details: product.description ?? "",
        categoryID: product.categoryID?.toString() ?? "",
        stock: product.stock ?? 0,
        technicalSpecification: product.technicalSpecification ?? undefined,
        specifications: product.specifications ?? undefined,
      }));
    } catch (error) {
      console.error("Failed to get products:", error);
      throw new Error("Failed to get products");
    }
  }

  // ✅ Delete product
  async delete(id: string) {
    try {
      return await this.productModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting product: ${error}`);
    }
  }
  async getAll(): Promise<IProductModel[]> {
    return this.productModel.find().populate("categoryID");
  }
}

export default new ProductRepository();
