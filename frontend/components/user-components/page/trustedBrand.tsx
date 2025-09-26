import Link from "next/link";

export default function TrustedBrand() {
  const brands = [
    { name: "ACER", logo: "/brand_images/acer.png", url: "https://www.acer.com/us-en" },
    { name: "ADATA", logo: "/brand_images/adata.png", url: "https://www.adata.com/us" },
    { name: "Apacer", logo: "/brand_images/apacer.jpg", url: "https://www.apacer.com/" },
    { name: "ASUS", logo: "/brand_images/ASUS.png", url: "https://www.asus.com/" },
    { name: "BWNQ", logo: "/brand_images/bwnq.png", url: "https://www.benq.com/en-in/index.html" }, 
    { name: "DAHUA", logo: "/brand_images/dahua.jpg", url: "https://www.dahuasecurity.com/" },
    { name: "FANTECH", logo: "/brand_images/fantech.png", url: "https://fantechworld.com/" },
    { name: "GIGABIT", logo: "/brand_images/gigabit.png", url: "https://www.gigabyte.com/" },
    { name: "HIKSEMI", logo: "/brand_images/hiksemi.png", url: "https://www.hiksemitech.com/en/hiksemi.html" },
    { name: "HIKVISION", logo: "/brand_images/Hikvision.png", url: "https://www.hikvision.com/" },
    { name: "HP", logo: "/brand_images/HP.png", url: "https://www.hp.com/" },
    { name: "LENEVO", logo: "/brand_images/lenevo.png", url: "https://www.lenovo.com/us/en" },
    { name: "MSI", logo: "/brand_images/msi.jpg", url: "https://www.msi.com/" },
    { name: "TIANDY", logo: "/brand_images/tiandy.jpg", url: "https://en.tiandy.com/" },
    { name: "XPG", logo: "/brand_images/xpg.png", url: "https://www.xpg.com/us" },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Trusted Brands</h2>
          <p className="text-xl text-muted-foreground">
            We partner with the world's leading technology brands
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 items-center">
          {brands.map((brand, index) => (
            <Link
              href={brand.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                className="h-18 w-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
