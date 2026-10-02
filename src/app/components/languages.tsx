import { Section } from "@/components/ui/section";
import type { Language } from "@/lib/types";

interface LanguagesProps {
  languages?: readonly Language[];
  className?: string;
}

export function Languages({ languages, className }: LanguagesProps) {
  if (!languages || languages.length === 0) return null;

  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="languages-section">
        Languages
      </h2>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/80 print:text-[12px]">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-x-2">
            <span className="font-semibold text-foreground">{lang.name}:</span>
            <span>{lang.level}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
