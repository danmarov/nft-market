import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SelectedItem {
  value: string;
  label: string;
  tgs?: string;
}

interface CatalogFilterProps {
  title: string;
  items: SelectedItem[];
  onFilterChange: (filterType: string, value: string) => void;
  className?: string;
  triggerClassName?: string;
  filterType: string;
  defaultSelected: SelectedItem;
  tgsClassName?: string;
}

export function CatalogFilter({
  items,
  title,
  filterType,
  defaultSelected,
  onFilterChange,
  className = "",
  triggerClassName = "",
  tgsClassName = "",
}: CatalogFilterProps) {
  const [selected, setSelected] = useState<SelectedItem>(defaultSelected);

  return (
    <Select
      value={selected.value}
      onValueChange={(value) => {
        const item =
          value === "all"
            ? { value: "all", label: `All ${title.replace("NFTs", "Name")}s` }
            : items.find((v) => v.value === value) || {
                value,
                label: value,
                tgs: undefined,
              };

        setSelected(item);
        onFilterChange(filterType, value);
      }}
      defaultValue={defaultSelected.value}
    >
      <SelectTrigger
        className={cn(
          "flex w-full h-12 border-none bg-card px-2 py-2 text-sm font-medium focus:outline-none focus:ring-0 focus:ring-offset-0",
          className
        )}
      >
        {!selected.tgs ? (
          <div className="flex flex-col text-start">
            <div className="text-xs text-muted-foreground">{title}</div>
            <span
              style={{ pointerEvents: "none" }}
              className={triggerClassName}
            >
              {selected.label}
            </span>
          </div>
        ) : (
          <div className={cn("flex items-center gap-2", triggerClassName)}>
            <span className={cn("size-6 relative block", tgsClassName)}>
              <tgs-player
                src={selected.tgs}
                style={{ width: "100%", height: "100%" }}
              />
            </span>
            {selected.label}
          </div>
        )}
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.label} value={item.value} className="">
            <div className="flex items-center gap-2">
              {item.tgs && (
                <span
                  className={cn(
                    "size-6 flex-shrink-0 flex items-center",
                    tgsClassName
                  )}
                >
                  <tgs-player
                    src={item.tgs}
                    style={{ width: "100%", height: "100%" }}
                  />
                </span>
              )}
              <span className="flex-grow">{item.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
