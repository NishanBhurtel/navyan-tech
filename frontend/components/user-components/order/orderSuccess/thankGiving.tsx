import { CheckCircle} from "lucide-react"

export default function ThankYou(){
    return(
           <div className="bg-gradient-to-r from-primary to-accent p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-3xl font-bold font-serif text-white mb-2">Thank You!</h1>
              <p className="text-white/90 text-lg">Your order inquiry has been submitted successfully</p>
            </div>
    )
}