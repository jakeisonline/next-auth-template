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
  GithubIcon,
  KeyRound,
  LayoutTemplate,
  LockKeyhole,
  WandSparkles,
} from "lucide-react"
import Link from "@/components/ui/link"
import Image from "next/image"
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

  const packageDependencies = [
    {
      name: "next",
      shieldsUrl:
        "https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/next",
      isCore: true,
    },
    {
      name: "next-auth",
      shieldsUrl:
        "https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/next-auth",
      isCore: true,
    },
    {
      name: "drizzle-orm",
      shieldsUrl:
        "https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/drizzle-orm",
      isCore: true,
    },
    {
      name: "zod",
      shieldsUrl:
        "https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/zod",
      isCore: true,
    },

    {
      name: "@neondatabase/serverless",
      shieldsUrl:
        "https://img.shields.io/badge/@neondatabase%2Fserverless-gray",
      isCore: true,
    },
    {
      name: "tailwindcss",
      shieldsUrl:
        "https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/dev/tailwindcss",
    },
    {
      name: "shadcn/ui",
      shieldsUrl: "https://img.shields.io/badge/shadcn%2Fui-gray",
    },
    {
      name: "lucide-react",
      shieldsUrl:
        "https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/lucide-react",
    },
    {
      name: "@radix-ui",
      shieldsUrl: "https://img.shields.io/badge/radix--ui-gray",
    },
  ]

  return (
    <>
      <Image
        src="/images/header-bg.png"
        width="1398"
        height="555"
        alt="header-bg"
        className="absolute -z-10"
        priority
      />
      <header className="lg:top-0 w-full max-w-screen-2xl px-3 md:px-4 2xl:px-0">
        <div className="flex h-14 items-center">
          <div>
            <span>next-auth-template</span>
          </div>
          <div className="justify-end flex flex-1 gap-2">
            <Button variant="outline" asChild>
              <Link
                external
                href="https://github.com/jakeisonline/next-auth-template?tab=readme-ov-file#next-auth-template"
              >
                <GithubIcon className="h-5 w-5 mr-1.5" />
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
      <main className="w-full flex flex-col items-center justify-center max-w-screen-2xl px-2 md:px-4 2xl:px-0">
        <section className="mt-20 w-5/6 lg:w-full flex flex-col gap-2 text-center items-center">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tighter">
            Sign up and auth, super quick
          </h1>
          <p className="text-lg font-light w-5/6 lg:w-full">
            With database-backed sessions, social sign in, and magic links.
          </p>
          <div className="flex gap-3 mt-3 justify-center">
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
        </section>
        <section className="w-full md:w-3/5 lg:w-4/5 grid lg:grid-cols-2 grid-cols-1 gap-8 mt-20 auto-rows-max">
          <Card className="mx-auto w-full bg-white bg-opacity-35 border-border/70">
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
                    <dd className="block lg:text-sm text-muted-foreground">
                      {feature.description}
                    </dd>
                  </Fragment>
                ))}
              </dl>
              <p className="mt-5 text-sm text-muted-foreground">
                <Link
                  external
                  href="https://github.com/jakeisonline/next-auth-template?tab=readme-ov-file#next-auth-template"
                >
                  See all the features and how to use them in the documentation
                </Link>
              </p>
            </CardContent>
          </Card>

          <Card className="mx-auto w-full bg-white bg-opacity-35 border-border/70">
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
              <h3 className="font-semibold tracking-tight text-2xl mt-10">
                Other Dependencies
              </h3>
              <p className="text-muted-foreground mt-1.5">
                Adds a bit of style or utility, could easily be replaced.
              </p>
              <ul className="grid grid-cols-2 gap-4 mt-5">
                {packageDependencies.map((dependency) => {
                  if (dependency.isCore) return null

                  return (
                    <li className="h-[20px]" key={dependency.name}>
                      <img alt={dependency.name} src={dependency.shieldsUrl} />
                    </li>
                  )
                })}
              </ul>
              <p className="mt-8 text-sm text-muted-foreground">
                <Link
                  external
                  href="https://github.com/jakeisonline/next-auth-template/blob/main/package.json"
                >
                  See the full list of dependencies in package.json
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="mt-auto grid w-full mb-6 pt-10 lg:text-sm text-xs max-w-screen-2xl px-2 md:px-4 2xl:px-0">
        <div className="text-lg text-center">
          <Link href="https://www.jakeisonline.com">👋 a template by Jake</Link>
        </div>
      </footer>
    </>
  )
}
