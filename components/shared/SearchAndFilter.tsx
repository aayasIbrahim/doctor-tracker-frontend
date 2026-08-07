"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import { Search, Loader2, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterConfig } from "@/lib/types";

interface SearchAndFilterProps {
  searchPlaceholder?: string;
  filters?: FilterConfig[];
}

export function SearchAndFilter({
  searchPlaceholder = "Search...",
  filters = [],
}: SearchAndFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // General Filter & Search Handler
  const handleParamChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  // Preset Date Range Handler (Today, Last 7 Days, etc.)
  const handleDateRangeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    const today = new Date();
    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    params.delete("startDate");
    params.delete("endDate");

    if (value === "today") {
      params.set("startDate", formatDate(today));
      params.set("endDate", formatDate(today));
    } else if (value === "last_7_days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);

      params.set("startDate", formatDate(sevenDaysAgo));
      params.set("endDate", formatDate(today));
    } else if (value === "last_30_days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);

      params.set("startDate", formatDate(thirtyDaysAgo));
      params.set("endDate", formatDate(today));
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleReset = () => {
    startTransition(() => {
      router.replace(pathname);
    });
  };

  const hasActiveFilters = searchParams.toString().length > 0;

  
  const selectedDateRangeValue = useMemo(() => {
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    if (!startDate || !endDate) return "all";

    const today = new Date();
    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const todayStr = formatDate(today);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const sevenDaysAgoStr = formatDate(sevenDaysAgo);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const thirtyDaysAgoStr = formatDate(thirtyDaysAgo);

    if (startDate === todayStr && endDate === todayStr) return "today";
    if (startDate === sevenDaysAgoStr && endDate === todayStr)
      return "last_7_days";
    if (startDate === thirtyDaysAgoStr && endDate === todayStr)
      return "last_30_days";

    return "all";
  }, [searchParams]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card p-3 rounded-xl border border-border/60 shadow-2xs w-full">
      {/* Search Input Box */}
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          defaultValue={searchParams.get("searchTerm")?.toString()}
          onChange={(e) => handleParamChange("searchTerm", e.target.value)}
          className="pl-9 pr-8 h-9 text-xs border-border/60 bg-background"
        />
        {isPending && (
          <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 animate-spin text-primary" />
        )}
      </div>

      {/* Dynamic Filters */}
      <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap justify-end">
        {filters.map((filter) => {
          // 1. Single Date Picker Input
          if (filter.type === "date") {
            return (
              <Input
                key={filter.key}
                type="date"
                placeholder={filter.placeholder}
                defaultValue={searchParams.get(filter.key)?.toString() || ""}
                onChange={(e) => handleParamChange(filter.key, e.target.value)}
                disabled={isPending}
                className="h-9 w-full sm:w-36 text-xs bg-background border-border/60"
              />
            );
          }

        
          if (filter.type === "dateRange") {
            return (
              <Select
                key={filter.key}
                value={selectedDateRangeValue}
                onValueChange={(val) => handleDateRangeChange(val as string)}
                disabled={isPending}
              >
                <SelectTrigger className="h-9 min-w-[130px] w-full sm:w-auto text-xs bg-background border-border/60">
                  <SelectValue placeholder={filter.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">
                    All Time
                  </SelectItem>
                  {filter.options?.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="text-xs"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }

          // 3. Standard Select Dropdown (Gender, Status, Specialization)
          return (
            <Select
              key={filter.key}
              defaultValue={searchParams.get(filter.key)?.toString() }
              onValueChange={(val) =>
                handleParamChange(filter.key, val as string)
              }
              disabled={isPending}
            >
              <SelectTrigger className="h-9 min-w-[120px] w-full sm:w-auto text-xs bg-background border-border/60">
                <SelectValue placeholder={filter.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">
                  All {filter.placeholder}s
                </SelectItem>
                {filter.options?.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="text-xs"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        })}

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={isPending}
            className="h-9 text-xs text-muted-foreground hover:text-foreground px-2.5"
            title="Reset Filters"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
