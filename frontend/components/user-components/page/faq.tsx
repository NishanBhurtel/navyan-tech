import { Card, CardContent } from "../ui/card";

export default function FAQ() {
  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold font-serif text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Quick answers to common questions
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {[
          {
            question: "What is your return policy?",
            answer:
              "We offer a 30-day return policy for all products. Items must be in original condition with all accessories and packaging.",
          },
          {
            question: "Do you offer technical support?",
            answer:
              "Yes, we provide comprehensive technical support including setup assistance, troubleshooting, and warranty services.",
          },
          {
            question: "Can I track my order?",
            answer:
              "Once your order ships, you'll receive a tracking number via email to monitor your package's progress.",
          },
          {
            question: "Do you offer bulk discounts?",
            answer:
              "Yes, we offer competitive pricing for bulk orders. Contact our sales team for custom quotes on large purchases.",
          },
          {
            question: "What payment methods do you accept?",
            answer:
              "We accept all major credit cards, PayPal, bank transfers, and financing options for qualified customers.",
          },
          {
            question: "Do you provide installation services?",
            answer:
              "Yes, we offer professional installation services for desktop PCs and complex setups. Contact us for details.",
          },
        ].map((faq, index) => (
          <Card
            key={index}
            className="border-border hover:border-primary/50 transition-colors"
          >
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
