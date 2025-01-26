import { useEffect } from "react";
import { catalogData } from "@/lib/consts";
import { toSlug } from "@/lib/utils";
import { useSearchParams } from "react-router";
import { useStore } from "@/lib/store";

const ITEMS_PER_PAGE = 10;

export const useCatalogItems = () => {
  const [searchParams] = useSearchParams();
  const nameFilter = searchParams.get("name") || "all";
  const modelFilter = searchParams.get("model") || "all";
  const backgroundFilter = searchParams.get("background") || "all";
  const sortFilter = searchParams.get("sort") || "latest";

  const {
    setItems,
    setHasMore,
    setLoading,
    setIsInitialLoading,
    page,
    hasMore,
    setPage,
    isInitialLoading,
    items,
    loading,
    setIsInitialLoaded,
    isInitialLoaded,
  } = useStore();

  const fetchProduct = async (gift_id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return catalogData.find((item) => item.gift_id === gift_id);
  };
  const fetchMore = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filtered = catalogData;

    if (nameFilter !== "all") {
      filtered = filtered.filter((item) => toSlug(item.name) === nameFilter);
    }
    if (modelFilter && modelFilter !== "all") {
      try {
        const decodedModel = decodeURI(modelFilter);
        filtered = filtered.filter(
          (item) => item.properties.model === decodedModel
        );
      } catch {
        filtered = filtered.filter(
          (item) => item.properties.model === modelFilter
        );
      }
    }
    if (backgroundFilter && backgroundFilter !== "all") {
      try {
        const decodedBackground = decodeURI(backgroundFilter);
        filtered = filtered.filter(
          (item) => item.properties.backdrop === decodedBackground
        );
      } catch {
        filtered = filtered.filter(
          (item) => item.properties.backdrop === backgroundFilter
        );
      }
    }
    const sorted = (() => {
      switch (sortFilter) {
        case "price-asc":
          return [...filtered].sort((a, b) => a.price - b.price);
        case "price-desc":
          return [...filtered].sort((a, b) => b.price - a.price);
        case "gift-id-asc":
          return [...filtered].sort((a, b) => a.gift_id - b.gift_id);
        case "gift-id-desc":
          return [...filtered].sort((a, b) => b.gift_id - a.gift_id);
        case "latest":
        default:
          return [...filtered].sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
      }
    })();
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const chunk = sorted.slice(start, end);
    if (chunk.length > 0) {
      setItems((prev) => [...prev, ...chunk]);
    }
    setHasMore(end < filtered.length);
    setLoading(false);
  };
  useEffect(() => {
    fetchMore().finally(() => {
      setIsInitialLoaded(true);
      setIsInitialLoading(false);
    });

    return () => {
      setItems([]);
      setPage(0);
      setHasMore(true);
      setIsInitialLoaded(false);
    };
  }, [
    nameFilter,
    modelFilter,
    backgroundFilter,
    sortFilter,
    setIsInitialLoaded,
  ]);

  return {
    items,
    loading,
    hasMore,
    fetchMore,
    isInitialLoading,
    isInitialLoaded,
    fetchProduct,
  };
};
