import { Badge } from "../ui/badge";

export default function ProductImages({ product }: { product: any }) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-xl border" />
        <Badge className="absolute top-4 left-4 bg-red-600 text-white">₹6900 Off</Badge>
        <Badge className="absolute top-4 right-4 bg-primary text-white">Free Shipping</Badge>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {product.images.map((img: string, index: number) => (
          <img key={index} src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-20 object-cover rounded-lg border hover:border-primary cursor-pointer" />
        ))}
      </div>
    </div>
  );
}
