import Catalog from "@/components/common/catalog";
import { CatalogFilter } from "@/components/common/catalog/catalog.filter";
import MainLayout from "@/components/layouts/main-layout";
import { useCatalogItems } from "@/hooks/useCatalogItems";
import { useFilterItems } from "@/hooks/useFilterItems";

export default function HomePage() {
  const catalogState = useCatalogItems();
  const {
    updateFilter,
    sortFilterVariants,
    modelItems,
    nameFilterVariants,
    nameSelectedItem,
    modelSelectedItem,
    nameFilter,
    backgroundItems,
    backgroundSelectedItem,
    modelFilter,
    backgroundFilter,
    sortSelectedItem,
    sortFilter,
  } = useFilterItems();

  return (
    <MainLayout>
      <div className="p-2">
        <div className="w-full mb-2">
          <div className="grid grid-cols-12 gap-2">
            <CatalogFilter
              key={`name-${nameFilter}`}
              title="NFTs"
              className="col-span-6"
              filterType="name"
              items={nameFilterVariants}
              onFilterChange={(filterType, value) =>
                updateFilter(filterType, value)
              }
              defaultSelected={nameSelectedItem}
            />
            <CatalogFilter
              key={`model-${nameFilter}-${modelFilter}`}
              title="Model"
              className="col-span-6"
              filterType="model"
              tgsClassName="size-9"
              triggerClassName="text-xs"
              items={modelItems}
              onFilterChange={(filterType, value) =>
                updateFilter(filterType, value)
              }
              defaultSelected={modelSelectedItem}
            />
            <CatalogFilter
              key={`background-${nameFilter}-${backgroundFilter}`}
              title="Background"
              className="col-span-6"
              filterType="background"
              triggerClassName="text-xs"
              items={backgroundItems}
              onFilterChange={updateFilter}
              defaultSelected={backgroundSelectedItem}
            />
            <CatalogFilter
              key={`sort-${sortFilter}`}
              title="Sort"
              className="col-span-6"
              filterType="sort"
              triggerClassName="text-xs"
              items={sortFilterVariants}
              onFilterChange={(filterType, value) =>
                updateFilter(filterType, value)
              }
              defaultSelected={sortSelectedItem}
            />
          </div>
        </div>

        <Catalog {...catalogState} />
      </div>
    </MainLayout>
  );
}
