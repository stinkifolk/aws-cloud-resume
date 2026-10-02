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
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "./ui/button";

export interface CommandMenuItem {
  url: string;
  title: string;
  keywords?: readonly string[];
}

export interface CommandMenuSectionItem {
  id: string;
  title: string;
  keywords?: readonly string[];
}

interface Props {
  links: CommandMenuItem[];
  projects?: CommandMenuItem[];
  sections?: CommandMenuSectionItem[];
}

export const CommandMenu = ({ links, projects, sections }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    setIsMac(window.navigator.userAgent.includes("Mac"));

    const down = (e: KeyboardEvent) => {
      if ((e.key === "j" || e.key === "k") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem
              value="Print"
              keywords={["pdf", "export", "save", "print"]}
              onSelect={() => {
                setOpen(false);
                window.print();
              }}
            >
              <span>Print</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Links">
            {links.map(({ url, title }) => (
              <CommandItem
                key={url}
                onSelect={() => {
                  setOpen(false);
                  window.open(url, "_blank");
                }}
              >
                <span>{title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          {sections && sections.length > 0 && (
            <CommandGroup heading="Page Sections">
              {sections.map(({ id, title, keywords }) => (
                <CommandItem
                  key={`section-${id}`}
                  value={title}
                  keywords={keywords ? [...keywords] : undefined}
                  onSelect={() => {
                    setOpen(false);
                    const element = document.getElementById(id);
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>{title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {projects && projects.length > 0 && (
            <CommandGroup heading="Projects">
              {projects.map(({ url, title, keywords }) => (
                <CommandItem
                  key={`project-${title}`}
                  value={title}
                  keywords={keywords ? [...keywords] : undefined}
                  onSelect={() => {
                    setOpen(false);
                    window.open(url, "_blank");
                  }}
                >
                  <span>{title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {links && links.length > 0 && (
            <CommandGroup heading="Links & Contact">
              {links.map(({ url, title, keywords }) => (
                <CommandItem
                  key={`link-${title}-${url}`}
                  value={title}
                  keywords={keywords ? [...keywords] : undefined}
                  onSelect={() => {
                    setOpen(false);
                    window.open(url, "_blank");
                  }}
                >
                  <span>{title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
};
