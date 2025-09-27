"use client";

import { useState } from "react";
import { IProduct } from "@/lib/utils/types/product.type";
import { Badge } from "../ui/badge";

interface ProductImagesProps {
  product: IProduct;
}

export default function ProductImages({ product }: ProductImagesProps) {
  const images = product?.images ?? []; // list of images
  const fallback = "/fallback.jpg";
  const defaultMain = images.length > 0 ? images[0] : fallback;

  const [selected, setSelected] = useState<string | null>(null);

  // Image to display in the big preview
  const displayImage = selected ?? defaultMain;

  const handleThumbClick = (img: string) => {
    setSelected(img);
  };

  const handleMainClick = () => {
    // If user clicks on main image -> reset to default
    setSelected(null);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-100 object-contain rounded-xl border cursor-pointer"
          onClick={handleMainClick}
        />
        <Badge className="absolute top-4 left-4 bg-red-600 text-white">
          Rs.{product.discountedPrice - product.originalPrice} Off
        </Badge>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.name} view ${index + 1}`}
            className={`w-full h-30 object-contain rounded-lg border cursor-pointer transition ${
              selected === img ? "ring-2 ring-primary" : "hover:border-primary"
            }`}
            onClick={() => handleThumbClick(img)}
          />
        ))}
      </div>
    </div>
  );
}
