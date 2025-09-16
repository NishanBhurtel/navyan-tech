export default function TrustedBrand() {
    return (
          <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold  text-foreground mb-4">
              Trusted Brands
            </h2>
            <p className="text-xl text-muted-foreground">
              We partner with the world's leading technology brands
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
              { name: "ASUS", logo: "/placeholder-cbp93.png" },
              { name: "MSI", logo: "/msi-logo.png" },
              { name: "Gigabyte", logo: "/gigabyte-logo.png" },
              { name: "NVIDIA", logo: "/nvidia-logo.png" },
              { name: "AMD", logo: "/amd-logo.png" },
              { name: "Intel", logo: "/intel-logo.png" },
            ].map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <img
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  className="h-12 w-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}