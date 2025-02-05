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
    <header className="relative w-full max-w-screen-2xl px-2 md:px-5 lg:top-2 2xl:px-0 text-sm">
      <div className="flex h-14 items-center">
        <div>
          <span>next-auth-template</span>
        </div>
        <div className="flex flex-1 justify-end gap-2"></div>
      </div>
      {children}
    </header>
  )
}

export default DocsLayout
