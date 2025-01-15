import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import { Ban, CircleX } from "lucide-react"

export function ErrorCard({
  icon = "default",
  children,
}: {
  icon?: "default" | "ban"
  children: React.ReactNode
}) {
  return (
    <Card className="mx-auto w-[24rem] border-0 shadow-none md:border md:shadow-sm">
      <CardHeader className="flex flex-col items-center gap-3 text-center">
        <Avatar className="size-32">
          <AvatarFallback>
            {icon === "ban" ? (
              <Ban className="size-16 stroke-1" />
            ) : (
              <CircleX className="size-16 stroke-1" />
            )}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">{children}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}
