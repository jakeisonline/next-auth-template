import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import MagicSignInDialogForm from "./dialog-form"

export function MagicSignInButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Send me a magic link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <MagicSignInDialogForm />
      </DialogContent>
    </Dialog>
  )
}
