import { Skeleton } from "@/components/ui/skeleton"

export default async function LoadingSkeleton({
  variant = "default",
}: {
  variant?: "default" | "settings"
}) {
  if (variant === "settings") {
    return (
      <div className="space-y-8">
        {/* Page header */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-32" /> {/* Page title */}
          <Skeleton className="h-4 w-64" /> {/* Description */}
        </div>

        {/* Settings sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-24" /> {/* Section title */}
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" /> {/* Setting row */}
              <Skeleton className="h-12 w-full" /> {/* Setting row */}
              <Skeleton className="h-12 w-full" /> {/* Setting row */}
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" /> {/* Section title */}
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" /> {/* Setting row */}
              <Skeleton className="h-12 w-full" /> {/* Setting row */}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  )
}
