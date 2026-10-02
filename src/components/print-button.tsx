"use client";

import { PrinterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="size-8 print:hidden"
      onClick={() => window.print()}
      title="Print or Save as PDF"
      aria-label="Print or Save as PDF"
    >
      <PrinterIcon className="size-4" aria-hidden="true" />
    </Button>
  );
}
