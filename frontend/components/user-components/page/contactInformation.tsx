import Link from "next/link";
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

export default function ConctactInformation() {
  return (
    <div className="w-full space-y-6">
      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">
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
                <p className="font-medium text-foreground">+(977) 9864400400</p>
                <p className="text-xs text-muted-foreground">
                  Sun-Fri: 9AM-7:30PM GMT
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Quick messaging support
                </p>
                <p className="font-medium text-foreground">+(977) 9864400400</p>
                <p className="text-xs text-muted-foreground">Available 24/7</p>
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
                  navyan2018@gmail.com
                </p>
                <p className="text-xs text-muted-foreground">
                  Response within 24 hours
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">
            Visit Our Store
          </CardTitle>
          <CardDescription>Experience our products in person</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Paschimanchal ,
              </h3>
              <p className="text-muted-foreground text-sm">
                Finance-chowk
                <br />
                Butwal-8
                <br />
                Nepal
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
                <p>Sunday - Friday: 10AM - 7:30PM</p>
              </div>
            </div>
          </div>

          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.google.com/maps/place/Navyan+Tech+Store+-+Butwal/@27.6868911,83.4626657,681m/data=!3m1!1e3!4m14!1m7!3m6!1s0x399686879173ff97:0x86ccc97bea5f7b9b!2sNavyan+Tech+Store+-+Butwal!8m2!3d27.6868864!4d83.4652406!16s%2Fg%2F11gdzkhwwm!3m5!1s0x399686879173ff97:0x86ccc97bea5f7b9b!8m2!3d27.6868864!4d83.4652406!16s%2Fg%2F11gdzkhwwm?authuser=0&entry=ttu&g_ep=EgoyMDI1MDkwOS4wIKXMDSoASAFQAw%3D%3D"
          >
            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 cursor-pointer">
              <MapPin className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
