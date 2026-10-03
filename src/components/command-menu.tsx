"use client";

import { CommandIcon } from "lucide-react";
import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { RESUME_DATA } from "@/data/resume-data";
import { Button } from "./ui/button";

export const CommandMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [isMac, setIsMac] = React.useState(false);
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    setIsMac(window.navigator.userAgent.includes("Mac"));

    // Ensure light mode only
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }

    const down = (e: KeyboardEvent) => {
      if ((e.key === "j" || e.key === "k") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const copyToClipboard = async (text: string, key: string, message: string = "Copied!") => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      setCopiedKey(key);
      setToastMessage(message);

      setTimeout(() => {
        setCopiedKey(null);
        setOpen(false);
      }, 400);

      setTimeout(() => {
        setToastMessage(null);
      }, 2500);
    } catch (error) {
      console.error("Failed to copy:", error);
      setCopiedKey(null);
    }
  };

  return (
    <>
      <p className="fixed bottom-0 left-0 right-0 hidden bg-gradient-to-t from-[hsl(var(--background))] to-transparent p-1 pt-6 text-center text-sm text-muted-foreground xl:block print:hidden">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>+J
        </kbd>{" "}
        to open the command menu
      </p>
      <Button
        onClick={() => setOpen((open) => !open)}
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 flex rounded-full shadow-2xl xl:hidden print:hidden"
        aria-label="Open command menu"
      >
        <CommandIcon className="my-6 size-6" />
      </Button>

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 rounded-full border bg-foreground text-background px-4 py-2 text-xs font-medium shadow-xl animate-fade-in print:hidden"
        >
          <span>{toastMessage}</span>
        </div>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem
              value="Print Resume"
              keywords={["pdf", "export", "save", "print", "download"]}
              onSelect={() => {
                setOpen(false);
                window.print();
              }}
            >
              <span>Print / Save as PDF</span>
              <CommandShortcut>{isMac ? "⌘P" : "Ctrl+P"}</CommandShortcut>
            </CommandItem>

            <CommandItem
              value="Copy Resume Link"
              keywords={["copy", "link", "url", "share"]}
              onClick={() => {
                copyToClipboard("https://cloud.ama24.my/", "link", "Link copied!");
              }}
            >
              <span>
                {copiedKey === "link" ? "Copied!" : "Copy Resume Link"}
              </span>
            </CommandItem>

            {RESUME_DATA.contact.email && (
              <CommandItem
                value="Copy Email"
                keywords={["email", "mail", "contact", "copy"]}
                onClick={() => {
                  copyToClipboard(RESUME_DATA.contact.email, "email", "Email copied!");
                }}
              >
                <span>
                  {copiedKey === "email" ? "Copied!" : "Copy Email"}
                </span>
              </CommandItem>
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
