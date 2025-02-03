import { cn } from "@/lib/utils"
import {
  Check,
  CircleUser,
  DatabaseZapIcon,
  KeyRound,
  LayoutTemplate,
  LockKeyhole,
  Plus,
  WandSparkles,
} from "lucide-react"

const icons = {
  Check,
  CircleUser,
  DatabaseZapIcon,
  KeyRound,
  LayoutTemplate,
  LockKeyhole,
  Plus,
  WandSparkles,
}

export function Feature({
  icon,
  className,
  children,
}: {
  icon?: keyof typeof icons
  className?: string
  children: React.ReactNode
}) {
  const IconSlot = icons[icon as keyof typeof icons] || Check

  return (
    <li className={cn("flex flex-row gap-2 items-start", className)}>
      <IconSlot className="mt-1 h-4 w-4" />
      {children}
    </li>
  )
}
