"use client";

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
// import useToast from "../../../../lib/Toast";
import { useMutation } from "@tanstack/react-query";
import { productApi } from "@/lib/api/product.api";
import {
  createProductSchema,
  TCreateProductSchema,
} from "@/lib/form-validation/product-validation";
import { useEffect, useState } from "react";
import { categoriesApi } from "@/lib/api/category";
import { useUploadImages } from "@/hooks/images/imageUpload";
import { useAppToast } from "@/lib/tostify";
import { useCategories } from "@/hooks/categories/getCategories";

interface Subcategory {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
  subCategories?: Subcategory[];
}

export default function AddProductPage() {
  const router = useRouter();
  const { uploadImages } = useUploadImages();

  const [categories, setCategories] = useState<Category[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toastSuccess, toastError } = useAppToast();
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.getAll();
        setCategories(data);
      } catch (err: any) {
        toastError(err.message || "Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

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
      technicalSpecification: {
        performance: {},
        memoryAndStorage: {},
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications",
  });

  console.log(errors);

  const selectedCategoryID = watch("categoryID");

  useEffect(() => {
    setValue("subCategoryID", "");
  }, [selectedCategoryID, setValue]);

  const subCategories = selectedCategoryID
    ? categories.find((c) => c._id === selectedCategoryID)?.subCategories
    : [];

  const mutation = useMutation({
    mutationFn: (data: TCreateProductSchema) =>
      productApi.createProductApi(data),
    onSuccess: () => {
      setFiles([]);
      toastSuccess("Product added successfully");
      router.push("/admin/products");
      setIsUploading(false);
    },
    onError: (err: any) => {
      toastError("Product failed to add!");
      setIsUploading(false);
    },
  });

  const onSubmit = async (data: TCreateProductSchema) => {
    if (files.length === 0) {
      toastError("Please upload at least one image");
      return;
    }

    try {
      setIsUploading(true);
      const { isCompleted, progress, urls } = await uploadImages(files);
      setProgress(progress);
      if (isCompleted) {
        mutation.mutate({ ...data, images: urls });
      }
    } catch (err) {
      setIsUploading(false);
      console.error(err);
      toastError("Image upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader className="pt-4">
              <CardTitle className="pt-4">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Product Name *</Label>
                <Input
                  {...register("name")}
                  placeholder="Enter product name"
                  className="my-2"
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
                  rows={4}
                  className="my-2"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Original Price (Rs) *</Label>
                  <Input
                    type="number"
                    {...register("originalPrice", { valueAsNumber: true })}
                    placeholder="0"
                    className="my-2"
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
                    type="number"
                    {...register("discountedPrice", { valueAsNumber: true })}
                    placeholder="0"
                    className="my-2"
                  />
                  {errors.discountedPrice && (
                    <p className="text-red-500 text-sm">
                      {errors.discountedPrice.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader className="pt-4">
              <CardTitle>Upload Images *</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="addImages">
                <Upload className="h-6 w-6 cursor-pointer mx-auto text-gray-400 mb-2" />
              </Label>

              <input
                id="addImages"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files || []);
                  setFiles(selectedFiles);
                }}
              />

              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images.message}</p>
              )}
            </CardContent>
          </Card>

          {/* Technical Specification & Specs (same as your code) */}

          {["Computer", "Computers", "Laptop", "Laptops"].includes(
            categories.find((c) => c._id === selectedCategoryID)?.name || ""
          ) && (
            <Card>
              <CardHeader className="pt-4">
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
                        {...register(
                          "technicalSpecification.performance.series"
                        )}
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
                          {
                            errors.technicalSpecification.performance.cpu
                              .message
                          }
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
                            errors.technicalSpecification.memoryAndStorage
                              .storage.message
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
                            errors.technicalSpecification.memoryAndStorage
                              .camera.message
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
                      {errors.technicalSpecification?.memoryAndStorage
                        ?.audio && (
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
                            errors.technicalSpecification.memoryAndStorage
                              .battery.message
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
                            errors.technicalSpecification.memoryAndStorage
                              .weight.message
                          }
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Warranty *</Label>
                      <Input
                        className="my-2"
                        {...register(
                          "technicalSpecification.memoryAndStorage.warranty"
                        )}
                        placeholder="Warranty"
                      />
                      {errors.technicalSpecification?.memoryAndStorage
                        ?.warranty && (
                        <p className="text-red-500 text-sm">
                          {
                            errors.technicalSpecification.memoryAndStorage
                              .warranty.message
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Specifications */}
          <Card>
            <CardHeader className="pt-4">
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
            <CardHeader className="pt-4">
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="my-2">Category</Label>
                <Select onValueChange={(val) => setValue("categoryID", val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Select a category --" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat._id}
                        value={cat._id}
                        className="font-semibold"
                      >
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="my-2">Sub Category</Label>
                <Select onValueChange={(val) => setValue("subCategoryID", val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Select a subcategory --" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {subCategories?.map((sub) => (
                      <SelectItem
                        key={sub._id}
                        value={sub._id}
                        className="pl-4 text-sm"
                      >
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Brand</Label>
                <Input
                  {...register("brand")}
                  placeholder="Enter brand name"
                  className="my-2"
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm">{errors.brand.message}</p>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <Label>Check this to add in Featured Product</Label>
                <Input
                  type="checkbox"
                  className="w-3"
                  {...register("isFeatured")}
                />
              </div>
              <div className="flex gap-2 items-center">
                <Label>Set product status active</Label>
                <Input
                  type="checkbox"
                  className="w-3"
                  {...register("isActive")}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pt-4">
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                {...register("stock", { valueAsNumber: true })}
                placeholder="0"
                className="my-2"
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
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700"
          disabled={isUploading}
        >
          {isUploading ? `Uploading ${progress}%` : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
