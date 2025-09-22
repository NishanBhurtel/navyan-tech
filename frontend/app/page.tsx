"use client"
import Annoucement from "@/components/user-components/layout/Annoucement";
import ErrorState from "@/components/user-components/layout/ErrorPage";
import Footer from "@/components/user-components/layout/Footer";
import DataLoading from "@/components/user-components/layout/LoadingPage";
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
    return <DataLoading  />;
    if (isError || !categories)
    return <ErrorState />

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
