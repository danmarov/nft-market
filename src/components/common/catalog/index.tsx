import CatalogCard from "./catalog.card";
import { CatalogCardSkeleton } from "./catalog.card.skeleton";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { GiftItem } from "@/lib/types";

interface CatalogProps {
  items: GiftItem[];
  loading: boolean;
  hasMore: boolean;
  fetchMore: () => Promise<void>;
  isInitialLoading: boolean;
  isInitialLoaded: boolean;
}

export default function Catalog({
  items,
  loading,
  hasMore,
  fetchMore,
  isInitialLoading,
  isInitialLoaded,
}: CatalogProps) {
  const lastCardRef = useIntersectionObserver({
    onIntersect: fetchMore,
    enabled: !loading && hasMore,
    rootMargin: "300px",
  });

  const renderSkeletons = (count: number) =>
    Array(count)
      .fill(0)
      .map((_, index) => <CatalogCardSkeleton key={`skeleton-${index}`} />);

  if (isInitialLoading) {
    return (
      <div className="grid w-full grid-cols-2 gap-2">{renderSkeletons(4)}</div>
    );
  }

  return (
    <div>
      <div
        className={cn(
          "grid w-full grid-cols-2 gap-2",
          loading ? "pb-[30px]" : "pb-[80px]",
          !loading && items.length === 0 && "pb-0"
        )}
      >
        {items.map((item, index) => (
          <div
            key={`${item.gift_id}-${index}`}
            ref={index === items.length - 1 ? lastCardRef : null}
          >
            <CatalogCard item={item} />
          </div>
        ))}
        {loading && renderSkeletons(isInitialLoaded ? 2 : 4)}
      </div>
      {!loading && items.length === 0 && (
        <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm mt-4 flex items-center justify-center px-4 py-8">
          <div className="text-sm font-semibold">
            No gifts found with the filters you selected
          </div>
        </div>
      )}
    </div>
  );
}
