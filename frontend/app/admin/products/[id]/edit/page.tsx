"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, X, Upload, Trash2 } from "lucide-react";
import { useProductByID } from "@/hooks/product/getProductByID";
import { Button } from "@/components/user-components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/user-components/ui/card";
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
import { useCategories } from "@/hooks/categories/getCategories";
import { TUpdateProductSchema } from "@/lib/form-validation/product-validation";
import { productApi } from "@/lib/api/product.api";

export default function ProductEditPage() {
  const params = useParams();
  const router = useRouter();
  const { data: categories, isLoading } = useCategories();
  const productResponse = useProductByID(params.id as string);
  const productData = productResponse.data?.data;

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    categoryID: "",
    subCategoryID: "",
    discountedPrice: 0,
    originalPrice: 0,
    brand: "",
    stock: 0,
    description: "",
    specifications: [{
      key: "",
      value: "",
    }],
    images: [""],
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
        warranty: "",
      },
    },
  });

  const [selectedCategory, setSelectedCategory] = useState<any>(null);


  // Populate form when productData and categories load
  useEffect(() => {
    if (productData && categories) {
      const categoryObj = categories.find(
        (c: any) => c._id === productData.categoryID?._id
      );
      console.log(productData?.categoryID);
      console.log(productData?.subCategoryID);

      setSelectedCategory(categoryObj || null);

      setFormData({
        _id: productData._id,
        name: productData.name || "",
        categoryID: productData.categoryID?._id?.toString() ?? "",
        subCategoryID: productData.subCategoryID?._id?.toString() ?? "",
        discountedPrice: productData.discountedPrice || 0,
        originalPrice: productData.originalPrice || 0,
        brand: productData.brand || "",
        stock: productData.stock || 0,
        description: productData.description || "",
        specifications: productData.specifications || [],
        images: productData.images?.length ? productData.images : [""],
        technicalSpecification: productData.technicalSpecification || {
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
            warranty: "",
          },
        },
      });
    }
  }, [productData, categories]);


  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // For technicalSpecification fields
  const handleTechnicalSpecChange = (
    section: "performance" | "memoryAndStorage",
    key: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      technicalSpecification: {
        ...prev.technicalSpecification,
        [section]: {
          ...prev.technicalSpecification[section],
          [key]: value,
        },
      },
    }));
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [key]: value },
    }));
  };

  const handleCategoryChange = (categoryID: string) => {
    const categoryObj = categories?.find((c: any) => c._id === categoryID);
    setSelectedCategory(categoryObj || null);
    setFormData((prev) => ({
      ...prev,
      categoryID,
      // select first subcategory of new category by default
      subCategoryID: categoryObj?.subCategories?.[0]?._id || "",
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images.filter(Boolean), ...urls],
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload: TUpdateProductSchema = {
        _id: formData._id,
        name: formData.name,
        categoryID: formData.categoryID,
        subCategoryID: formData.subCategoryID,
        discountedPrice: Number(formData.discountedPrice),
        originalPrice: Number(formData.originalPrice),
        brand: formData.brand,
        stock: Number(formData.stock),
        description: formData.description || undefined,
        specifications: formData.specifications,
        images:
          formData.images.filter(Boolean).length > 0
            ? (formData.images.filter(Boolean) as [string, ...string[]])
            : ["/placeholder.svg"],
        technicalSpecification: formData.technicalSpecification,
      };

      const updatedProduct = await productApi.updateProductApi(
        params.id as string,
        payload
      );

      console.log("Product updated successfully:", updatedProduct);
      alert("Product updated successfully!");
      // router.push(`/products/${params.id}`);
    } catch (error: any) {
      console.error("Error updating product:", error);
      alert(
        error?.response?.data?.message ||
        "Something went wrong while updating the product."
      );
    }
  };

  if (!productData || isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/products/${params.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Product
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Edit Product
            </h1>
            <p className="text-gray-600 mt-1">
              Update product information and settings
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/products/${params.id}`}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Link>
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader className="pt-4">
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="my-2" htmlFor="name">
                  Product Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <Label className="my-2" htmlFor="brand">
                  Product Brand *
                </Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                  placeholder="Enter product brand"
                />
              </div>
              <div>
                <Label className="my-2" htmlFor="description">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  placeholder="Enter product description"
                />
              </div>
            </CardContent>
          </Card>

          {/* Category & Pricing */}
          <Card>
            <CardHeader className="pt-4">
              <CardTitle>Category & Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <Label className="my-2" htmlFor="category">
                    Category *
                  </Label>
                  <Select
                    value={formData.categoryID}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((c: any) => (
                        <SelectItem key={c._id} value={c._id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subcategory */}
                <div>
                  <Label className="my-2" htmlFor="subcategory">
                    Subcategory *
                  </Label>
                  <Select
                    value={formData.subCategoryID}
                    onValueChange={(val) =>
                      handleInputChange("subCategoryID", val)
                    }
                    disabled={!selectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory?.subCategories?.map((sub: any) => (
                        <SelectItem key={sub._id} value={sub._id}>
                          {sub.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="my-2" htmlFor="discountedPrice">
                    Price After Discount (Rs.) *
                  </Label>
                  <Input
                    type="number"
                    value={formData.discountedPrice}
                    onChange={(e) =>
                      handleInputChange("discountedPrice", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="my-2" htmlFor="originalPrice">
                    Original Price (Rs.)
                  </Label>
                  <Input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      handleInputChange("originalPrice", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="my-2" htmlFor="stock">
                    Stock Quantity *
                  </Label>
                  <Input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader className="pt-4">
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(formData.specifications).map((specification) => (
                <div key={specification.key} className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="capitalize my-2">{specification.key}</Label>
                  </div>
                  <div>
                    <Input
                      value={String(specification.value)}
                      onChange={(e) =>
                        handleSpecificationChange(specification.key, e.target.value)
                      }
                      placeholder={`Enter ${specification.key}`}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader className="pt-4">
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`Product ${idx + 1}`}
                      className="w-full h-[200px] object-cover rounded-lg bg-gray-100"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeImage(idx)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer my-2">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload Images</p>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Specification */}
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
                      value={formData.technicalSpecification.performance.series}
                      onChange={(e) =>
                        handleTechnicalSpecChange(
                          "performance",
                          "series",
                          e.target.value
                        )
                      }
                      placeholder="Series"
                    />
                  </div>
                  <div>
                    <Label>CPU *</Label>
                    <Input
                      className="my-2"
                      value={formData.technicalSpecification.performance.cpu}
                      onChange={(e) =>
                        handleTechnicalSpecChange(
                          "performance",
                          "cpu",
                          e.target.value
                        )
                      }
                      placeholder="CPU"
                    />
                  </div>
                  <div>
                    <Label>Graphics *</Label>
                    <Input
                      className="my-2"
                      value={
                        formData.technicalSpecification.performance.graphics
                      }
                      onChange={(e) =>
                        handleTechnicalSpecChange(
                          "performance",
                          "graphics",
                          e.target.value
                        )
                      }
                      placeholder="Graphics"
                    />
                  </div>
                  <div>
                    <Label>Display *</Label>
                    <Input
                      className="my-2"
                      value={
                        formData.technicalSpecification.performance.display
                      }
                      onChange={(e) =>
                        handleTechnicalSpecChange(
                          "performance",
                          "display",
                          e.target.value
                        )
                      }
                      placeholder="Display"
                    />
                  </div>
                  <div>
                    <Label>Operating System *</Label>
                    <Input
                      className="my-2"
                      value={
                        formData.technicalSpecification.performance
                          .operatingSystem
                      }
                      onChange={(e) =>
                        handleTechnicalSpecChange(
                          "performance",
                          "operatingSystem",
                          e.target.value
                        )
                      }
                      placeholder="Operating System"
                    />
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
                      value={
                        formData.technicalSpecification.memoryAndStorage
                          .mainMemory
                      }
                      onChange={(e) =>
                        handleTechnicalSpecChange(
                          "memoryAndStorage",
                          "mainMemory",
                          e.target.value
                        )
                      }
                      placeholder="Main Memory"
                    />
                  </div>
                  <div>
                    <Label>Storage *</Label>
                    <Input
                      className="my-2"
                      value={
                        formData.technicalSpecification.memoryAndStorage.storage
                      }
                      onChange={(e) =>
                        handleTechnicalSpecChange(
                          "memoryAndStorage",
                          "storage",
                          e.target.value
                        )
                      }
                      placeholder="Storage"
                    />
                  </div>
                  <div>
                    <Label>Connectivity *</Label>
                    <Input
                      className="my-2"
                      value={
                        formData.technicalSpecification.memoryAndStorage
                          .connectivity
                      }
                      onChange={(e) =>
                        handleTechnicalSpecChange(
                          "memoryAndStorage",
                          "connectivity",
                          e.target.value
                        )
                      }
                      placeholder="Connectivity"
                    />
                  </div>
                  <div>
                    <Label>Camera *</Label>
                    <Input
                      className="my-2"
                      value={
                        formData.technicalSpecification.memoryAndStorage.camera
                      }
                      onChange={(e) =>
                        handleTechnicalSpecChange(
                          "memoryAndStorage",
                          "camera",
                          e.target.value
                        )
                      }
                      placeholder="Camera"
                    />
                  </div>
                  <div>
                    <Label>Audio *</Label>
                    <Input
                      className="my-2"
                      value={
                        formData.technicalSpecification.memoryAndStorage.audio
                      }
                      onChange={(e) =>
                        handleTechnicalSpecChange(
                          "memoryAndStorage",
                          "audio",
                          e.target.value
                        )
                      }
                      placeholder="Audio"
                    />
                  </div>
                  <div>
                    <Label>Battery *</Label>
                    <Input
                      className="my-2"
                      value={
                        formData.technicalSpecification.memoryAndStorage.battery
                      }
                      onChange={(e) =>
                        handleTechnicalSpecChange(
                          "memoryAndStorage",
                          "battery",
                          e.target.value
                        )
                      }
                      placeholder="Battery"
                    />
                  </div>
                  <div>
                    <Label>Weight *</Label>
                    <Input
                      className="my-2"
                      value={
                        formData.technicalSpecification.memoryAndStorage.weight
                      }
                      onChange={(e) =>
                        handleTechnicalSpecChange(
                          "memoryAndStorage",
                          "weight",
                          e.target.value
                        )
                      }
                      placeholder="Weight"
                    />
                  </div>
                  <div>
                    <Label>Warranty *</Label>
                    <Input
                      className="my-2"
                      value={
                        formData.technicalSpecification.memoryAndStorage
                          .warranty
                      }
                      onChange={(e) =>
                        handleTechnicalSpecChange(
                          "memoryAndStorage",
                          "warranty",
                          e.target.value
                        )
                      }
                      placeholder="Warranty"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
