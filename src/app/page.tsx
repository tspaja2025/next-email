"use client";

import { useState } from "react";
import { EmailSidebar } from "@/components/email/EmailSidebar";
import { EmailList } from "@/components/email/EmailList";
import { EmailView } from "@/components/email/EmailView";
import { EmailCompose } from "@/components/email/EmailCompose";
import { EmailSearchBar } from "@/components/email/EmailSearchBar";
import type { Email, EmailFolder } from "@/lib/types";
import { mockEmails } from "@/lib/mock-emails";

export default function Home() {
  const [selectedFolder, setSelectedFolder] = useState<EmailFolder>("inbox");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [emails, setEmails] = useState<Email[]>(mockEmails);

  const filteredEmails = emails.filter((email) => {
    const matchesFolder = email.folder === selectedFolder;
    const matchesSearch =
      searchQuery === "" ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFolder && matchesSearch;
  });

  const handleEmailAction = (action: string, email: Email) => {
    setEmails((prevEmails) =>
      prevEmails.map((e) =>
        e.id === email.id
          ? {
              ...e,
              isStarred: action === "star" ? !e.isStarred : e.isStarred,
              folder: action === "archive" ? "trash" : e.folder,
              isRead: action === "markUnread" ? false : e.isRead,
            }
          : e,
      ),
    );
  };

  const handleSendEmail = (
    newEmail: Omit<Email, "id" | "timestamp" | "isRead" | "isStarred">,
  ) => {
    const email: Email = {
      ...newEmail,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: true,
      isStarred: false,
    };
    setEmails((prev) => [email, ...prev]);
  };

  return (
    <div className="flex h-screen">
      <EmailSidebar
        selectedFolder={selectedFolder}
        onFolderSelect={setSelectedFolder}
        onComposeClick={() => setIsComposeOpen(true)}
      />

      <div className="flex-1 flex flex-col">
        <EmailSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="flex-1 flex overflow-hidden">
          <div className="w-96 border-r border-gray-200 flex flex-col">
            <EmailList
              emails={filteredEmails}
              selectedEmail={selectedEmail}
              onEmailSelect={setSelectedEmail}
              onEmailAction={handleEmailAction}
            />
          </div>

          <div className="flex-1">
            {selectedEmail ? (
              <EmailView
                email={selectedEmail}
                onReply={() => setIsComposeOpen(true)}
                onArchive={() => handleEmailAction("archive", selectedEmail)}
                onDelete={() => handleEmailAction("delete", selectedEmail)}
                onStar={() => handleEmailAction("star", selectedEmail)}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-2">
                    No email selected
                  </h3>
                  <p>Select an email from the list to view its contents</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <EmailCompose
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSendEmail}
      />
    </div>
  );
}
