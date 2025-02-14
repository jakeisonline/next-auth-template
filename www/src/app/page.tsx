import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button"
import { Feature } from "@/components/feature"
import {
  TemplateCard,
  TemplateCardBadge,
  TemplateCardContent,
  TemplateCardDescription,
  TemplateCardTitle,
} from "@/components/template-card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <section className="mt-6 lg:mt-12 flex md:w-5/6 flex-col items-center gap-2 lg:gap-4 text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tighter lg:text-6xl xl:text-7xl">
          Sign up and auth,
          <br />
          <span className="animate-bg bg-linear-to-r from-[#55b0fa] to-[#ad6df4]  bg-clip-text text-transparent">
            super quick
          </span>
        </h1>
        <p className="text-base md:text-lg lg:w-4/6 xl:w-1/2 font-light">
          The best start when building your Next.js app with baked in social
          sign in, magic links, user management, and more.
        </p>
        <div className="flex flex-col justify-center gap-1 w-full md:w-3/4 lg:w-1/2 text-left">
          <pre className="mt-2 overflow-x-auto rounded-xl bg-accent py-3 px-3 flex flex-row items-center">
            <ChevronRight className="h-4 w-4" />
            <code className="relative px-[0.3rem] py-[0.2rem] font-mono text-sm">
              npx next-auth-template
            </code>
            <CopyToClipboardButton />
          </pre>
          <p className="text-sm text-center text-muted-foreground/70">
            <Link href="/docs/installation">Getting started guide</Link>
          </p>
        </div>
      </section>
      <section className="mt-12 items-center justify-center">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12">
          <Feature icon="LayoutTemplate">Fully customisable auth pages</Feature>
          <Feature icon="DatabaseZapIcon">Database-backed sessions</Feature>
          <Feature icon="KeyRound">Configurable social sign-in</Feature>
          <Feature icon="WandSparkles">Magic links via email</Feature>
          <Feature icon="CircleUser">Basic account creation and set up</Feature>
          <Feature icon="LockKeyhole">Protected paths via middleware</Feature>
        </ul>
      </section>
      <section className="grid w-full auto-rows-max grid-cols-1 xl:grid-cols-3 gap-5 xl:gap-3 mt-16 px-1 md:px-0 max-w-xl xl:max-w-full">
        <div className="xl:col-span-3 text-center">
          <p className="text-base text-muted-foreground/70 md:text-lg lg:w-full font-light m-auto xl:mb-4">
            Choose a model for your needs:
          </p>
        </div>
        <TemplateCard>
          <TemplateCardTitle>One to One</TemplateCardTitle>
          <TemplateCardDescription>
            Each user has their own isolated account, and accounts do not
            support additional users.
          </TemplateCardDescription>
          <TemplateCardContent>
            <div className="flex flex-col md:flex-row gap-2 mt-auto w-full">
              <Button variant="outline" className="mt-auto w-full" asChild>
                <Link href="https://next-auth-template-one-to-one.vercel.app">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
              <Button variant="outline" className="mt-auto w-full" asChild>
                <Link href="/docs">Docs</Link>
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
        <div className="relative row-start-2 lg:row-start-auto">
          <div className="absolute -inset-0.5 rounded-lg bg-linear-to-r from-[#55b0fa] to-[#ad6df4] opacity-60 blur-sm"></div>
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
              <div className="flex flex-col md:flex-row gap-2 mt-auto w-full">
                <Button className="mt-auto w-full" asChild>
                  <Link href="https://next-auth-template-one-to-many.vercel.app">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
                <Button variant="outline" className="mt-auto w-full" asChild>
                  <Link href="/docs">Docs</Link>
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
        <TemplateCard>
          <TemplateCardTitle>
            Many to Many
            <TemplateCardBadge>Coming Soon</TemplateCardBadge>
          </TemplateCardTitle>
          <TemplateCardDescription>
            An account can have multiple users, and a user can belong to
            multiple accounts.
          </TemplateCardDescription>
          <TemplateCardContent>
            <div className="flex flex-col md:flex-row gap-2 mt-auto w-full">
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
    </>
  )
}
