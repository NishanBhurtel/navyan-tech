"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/user-components/ui/card";
import { Button } from "@/components/user-components/ui/button";
import { Label } from "@/components/user-components/ui/label";
import { Input } from "@/components/user-components/ui/input";
import { Textarea } from "@/components/user-components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/user-components/ui/select";
import { Upload, X, Plus } from "lucide-react";
import { createProductSchema } from "@/lib/form-validation/product-validation";


// ---------- schema ----------
type ProductFormData = z.infer<typeof createProductSchema>;

type ProductImage = {
  id: number;
  url: string | ArrayBuffer | null;
  file: File;
};

type Specification = {
  key: string;
  value: string;
};

const categories: Record<string, string[]> = {
  Laptops: ["Gaming Laptops", "MacBook", "Ultrabooks", "Business Laptops"],
  Computers: ["Gaming Desktop", "Mini PC", "All-in-One", "Workstations"],
  Components: ["Processors", "Graphics Cards", "Motherboards", "RAM", "Storage"],
  Accessories: ["Keyboards", "Mice", "Monitors", "Speakers"],
};

// ---------- fake api function ----------
async function createProductApi(data: any) {
  // here you’d call your backend, example:
  // return apiClient.post("/products", data);
  return new Promise((resolve) => setTimeout(() => resolve(data), 1500));
}

export default function AddProduct() {
  const router = useRouter();

  const [images, setImages] = useState<ProductImage[]>([]);
  const [specifications, setSpecifications] = useState<Specification[]>([{ key: "", value: "" }]);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      originalPrice: 0,
      category: "",
      subcategory: "",
      brand: "",
      productInStock: 0,
      stockAlert: 0,
      weight: "",
      dimensions: "",
      warranty: "",
    },
  });

  // mutation
  const mutation = useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      router.push("/admin/products");
    },
    onError: (err: any) => {
      console.error("Error creating product:", err);
    },
  });

  // image handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => [
          ...prev,
          { id: Date.now() + Math.random(), url: ev.target?.result ?? null, file },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };
  const removeImage = (id: number) => setImages((prev) => prev.filter((img) => img.id !== id));

  // spec handlers
  const addSpecification = () => setSpecifications((prev) => [...prev, { key: "", value: "" }]);
  const updateSpecification = (i: number, field: "key" | "value", val: string) =>
    setSpecifications((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)));
  const removeSpecification = (i: number) => setSpecifications((prev) => prev.filter((_, idx) => idx !== i));

  // submit
  const onSubmit = (data: ProductFormData) => {
    const payload = { ...data, images, specifications };
    mutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Product Name *</Label>
                <Input {...register("name")} placeholder="Enter product name" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div>
                <Label>Description</Label>
                <Textarea {...register("description")} placeholder="Enter product description" rows={4} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Price *</Label>
                  <Input type="number" {...register("price")} placeholder="0" />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>
                <div>
                  <Label>Compare Price</Label>
                  <Input type="number" {...register("comparePrice")} placeholder="0" />
                </div>
              </div>

              <div>
                <Label>SKU *</Label>
                <Input {...register("sku")} placeholder="Auto-generated or enter manually" />
                {errors.sku && <p className="text-red-500 text-sm">{errors.sku.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img) => (
                  <div key={img.id} className="relative group">
                    <img src={(img.url as string) || "/placeholder.svg"} className="w-full h-24 object-cover" />
                    <button type="button" onClick={() => removeImage(img.id)} className="absolute top-0 right-0 bg-red-500 text-white">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <label className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer">
                  <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Add Image</span>
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                Specifications
                <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                  <Plus className="h-4 w-4 mr-2" /> Add Spec
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {specifications.map((s, i) => (
                <div key={i} className="flex gap-3 mb-2">
                  <Input placeholder="Spec key" value={s.key} onChange={(e) => updateSpecification(i, "key", e.target.value)} />
                  <Input placeholder="Value" value={s.value} onChange={(e) => updateSpecification(i, "value", e.target.value)} />
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeSpecification(i)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Category *</Label>
              <Select onValueChange={(val) => setValue("category", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(categories).map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

              {watch("category") && (
                <>
                  <Label>Subcategory *</Label>
                  <Select onValueChange={(val) => setValue("subcategory", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories[watch("category")]?.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.subcategory && <p className="text-red-500 text-sm">{errors.subcategory.message}</p>}
                </>
              )}

              <Label>Brand</Label>
              <Input {...register("brand")} placeholder="Enter brand name" />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={mutation.status === "pending"} className="bg-green-600 hover:bg-green-700">
          {mutation.status === "pending" ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
