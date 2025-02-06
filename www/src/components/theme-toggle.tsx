"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useCallback, useEffect, useState } from "react"

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  /* We don't want this component to render until it's mounted,
  as the server doesn't understand nor care about a user's theme preference */

  const prefersDarkMode = useCallback(() => {
    return (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    )
  }, [theme])

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setTheme(isDarkMode ? "dark" : "light")
    setMounted(true)
  }, [])

  useEffect(() => {
    document.documentElement.classList[prefersDarkMode() ? "add" : "remove"](
      "dark",
    )
  }, [theme, prefersDarkMode])

  if (!mounted) {
    return (
      <ThemeToggleWrapper className="h-10 w-10">
        <Skeleton className="mr-3 mt-3 h-4 w-4 rounded-full bg-accent" />
      </ThemeToggleWrapper>
    )
  }

  return (
    <ThemeToggleWrapper>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Choose between dark and light modes"
            className={cn(className)}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background">
          {["light", "dark", "system"].map((theme) => (
            <DropdownMenuItem
              className="capitalize hover:cursor-pointer"
              key={theme}
              onClick={() => setTheme(theme as "light" | "dark")}
            >
              {theme}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ThemeToggleWrapper>
  )
}

function ThemeToggleWrapper({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn("flex justify-end", className)}>{children}</div>
}
