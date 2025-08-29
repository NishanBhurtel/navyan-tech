import ContactForm from "@/components/user-components/contact/contactForm";
import ContactHero from "@/components/user-components/contact/hero";
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
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Information */}
          <ConctactInformation />
        </div>

        {/* FAQ Section */}
        <FAQ />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
