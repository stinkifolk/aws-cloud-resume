import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import type { KeyCertification as KeyCertificationType } from "@/lib/types";

interface KeyCertificationProps {
  certification?: KeyCertificationType;
  className?: string;
}

export function KeyCertification({
  certification,
  className,
}: KeyCertificationProps) {
  if (!certification) return null;

  const { title, issuer, date } = certification;

  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="key-certification-section">
        Key Certification
      </h2>
      <Card className="border-none py-1 print:py-0">
        <CardHeader className="space-y-1 print:space-y-0.5">
          <div className="flex items-baseline justify-between gap-x-2 text-base">
            <h3 className="font-semibold leading-snug print:text-sm">
              {title}
            </h3>
            <div
              className="text-xs font-mono tabular-nums text-muted-foreground shrink-0 print:text-[10px]"
              title={`Certification date: ${date}`}
            >
              {date}
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-1 text-sm text-foreground/80 print:text-[12px]">
          {issuer}
        </CardContent>
      </Card>
    </Section>
  );
}
