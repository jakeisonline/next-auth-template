import "@/app/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Next.js + Auth.js Template",
  description:
    "Sign up and auth, super quick, with database-backed sessions, social sign in, and magic links.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-background top-0 z-[-2] flex h-screen min-h-dvh w-screen flex-col items-center overflow-x-clip overflow-y-scroll bg-[radial-gradient(100%_50%_at_50%_0%,rgba(85,176,250,0.3)_0,rgba(85,176,250,0)_50%,rgba(85,176,250,0)_100%)]">
        {children}
      </body>
    </html>
  )
}
