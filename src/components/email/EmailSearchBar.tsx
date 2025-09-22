"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { EmailSearchBarProps } from "@/lib/types";
import { SearchIcon, FilterIcon } from "lucide-react";

export function EmailSearchBar({
  searchQuery,
  onSearchChange,
}: EmailSearchBarProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 bg-white">
      <div className="flex-1 relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search mail..."
          className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Button
        variant="outline"
        size="sm"
        className="text-gray-600 hover:text-gray-900"
      >
        <FilterIcon />
        Filter
      </Button>
    </div>
  );
}
