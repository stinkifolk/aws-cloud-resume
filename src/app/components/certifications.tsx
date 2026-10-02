import { Card, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import type { CertificationItem } from "@/lib/types";

interface CertificationsProps {
  certifications?: readonly CertificationItem[];
  className?: string;
}

export function Certifications({
  certifications,
  className,
}: CertificationsProps) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="certifications-section">
        Certifications and Licenses
      </h2>
      <div className="space-y-3 print:space-y-1.5">
        {certifications.map((cert) => (
          <Card key={cert.title} className="border-none py-0.5 print:py-0">
            <CardHeader className="space-y-0.5">
              <div className="flex items-baseline justify-between gap-x-2 text-base">
                <h3 className="font-semibold leading-snug text-sm print:text-[12px]">
                  {cert.title}
                  {cert.issuer && (
                    <span className="font-normal text-muted-foreground text-xs ml-2 print:text-[10px]">
                      | {cert.issuer}
                    </span>
                  )}
                </h3>
                <div
                  className="text-xs font-mono tabular-nums text-muted-foreground shrink-0 print:text-[10px]"
                  title={`Certification date: ${cert.date}`}
                >
                  {cert.date}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Section>
  );
}
