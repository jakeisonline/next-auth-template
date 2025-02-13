import GlobalNav from "@/components/layout/global-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import Logo from "@/components/svg/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPageMap } from "nextra/page-map"
import { CgNpm } from "react-icons/cg"
import { FaGithub } from "react-icons/fa"

export default async function GlobalHeader() {
  const pageMap = await getPageMap()

  return (
    <header className="md:sticky lg:top-0 z-50 relative w-full max-w-screen-2xl text-sm lg:backdrop-blur-3xl supports[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center text-xs md:text-sm">
        <MobileNav pageMap={pageMap} />
        <Logo className="w-4 h-4 md:w-5 md:h-5 mr-0.5" />
        <Link href="/">next-auth-template</Link>
        <GlobalNav className="hidden lg:block" />
        <div className="flex flex-1 justify-end md:gap-2">
          <Button variant="ghost" asChild className="px-3 hover:bg-background">
            <Link
              href="https://www.npmjs.com/package/next-auth-template"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CgNpm className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" asChild className="px-3 hover:bg-background">
            <Link
              href="https://github.com/jakeisonline/next-auth-template"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-4 w-4" />
            </Link>
          </Button>
          <ThemeToggle className="hover:bg-background" />
        </div>
      </div>
    </header>
  )
}
