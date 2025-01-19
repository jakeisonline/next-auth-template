import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function TemplateCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl bg-accent p-4 border text-card-foreground shadow-sm mx-auto w-full bg-white bg-opacity-35 border-border/70",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function TemplateCardTitle({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <h2 className={cn("text-2xl font-bold flex", className)}>{children}</h2>
  )
}

export function TemplateCardBadge({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <Badge
      className={cn(
        "ml-auto font-normal bg-muted text-muted-foreground select-none",
        className,
      )}
    >
      {children}
    </Badge>
  )
}

export function TemplateCardDescription({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <p className={cn("text-muted-foreground/70 mt-2", className)}>{children}</p>
  )
}

export function TemplateCardContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn("mt-4", className)}>{children}</div>
}
