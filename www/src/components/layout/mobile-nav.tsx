import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { getPageMap } from "nextra/page-map"

export default async function MobileNav() {
  const pageMap = await getPageMap()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Menu used for navigation on mobile.
        </SheetDescription>
        <div className="pr-8">
          <Sidebar pageMap={pageMap} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
