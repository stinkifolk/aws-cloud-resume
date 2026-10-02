import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";

interface InterestsProps {
  interests?: readonly string[];
  className?: string;
}

export function Interests({ interests, className }: InterestsProps) {
  if (!interests || interests.length === 0) return null;

  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="interests-section">
        Interests
      </h2>
      <div className="flex flex-wrap gap-1">
        {interests.map((interest) => (
          <Badge
            key={interest}
            variant="secondary"
            className="print:text-[10px]"
          >
            {interest}
          </Badge>
        ))}
      </div>
    </Section>
  );
}
