import { TOC } from "@/components/toc"
import { useMDXComponents as getNextraComponents } from "nextra/mdx-components"

const defaultComponents = getNextraComponents({
  wrapper({ children, toc }) {
    return (
      <>
        <div className="prose">{children}</div>
        <TOC toc={toc} />
      </>
    )
  },
})

export const useMDXComponents = (components) => ({
  ...defaultComponents,
  ...components,
})
