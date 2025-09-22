"use client";

import type { Email } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ReplyIcon,
  ReplyAllIcon,
  ForwardIcon,
  ArchiveIcon,
  Trash2Icon,
  StarIcon,
  MoreHorizontalIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EmailViewProps {
  email: Email;
  onReply: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onStar: () => void;
}

export function EmailView({
  email,
  onReply,
  onArchive,
  onDelete,
  onStar,
}: EmailViewProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="md:hidden">
            <ArrowLeftIcon />
          </Button>
          <h2 className="font-semibold text-gray-900 truncate">
            {email.subject}
          </h2>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReply}
            className="text-gray-600 hover:text-gray-900"
          >
            <ReplyIcon />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onStar}
            className={cn(
              "text-gray-600 hover:text-gray-900",
              email.isStarred && "text-yellow-500 hover:text-yellow-600",
            )}
          >
            <StarIcon
              className={cn("h-4 w-4", email.isStarred && "fill-current")}
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onArchive}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArchiveIcon />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-gray-600 hover:text-red-600"
          >
            <Trash2Icon />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <ReplyAllIcon />
                Reply all
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ForwardIcon />
                Forward
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Email Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {/* Sender Info */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                {getInitials(email.sender)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {email.sender}
                  </h3>
                  <p className="text-sm text-gray-600">{email.senderEmail}</p>
                </div>
                <div className="text-right">
                  <time className="text-sm text-gray-500">
                    {format(email.timestamp, "MMM d, yyyy 'at' h:mm a")}
                  </time>
                  {!email.isRead && (
                    <Badge className="ml-2 text-xs bg-blue-100 text-blue-800">
                      Unread
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <span>to</span>
                <span className="font-medium">{email.recipient}</span>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-900 leading-relaxed">
              {email.content}
            </div>
          </div>

          {/* Attachments */}
          {email.attachments && email.attachments.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">
                Attachments ({email.attachments.length})
              </h4>
              <div className="space-y-2">
                {email.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {attachment.name}
                      </p>
                      <p className="text-sm text-gray-500">{attachment.size}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Reply Actions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <Button
            onClick={onReply}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ReplyIcon />
            Reply
          </Button>
          <Button variant="outline">
            <ReplyAllIcon />
            Reply all
          </Button>
          <Button variant="outline">
            <ForwardIcon />
            Forward
          </Button>
        </div>
      </div>
    </div>
  );
}
