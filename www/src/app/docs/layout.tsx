import type { Metadata } from "next"
import type { FC, ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    absolute: "",
    template: "%s - Nextra",
  },
}

const DocsLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  //const pageMap = await getPageMap()

  return children
}

export default DocsLayout
