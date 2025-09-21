// types/product.ts

export interface IProduct {
  _id: string;
  name: string;
  images: string[];
  discountedPrice: number;
  originalPrice: number;
  brand: string;
  isFeatured: boolean;
  description: string;
  categoryID: {
    _id: string;
    name: string;
  };
  subCategoryID: {
    _id: string;
    name: string;
  };
  stock: number;
  createdAt: Date;

  technicalSpecification?: {
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

  specifications: {
    key: string;
    value: string;
  }[];
};
