/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GithubIcon } from "lucide-react"
import Link from "next/link"

export default function AppPage() {
  return (
    <>
      <header className="lg:top-0 w-full max-w-screen-2xl px-2 md:px-4 2xl:px-0">
        <div className="flex h-14 items-center">
          <div>
            <span className="text-lg">Next.js + Auth.js Template</span>
          </div>
          <div className="justify-end flex flex-1 gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/jakeisonline">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com/jakeisonline">Documentation</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="w-full flex flex-col items-center justify-center max-w-screen-2xl px-2 md:px-4 2xl:px-0">
        <section className="mt-20 flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
            Sign up and auth, super quick
          </h1>
          <p className="text-lg font-light">
            With database-backed sessions, social sign in, and magic links.
          </p>
          <div className="flex gap-3 mt-3 justify-center">
            <Button size="xl" variant="outline" asChild>
              <Link href="/signin">Sign in</Link>
            </Button>
            <Button size="xl" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </section>
        <section className="grid grid-cols-2 gap-8 mt-20">
          <Card className="mx-auto w-[32rem]">
            <CardHeader>
              <CardTitle className="text-2xl">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="">
                <li>Feature 1</li>
                <li>Feature 2</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="mx-auto w-[32rem]">
            <CardHeader>
              <CardTitle className="text-2xl">Dependencies</CardTitle>
              <CardDescription>
                These are the core dependencies, which are required to make the
                basics work.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-4">
                <li>
                  <img
                    alt="next.js"
                    src="https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/next"
                  />
                </li>
                <li>
                  <img
                    alt="next-auth"
                    src="https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/next-auth"
                  />
                </li>
                <li>
                  <img
                    alt="drizzle-orm"
                    src="https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/drizzle-orm"
                  />
                </li>
                <li>
                  <img
                    alt="zod"
                    src="https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/zod"
                  />
                </li>
                <li>
                  <img
                    alt="tailwindcss"
                    src="https://img.shields.io/github/package-json/dependency-version/jakeisonline/next-auth-template/dev/tailwindcss"
                  />
                </li>
                <li>
                  <img
                    alt="shadcn/ui"
                    src="https://img.shields.io/badge/shadcn%2Fui-gray"
                  />
                </li>
              </ul>
              <p className="mt-8 text-sm text-muted-foreground">
                See the full list of dependencies in{" "}
                <Link href="https://github.com/jakeisonline/next-auth-template/blob/main/package.json">
                  package.json
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="mt-auto grid w-full mb-4 lg:text-sm text-xs max-w-screen-2xl px-2 md:px-4 2xl:px-0">
        <div className="text-lg text-center">
          <Link href="https://www.jakeisonline.com">👋 a template by Jake</Link>
        </div>
      </footer>
    </>
  )
}
