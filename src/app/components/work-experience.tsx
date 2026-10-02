import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import type { RESUME_DATA } from "@/data/resume-data";
import { cn } from "@/lib/utils";

type WorkExperience = (typeof RESUME_DATA)["work"][number];
type WorkBadges = readonly string[];

interface BadgeListProps {
  className?: string;
  badges: WorkBadges;
}

/**
 * Renders a list of badges for work experience
 */
function BadgeList({ className, badges }: BadgeListProps) {
  if (badges.length === 0) return null;

  return (
    <ul
      className={cn("flex flex-wrap list-none gap-1 p-0", className)}
      aria-label="Technologies used"
    >
      {badges.map((badge) => (
        <li key={badge}>
          <Badge
            variant="secondary"
            className="align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
          >
            {badge}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

interface WorkPeriodProps {
  start: WorkExperience["start"];
  end?: WorkExperience["end"];
}

/**
 * Displays the work period in a consistent format
 */
function WorkPeriod({ start, end }: WorkPeriodProps) {
  return (
    <div
      className="text-xs font-mono tabular-nums text-muted-foreground shrink-0 print:text-[10px]"
      title={`Employment period: ${start} to ${end ?? "Present"}`}
    >
      {start} - {end ?? "Present"}
    </div>
  );
}

interface CompanyLinkProps {
  company: WorkExperience["company"];
  link: WorkExperience["link"];
}

/**
 * Renders company name with optional link
 */
function CompanyLink({ company, link }: CompanyLinkProps) {
  if (!link) {
    return <span>{company}</span>;
  }

  return (
    <a
      className="hover:underline"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${company} company website`}
    >
      {company}
    </a>
  );
}

interface WorkExperienceItemProps {
  work: WorkExperience;
}

/**
 * Individual work experience card component
 */
function WorkExperienceItem({ work }: WorkExperienceItemProps) {
  const { company, link, badges, title, start, end, description, highlights } =
    work;

  return (
    <Card className="border-none py-1 print:py-0">
      <CardHeader className="space-y-1 print:space-y-0.5">
        <div className="flex items-baseline justify-between gap-x-2 text-base">
          <h3 className="font-semibold leading-snug print:text-sm">
            <CompanyLink company={company} link={link} />
          </h3>
          <WorkPeriod start={start} end={end} />
        </div>

        <h4 className="text-sm font-medium leading-none text-foreground/90 print:text-[12px]">
          {title}
        </h4>

        <BadgeList className="pt-1" badges={badges} />
      </CardHeader>

      <CardContent>
        <div className="mt-2 text-xs text-foreground/80 leading-relaxed print:mt-1 print:text-[10px] text-pretty">
          {description}
          {highlights && highlights.length > 0 && (
            <ul className="list-inside list-disc mt-1.5 space-y-1">
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface WorkExperienceProps {
  work: (typeof RESUME_DATA)["work"];
  title?: string;
  id?: string;
}

/**
 * Main work experience section component
 * Renders a list of work experiences in chronological order
 */
export function WorkExperience({
  work,
  title = "Work Experience",
  id = "work-experience",
}: WorkExperienceProps) {
  if (!work || work.length === 0) return null;

  return (
    <Section>
      <h2 className="text-xl font-bold" id={id}>
        {title}
      </h2>
      <div
        className="space-y-4 print:space-y-0"
        role="feed"
        aria-labelledby={id}
      >
        {work.map((item) => (
          <article key={`${item.company}-${item.start}`}>
            <WorkExperienceItem work={item} />
          </article>
        ))}
      </div>
    </Section>
  );
}
