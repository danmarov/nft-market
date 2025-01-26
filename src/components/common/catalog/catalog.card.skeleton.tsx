import { Skeleton } from "@/components/ui/skeleton";

export const CatalogCardSkeleton = () => {
  return (
    <div className="w-full p-2 bg-card rounded-md border border-transparent">
      <Skeleton className="mb-4 aspect-square rounded-md" />
      <div className="p-2 pt-0">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
      <div className="w-full p-2 pt-0">
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  );
};
