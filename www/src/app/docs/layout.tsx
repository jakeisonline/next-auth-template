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

  return (
    <div className="container flex-1 pt-6 pb-20 items-start md:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="hidden top-20 z-30 -ml-2 w-full shrink-0 sticky lg:block"></aside>
      <div className="relative lg:grid grid-cols-full xl:grid-cols-[1fr_300px]">
        {children}
      </div>
    </div>
  )
}

export default DocsLayout
