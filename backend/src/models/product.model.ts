import mongoose, { Document, Schema } from "mongoose";

interface IProductModel extends Document {
  name: string;
  price: number;
  quantity: number;
  description: string;
  images: string[];
  specifications: {};
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
    images: {
      type: [String],
      required: true,
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
  },
  { timestamps: true }
);

const Product = mongoose.model<IProductModel>("Product", ProductSchema);

export default Product;
