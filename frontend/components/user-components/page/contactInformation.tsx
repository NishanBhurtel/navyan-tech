import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Headset,
} from "lucide-react";

export default function ConctactInformation(){
    return(
          <div className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold font-serif text-foreground">
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Multiple ways to reach our expert team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Phone Support
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Call us for immediate assistance
                      </p>
                      <p className="font-medium text-foreground">
                        +1 (555) 123-4567
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Mon-Fri: 9AM-8PM EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        WhatsApp
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Quick messaging support
                      </p>
                      <p className="font-medium text-foreground">
                        +1 (555) 123-4567
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Available 24/7
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Email Support
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Detailed inquiries and support
                      </p>
                      <p className="font-medium text-foreground">
                        support@techhubpro.com
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Response within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Headset className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Live Chat
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Instant support on our website
                      </p>
                      <p className="font-medium text-foreground">
                        Available on all pages
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Mon-Fri: 9AM-8PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold font-serif text-foreground">
                  Visit Our Store
                </CardTitle>
                <CardDescription>
                  Experience our products in person
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Main Showroom
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      123 Tech Street
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Store Hours
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Monday - Friday: 10AM - 8PM</p>
                      <p>Saturday: 10AM - 6PM</p>
                      <p>Sunday: 12PM - 5PM</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <Headset className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-serif text-foreground">
                    Need Immediate Help?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our technical experts are standing by to help you with any
                    questions about our products or services.
                  </p>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
    )
}