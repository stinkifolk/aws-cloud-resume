import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import type { SkillGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

type Skills = readonly string[];

interface SkillsListProps {
  skills: Skills;
  className?: string;
}

/**
 * Renders a list of skills as badges
 */
function SkillsList({ skills, className }: SkillsListProps) {
  return (
    <ul
      className={cn("flex list-none flex-wrap gap-1 p-0", className)}
      aria-label="List of skills"
    >
      {skills.map((skill) => (
        <li key={skill}>
          <Badge className="print:text-[10px]" aria-label={`Skill: ${skill}`}>
            {skill}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

interface SkillsProps {
  skills: Skills;
  skillsByCategory?: readonly SkillGroup[];
  className?: string;
}

/**
 * Skills section component
 * Displays a list of professional skills, either grouped by category or as badges
 */
export function Skills({ skills, skillsByCategory, className }: SkillsProps) {
  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="skills-section">
        Skills
      </h2>
      {skillsByCategory && skillsByCategory.length > 0 ? (
        <div className="space-y-3 print:space-y-1.5">
          {skillsByCategory.map((group) => (
            <div key={group.name} className="space-y-1.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground print:text-[10px]">
                {group.name}
              </h3>
              {group.description && (
                <p className="text-xs text-foreground/80 print:text-[10px] leading-relaxed">
                  {group.description}
                </p>
              )}
              {group.skills && group.skills.length > 0 && (
                <SkillsList skills={group.skills} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <SkillsList skills={skills} />
      )}
    </Section>
  );
}
