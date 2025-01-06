import type { Metadata } from "next"
import "../globals.css"

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
      <body className="bg-background flex min-h-dvh flex-col items-center overflow-x-clip overflow-y-scroll">
        <div className="mt-20">{children}</div>
      </body>
    </html>
  )
}
