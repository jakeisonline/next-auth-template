import "@/app/globals.css"
import GlobalHeader from "@/components/layout/global-header"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "next-auth-template - Sign up and auth, super quick",
  description:
    "A customisable template giving you the best start when building your Next.js app with baked in social sign in, magic links, user management, and more.",
  openGraph: {
    siteName: "next-auth-template",
    title: "Sign up and auth, super quick",
    type: "website",
    locale: "en_GB",
    url: "https://next-auth-template.vercel.app",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-background top-0 z-[-2] flex h-auto min-h-dvh w-screen flex-col items-center overflow-x-clip overflow-y-scroll bg-[radial-gradient(100%_50%_at_50%_0%,rgba(85,176,250,0.3)_0,rgba(85,176,250,0)_50%,rgba(85,176,250,0)_100%)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex w-full max-w-(--breakpoint-xl) flex-col items-center justify-center px-2 md:px-4 2xl:px-0">
            <GlobalHeader />
            {children}
          </main>
          <footer className="mb-6 mt-auto grid w-full max-w-(--breakpoint-2xl) px-2 pt-20 text-xs md:px-4 lg:text-sm 2xl:px-0">
            <div className="text-center">
              <Link href="https://www.jakeisonline.com">
                👋 a thing by Jake
              </Link>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
