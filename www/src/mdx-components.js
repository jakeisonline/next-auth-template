import { H1, H2, H3, H4, H5, H6 } from "@/components/mdx/heading"
import { TOC } from "@/components/toc"
import { useMDXComponents as getNextraComponents } from "nextra/mdx-components"

const defaultComponents = getNextraComponents({
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  wrapper({ children, toc }) {
    return (
      <>
        <div className="prose prose-h2:border-b prose-h2:pb-2 prose-headings:scroll-m-20 prose-headings:tracking-tight prose-h1:text-3xl prose-headings:font-bold prose-h1:mb-0 dark:prose-invert">
          {children}
        </div>
        <TOC toc={toc} />
      </>
    )
  },
})

export const useMDXComponents = (components) => ({
  ...defaultComponents,
  ...components,
})
