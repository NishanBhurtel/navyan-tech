import ContactForm from "@/components/user-components/contact/contactForm";
import ContactHero from "@/components/user-components/contact/hero";
import NavyanMap from "@/components/user-components/contact/map";
import Footer from "@/components/user-components/layout/Footer";
import Navbar from "@/components/user-components/layout/Navbar";
import ConctactInformation from "@/components/user-components/page/contactInformation";
import FAQ from "@/components/user-components/page/faq";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ContactHero />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-12">
          <div className="w-full md:w-2/3">
            <ContactForm />
          </div>
          <div className="w-full md:w-1/3">
            <ConctactInformation />
          </div>
        </div>

        {/* Map goes full width */}
        <div className="mt-12">
          <NavyanMap />
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <FAQ />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
