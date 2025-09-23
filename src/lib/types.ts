import type { LucideProps } from "lucide-react";

export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  recipient: string;
  subject: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  folder: EmailFolder;
  attachments: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  size: string; // e.g., "123 KB"
  type: string; // MIME type like "application/pdf"
  file?: File; // optional reference to uploaded file
}

export interface EmailAttachmentProps {
  attachment: Attachment;
  onDownload?: (attachment: Attachment) => void;
}

export type EmailFolder =
  | "inbox"
  | "sent"
  | "drafts"
  | "spam"
  | "trash"
  | "starred";

export type EmailAction = "star" | "archive" | "delete" | "markUnread";

export interface FolderInfo {
  id: EmailFolder;
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  count?: number;
  unreadCount?: number;
}

export interface EmailSidebarProps {
  selectedFolder: EmailFolder;
  onFolderSelect: (folder: EmailFolder) => void;
  onComposeClick: () => void;
}

export interface EmailSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterClick?: () => void;
}

export type EmailFilter = "all" | "unread" | "starred";

export interface EmailSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter?: EmailFilter; // optional current filter
  onFilterChange?: (filter: EmailFilter) => void; // callback
}

export interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  onEmailSelect: (email: Email) => void;
  onEmailAction: (action: EmailAction, email: Email) => void;
}

export type NewEmail = Omit<Email, "id" | "timestamp" | "isRead" | "isStarred">;

export interface EmailComposeProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (email: NewEmail) => void;
}

export interface EmailCardProps {
  email: Email;
  isSelected: boolean;
  onSelect: () => void;
  onAction: (action: EmailAction, email: Email) => void;
}

export interface EmailViewProps {
  email: Email;
  onReply: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onStar: () => void;
}
