"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "cn";

export interface AdminFilterSelect {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}

interface AdminFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  selects?: AdminFilterSelect[];
  className?: string;
}

// Filter bar Admin (design/admin/kelola-pengguna.md §3.5): search + dropdown,
// search di-debounce ±300ms.
export function AdminFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Cari...",
  selects = [],
  className,
}: AdminFilterBarProps) {
  const [draft, setDraft] = useState(searchValue);
  const [prevSearchValue, setPrevSearchValue] = useState(searchValue);

  // Derived state: sinkronkan draft saat parent mereset searchValue (mis. ganti tab).
  if (prevSearchValue !== searchValue) {
    setPrevSearchValue(searchValue);
    setDraft(searchValue);
  }

  useEffect(() => {
    if (draft === searchValue) return;
    const timer = setTimeout(() => onSearchChange(draft), 300);
    return () => clearTimeout(timer);
  }, [draft, searchValue, onSearchChange]);

  return (
    <div className={cn("flex flex-wrap items-center gap-6", className)}>
      <div className="flex h-9 w-56 items-center gap-2 rounded-control bg-admin-low px-3">
        <Search className="size-4 shrink-0 text-admin-secondary" />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-full flex-1 bg-transparent text-xs text-admin-heading outline-none placeholder:text-admin-secondary"
        />
      </div>

      {selects.map((select, index) => (
        <Select
          key={index}
          value={select.value}
          onValueChange={select.onValueChange}
        >
          <SelectTrigger className="h-9 w-auto min-w-40 rounded-control border-0 bg-admin-low text-xs text-admin-heading">
            <SelectValue placeholder={select.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {select.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
