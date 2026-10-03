import type { Metadata } from "next";
import { CommandMenu } from "@/components/command-menu";
import { RESUME_DATA } from "@/data/resume-data";
import { generateResumeStructuredData } from "@/lib/structured-data";
import { Certifications } from "./components/certifications";
import { Education } from "./components/education";
import { Header } from "./components/header";
import { Interests } from "./components/interests";
import { KeyCertification } from "./components/key-certification";
import { Languages } from "./components/languages";
import { Projects } from "./components/projects";
import { Skills } from "./components/skills";
import { Summary } from "./components/summary";
import { TechnicalCredentials } from "./components/technical-credentials";
import { VisitorInfoBar } from "./components/visitor-info-bar";
import { Volunteering } from "./components/volunteering";
import { WorkExperience } from "./components/work-experience";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} - Resume | AWS Cloud Resume`,
  description: RESUME_DATA.about,
  openGraph: {
    title: `${RESUME_DATA.name} - Resume | AWS Cloud Resume`,
    description: RESUME_DATA.about,
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "https://cloud.ama24.my/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${RESUME_DATA.name}'s profile picture`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESUME_DATA.name} - Resume | AWS Cloud Resume`,
    description: RESUME_DATA.about,
    images: ["https://cloud.ama24.my/opengraph-image"],
  },
};

export default function ResumePage() {
  const structuredData = generateResumeStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe for JSON-LD structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main
        className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-11 md:p-16"
        id="main-content"
      >
        <div className="sr-only">
          <h1>{RESUME_DATA.name}&apos;s Resume</h1>
        </div>

        <section
          className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4 dark:bg-background"
          aria-label="Resume Content"
        >
          <div className="space-y-3">
            <VisitorInfoBar />
            <div className="animate-fade-in" style={{ animationDelay: "0ms" }}>
              <Header />
            </div>
          </div>

          <div className="space-y-8 print:space-y-4">
            <div className="animate-fade-in" style={{ animationDelay: "75ms" }}>
              <Summary summary={RESUME_DATA.summary} />
            </div>

            {RESUME_DATA.certifications ? (
              <div
                className="animate-fade-in"
                style={{ animationDelay: "150ms" }}
              >
                <Certifications certifications={RESUME_DATA.certifications} />
              </div>
            ) : (
              <>
                {RESUME_DATA.keyCertification && (
                  <div
                    className="animate-fade-in"
                    style={{ animationDelay: "150ms" }}
                  >
                    <KeyCertification
                      certification={RESUME_DATA.keyCertification}
                    />
                  </div>
                )}
                {RESUME_DATA.technicalCredentials && (
                  <div
                    className="animate-fade-in"
                    style={{ animationDelay: "200ms" }}
                  >
                    <TechnicalCredentials
                      credentials={RESUME_DATA.technicalCredentials}
                    />
                  </div>
                )}
              </>
            )}

            <div
              className="animate-fade-in"
              style={{ animationDelay: "225ms" }}
            >
              <Skills
                skills={RESUME_DATA.skills}
                skillsByCategory={RESUME_DATA.skillsByCategory}
              />
            </div>

            <div
              className="animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <Projects
                projects={RESUME_DATA.projects}
                title="Cloud Projects (Self-Directed)"
              />
            </div>

            <div
              className="animate-fade-in"
              style={{ animationDelay: "375ms" }}
            >
              <WorkExperience
                work={RESUME_DATA.work}
                title="Relevant Experience"
                id="relevant-experience"
              />
            </div>

            <div
              className="animate-fade-in"
              style={{ animationDelay: "450ms" }}
            >
              <Education education={RESUME_DATA.education} />
            </div>

            {RESUME_DATA.otherExperience && (
              <div
                className="animate-fade-in"
                style={{ animationDelay: "525ms" }}
              >
                <WorkExperience
                  work={RESUME_DATA.otherExperience}
                  title="Other Experience"
                  id="other-experience"
                />
              </div>
            )}

            {RESUME_DATA.volunteering && (
              <div
                className="animate-fade-in"
                style={{ animationDelay: "600ms" }}
              >
                <Volunteering volunteering={RESUME_DATA.volunteering} />
              </div>
            )}

            {RESUME_DATA.interests && (
              <div
                className="animate-fade-in"
                style={{ animationDelay: "675ms" }}
              >
                <Interests interests={RESUME_DATA.interests} />
              </div>
            )}

            {RESUME_DATA.languages && (
              <div
                className="animate-fade-in"
                style={{ animationDelay: "750ms" }}
              >
                <Languages languages={RESUME_DATA.languages} />
              </div>
            )}
          </div>
        </section>

        <nav className="print:hidden" aria-label="Quick navigation">
          <CommandMenu />
        </nav>
      </main>
    </>
  );
}
