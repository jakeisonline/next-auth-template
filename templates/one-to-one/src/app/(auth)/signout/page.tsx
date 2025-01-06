import { DoSignout } from "@/components/signout"
import { Loader2 } from "lucide-react"

export default function SignoutPage() {
  return (
    <>
      <div className="pt-10 text-center">
        <span className="text-8xl">👋</span>
        <p className="mt-6 flex items-center justify-center gap-1.5">
          <Loader2 className="inline-block h-4 w-4 animate-spin" />
          Signing you out...
        </p>
      </div>
      <DoSignout />
    </>
  )
}
