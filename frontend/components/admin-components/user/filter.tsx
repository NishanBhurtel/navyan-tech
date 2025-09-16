import { Input } from "@/components/user-components/ui/input"
import { Search } from "lucide-react"

interface UserFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
}

export default function UserFilters({
  searchTerm,
  setSearchTerm,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search users by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  )
}
