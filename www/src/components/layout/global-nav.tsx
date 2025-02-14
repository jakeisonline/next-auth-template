"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"

const demoItems: {
  title: string
  description: string
  href?: string
}[] = [
  {
    title: "One to One",
    description:
      "Each user has their own isolated account, and accounts do not support additional users.",
    href: "https://next-auth-template-one-to-one.vercel.app",
  },
  {
    title: "One to Many",
    description:
      "An account can have many users, but each user belongs to only 1 account.",
    href: "https://next-auth-template-one-to-many.vercel.app",
  },
  {
    title: "Many to Many",
    description:
      "An account can have multiple users, and a user can belong to multiple accounts.",
  },
]

export default function GlobalNav({ className }: { className?: string }) {
  return (
    <NavigationMenu className={cn("ml-8", className)}>
      <NavigationMenuList className="flex flex-row gap-4">
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Live Demo</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              {demoItems.map((item) => (
                <li key={item.title} className="cursor-pointer">
                  <NavigationMenuLink asChild>
                    <a
                      href={item.href}
                      target="_blank"
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      )}
                    >
                      <div className="text-sm font-medium leading-none">
                        {item.title}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {item.description}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
