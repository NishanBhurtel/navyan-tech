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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Annoucement />
      <Navbar />
      <Hero />
      <ShopByCategory />
      <FeaturedProduct />
      <GamingLaptop />
      <PcComponents />
      <TrustedBrand />
      <OurImpact />
      <Footer />
    </div>
  );
}
