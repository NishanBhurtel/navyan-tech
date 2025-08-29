import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { Separator } from "../ui/separator";
import {
  Filter,
} from "lucide-react";
export default function SidebarFilter(){
    return(
        <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Filter className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold font-serif text-foreground">
                      Filters
                    </h2>
                  </div>

                  {/* Categories */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">
                      Categories
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "Gaming Laptops", count: 45 },
                        { name: "Ultrabooks", count: 32 },
                        { name: "2-in-1 Laptops", count: 18 },
                        { name: "Workstations", count: 12 },
                        { name: "Chromebooks", count: 8 },
                      ].map((category) => (
                        <div
                          key={category.name}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={category.name} />
                          <label
                            htmlFor={category.name}
                            className="text-sm text-foreground cursor-pointer flex-1 flex items-center justify-between"
                          >
                            <span>{category.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({category.count})
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Price Range */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">
                      Price Range
                    </h3>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[500, 2500]}
                        max={3000}
                        min={0}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>$500</span>
                        <span>$2,500</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Brands */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Brands</h3>
                    <div className="space-y-3">
                      {[
                        { name: "ASUS", count: 28 },
                        { name: "MSI", count: 22 },
                        { name: "Dell", count: 18 },
                        { name: "HP", count: 15 },
                        { name: "Lenovo", count: 12 },
                        { name: "Razer", count: 8 },
                        { name: "Acer", count: 6 },
                      ].map((brand) => (
                        <div
                          key={brand.name}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={brand.name} />
                          <label
                            htmlFor={brand.name}
                            className="text-sm text-foreground cursor-pointer flex-1 flex items-center justify-between"
                          >
                            <span>{brand.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({brand.count})
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Processor */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Processor</h3>
                    <div className="space-y-3">
                      {[
                        { name: "Intel Core i9", count: 15 },
                        { name: "Intel Core i7", count: 32 },
                        { name: "Intel Core i5", count: 28 },
                        { name: "AMD Ryzen 9", count: 12 },
                        { name: "AMD Ryzen 7", count: 25 },
                        { name: "AMD Ryzen 5", count: 18 },
                      ].map((processor) => (
                        <div
                          key={processor.name}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={processor.name} />
                          <label
                            htmlFor={processor.name}
                            className="text-sm text-foreground cursor-pointer flex-1 flex items-center justify-between"
                          >
                            <span>{processor.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({processor.count})
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Graphics Card */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">
                      Graphics Card
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "RTX 4080", count: 8 },
                        { name: "RTX 4070", count: 15 },
                        { name: "RTX 4060", count: 25 },
                        { name: "RTX 4050", count: 18 },
                        { name: "GTX 1660 Ti", count: 12 },
                        { name: "Integrated", count: 22 },
                      ].map((gpu) => (
                        <div
                          key={gpu.name}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={gpu.name} />
                          <label
                            htmlFor={gpu.name}
                            className="text-sm text-foreground cursor-pointer flex-1 flex items-center justify-between"
                          >
                            <span>{gpu.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({gpu.count})
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    Apply Filters
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full mt-2 bg-transparent"
                  >
                    Clear All
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
    )
}