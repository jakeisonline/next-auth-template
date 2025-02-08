import { Breadcrumb } from "@/components/breadcrumb"
import { Sidebar } from "@/components/layout/sidebar"
import { Code } from "@/components/mdx/code"
import { H1, H2, H3, H4, H5, H6 } from "@/components/mdx/heading"
import { Link } from "@/components/mdx/link"
import { TOC } from "@/components/toc"
import { Heading, PageMapItem } from "nextra"
import { useMDXComponents as getNextraComponents } from "nextra/mdx-components"
import { normalizePages } from "nextra/normalize-pages"

const defaultComponents = getNextraComponents({
  code: Code,
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  wrapper({
    children,
    toc,
    pageMap = [],
  }: {
    children: React.ReactNode
    toc: Heading[]
    pageMap?: PageMapItem[]
  }) {
    const normalizedPages = normalizePages({
      list: pageMap,
      route: "/docs",
    })

    return (
      <>
        <aside className="hidden top-20 z-30 -ml-2 w-full shrink-0 sticky lg:block">
          <Sidebar pageMap={pageMap} />
        </aside>
        <div className="relative lg:grid grid-cols-full xl:grid-cols-[1fr_300px]">
          <div className="prose prose-h2:border-b prose-h2:pb-2 prose-headings:scroll-m-20 prose-headings:tracking-tight prose-h1:text-3xl prose-headings:font-bold prose-h1:mb-0 dark:prose-invert prose-code:before:content-none prose-code:after:content-none">
            <Breadcrumb activePath={normalizedPages.activePath} />
            {children}
          </div>
          <TOC toc={toc} />
        </div>
      </>
    )
  },
})

export const useMDXComponents = <T extends Record<string, unknown>>(
  components: T,
) => ({
  ...defaultComponents,
  ...components,
})
