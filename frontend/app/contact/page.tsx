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

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-row gap-12">
          {/* Contact Form */}
          <div className="grid grid-row-2">
            <ContactForm />

            <NavyanMap />
          </div>

          {/* Contact Information */}
         <div className="w-full">
           <ConctactInformation  />
         </div>
        </div>

        {/* FAQ Section */}
        <FAQ />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
