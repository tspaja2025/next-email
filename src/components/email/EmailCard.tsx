"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  StarIcon,
  ArchiveIcon,
  Trash2Icon,
  MoreHorizontalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EmailCardProps } from "@/lib/types";

export function EmailCard({
  email,
  isSelected,
  onSelect,
  onAction,
}: EmailCardProps) {
  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAction("star", email);
  };

  const handleArchiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAction("archive", email);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div
      className={cn(
        "p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 border-l-4",
        isSelected
          ? "bg-blue-50 border-l-blue-500"
          : email.isRead
            ? "border-l-transparent"
            : "border-l-blue-400 bg-blue-25",
      )}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        {/* Star */}
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "p-0 h-5 w-5 mt-1",
            email.isStarred
              ? "text-yellow-500 hover:text-yellow-600"
              : "text-gray-400 hover:text-gray-600",
          )}
          onClick={handleStarClick}
        >
          <StarIcon
            className={cn("h-4 w-4", email.isStarred && "fill-current")}
          />
        </Button>

        {/* Email Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span
              className={cn(
                "text-sm truncate",
                email.isRead
                  ? "font-normal text-gray-700"
                  : "font-semibold text-gray-900",
              )}
            >
              {email.sender}
            </span>
            <div className="flex items-center gap-2 ml-2">
              <span className="text-xs text-gray-500">
                {format(email.timestamp, "MMM d")}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-4 w-4 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => onAction("markUnread", email)}
                  >
                    Mark as unread
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleArchiveClick}>
                    <ArchiveIcon />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onAction("delete", email)}>
                    <Trash2Icon />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <h3
            className={cn(
              "text-sm mb-1 truncate",
              email.isRead
                ? "font-normal text-gray-800"
                : "font-medium text-gray-900",
            )}
          >
            {email.subject}
          </h3>

          <p className="text-xs text-gray-600 truncate">
            {truncateText(email.content.replace(/\n/g, " "), 100)}
          </p>

          {!email.isRead && (
            <Badge
              variant="secondary"
              className="mt-2 text-xs bg-blue-100 text-blue-800"
            >
              Unread
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
