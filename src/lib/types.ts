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
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
}

export type EmailFolder =
  | "inbox"
  | "sent"
  | "drafts"
  | "spam"
  | "trash"
  | "starred";

export interface FolderInfo {
  id: EmailFolder;
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  count?: number;
}

export interface EmailSidebarProps {
  selectedFolder: EmailFolder;
  onFolderSelect: (folder: EmailFolder) => void;
  onComposeClick: () => void;
}

export interface EmailSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  onEmailSelect: (email: Email) => void;
  onEmailAction: (action: string, email: Email) => void;
}

export interface EmailComposeProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (
    email: Omit<Email, "id" | "timestamp" | "isRead" | "isStarred">,
  ) => void;
}

export interface EmailCardProps {
  email: Email;
  isSelected: boolean;
  onSelect: () => void;
  onAction: (action: string, email: Email) => void;
}
