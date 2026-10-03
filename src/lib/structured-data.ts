import { RESUME_DATA } from "@/data/resume-data";

export function generatePersonStructuredData() {
  return {
    "@type": "Person",
    "@id": "https://cloud.ama24.my/#person",
    name: RESUME_DATA.name,
    alternateName: RESUME_DATA.initials,
    description: RESUME_DATA.about,
    url: RESUME_DATA.personalWebsiteUrl || "https://cloud.ama24.my",
    image: RESUME_DATA.avatarUrl,
    sameAs: RESUME_DATA.contact.social.map((social) => social.url),
    address: {
      "@type": "Place",
      name: RESUME_DATA.location,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: RESUME_DATA.contact.email,
      contactType: "personal",
    },
    jobTitle: RESUME_DATA.about,
    worksFor:
      RESUME_DATA.work.length > 0
        ? {
            "@type": "Organization",
            name: RESUME_DATA.work[0].company,
            url: RESUME_DATA.work[0].link || undefined,
          }
        : undefined,
    alumniOf: RESUME_DATA.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.school,
    })),
    hasOccupation: [
      ...RESUME_DATA.work.map((job) => ({
        "@type": "Occupation",
        name: job.title,
        occupationLocation: {
          "@type": "Place",
          name: RESUME_DATA.location,
        },
        occupationalCategory: "Cloud Engineering & IT Operations",
      })),
      ...(RESUME_DATA.otherExperience?.map((job) => ({
        "@type": "Occupation",
        name: job.title,
        occupationLocation: {
          "@type": "Place",
          name: RESUME_DATA.location,
        },
        occupationalCategory: "Information Technology & Security",
      })) ?? []),
    ],
    knowsAbout: RESUME_DATA.skills,
    hasCredential: [
      ...(RESUME_DATA.certifications?.map((cert) => ({
        "@type": "EducationalOccupationalCredential",
        name: cert.title,
        recognizedBy: cert.issuer
          ? {
              "@type": "Organization",
              name: cert.issuer,
            }
          : undefined,
      })) ?? []),
      ...(RESUME_DATA.keyCertification && !RESUME_DATA.certifications
        ? [
            {
              "@type": "EducationalOccupationalCredential",
              name: RESUME_DATA.keyCertification.title,
              recognizedBy: {
                "@type": "Organization",
                name: RESUME_DATA.keyCertification.issuer,
              },
            },
          ]
        : []),
      ...(RESUME_DATA.technicalCredentials?.flatMap((cat) =>
        cat.items.map((item) => ({
          "@type": "EducationalOccupationalCredential",
          name: item.title,
        }))
      ) ?? []),
    ],
  };
}

export function generateWebPageStructuredData() {
  return {
    "@type": "WebPage",
    "@id": "https://cloud.ama24.my/#webpage",
    name: `${RESUME_DATA.name} - Resume`,
    description: RESUME_DATA.about,
    url: "https://cloud.ama24.my",
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://cloud.ama24.my/#website",
      name: `${RESUME_DATA.name}'s Professional Resume`,
      url: "https://cloud.ama24.my",
    },
    about: {
      "@id": "https://cloud.ama24.my/#person",
    },
  };
}

export function generateResumeStructuredData() {
  const person = generatePersonStructuredData();
  const webPage = generateWebPageStructuredData();

  return {
    "@context": "https://schema.org",
    "@graph": [person, webPage],
  };
}
