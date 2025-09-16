"use client"
import Annoucement from "@/components/user-components/layout/Annoucement";
import Footer from "@/components/user-components/layout/Footer";
import Navbar from "@/components/user-components/layout/Navbar";
import FeaturedProduct from "@/components/user-components/page/featuredProduct";
import GamingLaptop from "@/components/user-components/page/gamingLaptop";
import Hero from "@/components/user-components/page/hero";
import OurImpact from "@/components/user-components/page/ourImpact";
import PcComponents from "@/components/user-components/page/pcComponents";
import ShopByCategory from "@/components/user-components/page/shopByCategory";
import TrustedBrand from "@/components/user-components/page/trustedBrand";
import { useCategories } from "@/hooks/categories/getCategories";

export default function HomePage() {
  const {data: categories, isError, isLoading } = useCategories();

    if (isLoading)
    return <div className="p-12 text-center">Loading categories...</div>;
    if (isError || !categories)
    return <div className="p-12 text-center">Categories Not Found</div>;

  return (
    <div className="min-h-screen bg-background">
  
      <Annoucement />
      <Navbar />
      <Hero />
      <ShopByCategory category={categories} />
      <FeaturedProduct />
      <GamingLaptop />
      <PcComponents />
      <TrustedBrand />
      <OurImpact />
      <Footer />
    </div>
  );
}
