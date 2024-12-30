import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookHeart, Github } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <div>
      <Card className="w-full md:max-w-3xl">
        <CardHeader>
          <CardTitle>🎉 You&apos;re in!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Of course, none of this is a real app. It&apos;s just a demo to show
            the registration and authentication flows. But it&apos;s ready for
            you to get building!
          </p>
          <p>
            <strong>While you&apos;re here</strong>, here&apos;s some things to
            try:
          </p>
          <ul className="space-y-2 list-disc w-10/12 ml-8">
            <li>
              You can sign out using the user box at the bottom of the sidebar.
            </li>
            <li>
              After logging out, try signing in again with a different method.
            </li>
          </ul>
          <div className="pt-3 flex flex-row gap-2">
            <Button variant="outline" asChild>
              <Link href="https://ui.shadcn.com/docs">
                <BookHeart className="size-4 mr-2" />
                Documentation
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://jakeisonline.com/playground/tools/next-auth-template">
                <Github className="size-4 mr-2" />
                Source
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
