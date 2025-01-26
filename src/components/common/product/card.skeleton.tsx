import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col min-h-[calc(100svh-8.5rem)] w-full items-end justify-start p-4">
      <div className="w-full overflow-hidden rounded-md bg-card mb-16">
        <div className="w-full p-4 aspect-square">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="p-4 pt-0">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2 pt-0">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="mt-1 flex w-full gap-3">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
