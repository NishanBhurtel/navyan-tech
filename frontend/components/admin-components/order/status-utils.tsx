import { AlertCircle, CheckCircle, Clock, MessageSquare } from "lucide-react"
import { InquiryPriority, InquiryStatus } from "./order-inqueries"


export const getStatusColor = (status: InquiryStatus) => {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-800"
    case "contacted":
      return "bg-yellow-100 text-yellow-800"
    case "in-progress":
      return "bg-purple-100 text-purple-800"
    case "completed":
      return "bg-green-100 text-green-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getPriorityColor = (priority: InquiryPriority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getStatusIcon = (status: InquiryStatus) => {
  switch (status) {
    case "new":
      return <AlertCircle className="h-4 w-4" />
    case "contacted":
      return <MessageSquare className="h-4 w-4" />
    case "in-progress":
      return <Clock className="h-4 w-4" />
    case "completed":
      return <CheckCircle className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}
