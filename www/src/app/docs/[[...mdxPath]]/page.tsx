/* eslint-disable react-hooks/rules-of-hooks -- false positive, useMDXComponents isn't react hooks */

import { useMDXComponents } from "@/mdx-components"
import { getPageMap } from "nextra/page-map"
import { generateStaticParamsFor, importPage } from "nextra/pages"

export const generateStaticParams = generateStaticParamsFor("mdxPath")

interface PageProps {
  params: Promise<{
    mdxPath: string
  }>
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params
  const { metadata } = await importPage([params.mdxPath])
  return metadata
}

const Wrapper = useMDXComponents({}).wrapper

export default async function Page(props: PageProps) {
  const params = await props.params
  const result = await importPage([params.mdxPath])
  const pageMap = await getPageMap()
  const { default: MDXContent, toc } = result

  return (
    <Wrapper toc={toc} pageMap={pageMap}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
