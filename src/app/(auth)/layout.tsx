import type { Metadata } from "next"
import localFont from "next/font/local"
import "../globals.css"

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-background overflow-y-scroll overflow-x-clip flex flex-col items-center`}
      >
        <div className="mt-20">{children}</div>
      </body>
    </html>
  )
}
