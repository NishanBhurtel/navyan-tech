"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/user-components/ui/card";
import { Button } from "@/components/user-components/ui/button";
import { Input } from "@/components/user-components/ui/input";
import { Label } from "@/components/user-components/ui/label";
import { Textarea } from "@/components/user-components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/user-components/ui/select";
import { Upload, X, Plus } from "lucide-react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { productApi } from "@/lib/api/product.api";
import {
  createProductSchema,
  TCreateProductSchema,
} from "@/lib/form-validation/product-validation";

const categories = {
  Laptops: ["Gaming Laptops", "MacBook", "Ultrabooks", "Business Laptops"],
  Computers: ["Gaming Desktop", "Mini PC", "All-in-One", "Workstations"],
  Components: [
    "Processors",
    "Graphics Cards",
    "Motherboards",
    "RAM",
    "Storage",
  ],
  Accessories: ["Keyboards", "Mice", "Monitors", "Speakers"],
};

export default function AddProductPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TCreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      stock: 0,
      description: "",
      originalPrice: 0,
      discountPrice: 0,
      images: [""],
      specifications: [], // optional
      categoryID: "",
      brand: "",
      technicalSpecification: {
        performance: {
          series: "",
          cpu: "",
          graphics: "",
          display: "",
          operatingSystem: "",
        },
        memoryAndStorage: {
          mainMemory: "",
          storage: "",
          connectivity: "",
          camera: "",
          audio: "",
          battery: "",
          weight: "",
          warrenty: "",
        },
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications",
  });

  const selectedCategory = watch("category");

  // Reset subcategory if category changes
  useEffect(() => {
    setValue("subcategory", "");
  }, [selectedCategory, setValue]);

  const mutation = useMutation({
    mutationFn: (data: TCreateProductSchema) =>
      productApi.createProductApi(data),
    onSuccess: () => {
      showToast("Product added successfully", "bg-green-600");
      router.push("/admin/products");
    },
    onError: (error: any) => {
      showToast(
        "Failed to add product! " + (error?.message || "Unknown error"),
        "bg-red-600"
      );
    },
  });

  const onSubmit = (data: TCreateProductSchema) => mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Product Name *</Label>
                <Input
                  className="my-2"
                  {...register("name")}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  {...register("description")}
                  placeholder="Enter product description"
                  className="my-2"
                  rows={4}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Original Price (Rs)</Label>
                  <Input
                    className="my-2"
                    type="number"
                    {...register("originalPrice", { valueAsNumber: true })}
                    placeholder="0"
                  />
                  {errors.originalPrice && (
                    <p className="text-red-500 text-sm">
                      {errors.originalPrice.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Price After Discount (Rs) *</Label>
                  <Input
                    className="my-2"
                    type="number"
                    {...register("discountPrice", { valueAsNumber: true })}
                    placeholder="0"
                  />
                  {errors.discountPrice && (
                    <p className="text-red-500 text-sm">
                      {errors.discountPrice.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Images</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="addImages">
                <Upload className="h-6 w-6 cursor-pointer mx-auto text-gray-400 mb-2" />
              </Label>
              <Controller
                control={control}
                name="images"
                render={({ field }) => (
                  <input
                  id="addImages"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const urls = files.map((file) =>
                        URL.createObjectURL(file)
                      );
                      field.onChange(urls);
                    }}
                  />
                )}
              />

              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images.message}</p>
              )}
            </CardContent>
          </Card>

          {/* Technical Specification */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Specification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Performance */}
              <div>
                <h4 className="font-semibold mb-2">Performance</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Series *</Label>
                    <Input
                      className="my-2"
                      {...register("technicalSpecification.performance.series")}
                      placeholder="Series"
                    />
                    {errors.technicalSpecification?.performance?.series && (
                      <p className="text-red-500 text-sm">
                        {
                          errors.technicalSpecification.performance.series
                            .message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>CPU *</Label>
                    <Input
                      className="my-2"
                      {...register("technicalSpecification.performance.cpu")}
                      placeholder="CPU"
                    />
                    {errors.technicalSpecification?.performance?.cpu && (
                      <p className="text-red-500 text-sm">
                        {errors.technicalSpecification.performance.cpu.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Graphics *</Label>
                    <Input
                      className="my-2"
                      {...register(
                        "technicalSpecification.performance.graphics"
                      )}
                      placeholder="Graphics"
                    />
                    {errors.technicalSpecification?.performance?.graphics && (
                      <p className="text-red-500 text-sm">
                        {
                          errors.technicalSpecification.performance.graphics
                            .message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Display *</Label>
                    <Input
                      className="my-2"
                      {...register(
                        "technicalSpecification.performance.display"
                      )}
                      placeholder="Display"
                    />
                    {errors.technicalSpecification?.performance?.display && (
                      <p className="text-red-500 text-sm">
                        {
                          errors.technicalSpecification.performance.display
                            .message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Operating System *</Label>
                    <Input
                      className="my-2"
                      {...register(
                        "technicalSpecification.performance.operatingSystem"
                      )}
                      placeholder="Operating System"
                    />
                    {errors.technicalSpecification?.performance
                      ?.operatingSystem && (
                      <p className="text-red-500 text-sm">
                        {
                          errors.technicalSpecification.performance
                            .operatingSystem.message
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Memory & Storage */}
              <div>
                <h4 className="font-semibold mb-2">Memory & Storage</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Main Memory *</Label>
                    <Input
                      className="my-2"
                      {...register(
                        "technicalSpecification.memoryAndStorage.mainMemory"
                      )}
                      placeholder="Main Memory"
                    />
                    {errors.technicalSpecification?.memoryAndStorage
                      ?.mainMemory && (
                      <p className="text-red-500 text-sm">
                        {
                          errors.technicalSpecification.memoryAndStorage
                            .mainMemory.message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Storage *</Label>
                    <Input
                      className="my-2"
                      {...register(
                        "technicalSpecification.memoryAndStorage.storage"
                      )}
                      placeholder="Storage"
                    />
                    {errors.technicalSpecification?.memoryAndStorage
                      ?.storage && (
                      <p className="text-red-500 text-sm">
                        {
                          errors.technicalSpecification.memoryAndStorage.storage
                            .message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Connectivity *</Label>
                    <Input
                      className="my-2"
                      {...register(
                        "technicalSpecification.memoryAndStorage.connectivity"
                      )}
                      placeholder="Connectivity"
                    />
                    {errors.technicalSpecification?.memoryAndStorage
                      ?.connectivity && (
                      <p className="text-red-500 text-sm">
                        {
                          errors.technicalSpecification.memoryAndStorage
                            .connectivity.message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Camera *</Label>
                    <Input
                      className="my-2"
                      {...register(
                        "technicalSpecification.memoryAndStorage.camera"
                      )}
                      placeholder="Camera"
                    />
                    {errors.technicalSpecification?.memoryAndStorage
                      ?.camera && (
                      <p className="text-red-500 text-sm">
                        {
                          errors.technicalSpecification.memoryAndStorage.camera
                            .message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Audio *</Label>
                    <Input
                      className="my-2"
                      {...register(
                        "technicalSpecification.memoryAndStorage.audio"
                      )}
                      placeholder="Audio"
                    />
                    {errors.technicalSpecification?.memoryAndStorage?.audio && (
                      <p className="text-red-500 text-sm">
                        {
                          errors.technicalSpecification.memoryAndStorage.audio
                            .message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Battery *</Label>
                    <Input
                      className="my-2"
                      {...register(
                        "technicalSpecification.memoryAndStorage.battery"
                      )}
                      placeholder="Battery"
                    />
                    {errors.technicalSpecification?.memoryAndStorage
                      ?.battery && (
                      <p className="text-red-500 text-sm">
                        {
                          errors.technicalSpecification.memoryAndStorage.battery
                            .message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Weight *</Label>
                    <Input
                      className="my-2"
                      {...register(
                        "technicalSpecification.memoryAndStorage.weight"
                      )}
                      placeholder="Weight"
                    />
                    {errors.technicalSpecification?.memoryAndStorage
                      ?.weight && (
                      <p className="text-red-500 text-sm">
                        {
                          errors.technicalSpecification.memoryAndStorage.weight
                            .message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Warranty *</Label>
                    <Input
                      className="my-2"
                      {...register(
                        "technicalSpecification.memoryAndStorage.warrenty"
                      )}
                      placeholder="Warranty"
                    />
                    {errors.technicalSpecification?.memoryAndStorage
                      ?.warrenty && (
                      <p className="text-red-500 text-sm">
                        {
                          errors.technicalSpecification.memoryAndStorage
                            .warrenty.message
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Specifications
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ key: "", value: "" })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Spec
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <Input
                      className="my-2"
                      {...register(`specifications.${index}.key` as const)}
                      placeholder="Specification name"
                    />
                    <Input
                      className="my-2"
                      {...register(`specifications.${index}.value` as const)}
                      placeholder="Value"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {errors.specifications && (
                  <p className="text-red-500 text-sm">
                    {errors.specifications.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2">Category *</Label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(categories).map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2">Subcategory *</Label>
                <Controller
                  control={control}
                  name="subcategory"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCategory &&
                          categories[
                            selectedCategory as keyof typeof categories
                          ]?.map((subcat) => (
                            <SelectItem key={subcat} value={subcat}>
                              {subcat}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.subcategory && (
                  <p className="text-red-500 text-sm">
                    {errors.subcategory.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Brand</Label>
                <Input
                  className="my-2"
                  {...register("brand")}
                  placeholder="Enter brand name"
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm">{errors.brand.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Stock Quantity</Label>
              <Input
                className="my-2"
                type="number"
                {...register("stock", { valueAsNumber: true })}
                placeholder="0"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm">{errors.stock.message}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          Create Product
        </Button>
      </div>
    </form>
  );
}
