import { IProduct } from "@/lib/utils/types/product.type";
import { Badge } from "../ui/badge";

interface ProductImagesProps {
  product: IProduct;
}

export default function ProductImages({ product }: ProductImagesProps) {
  const images = product?.images ?? []; // adjust this if your field is named differently (image vs images)
  const mainImage = images.length > 0 ? images[0] : "/fallback.jpg"; // ✅ fallback image

  return (
    <div className="space-y-4">
      <div className="relative">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-96 object-cover rounded-xl border"
        />
        <Badge className="absolute top-4 left-4 bg-red-600 text-white">
          ₹6900 Off
        </Badge>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.name} view ${index + 1}`}
            className="w-full h-20 object-cover rounded-lg border hover:border-primary cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}
