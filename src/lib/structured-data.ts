import { RESUME_DATA } from "@/data/resume-data";

export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: RESUME_DATA.name,
    alternateName: RESUME_DATA.initials,
    description: RESUME_DATA.about,
    url: RESUME_DATA.personalWebsiteUrl || undefined,
    image: RESUME_DATA.avatarUrl,
    sameAs: RESUME_DATA.contact.social.map((social) => social.url),
    address: {
      "@type": "Place",
      name: RESUME_DATA.location,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: RESUME_DATA.contact.email,
      telephone: RESUME_DATA.contact.tel,
      contactType: "personal",
    },
    jobTitle: RESUME_DATA.about,
    worksFor:
      RESUME_DATA.work.length > 0
        ? {
            "@type": "Organization",
            name: RESUME_DATA.work[0].company,
            url: RESUME_DATA.work[0].link,
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
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${RESUME_DATA.name} - Resume`,
    description: RESUME_DATA.about,
    url: "https://cv.jarocki.me",
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: `${RESUME_DATA.name}'s Professional Resume`,
      url: "https://cv.jarocki.me",
    },
    about: {
      "@type": "Person",
      name: RESUME_DATA.name,
    },
    mainEntity: generatePersonStructuredData(),
  };
}

export function generateResumeStructuredData() {
  const person = generatePersonStructuredData();
  const webPage = generateWebPageStructuredData();

  return [person, webPage];
}
