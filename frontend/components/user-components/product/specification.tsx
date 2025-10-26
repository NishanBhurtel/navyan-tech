import { IProduct } from "@/lib/utils/types/product.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Specification {
  key: string;
  value: string;
  _id: string; // include this
}

export default function Specification({ product }: { product: IProduct }) {
  return (
    <div className="container mx-auto px-4 mt-16">
      <Tabs defaultValue="specifications" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="specifications" className="font-semibold">
            Specifications
          </TabsTrigger>
          <TabsTrigger value="description" className="font-semibold">
            Description
          </TabsTrigger>
        </TabsList>

        {/* Specifications */}
        <TabsContent value="specifications" className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-2xl font-bold font-serif text-foreground mb-6">
              Technical Specifications
            </h3>
            <div className="grid md:grid-cols-1 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">
                  Performance
                </h4>
                {[
                  { label: "Brand", value: product.brand },
                  {
                    label: "Series",
                    value: product.technicalSpecification?.performance.series,
                  },
                  {
                    label: "CPU",
                    value: product.technicalSpecification?.performance.cpu,
                  },
                  {
                    label: "Graphics",
                    value: product.technicalSpecification?.performance.graphics,
                  },
                  {
                    label: "Display",
                    value: product.technicalSpecification?.performance.display,
                  },
                  {
                    label: "Operating System",
                    value:
                      product.technicalSpecification?.performance
                        .operatingSystem,
                  },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="flex justify-left py-3 border-b border-border/50"
                  >
                    <span className="text-sm font-medium text-muted-foreground w-1/2">
                      {spec.label}:
                    </span>
                    <span className="text-sm text-foreground max-w-md w-1/2">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">
                  Memory & Storage
                </h4>
                {[
                  {
                    label: "Main memory",
                    value:
                      product.technicalSpecification?.memoryAndStorage
                        .mainMemory,
                  },
                  {
                    label: "Storage",
                    value:
                      product.technicalSpecification?.memoryAndStorage.storage,
                  },
                  {
                    label: "Connectivity",
                    value:
                      product.technicalSpecification?.memoryAndStorage
                        .connectivity,
                  },
                  {
                    label: "Camera",
                    value:
                      product.technicalSpecification?.memoryAndStorage.camera,
                  },
                  {
                    label: "Audio",
                    value:
                      product.technicalSpecification?.memoryAndStorage.audio,
                  },
                  {
                    label: "Battery",
                    value:
                      product.technicalSpecification?.memoryAndStorage.battery,
                  },
                  {
                    label: "Weight",
                    value:
                      product.technicalSpecification?.memoryAndStorage.weight,
                  },
                  {
                    label: "Warranty",
                    value:
                      product.technicalSpecification?.memoryAndStorage.warranty,
                  },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="flex justify-left py-3 border-b border-border/50"
                  >
                    <span className="text-sm font-medium text-muted-foreground w-1/2">
                      {spec.label}:
                    </span>
                    <span className="text-sm text-foreground max-w-md w-1/2">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Description */}
        <TabsContent value="description" className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-2xl font-bold font-serif text-foreground mb-6">
              Product Description
            </h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                {product.description}
              </p>
              <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Specifications:
              </h4>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {product.specifications.map((spec, i) => (
                  <li key={i}>
                    <span className="font-semibold text-foreground">
                      {spec.key}:
                    </span>{" "}
                    {spec.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
