import mongoose, { Document, Schema } from "mongoose";

export interface IProductModel extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  originalPrice: number;
  badge: string;
  badgeColor: string;
  stockAlert: number;
  images: string[];
  specifications: {};
  categoryID: string;
  technicalSpecification: {
    performance: {
      brand: string;
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
      warrenty: string;
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
        warrenty: {
          type: String,
        },
      },
    },
    specifications: {
      type: Object,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProductModel>("Product", ProductSchema);

export default Product;
