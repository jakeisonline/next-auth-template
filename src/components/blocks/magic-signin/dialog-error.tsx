import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ServerActionResponse } from "@/lib/types"
import { CircleX } from "lucide-react"

export function MagicSignInDialogError({
  state,
}: {
  state: ServerActionResponse | null
}) {
  if (!state?.messages) return null

  return (
    <>
      {state.messages.map((message, index) => (
        <Alert key={index} className="my-4 bg-red-100">
          <CircleX className="h-4 w-4 stroke-red-700" />
          <AlertTitle>{message.title}</AlertTitle>
          <AlertDescription>{message.body}</AlertDescription>
        </Alert>
      ))}
    </>
  )
}
