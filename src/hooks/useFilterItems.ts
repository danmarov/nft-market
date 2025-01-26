import { catalogData } from "@/lib/consts";
import { useStore } from "@/lib/store";
import { SelectedItem } from "@/lib/types";
import { toSlug } from "@/lib/utils";
import { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";

export const useFilterItems = () => {
  const { setItems, setPage, setHasMore, setIsInitialLoading } = useStore();
  const [searchParams] = useSearchParams();
  const nameFilter = searchParams.get("name") || "all";
  const modelFilter = searchParams.get("model") || "all";
  const backgroundFilter = searchParams.get("background") || "all";

  const uniqueItemsByName = useMemo(
    () =>
      Array.from(new Set(catalogData.map((item) => item.name))).map((name) => ({
        value: toSlug(name),
        tgs: catalogData.find((i) => i.name === name)?.tgs,
        label: name,
      })),
    []
  );

  const sortFilterVariants = useMemo(
    () => [
      { value: "latest", label: "Latest" },
      { value: "price-asc", label: "Price: Low to High" },
      { value: "price-desc", label: "Price: High to Low" },
      { value: "gift-id-asc", label: "Gift ID: Ascending" },
      { value: "gift-id-desc", label: "Gift ID: Descending" },
    ],
    []
  );

  const sortFilter = searchParams.get("sort") || "latest";
  const sortSelectedItem = useMemo(
    () =>
      sortFilterVariants.find((item) => item.value === sortFilter) ||
      sortFilterVariants[0],
    [sortFilter, sortFilterVariants]
  );

  const [nameFilterVariants] = useState([
    { value: "all", label: "All Names" },
    ...uniqueItemsByName,
  ]);

  const nameSelectedItem = useMemo(() => {
    if (nameFilter === "all") {
      return { value: "all", label: "All Names" };
    }
    return (
      nameFilterVariants.find((item) => item.value === nameFilter) || {
        value: "all",
        label: "All Names",
      }
    );
  }, [nameFilter, nameFilterVariants]);
  const navigate = useNavigate();

  const modelFilterVariants = useMemo(() => {
    if (nameFilter === "all") {
      return [{ value: "all", label: "All Models" }];
    }

    const modelsForName = catalogData
      .filter((item) => toSlug(item.name) === nameFilter)
      .map((item) => ({
        value: item.properties.model,
        label: item.properties.model,
        tgs: item.tgs,
      }));

    return [
      { value: "all", label: "All Models" },
      ...Array.from(new Set(modelsForName.map((m) => m.value))).map(
        (value) => modelsForName.find((m) => m.value === value)!
      ),
    ];
  }, [nameFilter]);

  const modelSelectedItem = useMemo(() => {
    if (modelFilter === "all") {
      return { value: "all", label: "All Models" };
    }
    return (
      modelFilterVariants.find((item) => item.value === modelFilter) || {
        value: "all",
        label: "All Models",
      }
    );
  }, [modelFilter, modelFilterVariants]);
  const getUniqueItems = useMemo(
    () =>
      Array.from(new Set(catalogData.map((item) => item.name))).map((name) => ({
        value: toSlug(name),
        tgs: catalogData.find((i) => i.name === name)?.tgs,
        label: name,
      })),
    []
  );

  const currentItem = useMemo(
    () =>
      getUniqueItems.find((item) => item.value === nameFilter) || {
        value: "all",
        label: "All Names",
      },
    [nameFilter, getUniqueItems]
  );

  const getUniqueCatalogItems = (item: SelectedItem) => {
    const uniqueNames = new Set(catalogData.map((item) => item.name));
    const result = Array.from(uniqueNames).map((name) => ({
      value: toSlug(name),
      tgs: catalogData.find((i) => i.name === name)?.tgs,
      label: name,
    }));
    return [item, ...result];
  };

  const getSelectedItem = () => {
    const allItems = getUniqueCatalogItems({
      value: "all",
      label: "All Names",
    });
    return allItems.find((item) => item.value === nameFilter) || allItems[0];
  };

  const updateFilter = (filterType: string, filterName: string) => {
    const params = new URLSearchParams(searchParams);

    if (filterType === "name") {
      params.delete("model");
      params.delete("background");
    }
    if (filterName === "all") {
      params.delete(filterType);
    } else {
      params.set(filterType, filterName);
    }

    if (filterType === "sort" && filterName === "latest") {
      params.delete("sort");
    }

    setIsInitialLoading(true);
    setItems([]);
    setPage(0);
    setHasMore(true);
    navigate(`?${params.toString()}`);
  };

  const backgroundFilterVariants = useMemo(() => {
    if (nameFilter === "all") {
      return [{ value: "all", label: "All Backgrounds" }];
    }

    const backgroundsForName = catalogData
      .filter((item) => toSlug(item.name) === nameFilter)
      .map((item) => ({
        value: item.properties.backdrop,
        label: item.properties.backdrop,
      }));

    return [
      { value: "all", label: "All Backgrounds" },
      ...Array.from(new Set(backgroundsForName.map((b) => b.value))).map(
        (value) => backgroundsForName.find((b) => b.value === value)!
      ),
    ];
  }, [nameFilter]);

  const backgroundSelectedItem = useMemo(() => {
    if (backgroundFilter === "all") {
      return { value: "all", label: "All Backgrounds" };
    }
    return (
      backgroundFilterVariants.find(
        (item) => item.value === backgroundFilter
      ) || {
        value: "all",
        label: "All Backgrounds",
      }
    );
  }, [backgroundFilter, backgroundFilterVariants]);

  return {
    filter: nameFilter,
    uniqueItems: getUniqueItems,
    currentItem,
    getUniqueCatalogItems,
    getSelectedItem,
    updateFilter,
    modelItems: modelFilterVariants,
    modelSelectedItem,
    nameFilterVariants,
    nameSelectedItem,
    nameFilter,
    backgroundItems: backgroundFilterVariants,
    backgroundSelectedItem,
    modelFilter,
    backgroundFilter,
    sortSelectedItem,
    sortFilterVariants,
    sortFilter,
  };
};
