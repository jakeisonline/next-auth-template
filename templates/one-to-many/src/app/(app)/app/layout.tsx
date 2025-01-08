import "../../globals.css"

import { fetchCurrentUser } from "@/actions/user/fetch-current-user"
import { AppSidebar } from "@/components/layout/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await fetchCurrentUser()

  if (!currentUser || !currentUser.id) {
    return redirect("/signin")
  }

  // Persist the open/closed state of the sidebar in a cookie
  const cookieStore = await cookies()
  const sidebarDefaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html lang="en">
      <body className="bg-background flex min-h-dvh flex-col items-center overflow-x-clip overflow-y-scroll">
        <SidebarProvider defaultOpen={sidebarDefaultOpen}>
          <AppSidebar
            collapsible="icon"
            variant="inset"
            currentUser={currentUser}
          />
          <SidebarInset className="peer-data-[variant=inset]:max-h-[calc(100svh-theme(spacing.4))]">
            <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Inbox</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="[&::-webkit-scrollbar-thumb]:bg-primary/20 hover:[&::-webkit-scrollbar-thumb]:bg-primary/40 hover:[&::-webkit-scrollbar-track]:bg-primary/10 flex flex-1 flex-col gap-4 overflow-y-scroll p-4 pt-0 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-2">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
