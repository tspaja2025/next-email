"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, PaperclipIcon, TypeIcon } from "lucide-react";
import type { EmailComposeProps } from "@/lib/types";

export function EmailCompose({ isOpen, onClose, onSend }: EmailComposeProps) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!to || !subject || !content) return;

    setIsLoading(true);

    // Simulate sending delay
    setTimeout(() => {
      onSend({
        sender: "Me",
        senderEmail: "me@gmail.com",
        recipient: to,
        subject: subject,
        content: content,
        folder: "sent",
      });

      // Reset form
      setTo("");
      setSubject("");
      setContent("");
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setTo("");
    setSubject("");
    setContent("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl sm:max-h-[80vh] p-0">
        <div className="flex flex-col h-full max-h-[80vh]">
          {/* Header */}
          <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
            <DialogTitle className="text-lg font-semibold">
              New Message
            </DialogTitle>
          </DialogHeader>

          {/* Form */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                type="email"
                placeholder="recipient@example.com"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Message</Label>
              <Textarea
                id="content"
                placeholder="Write your message here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Button
                onClick={handleSend}
                disabled={!to || !subject || !content || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" disabled>
                <PaperclipIcon />
              </Button>
              <Button variant="ghost" size="sm" disabled>
                <TypeIcon />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
