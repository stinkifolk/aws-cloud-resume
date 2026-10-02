import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import type { RESUME_DATA } from "@/data/resume-data";

type ProjectTags = readonly string[];

interface ProjectLinkProps {
  title: string;
  link?: string;
  hasAttribution?: boolean;
}

/**
 * Renders project title with optional link and status indicator
 */
function ProjectLink({ title, link, hasAttribution }: ProjectLinkProps) {
  if (!link) {
    return (
      <span>
        {title}
        {hasAttribution && (
          <sup
            className="ml-0.5 text-[11px] font-normal text-muted-foreground/70 select-none"
            aria-hidden="true"
          >
            *
          </sup>
        )}
      </span>
    );
  }

  return (
    <>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 hover:underline"
        aria-label={`${title} project (opens in new tab)`}
      >
        <span>
          {title}
          {hasAttribution && (
            <sup
              className="ml-0.5 text-[11px] font-normal text-muted-foreground/70 select-none"
              aria-hidden="true"
            >
              *
            </sup>
          )}
        </span>
        <span
          className="size-1 rounded-full bg-green-500"
          title="Active project indicator"
          aria-hidden="true"
        />
      </a>
      <div
        className="hidden font-mono text-xs underline print:visible"
        aria-hidden="true"
      >
        {link.replace("https://", "").replace("www.", "").replace("/", "")}
      </div>
    </>
  );
}

interface ProjectTagsProps {
  tags: ProjectTags;
}

/**
 * Renders a list of technology tags used in the project
 */
function ProjectTags({ tags }: ProjectTagsProps) {
  if (tags.length === 0) return null;

  return (
    <ul
      className="mt-2 flex list-none flex-wrap gap-1 p-0"
      aria-label="Technologies used"
    >
      {tags.map((tag) => (
        <li key={tag}>
          <Badge
            className="px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
            variant="secondary"
          >
            {tag}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  highlights?: readonly string[];
  tags: ProjectTags;
  link?: string;
  attribution?: (typeof RESUME_DATA)["projects"][number]["attribution"];
}

/**
 * Card component displaying project information
 */
function ProjectCard({
  title,
  description,
  highlights,
  tags,
  link,
  attribution,
}: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border p-3">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-base">
            <ProjectLink
              title={title}
              link={link}
              hasAttribution={Boolean(attribution)}
            />
          </CardTitle>
          {description && (
            <CardDescription
              className="text-pretty text-xs text-muted-foreground leading-relaxed print:text-[10px]"
              aria-label="Project description"
            >
              {description}
            </CardDescription>
          )}
          {highlights && highlights.length > 0 && (
            <ul className="list-inside list-disc text-pretty text-xs text-foreground/80 print:text-[10px] space-y-1 mt-1.5">
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}
          {attribution && (
            <p className="pt-1.5 text-[10px] text-muted-foreground/70 leading-normal print:text-[8px]">
              <span className="select-none" aria-hidden="true">
                *{" "}
              </span>
              {attribution.text}{" "}
              <a
                href={attribution.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                {attribution.linkText}
              </a>
              .
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex pt-2">
        <ProjectTags tags={tags} />
      </CardContent>
    </Card>
  );
}

interface ProjectsProps {
  projects: (typeof RESUME_DATA)["projects"];
  title?: string;
}

/**
 * Section component displaying all side projects
 */
export function Projects({
  projects,
  title = "Cloud Projects (Self-Directed)",
}: ProjectsProps) {
  return (
    <Section className="scroll-mb-16 print:space-y-4">
      <h2 className="text-xl font-bold" id="side-projects">
        {title}
      </h2>
      <div
        className="-mx-3 grid grid-cols-1 gap-3 md:grid-cols-2 print:grid-cols-2 print:gap-2"
        role="feed"
        aria-labelledby="side-projects"
      >
        {projects.map((project) => (
          <article
            key={project.title}
            className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm print:hover:translate-y-0 print:hover:shadow-none"
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              highlights={project.highlights}
              tags={project.techStack}
              link={project.link?.href}
              attribution={project.attribution}
            />
          </article>
        ))}
      </div>
    </Section>
  );
}
