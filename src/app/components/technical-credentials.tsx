import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import type { CredentialCategory } from "@/lib/types";

interface TechnicalCredentialsProps {
  credentials?: readonly CredentialCategory[];
  className?: string;
}

export function TechnicalCredentials({
  credentials,
  className,
}: TechnicalCredentialsProps) {
  if (!credentials || credentials.length === 0) return null;

  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="technical-credentials-section">
        Selected Technical Credentials
      </h2>
      <div className="space-y-4 print:space-y-2">
        {credentials.map((group) => (
          <Card key={group.category} className="border-none">
            <CardHeader>
              <h3 className="text-sm font-semibold text-foreground/90 print:text-[12px]">
                {group.category}
              </h3>
            </CardHeader>
            <CardContent className="mt-2">
              <ul
                className="space-y-1.5 text-sm text-foreground/80 print:space-y-1 print:text-[12px]"
                aria-label={`Credentials for ${group.category}`}
              >
                {group.items.map((item) => (
                  <li
                    key={`${group.category}-${item.title}`}
                    className="flex items-baseline justify-between gap-x-2"
                  >
                    <span>{item.title}</span>
                    <span className="shrink-0 text-xs font-mono tabular-nums text-muted-foreground print:text-[10px]">
                      {item.year}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
