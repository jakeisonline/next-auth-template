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
import { setMobileMenu, useMobileMenu } from "@/stores/mobile-menu"
import { MenuIcon } from "lucide-react"
import { PageMapItem } from "nextra"

export function MobileNav({ pageMap }: { pageMap: PageMapItem[] }) {
  const isOpen = useMobileMenu()

  return (
    <Sheet open={isOpen} onOpenChange={setMobileMenu}>
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
        <Sidebar pageMap={pageMap} />
      </SheetContent>
    </Sheet>
  )
}
