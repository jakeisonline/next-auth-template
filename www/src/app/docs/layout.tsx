import type { Metadata } from "next"
import type { FC, ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    absolute: "",
    template: "next-auth-template - %s",
  },
}

const DocsLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  return (
    <div className="container flex-1 pt-6 pb-20 items-start md:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      {children}
    </div>
  )
}

export default DocsLayout
