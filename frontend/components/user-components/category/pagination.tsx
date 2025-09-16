import { Button } from "../ui/button";
export default function Pagination(){
    return(
        <div className="flex items-center justify-center space-x-2 pt-8">
                <Button variant="outline" className="bg-transparent">
                  Previous
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    className={page === 1 ? "" : "bg-transparent"}
                    size="icon"
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" className="bg-transparent">
                  Next
                </Button>
              </div>
    )
}