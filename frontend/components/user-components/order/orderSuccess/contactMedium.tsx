import { Phone, MessageCircle } from "lucide-react"
export default function Contact(){
    return(
            <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Phone Call</p>
                    <p className="text-sm text-muted-foreground">We'll call you directly</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">Quick messaging support</p>
                  </div>
                </div>
              </div>
    )
}