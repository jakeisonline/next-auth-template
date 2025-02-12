import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import { Page } from "nextra"

export default function Pagination({
  flatMap,
  currentPath,
}: {
  flatMap: Page[]
  currentPath: string
}) {
  let previous = null
  let next = null

  for (let i = 0; i < flatMap.length; i++) {
    const item = flatMap[i]

    if (item.route === currentPath) {
      previous = flatMap[i - 1]
      next = flatMap[i + 1]
    }
  }

  return (
    <div className="flex items-center gap-2 justify-between w-full text-sm mt-16">
      {previous && <PaginationButton direction="previous" item={previous} />}
      {next && <PaginationButton direction="next" item={next} />}
    </div>
  )
}

function PaginationButton({
  direction,
  item,
}: {
  direction: "previous" | "next"
  item: Page
}) {
  const IconSlot = direction === "previous" ? ChevronLeftIcon : ChevronRightIcon

  return (
    <Button
      variant="ghost"
      asChild
      className={cn(
        "flex items-center gap-0.5 no-underline",
        direction === "next" && "flex-row-reverse ml-auto",
      )}
    >
      <Link href={item.route}>
        <IconSlot className="w-3 h-3" />
        {("frontMatter" in item ? item.frontMatter?.title : item.name) ||
          item.route}
      </Link>
    </Button>
  )
}
