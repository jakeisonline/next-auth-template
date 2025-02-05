import "@/app/globals.css"
import type { Metadata } from "next"
import Script from "next/script"

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
    <>
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          const getThemePreference = () => {
            if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
              return localStorage.getItem("theme")
            }
            return window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light"
          }

          const isDark = getThemePreference() === "dark"
          document.documentElement.classList[isDark ? "add" : "remove"]("dark")

          if (typeof localStorage !== "undefined") {
            const observer = new MutationObserver(() => {
              const isDark = document.documentElement.classList.contains("dark")
              localStorage.setItem("theme", isDark ? "dark" : "light")
            })
            observer.observe(document.documentElement, {
              attributes: true,
              attributeFilter: ["class"],
            })
          }

          document.addEventListener("astro:before-swap", function (event) {
            const prefersDarkMode = getThemePreference() === "dark"

            event.newDocument.documentElement.classList[
              prefersDarkMode ? "add" : "remove"
            ]("dark")
          })
          `,
          }}
        />
      </head>
      <html lang="en">
        <body className="bg-background top-0 z-[-2] flex h-auto min-h-dvh w-screen flex-col items-center overflow-x-clip overflow-y-scroll bg-[radial-gradient(100%_50%_at_50%_0%,rgba(85,176,250,0.3)_0,rgba(85,176,250,0)_50%,rgba(85,176,250,0)_100%)]">
          {children}
        </body>
      </html>
    </>
  )
}
