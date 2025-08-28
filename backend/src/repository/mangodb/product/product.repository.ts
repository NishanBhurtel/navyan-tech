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
      | "price"
      | "quantity"
      | "description"
      | "images"
      | "technicalSpecification"
      | "specifications"
      | "categoryID"
    >
  ) {
    try {
      const product = new this.productModel({
        name: productData.name,
        price: productData.price,
        quantity: productData.quantity,
        description: productData.description,
        images: productData.images,
        technicalSpecification: {
          performance: {
            brand: productData.technicalSpecification.performance.brand,
            series: productData.technicalSpecification.performance.series,
            cpu: productData.technicalSpecification.performance.cpu,
            graphics: productData.technicalSpecification.performance.graphics,
            display: productData.technicalSpecification.performance.display,
            operatingSystem:
              productData.technicalSpecification.performance.operatingSystem,
          },
          memoryAndStorage: {
            audio: productData.technicalSpecification.memoryAndStorage.audio,
            mainMemory:
              productData.technicalSpecification.memoryAndStorage.mainMemory,
            storage:
              productData.technicalSpecification.memoryAndStorage.storage,
            connectivity:
              productData.technicalSpecification.memoryAndStorage.connectivity,
            camera: productData.technicalSpecification.memoryAndStorage.camera,
            battery:
              productData.technicalSpecification.memoryAndStorage.battery,
            weight: productData.technicalSpecification.memoryAndStorage.weight,
            warrenty:
              productData.technicalSpecification.memoryAndStorage.warrenty,
          },
        },
        specifications: productData.specifications,
        categoryID: productData.categoryID,
      });

      return await product.save();
    } catch (error) {
      throw new Error(`Error saving product: ${error}`);
    }
  }

  // ✅ Get products with optional filters
  async get(
    searchQuery?: Partial<
      Pick<IProductModel, "name" | "price" | "categoryID" | "description">
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
      if (searchQuery?.price) {
        query.price = searchQuery.price;
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

  // ✅ Update product
  async update(
    id: string,
    data: Pick<
      IProductModel,
      | "name"
      | "price"
      | "quantity"
      | "description"
      | "images"
      | "technicalSpecification"
      | "specifications"
      | "categoryID"
    >
  ) {
    try {
      return await this.productModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error(`Error updating product: ${error}`);
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
}

export default new ProductRepository();
