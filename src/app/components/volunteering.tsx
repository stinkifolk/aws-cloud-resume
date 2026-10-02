import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import type { VolunteeringItem } from "@/lib/types";

interface VolunteeringProps {
  volunteering?: readonly VolunteeringItem[];
  className?: string;
}

export function Volunteering({ volunteering, className }: VolunteeringProps) {
  if (!volunteering || volunteering.length === 0) return null;

  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="volunteering-section">
        Volunteering
      </h2>
      <div
        className="space-y-4 print:space-y-0"
        role="feed"
        aria-labelledby="volunteering-section"
      >
        {volunteering.map((item) => (
          <article key={`${item.organization}-${item.start}`}>
            <Card className="border-none py-1 print:py-0">
              <CardHeader className="space-y-1 print:space-y-0.5">
                <div className="flex items-baseline justify-between gap-x-2 text-base">
                  <h3 className="font-semibold leading-snug print:text-sm">
                    {item.organization}
                    {item.location && (
                      <span className="font-normal text-muted-foreground text-xs ml-2 print:text-[10px]">
                        | {item.location}
                      </span>
                    )}
                  </h3>
                  <div
                    className="text-xs font-mono tabular-nums text-muted-foreground shrink-0 print:text-[10px]"
                    title={`Period: ${item.start} to ${item.end ?? "Present"}`}
                  >
                    {item.start} - {item.end ?? "Present"}
                  </div>
                </div>

                <h4 className="text-sm font-medium leading-none text-foreground/90 print:text-[12px]">
                  {item.role}
                </h4>
              </CardHeader>

              <CardContent>
                <div className="mt-2 text-xs text-foreground/80 leading-relaxed print:mt-1 print:text-[10px] text-pretty">
                  {item.description}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="list-inside list-disc mt-1.5 space-y-1">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          </article>
        ))}
      </div>
    </Section>
  );
}
