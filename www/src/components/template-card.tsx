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
        "flex flex-col rounded-xl p-4 border text-card-foreground shadow-sm mx-auto w-full bg-background border-border/70",
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
    <h3
      className={cn(
        "text-3xl font-bold flex flex-col-reverse md:flex-row",
        className,
      )}
    >
      {children}
    </h3>
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
        "font-normal bg-muted text-muted-foreground md:ml-auto mr-auto mb-2 md:mb-0 md:mr-0 select-none",
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
