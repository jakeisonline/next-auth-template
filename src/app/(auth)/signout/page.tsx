import { DoSignout } from "@/components/signout"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function SignoutPage() {
  return (
    <Card className="mx-auto w-[24rem]">
      <CardContent>
        <div className="text-center pt-10">
          <span className="text-8xl">👋</span>
          <p className="mt-6 flex items-center justify-center gap-1.5">
            <Loader2 className="h-4 w-4 animate-spin inline-block" />
            Signing you out...
          </p>
        </div>
      </CardContent>
      <DoSignout />
    </Card>
  )
}
