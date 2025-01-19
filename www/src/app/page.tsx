import { Feature } from "@/components/feature"
import {
  TemplateCard,
  TemplateCardBadge,
  TemplateCardContent,
  TemplateCardDescription,
  TemplateCardTitle,
} from "@/components/template-card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ClipboardCopy, ExternalLink } from "lucide-react"
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
            <span className="animate-bg bg-gradient-to-r from-[#55b0fa] to-[#ad6df4]  bg-clip-text text-transparent">
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
        <section className="mt-12 items-center justify-center">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12">
            <Feature icon="LayoutTemplate" className="justify-center">
              Customisable sign in and sign up pages
            </Feature>
            <Feature icon="DatabaseZapIcon" className="justify-center">
              Database-backed sessions
            </Feature>
            <Feature icon="KeyRound" className="justify-center">
              Google sign-in ready for config
            </Feature>
            <Feature icon="WandSparkles" className="justify-center">
              Magic links via email ready for config
            </Feature>
            <Feature icon="CircleUser" className="justify-center">
              Basic account creation and set up
            </Feature>
            <Feature icon="LockKeyhole" className="justify-center">
              Protected paths via middleware
            </Feature>
          </ul>
        </section>
        <section className="grid w-full auto-rows-max grid-cols-1 lg:grid-cols-3 gap-3 mt-16">
          <div className="col-span-3 text-center">
            <p className="text-base text-muted-foreground/70 md:text-lg md:w-3/4 lg:w-1/2 font-light m-auto mb-5">
              Choose the model that best suits your app:
            </p>
          </div>
          <TemplateCard className="mt-3">
            <TemplateCardTitle>One to One</TemplateCardTitle>
            <TemplateCardDescription>
              Each user has their own isolated account, and accounts do not
              support additional users.
            </TemplateCardDescription>
            <TemplateCardContent>
              <div className="flex flex-row gap-2 mt-auto w-full">
                <Button variant="outline" className="mt-auto w-full" asChild>
                  <Link href="https://next-auth-template-one-to-one.vercel.app">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
                <Button variant="outline" className="mt-auto w-full" asChild>
                  <Link href="https://jakeisonline.com/playground/tools/next-auth-template">
                    Docs
                  </Link>
                </Button>
              </div>
              <div className="mt-4">
                <ul className="flex flex-col gap-2 mt-2">
                  <Feature>Super simple user and account model</Feature>
                  <Feature>No need for any user management UI</Feature>
                </ul>
              </div>
            </TemplateCardContent>
          </TemplateCard>
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#55b0fa] to-[#ad6df4] opacity-60 blur"></div>
            <TemplateCard className="relative">
              <TemplateCardTitle>
                One to Many
                <TemplateCardBadge>Recommended</TemplateCardBadge>
              </TemplateCardTitle>
              <TemplateCardDescription>
                An account can have many users, but each user belongs to only 1
                account.
              </TemplateCardDescription>
              <TemplateCardContent>
                <div className="flex flex-row gap-2 mt-auto w-full">
                  <Button className="mt-auto w-full" asChild>
                    <Link href="https://next-auth-template-one-to-many.vercel.app">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Link>
                  </Button>
                  <Button variant="outline" className="mt-auto w-full" asChild>
                    <Link href="https://jakeisonline.com/playground/tools/next-auth-template">
                      Docs
                    </Link>
                  </Button>
                </div>
                <div className="mt-4">
                  <ul className="flex flex-col gap-2 mt-2">
                    <Feature>Users can be invited to an account</Feature>
                    <Feature>Simple role based permission management</Feature>
                    <Feature>Simple user management UI</Feature>
                  </ul>
                </div>
              </TemplateCardContent>
            </TemplateCard>
          </div>
          <TemplateCard className="mt-3">
            <TemplateCardTitle>
              Many to Many
              <TemplateCardBadge>Coming Soon</TemplateCardBadge>
            </TemplateCardTitle>
            <TemplateCardDescription>
              An account can have multiple users, and a user can belong to
              multiple accounts.
            </TemplateCardDescription>
            <TemplateCardContent>
              <div className="flex flex-row gap-2 mt-auto w-full">
                <Button variant="outline" className="mt-auto w-full" disabled>
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
                <Button variant="outline" className="mt-auto w-full" disabled>
                  Docs
                </Button>
              </div>
              <div className="mt-4">
                <ul className="flex flex-col gap-2 mt-2">
                  <Feature icon="Plus">Everything from One to Many</Feature>
                  <Feature>Users can switch between accounts</Feature>
                </ul>
              </div>
            </TemplateCardContent>
          </TemplateCard>
        </section>
      </main>
      <footer className="mb-6 mt-auto grid w-full max-w-screen-2xl px-2 pt-20 text-xs md:px-4 lg:text-sm 2xl:px-0">
        <div className="text-center">
          <Link href="https://www.jakeisonline.com">👋 a thing by Jake</Link>
        </div>
      </footer>
    </>
  )
}
