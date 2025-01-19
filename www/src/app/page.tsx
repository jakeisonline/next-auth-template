import { Button } from "@/components/ui/button"
import { ChevronRight, ClipboardCopy } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <header className="relative w-full max-w-screen-2xl px-3 md:px-4 lg:top-2 2xl:px-0 text-sm">
        <div className="flex h-14 items-center">
          <div>
            <span>next-auth-template</span>
          </div>
          <div className="flex flex-1 justify-end gap-2">
            <Button variant="outline" asChild>
              <Link
                href="https://jakeisonline.com/playground/tools/next-auth-template"
                target="_blank"
              >
                <span className="sr-only">Documentation</span>
                <div className="not-sr-only">
                  Doc<span className="lg:hidden">s</span>
                  <span className="hidden lg:inline">umentation</span>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex w-full max-w-screen-2xl flex-col items-center justify-center px-2 md:px-4 2xl:px-0">
        <section className="mt-6 lg:mt-12 flex w-5/6 flex-col items-center gap-2 lg:gap-4 text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter lg:text-6xl xl:text-7xl">
            Sign up and auth,
            <br />
            <span className="animate-text bg-gradient-to-r from-[#55b0fa] to-[#ad6df4]  bg-clip-text text-transparent">
              super quick
            </span>
          </h1>
          <p className="text-base md:text-lg md:w-3/4 lg:w-1/2 font-light">
            The best start when building your Next.js app with baked in social
            sign in, magic links, user management, and more.
          </p>
          <div className="flex flex-col justify-center gap-1 md:w-3/4 lg:w-1/2 text-left">
            <pre className="mt-2 overflow-x-auto rounded-xl bg-accent py-3 px-3 flex flex-row items-center">
              <ChevronRight className="h-4 w-4" />
              <code className="relative px-[0.3rem] py-[0.2rem] font-mono text-sm">
                npx next-auth-template
              </code>
              <Button variant="outline" size="icon" className="ml-auto">
                <ClipboardCopy className="h-4 w-4" />
              </Button>
            </pre>
            <p className="text-sm text-center text-muted-foreground/70">
              <Link href="https://jakeisonline.com/playground/tools/next-auth-template">
                Getting started guide
              </Link>
            </p>
          </div>
        </section>
        <section className="mt-16 grid w-full auto-rows-max grid-cols-1 gap-8 md:w-3/5 lg:w-4/5 lg:grid-cols-2"></section>
      </main>
      <footer className="mb-6 mt-auto grid w-full max-w-screen-2xl px-2 pt-10 text-xs md:px-4 lg:text-sm 2xl:px-0">
        <div className="text-center">
          <Link href="https://www.jakeisonline.com">👋 a thing by Jake</Link>
        </div>
      </footer>
    </>
  )
}
