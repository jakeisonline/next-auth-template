import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import MagicSignInDialogForm from "./dialog-form"

export function MagicSignInButton() {
  return (
    <>
      <div className="w-full border-t border-gray-200 mt-6 text-center">
        <p className="-translate-y-3 inline-block px-3 bg-card">or</p>
      </div>
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
    </>
  )
}
