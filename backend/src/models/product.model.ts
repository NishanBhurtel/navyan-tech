import mongoose, { Document, Schema } from "mongoose";
import { boolean } from "zod";

export interface IProductModel extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  productId: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  description: string;
  brand: string;
  isFeatured: boolean;
  isActive: boolean;
  stock: number;
  images: string[];
  specifications: {
    key: string;
    value: string;
  }[];
  categoryID: string;
  subCategoryID: string;
  technicalSpecification: {
    performance: {
      series: string;
      cpu: string;
      graphics: string;
      display: string;
      operatingSystem: string;
    };
    memoryAndStorage: {
      mainMemory: string;
      storage: string;
      connectivity: string;
      camera: string;
      audio: string;
      battery: string;
      weight: string;
      warranty: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
    },

    images: {
      type: [String],
      required: true,
    },
    brand: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    technicalSpecification: {
      performance: {
        series: {
          type: String,
        },
        cpu: {
          type: String,
        },
        graphics: {
          type: String,
        },
        display: {
          type: String,
        },
        operatingSystem: {
          type: String,
        },
      },
      memoryAndStorage: {
        mainMemory: {
          type: String,
        },
        storage: {
          type: String,
        },
        connectivity: {
          type: String,
        },
        camera: {
          type: String,
        },
        audio: {
          type: String,
        },
        battery: {
          type: String,
        },
        weight: {
          type: String,
        },
        warranty: {
          type: String,
        },
      },
    },
    specifications: {
      type: [
        {
          key: String,
          value: String,
        },
      ],
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProductModel>("Product", ProductSchema);

export default Product;
