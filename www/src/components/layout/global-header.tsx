import GlobalNav from "@/components/layout/global-nav"
import Logo from "@/components/svg/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CgNpm } from "react-icons/cg"
import { FaGithub } from "react-icons/fa"

export default function GlobalHeader() {
  return (
    <header className="relative w-full max-w-screen-2xl px-2 md:px-5 lg:top-2 2xl:px-0 text-sm">
      <div className="flex h-14 items-center">
        <Logo className="w-5 h-5 mr-0.5" />
        <Link href="/">next-auth-template</Link>
        <GlobalNav />
        <div className="flex flex-1 justify-end gap-2">
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
