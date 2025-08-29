import mongoose, { Document, Schema } from "mongoose";

export interface IProductModel extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  productId: string;
  name: string;
  discountedPrice: number;
  description: string;
  originalPrice: number;
  brand: string;
  stock: number;
  images: string[];
  specifications: {};
  category: string;
  categoryID: string;
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
    price: {
      type: Number,
      required: true,
    },
    quantity: {
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
    stockAlert: {
      type: Number,
    },
    originalPrice: {
      type: Number,
    },
    images: {
      type: [String],
      required: true,
    },
    badge: {
      type: String,
    },
    technicalSpecification: {
      performance: {
        brand: {
          type: String,
        },
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
      type: Object,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProductModel>("Product", ProductSchema);

export default Product;
