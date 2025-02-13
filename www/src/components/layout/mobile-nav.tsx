"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { setMobileMenu, useMobileMenu } from "@/stores/mobile-menu"
import { MenuIcon } from "lucide-react"
import { PageMapItem } from "nextra"

export function MobileNav({
  pageMap,
  className,
}: {
  pageMap: PageMapItem[]
  className?: string
}) {
  const isOpen = useMobileMenu()

  return (
    <Sheet open={isOpen} onOpenChange={setMobileMenu}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("lg:hidden", className)}
        >
          <MenuIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Menu used for navigation on mobile.
        </SheetDescription>
        <Sidebar pageMap={pageMap} />
      </SheetContent>
    </Sheet>
  )
}
