/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  CircleUser,
  DatabaseZapIcon,
  KeyRound,
  LayoutTemplate,
  LockKeyhole,
  WandSparkles,
} from "lucide-react"
import Link from "@/components/ui/link"
import { Fragment } from "react"

export default function AppPage() {
  const features = [
    {
      name: "Custom sign in and sign up pages",
      description: "Simple, interactive-rich, and server action-backed",
      icon: LayoutTemplate,
    },
    {
      name: "Database-backed sessions",
      description: "Not using Postgresql? Drizzle lets you use any db",
      icon: DatabaseZapIcon,
    },
    {
      name: "Google Sign-in ready for config",
      description: "Easily add more via nextauth.js",
      icon: KeyRound,
    },
    {
      name: "Magic Links via Resend ready for config",
      description: "Or use any other email providers",
      icon: WandSparkles,
    },
    {
      name: "Basic account creation and set up",
      description: "A pre-built account setup page ready to build on",
      icon: CircleUser,
    },
    {
      name: "Protected paths via middleware",
      description: "Easily protect app routes with auth middleware",
      icon: LockKeyhole,
    },
  ]

  const packageDepedenciesFilename = "templates%2Fone-to-one%2Fpackage.json"

  const packageDependencies = [
    {
      name: "next",
      shieldsUrl: `https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/next?filename=${packageDepedenciesFilename}`,
      isCore: true,
    },
    {
      name: "next-auth",
      shieldsUrl: `https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/next-auth?filename=${packageDepedenciesFilename}`,
      isCore: true,
    },
    {
      name: "react",
      shieldsUrl: `https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/react?filename=${packageDepedenciesFilename}`,
      isCore: true,
    },
    {
      name: "drizzle-orm",
      shieldsUrl: `https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/drizzle-orm?filename=${packageDepedenciesFilename}`,
      isCore: true,
    },
    {
      name: "zod",
      shieldsUrl: `https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/zod?filename=${packageDepedenciesFilename}`,
      isCore: true,
    },
    {
      name: "@neondatabase/serverless",
      shieldsUrl: `https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/@neondatabase%2Fserverless?filename=${packageDepedenciesFilename}`,
      isCore: true,
    },
    {
      name: "shadcn/ui",
      shieldsUrl: "https://img.shields.io/badge/shadcn%2Fui-gray",
    },
    {
      name: "tailwindcss",
      shieldsUrl: `https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/dev/tailwindcss?filename=${packageDepedenciesFilename}`,
    },
    {
      name: "@radix-ui",
      shieldsUrl: "https://img.shields.io/badge/radix--ui-gray",
    },
    {
      name: "lucide-react",
      shieldsUrl: `https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/lucide-react?filename=${packageDepedenciesFilename}`,
    },
  ]

  return (
    <>
      <header className="relative w-full max-w-(--breakpoint-2xl) px-3 md:px-4 lg:top-0 2xl:px-0">
        <div className="absolute -top-28 bottom-auto left-auto right-20 -z-10 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]" />
        <div className="absolute -top-52 bottom-auto left-72 right-auto -z-10 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(198,229,255,1)] opacity-50 blur-[80px]" />
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
      <main className="flex w-full max-w-(--breakpoint-2xl) flex-col items-center justify-center px-2 md:px-4 2xl:px-0">
        <section className="mt-20 flex w-5/6 flex-col items-center gap-2 text-center lg:w-full">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter lg:text-6xl">
            Sign up and auth, super quick
          </h1>
          <p className="w-5/6 text-lg font-light lg:w-full">
            With database-backed sessions, social sign in, and magic links.
          </p>
          <div className="mt-4 flex w-full flex-col justify-center gap-6 sm:w-auto sm:flex-row sm:gap-3">
            <Button
              size="xl"
              variant="outline"
              className="lg:bg-background"
              asChild
            >
              <Link href="/signin">Sign in</Link>
            </Button>
            <Button size="xl" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
          <div className="mt-4 flex w-full flex-row items-center justify-center gap-3 lg:gap-4">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/jakeisonline/next-auth-template"
            >
              Clone on GitHub
            </Link>{" "}
            <span>or</span>{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjakeisonline%2Fnext-auth-template&env=DATABASE_URL,NEXTAUTH_URL,AUTH_SECRET,AUTH_GOOGLE_ID,AUTH_GOOGLE_SECRET,RESEND_KEY,AUTH_MAGIC_LINK_EMAIL_FROM&envDescription=API%20keys%20needed%20for%20signing%20in%20with%20Google%20and%20emailing%20magic%20links&envLink=https%3A%2F%2Fgithub.com%2Fjakeisonline%2Fnext-auth-template%3Ftab%3Dreadme-ov-file%23envrionment-variables&redirect-url=https%3A%2F%2Fgithub.com%2Fjakeisonline%2Fnext-auth-template%3Ftab%3Dreadme-ov-file%23next-auth-template&demo-title=See%20next-auth-template%20in%20action&demo-description=An%20(almost)%20vanilla%20deploy%20of%20this%20template.%20Resets%20any%20users%20and%20sessions%20every%20few%20hours.&demo-url=https%3A%2F%2Fnext-auth-template-demo.vercel.app%2F&demo-image=https%3A%2F%2Fcamo.githubusercontent.com%2Fc69f49b98c29ba792daf811661b5448ec743f721047119358ac2603ca0531b73%2F68747470733a2f2f6a616b6569736f6e6c696e652e636f6d2f6f70656e67726170682d696d6167652e706e67"
            >
              Deploy on Vercel
            </Link>
          </div>
        </section>
        <section className="mt-16 grid w-full auto-rows-max grid-cols-1 gap-8 md:w-3/5 lg:w-4/5 lg:grid-cols-2">
          <Card className="border-border/70 mx-auto w-full bg-white bg-opacity-35">
            <CardHeader>
              <CardTitle className="text-2xl">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="[&_dd]:mb-3 [&_dd]:pl-[32px]">
                {features.map((feature) => (
                  <Fragment key={feature.name}>
                    <dt className="flex gap-3">
                      <feature.icon className="h-5 w-5" />
                      {feature.name}
                    </dt>
                    <dd className="text-muted-foreground block lg:text-sm">
                      {feature.description}
                    </dd>
                  </Fragment>
                ))}
              </dl>
              <p className="text-muted-foreground mt-5 text-sm">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://jakeisonline.com/playground/tools/next-auth-template"
                >
                  See all the features and how to use them in the documentation
                </Link>
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/70 mx-auto w-full bg-white bg-opacity-35">
            <CardHeader>
              <CardTitle className="text-2xl">Core Dependencies</CardTitle>
              <CardDescription className="text-base lg:text-sm">
                Required to make the basics work. They could be replaced, but it
                would defeat the point of this template.
              </CardDescription>
            </CardHeader>
            <CardContent className="lg:text-sm">
              <ul className="grid grid-cols-2 gap-4">
                {packageDependencies.map((dependency) => {
                  if (!dependency.isCore) return null

                  return (
                    <li className="h-[20px]" key={dependency.name}>
                      <img alt={dependency.name} src={dependency.shieldsUrl} />
                    </li>
                  )
                })}
              </ul>
              <h3 className="mt-10 text-2xl font-semibold tracking-tight">
                Other Dependencies
              </h3>
              <p className="text-muted-foreground mt-1.5">
                Adds a bit of style or utility, could easily be replaced.
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-4">
                {packageDependencies.map((dependency) => {
                  if (dependency.isCore) return null

                  return (
                    <li className="h-[20px]" key={dependency.name}>
                      <img alt={dependency.name} src={dependency.shieldsUrl} />
                    </li>
                  )
                })}
              </ul>
              <p className="text-muted-foreground mt-8 text-sm">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/jakeisonline/next-auth-template/blob/main/package.json"
                >
                  See the full list of dependencies in package.json
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="mb-6 mt-auto grid w-full max-w-(--breakpoint-2xl) px-2 pt-10 text-xs md:px-4 lg:text-sm 2xl:px-0">
        <div className="text-center text-lg">
          <Link href="https://www.jakeisonline.com">👋 a template by Jake</Link>
        </div>
      </footer>
    </>
  )
}
